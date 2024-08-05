import React, { Suspense } from "react";
import { formatTitle } from "@/lib/utils";

import WikiSummary from "@/components/wiki-summary";

import RelavantReleases from "@/components/relavant-releases";

import TextLoading from "@/components/text-loading";
import CardLoading from "@/components/card-loading";
import RelavantAritists from "@/components/relavant-artists";

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
      <h2 className="mt-10 text-2xl font-medium text-primary">
        帶有此風格的專輯：
      </h2>
      <Suspense fallback={<CardLoading />}>
        <RelavantReleases genre={params.genre}></RelavantReleases>
      </Suspense>
      <h2 className="mt-10 text-2xl font-medium text-primary">
        帶有此風格的藝人：
      </h2>
      <Suspense fallback={<CardLoading />}>
        <RelavantAritists genre={params.genre}></RelavantAritists>
      </Suspense>
    </>
  );
}
