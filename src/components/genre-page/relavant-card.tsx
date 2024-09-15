import React, { Fragment, ReactNode } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { DiscogsReleasesResult, DiscogsArtistsResult } from "@/lib/types";
import {
  replaceWithDefaultPicture,
  splitArtistAndAlbumTitle,
} from "@/lib/utils";
import GenreList from "../genre-list";

type RelavantCardProps = {
  result:
    | { type: "release"; data: DiscogsReleasesResult }
    | { type: "artist"; data: DiscogsArtistsResult };
};
export default function RelavantCard({ result }: RelavantCardProps) {
  const isRelease = result.type === "release";
  const isArtist = result.type === "artist";
  //判斷傳入的是哪一種discogs類型查詢
  if (isRelease) {
    const release = result.data;
    return (
      <>
        <CardContainer>
          <CardImage
            coverImage={replaceWithDefaultPicture(
              release.cover_image,
              result.type,
            )}
          />
          <CardContent
            type={result.type}
            title={release.title}
            genre={release.genre}
            style={release.style}
            year={release.year}
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
            coverImage={replaceWithDefaultPicture(
              artist.cover_image,
              result.type,
            )}
          />
          <CardContent type={result.type} title={artist.title} />
        </CardContainer>
      </>
    );
  }
}

function CardContainer({ children }: { children: ReactNode }) {
  return (
    <Card className="mx-auto flex h-full max-w-64 flex-col items-center gap-y-2 bg-white p-2 shadow sm:mx-0 sm:max-w-none">
      {children}
    </Card>
  );
}

function CardImage({ coverImage }: { coverImage: string }) {
  return (
    <Image
      className="h-48 w-48 max-w-full object-cover"
      src={coverImage}
      alt="release cover"
      width={192}
      height={192}
    />
  );
}

type CardContentProps = {
  type: string;
  title: string;
  style?: string[];
  genre?: string[];
  year?: string;
};

function CardContent({
  type,
  title,
  genre = [],
  style = [],
  year = "",
}: CardContentProps) {
  return (
    <div className="flex flex-1 flex-col gap-y-2 self-start">
      <h4 className="font-medium text-primary">
        {splitArtistAndAlbumTitle(title).map(([albumName, artist], i) => (
          <Fragment key={albumName + artist + i}>
            <span className="block">{albumName}</span>
            <span className="block">{artist}</span>
          </Fragment>
        ))}
      </h4>

      {type === "release" && (
        //根據傳入的type決定是否渲染genre和style等資訊
        <>
          <div>
            <GenreList list={genre} listType="genre" />
            <GenreList list={style} listType="style" />
          </div>
          <p className="mt-auto">{year}</p>
        </>
      )}
    </div>
  );
}
