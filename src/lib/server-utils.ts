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

export const fetchWikiArticleIntroduction = async (genre: string) => {
  const title = decodeURIComponent(genre);
  const result = await fetchData<WikiArticleIntroApiResponse>(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`,
    wikiArticleIntroSchema,
  );
  return result;
};

export const fetchDiscogsDataByReleases = async (
  genre: string,
  page: number,
  perPage: number,
) => {
  const queryString = decodeURIComponent(genre);
  const result = await fetchData<DiscogsReleasesApiResponse>(
    `https://api.discogs.com/database/search?q=${queryString}&type=release&page=${page}&per_page=${perPage}&key=${process.env.NEXT_PUBLIC_DISCOGS_API_CONSUMER_KEY}&secret=${process.env.NEXT_PUBLIC_DISCOGS_API_CONSUMER_SECRET}`,
    discogsReleasesSchema,
  );
  return result;
};

export const fetchDiscogsDataByArtists = async (
  genre: string,
  page: number,
  perPage: number,
) => {
  const queryString = decodeURIComponent(genre);
  const result = await fetchData<DiscogsArtistsApiResponse>(
    `https://api.discogs.com/database/search?q=${queryString}&type=artist&page=${page}&per_page=${perPage}&key=${process.env.NEXT_PUBLIC_DISCOGS_API_CONSUMER_KEY}&secret=${process.env.NEXT_PUBLIC_DISCOGS_API_CONSUMER_SECRET}`,
    discogsArtistsSchema,
  );
  return result;
};
