import "server-only";
import { discogsReleaseSchema, wikiArticleIntroSchema } from "./validations";
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
} from "./types";
import { ZodSchema } from "zod";
import { DEFAULT_PAGE, DEFAULT_PERPAGE, DISCOGS_API } from "./constants";

import {
  collection,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { DocumentData } from "firebase-admin/firestore";

export const fetchData: TFetchData = async (
  url: string,
  schema: ZodSchema<any>,
) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    const validatedData = schema.safeParse(data);
    if (!validatedData.success) {
      console.log(validatedData.error.message);
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

export const fetchDiscogsData = async <
  T extends DiscogsSearchReleasesApiResponse | DiscogsSearchArtistsApiResponse,
>(
  q: string,
  searchParams: DiscogsSearchParams,
  schema: ZodSchema<any>,
  page: number = DEFAULT_PAGE,
  perPage: number = DEFAULT_PERPAGE,
) => {
  const queryString = decodeURIComponent(q);
  const baseURL = getDiscogsSearchAPI(
    { page: String(page) },
    { per_page: String(perPage) },
    searchParams,
    { q: queryString },
  );
  const result = await fetchData<T>(baseURL.toString(), schema);
  return result;
};

const getDiscogsReleasesAPI = (releaseId: string) => {
  const baseURL = new URL(`releases/${releaseId}`, DISCOGS_API);
  return addDiscogsAuthParams(baseURL);
};

export const fetchDiscogsDataByIds = async <
  T extends DiscogsReleasesApiResponse,
>(
  releaseIds: string[],
  schema: ZodSchema<any>,
) => {
  const promiseList = releaseIds.map((releaseId) => {
    const baseURL = getDiscogsReleasesAPI(releaseId);
    return fetchData<T>(baseURL.toString(), schema);
    //這裡回傳的只是充滿pending狀態的Promise物件陣列，在下方的Promise.all完成
  });
  try {
    const resultsList = await Promise.all(promiseList);
    return { success: true, data: resultsList };
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
    const userQuery = query(userCollectionRef, where("userId", "==", userId));
    const data = await getDocs(userQuery);
    const simplifiedData = simplifyQuerySnapshot<T>(data, schema);
    const savedItemsList = simplifiedData.map((doc) => doc[key] as string);
    //只取id
    return savedItemsList;
  } catch (error) {
    console.error(handleError(error));
    return [];
  }
};
