import WikiArticleIntro from "@/components/wiki-article-intro";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./fallback";
import { formatTitle } from "@/lib/utils";

type GenrePageProps = { params: { genre: string } };

export default async function GenrePage({ params }: GenrePageProps) {
  return (
    <>
      <h1 className="mt-4 text-4xl font-semibold text-primary">
        {formatTitle(params.genre)}
      </h1>

      <ErrorBoundary FallbackComponent={Fallback}>
        <WikiArticleIntro genre={params.genre} />
      </ErrorBoundary>
    </>
  );
}
