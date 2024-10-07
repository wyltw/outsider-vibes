import {
  DiscogsReleasesApiResponse,
  DiscogsArtistsApiResponse,
  DiscogsSearchType,
} from "@/lib/types";
import { replaceWithDefaultPicture } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Card } from "./ui/card";

type UserCollectionProps = {
  result:
    | { type: "release"; data: DiscogsReleasesApiResponse[] }
    | { type: "artist"; data: DiscogsArtistsApiResponse[] };
};

export default function UserCollection({ result }: UserCollectionProps) {
  if (result.type === "release") {
    const results = result.data;
    return (
      <div>
        {results.map((result) => (
          <CollectionItemCard
            key={result.id}
            result={{ type: "release", data: result }}
          />
        ))}
      </div>
    );
  }
  if (result.type === "artist") {
    const results = result.data;
    return (
      <div className="flex">
        {results.map((result) => (
          <CollectionItemCard
            key={result.id}
            result={{ type: "artist", data: result }}
          />
        ))}
      </div>
    );
  }
}

type CollectionItemCardProps = {
  result:
    | { type: "release"; data: DiscogsReleasesApiResponse }
    | { type: "artist"; data: DiscogsArtistsApiResponse };
};

function CollectionItemCard({ result }: CollectionItemCardProps) {
  if (result.type === "release") {
    const release = result.data;
    return (
      <Card>
        <Image
          width={120}
          height={120}
          alt="release cover"
          src={
            release.thumb || replaceWithDefaultPicture(release.thumb, "release")
          }
        />
        <h4>{release.title}</h4>
      </Card>
    );
  }
  if (result.type === "artist") {
    const artist = result.data;
    const image = artist.images ? artist.images[0].uri : "";
    return (
      <Card>
        <Image
          width={120}
          height={120}
          alt="release cover"
          src={image || replaceWithDefaultPicture(image, "artist")}
        />
        <h4>{artist.name}</h4>
      </Card>
    );
  }
}
