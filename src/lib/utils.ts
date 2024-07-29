import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export async function sleep(ms: number) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve("awake");
    }, ms),
  );
}
