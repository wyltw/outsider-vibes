import { fetchWikiArticleIntroduction, sleep } from "@/lib/utils";
import React from "react";
import CustomError from "./custom-error";

type WikiArticleIntroProps = { genre: string };

export default async function WikiArticleIntro({
  genre,
}: WikiArticleIntroProps) {
  await sleep(2000).then((data) => {
    console.log(data);
  });

  const response = await fetchWikiArticleIntroduction(genre);
  if (!response.success) {
    return <CustomError error={response.error} />;
  }

  if (response.success) {
    const articleIntro = response.data;
    return (
      <div className="flex max-w-3xl flex-col justify-center">
        <p className="text-lg text-black/50">{articleIntro.description}</p>
        <p className="mt-2">{articleIntro.extract}</p>
        <p className="mt-4 self-end text-sm text-black/50">
          資料來源於維基百科
        </p>
      </div>
    );
  }
}
