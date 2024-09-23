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
  siblingCount: number,
  totalPage: number,
) => {
  const previousPage = currentPage - siblingCount;
  const nextPage = currentPage + siblingCount;
  //使頁碼根據siblingCount決定渲染的頁碼數量
  let pageArray: number[] = [];
  if (currentPage === DEFAULT_PAGE) {
    for (let i = currentPage; i < currentPage + siblingCount * 2; i++) {
      if (i <= totalPage) pageArray.push(i);
    }
    return pageArray;
  } else if (currentPage === totalPage) {
    for (let i = totalPage; i >= currentPage - siblingCount * 2; i--) {
      pageArray.push(i);
    }
    return pageArray.reverse();
  }
  //確保首頁和尾頁的頁碼渲染
  for (let i = previousPage; i <= nextPage; i++) {
    if (i !== 0 && i <= totalPage) pageArray.push(i);
    //考慮邊界情況，如出現0或者超過最大頁數
  }
  //一般頁碼渲染邏輯
  console.log(pageArray);
  return pageArray;
};
