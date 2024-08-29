import { fetchDiscogsDataByReleases, getDiscogsAPI } from "@/lib/server-utils";
import React from "react";
import CustomError from "../custom-error";
import ErrorBlock from "../error-block";
import SearchHeader from "./search-header";
import { getUniqueGenres } from "@/lib/utils";

type SearchResultsProps = {
  query: string;
  searchParams: { genre: string; style: string };
};

export default async function SearchResults({
  query,
  searchParams,
}: SearchResultsProps) {
  const result = await fetchDiscogsDataByReleases(query, 1, 10, searchParams);
  if (!result.success) {
    return <CustomError error={result.error} />;
  }
  if (!result.data.pagination.items) {
    return <ErrorBlock error="沒有相關的搜尋結果，建議更換搜尋關鍵字" />;
  }
  const searchResults = result.data.results;

  const genreList = getUniqueGenres(searchResults, "genre");
  const styleList = getUniqueGenres(searchResults, "style");
  return (
    <>
      <SearchHeader genreList={genreList} styleList={styleList} />
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </>
  );
}
