import "server-only";
import { discogsReleaseSchema, wikiArticleIntroSchema } from "./validations";

import { formatTitle, handleError } from "./utils";

export const fetchWikiArticleIntroduction = async (genre: string) => {
  const title = formatTitle(genre);
  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`,
    );
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    const validatedData = wikiArticleIntroSchema.safeParse(data);
    if (!validatedData.success) {
      throw new Error("Unexpected data from Wikipedia...");
    }
    return { success: true, data: validatedData.data };
  } catch (error: unknown) {
    console.error(error);
    return handleError(error);
  }
};

export const fetchDiscogsDataByReleases = async (
  queryString: string,
  page: number,
  perPage: number,
) => {
  try {
    const response = await fetch(
      `https://api.discogs.com/database/search?q=${queryString}&type=release&page=${page}&per_page=${perPage}&key=${process.env.NEXT_PUBLIC_DISCOGS_API_CONSUMER_KEY}&secret=${process.env.NEXT_PUBLIC_DISCOGS_API_CONSUMER_SECRET}`,
    );
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    const validatedData = discogsReleaseSchema.safeParse(data);
    if (!validatedData.success) {
      throw new Error("Unexpected release data from Discogs...");
    }
    return { success: true, data: validatedData.data };
  } catch (error: unknown) {
    console.error(error);
    return handleError(error);
  }
};
