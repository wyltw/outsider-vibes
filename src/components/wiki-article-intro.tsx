import { fetchWikiArticleIntroduction } from "@/lib/utils";
import React from "react";
import CustomError from "./custom-error";

type WikiArticleIntroProps = { genre: string };

export default async function WikiArticleIntro({
  genre,
}: WikiArticleIntroProps) {
  const response = await fetchWikiArticleIntroduction(genre);
  if (!response.success) {
    return <CustomError error={response.error} />;
  }

  if (response.success) {
    const articleIntro = response.data;
    return (
      <>
        <p className="mt-1 text-lg text-black/50">{articleIntro.description}</p>
        <p className="max-w-4xl">{articleIntro.extract}</p>
      </>
    );
  }
}
