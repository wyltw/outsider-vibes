import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

export const formatTitle = (queryString: string) => {
  return queryString.split("%20").join(" ");
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
