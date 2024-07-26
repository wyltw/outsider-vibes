import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { WikiArticleIntroApiResponse } from "./types/wiki-api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchWikiArticleIntroduction = async (
  genre: string,
): Promise<WikiArticleIntroApiResponse> => {
  const title = genre.split("%20").join(" ");
  const response = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`,
  );
  const data = await response.json();
  return data;
};
