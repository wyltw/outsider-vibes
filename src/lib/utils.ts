import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  DiscogsArtistsResult,
  DiscogsReleasesResult,
  DiscogsSearchType,
} from "./types";
import { DEFAULT_PAGE } from "./constants";

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

export function replaceWithDefaultPicture(
  target: string,
  type: DiscogsSearchType,
) {
  const isSpacer = target.includes("spacer");
  if (type === "release") {
    return isSpacer ? "/images/music-note.png" : target;
  }
  if (type === "artist") {
    return isSpacer ? "/images/avatar.png" : target;
  }
  return target;
}

export const getUniqueGenres = (
  searchResults: DiscogsReleasesResult[],
  key: "genre" | "style",
) => Array.from(new Set(searchResults.map((result) => result[key]).flat()));

export const splitArtistAndAlbumTitle = (title: string) => {
  return [title.split(" - ").reverse()];
};

export const getPageArray = (
  currentPage: number,
  count: number,
  totalPage: number,
) => {
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  let pageArray: number[] = [];
  if (currentPage - count === DEFAULT_PAGE) {
    for (let i = currentPage; i > DEFAULT_PAGE; i--) {
      pageArray.push(i);
    }
    return pageArray.reverse();
  }
  if (currentPage + count === totalPage) {
    for (let i = currentPage; i < totalPage; i++) {
      pageArray.push(i);
    }
    return pageArray;
  }
  if (currentPage - 1 === DEFAULT_PAGE) {
    return [currentPage, nextPage];
  }
  if (currentPage + 1 === totalPage) {
    return [previousPage, currentPage];
  }
  if (currentPage === DEFAULT_PAGE || currentPage === totalPage) {
    return pageArray;
  }
  pageArray = [previousPage, currentPage, nextPage];
  return pageArray;
};
