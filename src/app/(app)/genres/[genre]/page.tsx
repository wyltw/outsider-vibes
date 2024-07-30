import React, { Suspense } from "react";
import { formatTitle } from "@/lib/utils";
import Loading from "./loading";
import WikiSummary from "@/components/wiki-summary";

type GenrePageProps = { params: { genre: string } };

export default async function GenrePage({ params }: GenrePageProps) {
  return (
    <>
      <h1 className="text-4xl font-semibold text-primary">
        {formatTitle(params.genre)}
      </h1>
      <Suspense fallback={<Loading />}>
        <WikiSummary genre={params.genre} />
      </Suspense>
    </>
  );
}
