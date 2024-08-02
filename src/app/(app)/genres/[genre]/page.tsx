import React, { Suspense } from "react";
import { formatTitle } from "@/lib/utils";
import Loading from "./loading";
import WikiSummary from "@/components/wiki-summary";
import { fetchDiscogsDataByReleases } from "@/lib/server-utils";
import RelavantAlbums from "@/components/relavant-albums";

type GenrePageProps = { params: { genre: string } };

export default async function GenrePage({ params }: GenrePageProps) {
  const albumData = await fetchDiscogsDataByReleases(params.genre, 1, 1);
  return (
    <>
      <h1 className="text-4xl font-semibold text-primary">
        {formatTitle(params.genre)}
      </h1>
      <Suspense fallback={<Loading />}>
        <WikiSummary genre={params.genre} />
      </Suspense>
      <RelavantAlbums>
        <li></li>
        <li>hi</li>
        <li>hi</li>
        <li>hi</li>
        <li>hi</li>
        <li>hi</li>
      </RelavantAlbums>
    </>
  );
}
