import { fetchDiscogsData } from "@/lib/server-utils";
import React from "react";
import CustomError from "../custom-error";
import ErrorBlock from "../error-block";
import SearchHeader from "./search-header";
import { getUniqueGenres } from "@/lib/utils";
import { discogsReleasesSchema } from "@/lib/validations";
import { DiscogsReleasesResult } from "@/lib/types";

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
  console.log(searchResults);
  return (
    <>
      <SearchHeader genreList={genreList} styleList={styleList} />

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
