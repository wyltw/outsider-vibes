import { fetchDiscogsData } from "@/lib/server-utils";
import React, { Fragment } from "react";
import CustomError from "../custom-error";
import ErrorBlock from "../error-block";
import SearchHeader from "./search-header";
import { getUniqueGenres, splitArtistAndAlbumTitle } from "@/lib/utils";
import { discogsReleasesSchema } from "@/lib/validations";
import { DiscogsReleasesResult } from "@/lib/types";
import SelectedFilter from "../selected-filter";
import { Card, CardTitle } from "../ui/card";
import Image from "next/image";
import GenreList from "../genre-list";

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
    10,
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
      <ul className="flex flex-col gap-y-4">
        {!result.success && <CustomError error={result.error} />}
        {resultsCount === 0 ? (
          <ErrorBlock error="沒有相關的搜尋結果，建議更換搜尋關鍵字" />
        ) : null}
        {searchResults.map((result) => (
          <Card className="flex gap-x-4" key={result.id}>
            <div className="h-48 w-48 rounded-s-lg">
              <Image
                className="object-cover"
                width={192}
                height={192}
                src={result.cover_image}
                alt="album cover"
              />
            </div>
            <div className="flex flex-col p-2">
              <h2 className="text-2xl text-primary">
                {splitArtistAndAlbumTitle(result.title).map(
                  ([albumName, artist], i) => (
                    <Fragment key={albumName + artist + i}>
                      <span className="block">{albumName}</span>
                      <span className="block text-sm text-black/50">
                        {artist}
                      </span>
                    </Fragment>
                  ),
                )}
              </h2>
              <div>
                <GenreList list={result.genre} listType="genre" />
                <GenreList list={result.style} listType="style" />
              </div>
            </div>
          </Card>
        ))}
      </ul>
    </>
  );
}
