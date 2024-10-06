import { auth } from "@/auth";
import {
  getUserSavedItemsList,
  fetchDiscogsDataByIds,
} from "@/lib/server-utils";
import {
  UserRelease,
  DiscogsReleasesApiResponse,
  DiscogsSearchType,
  DiscogsArtistsApiResponse,
  UserArtist,
} from "@/lib/types";
import {
  userReleaseArraySchema,
  discogsReleaseSchema,
  discogsArtistSchema,
  userArtistArraySchema,
} from "@/lib/validations";
import React from "react";
import UserCollection from "./user-collection";
type UserCollectionWrapperProps = { type: DiscogsSearchType };

export default async function UserCollectionWrapper({
  type,
}: UserCollectionWrapperProps) {
  const session = await auth();
  const userId = session ? session.user?.id : "";

  if (type === "release") {
    const userSavedItems = await getUserSavedItemsList<UserRelease>(
      "userReleases",
      userReleaseArraySchema,
      "releaseId",
      userId,
    );
    const results = await fetchDiscogsDataByIds<DiscogsReleasesApiResponse>(
      "releases",
      userSavedItems,
      discogsReleaseSchema,
    );

    if (!results.success) {
      return <p className="text-black/50">{results.error}</p>;
    }

    const data = results.data;
    return <UserCollection result={{ type: "release", data }} />;
  }
  if (type === "artist") {
    const userSavedItems = await getUserSavedItemsList<UserArtist>(
      "userArtists",
      userArtistArraySchema,
      "artistId",
      userId,
    );
    const results = await fetchDiscogsDataByIds<DiscogsArtistsApiResponse>(
      "artists",
      userSavedItems,
      discogsArtistSchema,
    );

    if (!results.success) {
      return <p className="text-black/50">{results.error}</p>;
    }

    const data = results.data;
    return <UserCollection result={{ type: "artist", data }} />;
  }
  return <div>user-collection-wrapper</div>;
}
