import { fetchDiscogsData } from "@/lib/server-utils";
import {
  DiscogsArtistsApiResponse,
  DiscogsReleasesApiResponse,
  DiscogsSearchType,
} from "@/lib/types";
import { getUniqueGenres } from "@/lib/utils";
import { discogsArtistsSchema, discogsReleasesSchema } from "@/lib/validations";
import React from "react";
import SearchResults from "./search-results";
import CustomError from "../custom-error";

type SearchResultsWrapperProps = {
  query: string;
  searchParams: {
    genre: string;
    style: string;
    page: string;
    type: DiscogsSearchType;
  };
};

export default async function SearchResultsWrapper({
  query,
  searchParams,
}: SearchResultsWrapperProps) {
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

    return !result.success ? (
      <CustomError error={result.error} />
    ) : (
      <SearchResults<"release">
        searchResults={searchResults}
        genreList={genreList}
        styleList={styleList}
        resultsCount={resultsCount}
      />
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
    return !result.success ? (
      <CustomError error={result.error} />
    ) : (
      <SearchResults<"artist">
        searchResults={searchResults}
        resultsCount={resultsCount}
      />
    );
  }
}
