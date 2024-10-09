import React, { Fragment, ReactNode } from "react";
import { Card } from "../ui/card";
import {
  DiscogsSearchReleasesResult,
  DiscogsSearchArtistsResult,
} from "@/lib/types";
import {
  replaceWithDefaultPicture,
  splitArtistAndAlbumTitle,
} from "@/lib/utils";
import GenreList from "../genre-list";
import CardImage from "../card-image";

type RelavantCardProps = {
  result:
    | { type: "release"; data: DiscogsSearchReleasesResult }
    | { type: "artist"; data: DiscogsSearchArtistsResult };
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
          <div className="h-48 max-w-full">
            {/* 這裡顯式使用css設定寬高是因為來源圖片尺寸不統一 */}
            <CardImage
              src={replaceWithDefaultPicture(release.cover_image, result.type)}
              alt="release cover"
            />
          </div>
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
          <div className="h-48 max-w-full">
            <CardImage
              src={replaceWithDefaultPicture(artist.cover_image, result.type)}
              alt="artist cover"
            />
          </div>
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
