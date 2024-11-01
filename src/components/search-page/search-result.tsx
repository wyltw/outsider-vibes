import {
  replaceWithDefaultPicture,
  splitArtistAndAlbumTitle,
} from "@/lib/utils";
import React, { Fragment, ReactNode } from "react";
import GenreList from "./genre-list";
import { Card } from "../ui/card";
import Image from "next/image";
import {
  DiscogsSearchArtistsResult,
  DiscogsSearchReleasesResult,
  DiscogsSearchType,
} from "@/lib/types";
import BookmarkButton from "../bookmark-button";
import CardImage from "../card-image";

type SearchResultProps<T extends DiscogsSearchType> = {
  result:
    | {
        type: T;
        data: T extends "release" ? DiscogsSearchReleasesResult : null;
      }
    | {
        type: T;
        data: T extends "artist" ? DiscogsSearchArtistsResult : null;
      };
};

export default function SearchResult<T extends DiscogsSearchType>({
  result,
}: SearchResultProps<T>) {
  const isRelease = result.type === "release";
  const isArtist = result.type === "artist";

  if (result.data && isRelease) {
    const release = result.data;
    return (
      <>
        <CardContainer key={release.id}>
          <CardImageContainer>
            <CardImage
              className="rounded-lg"
              src={replaceWithDefaultPicture(release.cover_image, result.type)}
              alt="release cover"
            />
          </CardImageContainer>
          <CardContent
            itemId={String(release.id)}
            title={release.title}
            type={result.type}
            genre={"genre" in release ? release.genre : []}
            style={"style" in release ? release.style : []}
            year={"year" in release ? release.year : ""}
          />
        </CardContainer>
      </>
    );
  }
  if (result.data && isArtist) {
    const artist = result.data;
    return (
      <>
        <CardContainer>
          <CardImageContainer>
            <CardImage
              className="rounded-lg"
              src={replaceWithDefaultPicture(artist.cover_image, result.type)}
              alt="release cover"
            />
          </CardImageContainer>
          <CardContent
            itemId={String(artist.id)}
            type={result.type}
            title={artist.title}
          />
        </CardContainer>
      </>
    );
  }
}

function CardContainer({ children }: { children: ReactNode }) {
  return (
    <Card className="flex flex-col gap-x-4 hover:shadow-md sm:flex-row">
      {children}
    </Card>
  );
}

function CardImageContainer({ children }: { children: ReactNode }) {
  return <div className="h-48 w-full sm:max-w-48">{children}</div>;
}

type CardContainerProps = {
  itemId: string;
  title: string;
  type: DiscogsSearchType;
  genre?: string[];
  style?: string[];
  year?: string;
};

function CardContent({
  itemId,
  type,
  title,
  genre = [],
  style = [],
  year = "",
}: CardContainerProps) {
  return (
    <div className="flex flex-1 flex-col gap-y-2 p-2">
      <h2 className="text-2xl text-primary">
        {splitArtistAndAlbumTitle(title).map(([albumName, artist], i) => (
          <Fragment key={albumName + artist + i}>
            <span className="block font-medium">{albumName}</span>
            <span className="block text-base text-black/50">{artist}</span>
          </Fragment>
        ))}
      </h2>
      {type === "release" && (
        <div className="text-sm">
          <GenreList list={genre} listType="genre" />
          <GenreList list={style} listType="style" />
        </div>
      )}

      <p className="mt-auto text-xl">{year}</p>
      {type === "release" ? (
        <BookmarkButton type={type} itemId={itemId} />
      ) : (
        <BookmarkButton type={type} itemId={itemId} />
      )}
    </div>
  );
}
