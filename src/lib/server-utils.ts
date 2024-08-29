import "server-only";
import {
  discogsArtistsSchema,
  discogsReleasesSchema,
  wikiArticleIntroSchema,
} from "./validations";
import { handleError } from "./utils";
import {
  DiscogsArtistsApiResponse,
  DiscogsReleasesApiResponse,
  TfetchData,
  WikiArticleIntroApiResponse,
} from "./types";
import { ZodSchema } from "zod";
import { DISCOGS_API } from "./constants";

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
    console.error(error);
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
  let baseURL = new URL(resourceType, DISCOGS_API);
  const setSearchParams = (searchParam: Record<string, string>) => {
    Object.entries(searchParam).forEach(([name, value]) => {
      baseURL.searchParams.set(name, value);
    });
  };
  if (searchParams) {
    setSearchParams(searchParams);
  }
  if (baseSearchParams.length) {
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
  return baseURL;
};

export const fetchDiscogsDataByReleases = async (
  q: string,
  page: number,
  perPage: number,
  searchParams: Record<string, string>,
) => {
  const queryString = decodeURIComponent(q);
  const baseURL = getDiscogsAPI(
    "search",
    searchParams,
    { q: queryString },
    { page: String(page) },
    { per_page: String(perPage) },
    //需要注意傳入的物件屬性名稱需要和api提供的params相同
  );
  const result = await fetchData<DiscogsReleasesApiResponse>(
    baseURL.toString(),
    discogsReleasesSchema,
  );
  return result;
};

export const fetchDiscogsDataByArtists = async (
  q: string,
  page: number,
  perPage: number,
  searchParams: Record<string, string>,
) => {
  const queryString = decodeURIComponent(q);
  const baseURL = getDiscogsAPI(
    "search",
    searchParams,
    { q: queryString },
    { page: String(page) },
    { per_page: String(perPage) },
  );
  const result = await fetchData<DiscogsArtistsApiResponse>(
    baseURL.toString(),
    discogsArtistsSchema,
  );
  return result;
};
//To do:需要再未來看看能不能順利整合兩個類似的fetch function
