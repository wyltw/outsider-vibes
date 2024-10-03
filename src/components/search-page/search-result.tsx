import {
  replaceWithDefaultPicture,
  splitArtistAndAlbumTitle,
} from "@/lib/utils";
import React, { Fragment, ReactNode } from "react";
import GenreList from "../genre-list";
import { Card } from "../ui/card";
import Image from "next/image";
import {
  DiscogsSearchArtistsResult,
  DiscogsSearchReleasesResult,
  DiscogsSearchType,
} from "@/lib/types";
import BookmarkButton from "../bookmark-button";

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
          <CardImage
            coverImage={replaceWithDefaultPicture(
              release.cover_image,
              result.type,
            )}
          />
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
          <CardImage
            coverImage={replaceWithDefaultPicture(
              artist.cover_image,
              result.type,
            )}
          />
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
  return <Card className="flex gap-x-4">{children}</Card>;
}

function CardImage({ coverImage }: { coverImage: string }) {
  return (
    <Image
      className="h-48 w-48 max-w-full rounded-s-lg object-cover"
      src={coverImage}
      alt="release cover"
      width={192}
      height={192}
    />
  );
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
            <span className="block">{albumName}</span>
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
