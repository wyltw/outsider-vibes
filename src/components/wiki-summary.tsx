import { sleep } from "@/lib/utils";
import React from "react";
import CustomError from "./custom-error";
import EmbarrassedIcon from "./embarrased-icon";
import { fetchWikiArticleIntroduction } from "@/lib/server-utils";

type WikiArticleIntroProps = { genre: string };

export default async function WikiSummary({ genre }: WikiArticleIntroProps) {
  await sleep(2000).then((data) => {
    console.log(data);
  });
  const result = await fetchWikiArticleIntroduction(genre);
  if (!result.success) {
    return <CustomError error={result.error} />;
  }
  const articleIntro = result.data;
  return (
    <div className="flex max-w-3xl flex-col justify-center">
      {articleIntro.description === "Topics referred to by the same term" ? (
        <div className="flex h-24 items-center gap-x-2">
          <EmbarrassedIcon />
          <p className="break-keep text-lg text-black/50">
            這個音樂類型可能比較廣泛。試試搜索特定的藝人或專輯名稱
          </p>
        </div>
      ) : (
        <>
          <p className="text-lg text-black/50">{articleIntro.description}</p>
          <p className="mt-2 leading-relaxed">{articleIntro.extract}</p>
          <p className="mt-4 self-end text-sm text-black/50">
            資料來源於維基百科
          </p>
        </>
      )}
    </div>
  );
}