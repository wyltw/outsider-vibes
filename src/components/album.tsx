import { DiscogsReleaseApiResponse } from "@/lib/types";
import Image from "next/image";
import React from "react";
import { Card } from "./ui/card";

type AlbumProps = {
  album: DiscogsReleaseApiResponse["results"][0];
};

export default async function Album({ album }: AlbumProps) {
  return (
    <>
      <Card className="flex h-full flex-col items-center gap-y-2 bg-white p-2 shadow">
        <div className="h-40 w-40">
          <Image
            className="object-contain"
            src={album.cover_image}
            alt="album cover"
            width={156}
            height={156}
          />
        </div>

        <div className="flex flex-1 flex-col gap-y-2 self-start">
          <h4 className="text-lg font-medium text-primary">
            {album.title.split(" - ").map((part) => (
              <span key={part} className="block">
                {part}
              </span>
            ))}
          </h4>

          <ul className="flex flex-wrap gap-1 text-sm text-black/50">
            {album.style.map((style) => (
              <span key={style}>{style}</span>
            ))}
          </ul>
          <p className="mt-auto">{album.year}</p>
        </div>
      </Card>
    </>
  );
}
