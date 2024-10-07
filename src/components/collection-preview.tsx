import { auth } from "@/auth";
import {
  DiscogsArtistsApiResponse,
  DiscogsReleasesApiResponse,
} from "@/lib/types";

import Link from "next/link";

import React, { ReactNode } from "react";
import { Button } from "./ui/button";

type CollectionPreviewProps = {
  result:
    | { type: "release"; data: DiscogsReleasesApiResponse[] }
    | { type: "artist"; data: DiscogsArtistsApiResponse[] };
};

export default async function CollectionPreview({
  result,
}: CollectionPreviewProps) {
  const session = await auth();
  if (!session?.user) {
    return <p className="text-black/50">登入後查看最新收藏</p>;
  }

  if (result.type === "release") {
    const { data } = result;
    return (
      <>
        <CollectionContainer>
          {data.slice(0, 5).map((result) => (
            <CollectionItem key={result.id} result={result} />
          ))}
          {!data.length && <DefaultItem />}
        </CollectionContainer>
        <Button className="w-full text-base" variant={"ghost"} asChild>
          <Link href="/user-collection">查看全部收藏</Link>
        </Button>
      </>
    );
  }

  if (result.type === "artist") {
    const { data } = result;
    return (
      <>
        <CollectionContainer>
          {data.slice(0, 5).map((result) => (
            <CollectionItem key={result.id} result={result} />
          ))}
          {!data.length && <DefaultItem />}
        </CollectionContainer>
        <Button className="w-full text-base" variant={"ghost"} asChild>
          <Link href="/user-collection">查看全部收藏</Link>
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
      {"name" in result && <li className="text-black">{result.name}</li>}
      {"title" in result && <li className="text-black">{result.title}</li>}
    </>
  );
}

function DefaultItem() {
  return <li className="text-black/50">目前沒有任何收藏</li>;
}
