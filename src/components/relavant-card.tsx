import React, { ReactNode } from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import {
  DiscogsArtistsApiResponse,
  DiscogsReleasesApiResponse,
} from "@/lib/types";
import { replaceWithDefaultAvatar } from "@/lib/utils";

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
    <Card className="flex h-full flex-col items-center gap-y-2 bg-white p-2 shadow">
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
  year?: string;
};

function CardContent({ type, title, style, year }: CardContentProps) {
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
          <ul className="flex flex-wrap gap-1 text-sm text-black/50">
            {style?.map((style, i) => <span key={style + i}>{style}</span>)}
          </ul>
          <p className="mt-auto">{year}</p>
        </>
      )}
    </div>
  );
}
