import React, { ReactNode } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { DiscogsReleasesResult, DiscogsArtistsResult } from "@/lib/types";
import { cn, replaceWithDefaultAvatar } from "@/lib/utils";

type RelavantCardProps = {
  data:
    | {
        type: "release";
        release: DiscogsReleasesResult;
      }
    | { type: "artist"; artist: DiscogsArtistsResult };
};
export default function RelavantCard({ data }: RelavantCardProps) {
  const isRelease = data.type === "release";
  const isArtist = data.type === "artist";
  //判斷傳入的是哪一種discogs類型查詢
  if (isRelease) {
    const release = data.release;
    return (
      <>
        <CardContainer>
          <CardImage
            coverImage={replaceWithDefaultAvatar(release.cover_image)}
          />
          <CardContent
            type={"release"}
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
    const artist = data.artist;
    return (
      <>
        <CardContainer>
          <CardImage
            coverImage={replaceWithDefaultAvatar(artist.cover_image)}
          />
          <CardContent type={"artist"} title={artist.title} />
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
        {title.split(" - ").map((part, i) => (
          <span key={part + i} className="block">
            {part}
          </span>
        ))}
      </h4>

      {type === "release" && (
        //根據傳入的type決定是否渲染genre和style等資訊
        <>
          <div>
            <List list={genre} listType="genre" />
            <List list={style} listType="style" />
          </div>
          <p className="mt-auto">{year}</p>
        </>
      )}
    </div>
  );
}

type ListProps = { listType: "style" | "genre"; list: string[] };

function List({ listType, list }: ListProps) {
  return (
    <>
      <ul
        className={cn(
          "flex flex-wrap gap-x-1 text-sm",
          listType === "style" && "text-black/50",
        )}
      >
        {list.map((item, i) => (
          <li
            className={cn("inline", listType === "style" && "leading-tight")}
            key={item + i}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
