import "server-only";
import { wikiArticleIntroSchema } from "./validations";
import { handleError } from "./utils";
import {
  DiscogsArtistsApiResponse,
  DiscogsReleasesApiResponse,
  DiscogsSearchParams,
  TfetchData,
  WikiArticleIntroApiResponse,
} from "./types";
import { ZodSchema } from "zod";
import { DEFAULT_PAGE, DEFAULT_PERPAGE, DISCOGS_API } from "./constants";

export const fetchData: TfetchData = async (
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

export const getDiscogsAPI = (
  resourceType: "search" | "artist",
  searchParams: Record<string, string>,
  ...baseSearchParams: Record<string, string>[]
) => {
  const baseURL = new URL(resourceType, DISCOGS_API);
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
  console.log(baseURL);
  return baseURL;
};

export const fetchDiscogsData = async <
  T extends DiscogsReleasesApiResponse | DiscogsArtistsApiResponse,
>(
  q: string,
  searchParams: DiscogsSearchParams,
  schema: ZodSchema<any>,
  page: number = DEFAULT_PAGE,
  perPage: number = DEFAULT_PERPAGE,
) => {
  const queryString = decodeURIComponent(q);
  const baseURL = getDiscogsAPI(
    "search",
    { page: String(page) },
    { per_page: String(perPage) },
    searchParams,
    { q: queryString },
  );
  const result = await fetchData<T>(baseURL.toString(), schema);
  return result;
};
