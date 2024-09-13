import { fetchDiscogsData } from "@/lib/server-utils";
import React from "react";
import CustomError from "../custom-error";
import ErrorBlock from "../error-block";
import SearchHeader from "./search-header";
import { getUniqueGenres } from "@/lib/utils";
import { discogsArtistsSchema, discogsReleasesSchema } from "@/lib/validations";
import {
  DiscogsArtistsApiResponse,
  DiscogsReleasesApiResponse,
  DiscogsSearchType,
} from "@/lib/types";
import SelectedFilter from "../selected-filter";
import PaginationControll from "../pagination-controll";
import SearchResult from "./search-result";

type SearchResultsProps = {
  query: string;
  searchParams: {
    genre: string;
    style: string;
    page: string;
    type: DiscogsSearchType;
  };
};
//對params進行操作改變url->page組件獲得更新params->params props給fetch function
//注意fetchDiscogsData可以透過getDiscogsApi處理一整個searchParams物件，個別傳入的record目前是保留給genre page的。

export default async function SearchResults({
  query,
  searchParams,
}: SearchResultsProps) {
  if (searchParams.type === "release") {
    const result = await fetchDiscogsData<DiscogsReleasesApiResponse>(
      query,
      searchParams,
      discogsReleasesSchema,
    );

    let resultsCount;
    if (result.success) {
      resultsCount = result.data.pagination.items;
    }

    const searchResults = result.success ? result.data.results : [];

    const genreList = getUniqueGenres(searchResults, "genre");
    const styleList = getUniqueGenres(searchResults, "style");
    //在這裡不使用early return是因為避免錯誤發生時除了錯誤沒有其他ui
    return (
      <>
        <SearchHeader genreList={genreList} styleList={styleList} />
        <SelectedFilter />
        {resultsCount !== 0 ? (
          <p className="mt-2 text-sm text-black/50">共有{resultsCount}筆結果</p>
        ) : null}
        <ul className="flex flex-col gap-y-4">
          {!result.success && <CustomError error={result.error} />}
          {resultsCount === 0 ? (
            <ErrorBlock error="沒有相關的搜尋結果，建議更換搜尋關鍵字" />
          ) : null}
          {searchResults.map((result) => (
            <SearchResult
              key={result.id}
              result={{ type: "release", data: result }}
            />
          ))}
        </ul>
        <PaginationControll
          resultsCount={resultsCount}
          page={Number(searchParams.page)}
        />
      </>
    );
  }
  if (searchParams.type === "artist") {
    const result = await fetchDiscogsData<DiscogsArtistsApiResponse>(
      query,
      searchParams,
      discogsArtistsSchema,
    );

    let resultsCount;
    if (result.success) {
      resultsCount = result.data.pagination.items;
    }

    const searchResults = result.success ? result.data.results : [];

    //在這裡不使用early return是因為避免錯誤發生時除了錯誤沒有其他ui
    return (
      <>
        <SearchHeader />
        {resultsCount !== 0 ? (
          <p className="mt-2 text-sm text-black/50">共有{resultsCount}筆結果</p>
        ) : null}
        <ul className="flex flex-col gap-y-4">
          {!result.success && <CustomError error={result.error} />}
          {resultsCount === 0 ? (
            <ErrorBlock error="沒有相關的搜尋結果，建議更換搜尋關鍵字" />
          ) : null}
          {searchResults.map((result) => (
            <SearchResult
              key={result.id}
              result={{ type: "artist", data: result }}
            />
          ))}
        </ul>
        <PaginationControll
          resultsCount={resultsCount}
          page={Number(searchParams.page)}
        />
      </>
    );
  }
}
