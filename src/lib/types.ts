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

export type DiscogsReleasesResult = DiscogsReleasesApiResponse["results"][0];
export type DiscogsArtistsResult = DiscogsArtistsApiResponse["results"][0];

export type DiscogsResultsList = (
  | DiscogsReleasesResult
  | DiscogsArtistsResult
)[];
//temporary solution for sorting, might need to be strict in future.

export type DiscogsSearchType = "release" | "artist";

export type TSortType = "default" | "year" | "title";

export type DiscogsSearchParams = {
  type: DiscogsSearchType;
} & Record<string, string>;

export type fetchResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export type TfetchData = <T>(
  url: string,
  schema: ZodSchema<any>,
) => Promise<fetchResult<T>>;

export type TfetchDiscogsData = <T>(
  q: string,
  page: number,
  perPage: number,
  searchParams: DiscogsSearchParams,
  schema: ZodSchema<any>,
) => Promise<fetchResult<T>>;
