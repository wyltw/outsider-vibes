import { auth } from "@/auth";
import {
  fetchDiscogsDataByIds,
  getUserSavedItemsList,
} from "@/lib/server-utils";
import {
  DiscogsArtistsApiResponse,
  DiscogsReleasesApiResponse,
  DiscogsSearchType,
  UserArtist,
  UserRelease,
} from "@/lib/types";
import {
  discogsArtistSchema,
  discogsReleaseSchema,
  userArtistArraySchema,
  userReleaseArraySchema,
} from "@/lib/validations";
import Link from "next/link";

import React, { ReactNode } from "react";
import { Button } from "./ui/button";

type UserCollectionProps = { type: DiscogsSearchType };

export default async function UserCollection({ type }: UserCollectionProps) {
  const session = await auth();
  const userId = session ? session.user?.id : "";
  if (!session?.user) {
    return <p className="text-black/50">登入後查看最新收藏</p>;
  }

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

    return (
      <>
        <CollectionContainer>
          {data.slice(0, 5).map((result) => (
            <CollectionItem key={result.id} result={result} />
          ))}
          {!data.length && <DefaultItem />}
        </CollectionContainer>
        <Button className="w-full" variant={"ghost"} asChild>
          <Link href="/">查看全部收藏</Link>
        </Button>
      </>
    );
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

    return (
      <>
        <CollectionContainer>
          {data.slice(0, 5).map((result) => (
            <CollectionItem key={result.id} result={result} />
          ))}
          {!data.length && <DefaultItem />}
        </CollectionContainer>
        <Button className="w-full" variant={"ghost"} asChild>
          <Link href="/">查看全部收藏</Link>
        </Button>
      </>
    );
  }
}

function CollectionContainer({ children }: { children: ReactNode }) {
  return (
    <>
      <ul className="flex flex-col items-center gap-y-2">{children}</ul>
    </>
  );
}

type CollectionItemProps = {
  result: DiscogsReleasesApiResponse | DiscogsArtistsApiResponse;
};

function CollectionItem({ result }: CollectionItemProps) {
  return (
    <>
      {"name" in result && <li className="text-primary">{result.name}</li>}
      {"title" in result && <li className="text-primary">{result.title}</li>}
    </>
  );
}

function DefaultItem() {
  return <li className="text-black/50">目前沒有任何收藏</li>;
}
