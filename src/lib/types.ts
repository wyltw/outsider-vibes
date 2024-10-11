import { z, ZodSchema } from "zod";
import {
  collectionDeleteRequestSchema,
  collectionPostRequestSchema,
  discogsArtistSchema,
  discogsArtistsSchema,
  discogsReleaseSchema,
  discogsReleasesSchema,
  userArtistSchema,
  userReleaseSchema,
  wikiArticleIntroSchema,
} from "./validations";
import { QuerySnapshot } from "firebase/firestore";

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

export type DiscogsSearchReleasesApiResponse = z.infer<
  typeof discogsReleasesSchema
>;

export type DiscogsSearchArtistsApiResponse = z.infer<
  typeof discogsArtistsSchema
>;

export type DiscogsReleasesApiResponse = z.infer<
  typeof discogsReleaseSchema
> & { documentId: string };

export type DiscogsArtistsApiResponse = z.infer<typeof discogsArtistSchema> & {
  documentId: string;
};

export type DiscogsSearchReleasesResult =
  DiscogsSearchReleasesApiResponse["results"][0];
export type DiscogsSearchArtistsResult =
  DiscogsSearchArtistsApiResponse["results"][0];

export type DiscogsSearchResultsList = (
  | DiscogsSearchReleasesResult
  | DiscogsSearchArtistsResult
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

export type fetchResults<T> =
  | { success: true; data: T[] }
  | { success: false; error: string };

export type TFetchData = <T>(
  url: string,
  schema: ZodSchema<any>,
) => Promise<fetchResult<T>>;

export type TFetchDiscogsData = <
  T extends DiscogsSearchReleasesApiResponse | DiscogsSearchArtistsApiResponse,
>(
  q: string,
  searchParams: DiscogsSearchParams,
  schema: ZodSchema<any>,
  page?: number,
  perPage?: number,
) => Promise<fetchResult<T>>;

export type TFetchDiscogsDataByIds = <
  T extends DiscogsReleasesApiResponse | DiscogsArtistsApiResponse,
>(
  resourceType: "releases" | "artists",
  ids: { documentId: string; discogsId: string }[],
  schema: ZodSchema<any>,
) => Promise<fetchResults<T>>;

//type for firebase

export type UserRelease = z.infer<typeof userReleaseSchema>;

export type UserArtist = z.infer<typeof userArtistSchema>;

export type TSimplifyQuerySnapshot<T extends UserRelease | UserArtist> = (
  querySnapshot: QuerySnapshot<T>,
  schema: ZodSchema<any>,
) => T[];

export type CollectionId = "userReleases" | "userArtists";

export type TGetUserCollectionList<T extends UserRelease | UserArtist> = (
  collectionName: string,
  schema: ZodSchema<any>,
) => T[];

export type collectionPostRequest = z.infer<typeof collectionPostRequestSchema>;

export type collectionDeleteRequest = z.infer<
  typeof collectionDeleteRequestSchema
>;

export type ApiResponse = {
  success: boolean;
  message: string;
};
