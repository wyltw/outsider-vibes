import { z, ZodSchema } from "zod";
import {
  discogsArtistsSchema,
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

export type TFetchData = <T>(
  url: string,
  schema: ZodSchema<any>,
) => Promise<fetchResult<T>>;

export type TFetchDiscogsData = <
  T extends DiscogsReleasesApiResponse | DiscogsArtistsApiResponse,
>(
  q: string,
  searchParams: DiscogsSearchParams,
  schema: ZodSchema<any>,
  page: number,
  perPage: number,
) => Promise<fetchResult<T>>;

// export type ValidatedSearchParams = (searchParams: ReadonlyURLSearchParams) =>
//   | {
//       success: true;
//       searchParams: {
//         sortBy: "year" | "title" | "default";
//       };
//     }
//   | { success: false; error: string };

//type for firebase

export type UserRelease = z.infer<typeof userReleaseSchema>;

export type UserArtist = z.infer<typeof userArtistSchema>;

export type TSimplifyQuerySnapshot<T extends UserRelease | UserArtist> = (
  querySnapshot: QuerySnapshot<T>,
  schema: ZodSchema<any>,
) => T[];

export type CollectionId = "userReleases" | "UserArtist";

export type CollectionDocKey<T> = "releaseId" | "artistId";

export type TGetUserCollectionList<T extends UserRelease | UserArtist> = (
  collectionName: string,
  schema: ZodSchema<any>,
) => T[];
