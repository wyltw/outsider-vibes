import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { wikiArticleIntroSchema } from "./validations";
import { TfetchWikiArticleIntroduction } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
      return handleError(error);
    }
  };

export const handleError = (
  error: unknown,
): { success: false; error: string } => {
  let message;
  if (error instanceof Error) {
    message = error.message;
  } else {
    message = "Error occured.";
  }
  return { success: false, error: message };
};

export const formatTitle = (queryString: string) => {
  return queryString.split("%20").join(" ");
};
