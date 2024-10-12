"use client";

import React, { useEffect, useState } from "react";
import ErrorBlock from "../error-block";
import SearchHeader from "./search-header";
import {
  DiscogsSearchArtistsResult,
  DiscogsSearchReleasesResult,
} from "@/lib/types";
import SelectedFilter from "../selected-filter";
import PaginationControll from "../pagination-controll";
import SearchResult from "./search-result";
import { useSearchParams } from "next/navigation";
import { useResultsListContext } from "@/lib/hooks";

type SearchResultsProps = {
  searchResults: DiscogsSearchReleasesResult[] | DiscogsSearchArtistsResult[];
  genreList?: string[];
  styleList?: string[];
  resultsCount: number | undefined;
};

//對params進行操作改變url->page組件獲得更新params->params props給fetch function

export default function SearchResults({
  searchResults,
  resultsCount,
  genreList,
  styleList,
}: SearchResultsProps) {
  const { handleChangeList, sortedResultsList } = useResultsListContext();
  useEffect(() => {
    handleChangeList(searchResults);
  }, [searchResults, handleChangeList]);

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page"));
  const type = searchParams.get("type");

  return (
    <>
      <SearchHeader genreList={genreList} styleList={styleList} />
      {/* props drilling here. */}
      {type === "release" && <SelectedFilter />}
      {/* 條件渲染選中的篩選 */}
      {resultsCount !== 0 ? (
        <p className="mt-2 text-sm text-black/50">共有{resultsCount}筆結果</p>
      ) : null}
      <ul className="flex flex-col gap-y-4">
        {resultsCount === 0 ? (
          <ErrorBlock error="沒有相關的搜尋結果，建議更換搜尋關鍵字" />
        ) : null}
        {type !== "release" && type !== "artist" ? (
          <ErrorBlock error="缺少搜尋字串，請重新搜尋" />
        ) : null}
        {type === "release" &&
          sortedResultsList.map((result) => (
            //sortedResultsList從resultsList衍生計算，默認值已經是空陣列，所以型別是安全的。
            <SearchResult<"release">
              key={result.id}
              result={{
                type: "release",
                data: result as DiscogsSearchReleasesResult,
              }}
            />
          ))}
        {type === "artist" &&
          sortedResultsList.map((result) => (
            <SearchResult<"artist">
              key={result.id}
              result={{
                type: "artist",
                data: result as DiscogsSearchArtistsResult,
              }}
            />
          ))}
        {/* sortedResultsList本身的union無法被排除，為此使用斷言。
        此外最初是因為不想以帶著type屬性的物件形式作為state，在數據操作上不便，因此最終在邏輯合理的情況下使用斷言 */}
      </ul>
      <PaginationControll resultsCount={resultsCount} page={page} />
    </>
  );
}
