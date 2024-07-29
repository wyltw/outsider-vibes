import "server-only";
import { wikiArticleIntroSchema } from "./validations";
import { TfetchWikiArticleIntroduction } from "./types";
import { formatTitle, handleError } from "./utils";

export const fetchWikiArticleIntroduction: TfetchWikiArticleIntroduction =
  async (genre: string) => {
    const title = formatTitle(genre);
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`,
      );
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      const validatedResponse = wikiArticleIntroSchema.safeParse(data);
      if (!validatedResponse.success) {
        throw new Error("Unexpected data from Wikipedia...");
      }
      return { success: true, data: validatedResponse.data };
    } catch (error: unknown) {
      console.error(error);
      return handleError(error);
    }
  };
