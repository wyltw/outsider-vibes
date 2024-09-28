import { getUserCollectionList } from "@/lib/server-utils";
import { UserRelease } from "@/lib/types";
import { userReleaseArraySchema } from "@/lib/validations";
import React from "react";

export default async function UserCollection() {
  const results = await getUserCollectionList<UserRelease>(
    "userReleases",
    userReleaseArraySchema,
    "releaseId",
  );
  return (
    <ul>
      {/* {results.map((elem) => {
        console.log(elem);
      })} */}
      <li>目前沒有任何收藏</li>
    </ul>
  );
}
