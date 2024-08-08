import React, { ReactNode } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import {
  DiscogsArtistsApiResponse,
  DiscogsReleasesApiResponse,
} from "@/lib/types";
import { cn, replaceWithDefaultAvatar } from "@/lib/utils";

type RelavantCardProps = {
  data:
    | {
        type: "release";
        release: DiscogsReleasesApiResponse["results"][0];
      }
    | { type: "artist"; artist: DiscogsArtistsApiResponse["results"][0] };
};
export default function RelavantCard({ data }: RelavantCardProps) {
  const isRelease = data.type === "release";
  const isArtist = data.type === "artist";
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
        <>
          <div>
            <List list={genre} />
            <List
              list={style}
              ulClassName="text-black/50"
              liClassName="leading-tight"
            />
          </div>
          <p className="mt-auto">{year}</p>
        </>
      )}
    </div>
  );
}

type ListProps = { ulClassName?: string; liClassName?: string; list: string[] };

function List({ ulClassName, liClassName, list }: ListProps) {
  return (
    <>
      <ul className={cn("flex flex-wrap gap-x-1 text-sm", ulClassName)}>
        {list.map((item, i) => (
          <li className={cn("inline", liClassName)} key={item + i}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
