import {
  replaceWithDefaultAvatar,
  splitArtistAndAlbumTitle,
} from "@/lib/utils";
import React, { Fragment, ReactNode } from "react";
import GenreList from "../genre-list";
import { Card } from "../ui/card";
import Image from "next/image";
import { DiscogsArtistsResult, DiscogsReleasesResult } from "@/lib/types";

type SearchResultProps = {
  result:
    | { type: "release"; data: DiscogsReleasesResult }
    | { type: "artist"; data: DiscogsArtistsResult };
};

export default function SearchResult({ result }: SearchResultProps) {
  const isRelease = result.type === "release";
  const isArtist = result.type === "artist";

  if (isRelease) {
    const release = result.data;
    return (
      <>
        <CardContainer key={release.id}>
          <CardImage coverImage={release.cover_image} />
          <CardContent
            title={release.title}
            type={result.type}
            genre={release.genre}
            style={release.style}
          />
        </CardContainer>
      </>
    );
  }
  if (isArtist) {
    const artist = result.data;
    return (
      <>
        <CardContainer>
          <CardImage
            coverImage={replaceWithDefaultAvatar(artist.cover_image)}
          />
          <CardContent type={result.type} title={artist.title} />
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
  title: string;
  type: string;
  genre?: string[];
  style?: string[];
  year?: string;
};

function CardContent({
  type,
  title,
  genre = [],
  style = [],
  year = "",
}: CardContainerProps) {
  return (
    <div className="flex flex-col gap-y-2 p-2">
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
    </div>
  );
}
