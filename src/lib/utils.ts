import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DiscogsArtistsResult, DiscogsReleasesResult } from "./types";
import { DEFAULT_PAGE, DISCOGS_PAGES_LIMIT } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: unknown) => {
  let message;
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong.";
  }
  return message;
};

export async function sleep(ms: number) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve("awake");
    }, ms),
  );
}

export function replaceWithDefaultAvatar(target: string) {
  return target.includes("spacer") ? "/images/avatar.png" : target;
}

export const getUniqueGenres = (
  searchResults: DiscogsReleasesResult[],
  key: "genre" | "style",
) => Array.from(new Set(searchResults.map((result) => result[key]).flat()));

export const splitArtistAndAlbumTitle = (title: string) => {
  return [title.split(" - ").reverse()];
};

export const getPageArray = (currentPage: number, count: number) => {
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  let pageArray: number[] = [];
  if (currentPage - count === DEFAULT_PAGE) {
    for (let i = currentPage; i > DEFAULT_PAGE; i--) {
      pageArray.push(i);
    }
    return pageArray.reverse();
  }
  if (currentPage + count === DISCOGS_PAGES_LIMIT) {
    for (let i = currentPage; i < DISCOGS_PAGES_LIMIT; i++) {
      pageArray.push(i);
    }
    return pageArray;
  }
  if (currentPage - 1 === DEFAULT_PAGE) {
    return [currentPage, nextPage];
  }
  if (currentPage + 1 === DISCOGS_PAGES_LIMIT) {
    return [previousPage, currentPage];
  }
  if (currentPage === DEFAULT_PAGE || currentPage === DISCOGS_PAGES_LIMIT) {
    return pageArray;
  }
  pageArray = [previousPage, currentPage, nextPage];
  return pageArray;
};
