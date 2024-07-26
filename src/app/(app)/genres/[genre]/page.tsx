import { fetchWikiArticleIntroduction } from "@/lib/utils";
import React from "react";

type GenrePageProps = { params: { genre: string } };

export default async function GenrePage({ params }: GenrePageProps) {
  const articleIntro = await fetchWikiArticleIntroduction(params.genre);

  return (
    <>
      <h1 className="mt-4 text-4xl font-semibold text-primary">
        {articleIntro.title}
      </h1>
      <p className="mt-1 text-lg text-black/50">{articleIntro.description}</p>
      <p className="max-w-4xl">{articleIntro.extract}</p>
    </>
  );
}
