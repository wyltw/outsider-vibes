import { z, ZodSchema } from "zod";
import {
  discogsArtistsSchema,
  discogsReleasesSchema,
  wikiArticleIntroSchema,
} from "./validations";

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

export type DiscogsReleasesApiResponse = z.infer<typeof discogsReleasesSchema>;

export type DiscogsArtistsApiResponse = z.infer<typeof discogsArtistsSchema>;

export type fetchResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export type TfetchData = <T>(
  url: string,
  schema: ZodSchema<any>,
) => Promise<fetchResult<T>>;
