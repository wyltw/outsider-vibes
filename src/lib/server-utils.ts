import "server-only";
import { wikiArticleIntroSchema } from "./validations";
import { handleError } from "./utils";
import {
  CollectionId,
  DiscogsSearchArtistsApiResponse,
  DiscogsSearchReleasesApiResponse,
  DiscogsSearchParams,
  TFetchData,
  UserArtist,
  UserRelease,
  WikiArticleIntroApiResponse,
  DiscogsReleasesApiResponse,
  TFetchDiscogsDataByIds,
  DiscogsArtistsApiResponse,
  DiscogsSearchType,
  TFetchDiscogsData,
} from "./types";
import { ZodSchema } from "zod";
import { DEFAULT_PERPAGE, DISCOGS_API } from "./constants";

import {
  addDoc,
  collection,
  getDocs,
  query,
  QuerySnapshot,
  Timestamp,
  where,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

export const fetchData: TFetchData = async (
  url: string,
  schema: ZodSchema<any>,
) => {
  try {
    const response = await fetch(url);

    if (response.status === 429) {
      throw new Error(`${response.status} - 系統繁忙中，請稍後刷新重試`);
    }
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const validatedData = schema.safeParse(data);

    if (!validatedData.success) {
      console.error(validatedData.error.message);
      throw new Error("Unexpected data from third party...");
    }

    return { success: true, data: validatedData.data };
  } catch (error) {
    return { success: false, error: handleError(error) };
  }
};

export const fetchWikiArticleIntroduction = async (query: string) => {
  const title = decodeURIComponent(query);
  const result = await fetchData<WikiArticleIntroApiResponse>(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`,
    wikiArticleIntroSchema,
  );
  return result;
};

const addDiscogsAuthParams = (baseURL: URL) => {
  if (process.env.NEXT_PUBLIC_DISCOGS_API_CONSUMER_KEY) {
    baseURL.searchParams.set(
      "key",
      process.env.NEXT_PUBLIC_DISCOGS_API_CONSUMER_KEY,
    );
  }
  if (process.env.NEXT_PUBLIC_DISCOGS_API_CONSUMER_SECRET) {
    baseURL.searchParams.set(
      "secret",
      process.env.NEXT_PUBLIC_DISCOGS_API_CONSUMER_SECRET,
    );
  }
  return baseURL;
};

const getDiscogsSearchAPI = (
  searchParams: Record<string, string>,
  ...baseSearchParams: Record<string, string>[]
) => {
  const baseURL = new URL("database/search", DISCOGS_API);
  const setSearchParams = (searchParam: Record<string, string>) => {
    Object.entries(searchParam).forEach(([name, value]) => {
      baseURL.searchParams.set(name, value);
    });
  };
  if (searchParams) {
    //當url改變從useSearchParams自動獲取的如filter等searchParams
    setSearchParams(searchParams);
  }
  if (baseSearchParams.length) {
    //在呼叫fetch函式時手動傳入的searchParams如關鍵字，頁碼等
    baseSearchParams.forEach(setSearchParams);
  }

  return addDiscogsAuthParams(baseURL);
};

export const fetchDiscogsData: TFetchDiscogsData = async <
  T extends DiscogsSearchReleasesApiResponse | DiscogsSearchArtistsApiResponse,
>(
  q: string,
  searchParams: DiscogsSearchParams,
  schema: ZodSchema<any>,
  perPage: number = DEFAULT_PERPAGE,
) => {
  const queryString = decodeURIComponent(q);
  const baseURL = getDiscogsSearchAPI(
    searchParams,
    { per_page: String(perPage) },
    { q: queryString },
  );
  const result = await fetchData<T>(baseURL.toString(), schema);
  return result;
};

const getDiscogsResourceAPI = (
  resourceType: "releases" | "artists",
  id: string,
) => {
  const baseURL = new URL(`${resourceType}/${id}`, DISCOGS_API);
  return addDiscogsAuthParams(baseURL);
};

export const fetchDiscogsDataByIds: TFetchDiscogsDataByIds = async <
  T extends DiscogsReleasesApiResponse | DiscogsArtistsApiResponse,
>(
  resourceType: "releases" | "artists",
  ids: { documentId: string; discogsId: string }[],
  schema: ZodSchema<any>,
) => {
  try {
    const promiseList = ids.map(({ documentId, discogsId }) => {
      const baseURL = getDiscogsResourceAPI(resourceType, discogsId);
      return fetchData<T>(baseURL.toString(), schema).then((result) => {
        if (!result.success) {
          throw new Error(result.error);
        }
        const dataWithDocumentId = { ...result.data, documentId };
        return { ...result, data: dataWithDocumentId };
      });
      //這裡回傳的只是充滿pending狀態的Promise物件陣列，在下方的Promise.all完成
    });
    const resultsList = await Promise.all(promiseList);
    const filteredResultsList: T[] = [];
    resultsList.forEach((result) => {
      //fetchData函式被設計成不會拋出錯誤，所以在這裡手動捕獲錯誤
      filteredResultsList.push(result.data);
    });
    return { success: true, data: filteredResultsList };
  } catch (error) {
    return { success: false, error: handleError(error) };
  }
};

// for firebase

const simplifyQuerySnapshot = <T extends UserRelease | UserArtist>(
  querySnapshot: QuerySnapshot<any>,
  schema: ZodSchema<any>,
): T[] | [] => {
  //除了取得簡化的firebase資料，同時也透過zod驗證資料的型別
  const simplifiedData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const validatedData = schema.safeParse(simplifiedData);
  //注意這裡直接驗證的是符合userReleaseSchema的陣列，因此使用時傳入的schema應該是userReleaseArraySchema
  try {
    if (!validatedData.success) {
      throw new Error(validatedData.error.message);
    }
  } catch (error) {
    console.error(handleError(error));
    return [];
  }

  return validatedData.data;
};

export const getUserSavedItemsList = async <T extends UserRelease | UserArtist>(
  collectionId: CollectionId,
  schema: ZodSchema<any>,
  key: keyof T,
  userId: string = "",
) => {
  const userCollectionRef = collection(db, collectionId);
  try {
    const userQuery = query(
      userCollectionRef,
      where("userId", "==", userId),
      orderBy("addedAt", "desc"),
    );
    const data = await getDocs(userQuery);
    const simplifiedData = simplifyQuerySnapshot<T>(data, schema);
    const savedItemsList = simplifiedData.map((doc) => ({
      documentId: doc["id"],
      discogsId: doc[key] as string,
    }));
    //只取id
    return savedItemsList;
  } catch (error) {
    console.error(handleError(error));
    return [];
  }
};

export const getUserSavedItemsCount = async (
  collectionId: CollectionId,
  userId: string = "",
) => {
  const userCollectionRef = collection(db, collectionId);
  try {
    const userQuery = query(userCollectionRef, where("userId", "==", userId));
    const data = await getDocs(userQuery);
    return data.size;
  } catch (error) {
    console.error(handleError(error));
    return 0;
  }
};

export const saveItemToCollection = async (
  type: DiscogsSearchType,
  itemId: string,
  userId: string,
) => {
  try {
    const document = {
      userId: userId,
      addedAt: Timestamp.fromDate(new Date()),
    };
    const collectionId = type === "release" ? "userReleases" : "userArtists";
    if (type === "release") {
      const collectionRef = collection(db, collectionId);
      await addDoc(collectionRef, {
        releaseId: itemId,
        ...document,
      });
    }
    if (type === "artist") {
      const collectionRef = collection(db, collectionId);
      await addDoc(collectionRef, {
        artistId: itemId,
        ...document,
      });
    }
  } catch (error) {
    throw new Error("添加收藏失敗");
    //這裡還是需要拋出錯誤，否則無法知道firebase操作是否成功
  }
};

export const deleteUserSavedItem = async (
  type: DiscogsSearchType,
  documentId: string,
) => {
  const collectionId = type === "release" ? "userReleases" : "userArtists";
  const userDocumentRef = doc(db, collectionId, documentId);
  try {
    await deleteDoc(userDocumentRef);
  } catch (error) {
    throw new Error("刪除收藏失敗");
  }
};
