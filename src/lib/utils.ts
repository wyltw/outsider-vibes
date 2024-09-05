import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DiscogsArtistsResult, DiscogsReleasesResult } from "./types";

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
