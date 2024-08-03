import React, { Suspense } from "react";
import { formatTitle } from "@/lib/utils";

import WikiSummary from "@/components/wiki-summary";

import RelavantAlbums from "@/components/relavant-albums";

import TextLoading from "@/components/text-loading";
import CardLoading from "@/components/card-loading";

type GenrePageProps = { params: { genre: string } };

export default async function GenrePage({ params }: GenrePageProps) {
  return (
    <>
      <h1 className="text-4xl font-semibold text-primary">
        {formatTitle(params.genre)}
      </h1>
      <Suspense fallback={<TextLoading />}>
        <WikiSummary genre={params.genre} />
      </Suspense>
      <Suspense fallback={<CardLoading />}>
        <RelavantAlbums genre={params.genre}></RelavantAlbums>
      </Suspense>
    </>
  );
}
