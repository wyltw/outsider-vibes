import { auth } from "@/auth";
import {
  fetchDiscogsDataByIds,
  getUserSavedItemsList,
} from "@/lib/server-utils";
import { DiscogsReleasesApiResponse, UserRelease } from "@/lib/types";
import {
  discogsReleaseSchema,
  userReleaseArraySchema,
} from "@/lib/validations";
import React from "react";

export default async function UserCollection() {
  const session = await auth();

  const userId = session ? session.user?.id : "";
  console.log(userId);

  const userSavedItems = await getUserSavedItemsList<UserRelease>(
    "userReleases",
    userReleaseArraySchema,
    "releaseId",
    userId,
  );
  const results = await fetchDiscogsDataByIds<DiscogsReleasesApiResponse>(
    userSavedItems,
    discogsReleaseSchema,
  );

  return (
    <ul>
      {/* {results.map((result) => {})} */}
      <li>目前沒有任何收藏</li>
    </ul>
  );
}
