import WikiArticleIntro from "@/components/wiki-article-intro";
import React, { Suspense } from "react";
import { formatTitle, sleep } from "@/lib/utils";
import Loading from "./loading";

type GenrePageProps = { params: { genre: string } };

export default async function GenrePage({ params }: GenrePageProps) {
  return (
    <>
      <h1 className="mt-4 text-4xl font-semibold text-primary">
        {formatTitle(params.genre)}
      </h1>
      <Suspense fallback={<Loading />}>
        <WikiArticleIntro genre={params.genre} />
      </Suspense>
    </>
  );
}
