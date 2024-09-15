"use client";

import React from "react";
import ErrorBlock from "../error-block";
import SearchHeader from "./search-header";
import {
  DiscogsArtistsResult,
  DiscogsReleasesResult,
  DiscogsSearchType,
} from "@/lib/types";
import SelectedFilter from "../selected-filter";
import PaginationControll from "../pagination-controll";
import SearchResult from "./search-result";
import { useSearchParams } from "next/navigation";

type SearchResultsProps = {
  searchResults:
    | {
        type: "release";
        data: DiscogsReleasesResult[];
      }
    | {
        type: "artist";
        data: DiscogsArtistsResult[];
      };
  genreList?: string[];
  styleList?: string[];
  resultsCount: number | undefined;
};

//對params進行操作改變url->page組件獲得更新params->params props給fetch function
//注意fetchDiscogsData可以透過getDiscogsApi處理一整個searchParams物件，個別傳入的record目前是保留給genre page的。

export default function SearchResults({
  searchResults,
  resultsCount,
  genreList,
  styleList,
}: SearchResultsProps) {
  const searchParams = useSearchParams();
  if (searchResults.type === "release") {
    return (
      <>
        <SearchHeader
          genreList={genreList}
          styleList={styleList}
          results={searchResults.data}
        />
        <SelectedFilter />
        {resultsCount !== 0 ? (
          <p className="mt-2 text-sm text-black/50">共有{resultsCount}筆結果</p>
        ) : null}
        <ul className="flex flex-col gap-y-4">
          {resultsCount === 0 ? (
            <ErrorBlock error="沒有相關的搜尋結果，建議更換搜尋關鍵字" />
          ) : null}
          {searchResults.data.map((result) => (
            <SearchResult
              key={result.id}
              result={{ type: "release", data: result }}
            />
          ))}
        </ul>
        <PaginationControll
          resultsCount={resultsCount}
          page={Number(searchParams.get("page"))}
        />
      </>
    );
  }
  if (searchResults.type === "artist") {
    return (
      <>
        <SearchHeader
          genreList={genreList}
          styleList={styleList}
          results={searchResults.data}
        />
        {resultsCount !== 0 ? (
          <p className="mt-2 text-sm text-black/50">共有{resultsCount}筆結果</p>
        ) : null}
        <ul className="flex flex-col gap-y-4">
          {resultsCount === 0 ? (
            <ErrorBlock error="沒有相關的搜尋結果，建議更換搜尋關鍵字" />
          ) : null}
          {searchResults.data.map((result) => (
            <SearchResult
              key={result.id}
              result={{ type: "artist", data: result }}
            />
          ))}
        </ul>
        <PaginationControll
          resultsCount={resultsCount}
          page={Number(searchParams.get("page"))}
        />
      </>
    );
  }
}
