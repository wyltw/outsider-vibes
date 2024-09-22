"use client";

import React, { useState } from "react";
import ErrorBlock from "../error-block";
import SearchHeader from "./search-header";
import { DiscogsArtistsResult, DiscogsReleasesResult } from "@/lib/types";
import SelectedFilter from "../selected-filter";
import PaginationControll from "../pagination-controll";
import SearchResult from "./search-result";
import { useSearchParams } from "next/navigation";
import { useResultsListContext } from "@/lib/hooks";

type SearchResultsProps<T> = {
  searchResults: T extends "release"
    ? DiscogsReleasesResult[]
    : DiscogsArtistsResult[];
  genreList?: string[];
  styleList?: string[];
  resultsCount: number | undefined;
};

//對params進行操作改變url->page組件獲得更新params->params props給fetch function
//注意fetchDiscogsData可以透過getDiscogsApi處理一整個searchParams物件，個別傳入的record目前是保留給genre page的。

export default function SearchResults<T>({
  searchResults,
  resultsCount,
  genreList,
  styleList,
}: SearchResultsProps<T>) {
  const { handleChangeList, sortedResultsList } = useResultsListContext();
  handleChangeList(searchResults);

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page"));
  const type = searchParams.get("type");

  return (
    <>
      <SearchHeader
        genreList={genreList}
        styleList={styleList}
        results={searchResults}
      />
      {type === "release" && <SelectedFilter />}
      {resultsCount !== 0 ? (
        <p className="mt-2 text-sm text-black/50">共有{resultsCount}筆結果</p>
      ) : null}
      <ul className="flex flex-col gap-y-4">
        {resultsCount === 0 ? (
          <ErrorBlock error="沒有相關的搜尋結果，建議更換搜尋關鍵字" />
        ) : null}
        {!type && <ErrorBlock error="缺少搜尋字串，請重新搜尋" />}
        {type === "release" &&
          sortedResultsList.map((result) => (
            <SearchResult<"release">
              key={result.id}
              result={{
                type: "release",
                data: result as DiscogsReleasesResult,
              }}
            />
          ))}
        {type === "artist" &&
          sortedResultsList.map((result) => (
            <SearchResult<"artist">
              key={result.id}
              result={{
                type: "artist",
                data: result as DiscogsArtistsResult,
              }}
            />
          ))}
      </ul>
      <PaginationControll resultsCount={resultsCount} page={page} />
    </>
  );
}
