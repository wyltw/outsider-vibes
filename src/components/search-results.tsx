import { fetchDiscogsDataByReleases } from "@/lib/server-utils";
import React from "react";
import CustomError from "./custom-error";
import ErrorBlock from "./error-block";
import { Button } from "./ui/button";
import Link from "next/link";
import SearchHeader from "./search-header";

type SearchSectionProps = { query: string };

export default async function SearchResults({ query }: SearchSectionProps) {
  const result = await fetchDiscogsDataByReleases(query, "release", 1, 10);
  if (!result.success) {
    return <CustomError error={result.error} />;
  }
  if (!result.data.pagination.items) {
    return <ErrorBlock error="沒有相關的搜尋結果，建議更換搜尋關鍵字" />;
  }
  const searchResults = result.data.results;
  return (
    <>
      <SearchHeader />
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </>
  );
}
