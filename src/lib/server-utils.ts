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
  ...searchParams: Record<string, string>[]
) => {
  let baseURL = new URL(resourceType, DISCOGS_API);
  if (searchParams.length) {
    searchParams.forEach((searchParam) => {
      Object.entries(searchParam).forEach(([name, value]) => {
        baseURL.searchParams.append(name, value);
      });
    });
  }
  if (process.env.NEXT_PUBLIC_DISCOGS_API_CONSUMER_KEY) {
    baseURL.searchParams.append(
      "key",
      process.env.NEXT_PUBLIC_DISCOGS_API_CONSUMER_KEY,
    );
  }
  if (process.env.NEXT_PUBLIC_DISCOGS_API_CONSUMER_SECRET) {
    baseURL.searchParams.append(
      "secret",
      process.env.NEXT_PUBLIC_DISCOGS_API_CONSUMER_SECRET,
    );
  }
  return baseURL;
};

export const fetchDiscogsDataByReleases = async (
  q: string,
  type: "release" | "artist",
  page: number,
  perPage: number,
) => {
  const queryString = decodeURIComponent(q);
  const baseURL = getDiscogsAPI(
    "search",
    { q: queryString },
    { type: type },
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
  type: "release" | "artist",
  page: number,
  perPage: number,
) => {
  const queryString = decodeURIComponent(q);
  const baseURL = getDiscogsAPI(
    "search",
    { q: queryString },
    { type: type },
    { page: String(page) },
    { per_page: String(perPage) },
  );
  const result = await fetchData<DiscogsArtistsApiResponse>(
    baseURL.toString(),
    discogsArtistsSchema,
  );
  return result;
};
