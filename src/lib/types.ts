import { z } from "zod";
import { wikiArticleIntroSchema } from "./validations";

export type RouteItem = {
  name: string;
  path: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
};

export type WikiArticleIntroApiResponse = z.infer<
  typeof wikiArticleIntroSchema
>;

type fetchWikiArticleIntroductionResult =
  | { success: true; data: WikiArticleIntroApiResponse }
  | { success: false; error: string };

export type TfetchWikiArticleIntroduction = (
  genre: string,
) => Promise<fetchWikiArticleIntroductionResult>;
