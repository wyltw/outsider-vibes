import { fetchDiscogsData } from "@/lib/server-utils";
import React from "react";
import CustomError from "../custom-error";
import ErrorBlock from "../error-block";
import SearchHeader from "./search-header";
import { getUniqueGenres } from "@/lib/utils";
import { discogsReleasesSchema } from "@/lib/validations";
import { DiscogsReleasesResult } from "@/lib/types";
import SelectedFilter from "../selected-filter";

type SearchResultsProps = {
  query: string;
  searchParams: { genre: string; style: string; type: "release" | "artist" };
};

export default async function SearchResults({
  query,
  searchParams,
}: SearchResultsProps) {
  const result = await fetchDiscogsData(
    query,
    1,
    1,
    searchParams,
    discogsReleasesSchema,
  );

  let resultsCount;
  if (result.success) {
    resultsCount = result.data.pagination.items;
  }
  const searchResults = result.success
    ? (result.data.results as DiscogsReleasesResult[])
    : [];

  const genreList = getUniqueGenres(searchResults, "genre");
  const styleList = getUniqueGenres(searchResults, "style");
  //在這裡不使用early return是因為避免錯誤發生時除了錯誤沒有其他ui
  return (
    <>
      <SearchHeader genreList={genreList} styleList={styleList} />
      <SelectedFilter />
      {resultsCount !== 0 ? (
        <span className="text-sm text-black/50">共有{resultsCount}筆結果</span>
      ) : null}
      <ul>
        {!result.success && <CustomError error={result.error} />}
        {resultsCount === 0 ? (
          <ErrorBlock error="沒有相關的搜尋結果，建議更換搜尋關鍵字" />
        ) : null}
        {searchResults.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </>
  );
}
