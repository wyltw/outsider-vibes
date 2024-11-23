import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DiscogsSearchReleasesResult, DiscogsSearchType } from "./types";
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
  target: string = "",
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
  searchResults: DiscogsSearchReleasesResult[],
  key: "genre" | "style",
) => Array.from(new Set(searchResults.map((result) => result[key]).flat()));
//map的回傳是一個充滿genre陣列或者style陣列的陣列，經過flat攤平後由Set建構式排除重複元素，最後再通過from轉換回一般陣列。

export const splitArtistAndAlbumTitle = (title: string) => {
  return [title.split(" - ").reverse()];
};

export const getPageArray = (
  // still can be refactored
  currentPage: number,
  siblingCount: number,
  totalPage: number,
) => {
  const previousPages = currentPage - siblingCount;
  const nextPages = currentPage + siblingCount;
  //使頁碼根據siblingCount決定渲染的頁碼數量

  let pageArray: number[] = [];
  if (currentPage === DEFAULT_PAGE) {
    for (let i = currentPage; i < currentPage + siblingCount * 2; i++) {
      if (i <= totalPage) pageArray.push(i);
    }
    return pageArray;
  } else if (currentPage === totalPage) {
    for (let i = totalPage; i >= currentPage - siblingCount * 2; i--) {
      if (i > 0) pageArray.push(i);
    }
    return pageArray.reverse();
  }
  //確保頁碼為首頁和尾頁的時候周邊頁碼渲染

  for (let i = previousPages; i <= nextPages; i++) {
    if (i !== 0 && i <= totalPage) pageArray.push(i);
    //考慮邊界情況，如出現0或者超過最大頁數
  }
  //一般的頁碼渲染邏輯
  return pageArray;
};
