import {
  DiscogsReleasesApiResponse,
  DiscogsArtistsApiResponse,
} from "@/lib/types";
import { replaceWithDefaultPicture } from "@/lib/utils";
import React, { ReactNode } from "react";
import { Card } from "./ui/card";
import CardImage from "./card-image";
import DeleteButton from "./delete-button";

type UserCollectionProps = {
  result:
    | { type: "release"; data: DiscogsReleasesApiResponse[] }
    | { type: "artist"; data: DiscogsArtistsApiResponse[] };
};

export default function UserCollection({ result }: UserCollectionProps) {
  if (result.type === "release") {
    const results = result.data;
    return (
      <CollectionItemContainer>
        {results.map((result) => (
          <CollectionItemCard
            key={result.id}
            result={{ type: "release", data: result }}
          />
        ))}
      </CollectionItemContainer>
    );
  }
  if (result.type === "artist") {
    const results = result.data;
    return (
      <CollectionItemContainer>
        {results.map((result) => (
          <CollectionItemCard
            key={result.id}
            result={{ type: "artist", data: result }}
          />
        ))}
      </CollectionItemContainer>
    );
  }
}

function CollectionItemContainer({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-x-2 gap-y-4 sm:grid-cols-2 md:grid-cols-4">
      {children}
    </div>
  );
}

function CardContainer({ children }: { children: ReactNode }) {
  return (
    <Card className="flex flex-col items-center gap-y-2 p-2">{children}</Card>
  );
}

function CardImageContainer({ children }: { children: ReactNode }) {
  return <div className="max-h-80 self-stretch sm:max-h-48">{children}</div>;
}

function FourthHeading({ children }: { children: ReactNode }) {
  return <h4 className="text-center text-xl text-primary">{children}</h4>;
}

type CollectionItemCardProps = {
  result:
    | { type: "release"; data: DiscogsReleasesApiResponse }
    | { type: "artist"; data: DiscogsArtistsApiResponse };
};

function CollectionItemCard({ result }: CollectionItemCardProps) {
  if (result.type === "release") {
    const release = result.data;
    const image = release.images ? release.images[0].uri : "";
    return (
      <CardContainer>
        <CardImageContainer>
          <CardImage
            alt="release cover"
            src={image || replaceWithDefaultPicture(image, "release")}
          />
        </CardImageContainer>
        <FourthHeading>{release.title}</FourthHeading>
        <DeleteButton documentId={release.documentId} type={result.type} />
      </CardContainer>
    );
  }
  if (result.type === "artist") {
    const artist = result.data;
    const image = artist.images ? artist.images[0].uri : "";
    return (
      <CardContainer>
        <CardImageContainer>
          <CardImage
            alt="artist cover"
            src={image || replaceWithDefaultPicture(image, "artist")}
          />
        </CardImageContainer>
        <FourthHeading>{artist.name}</FourthHeading>
        <DeleteButton documentId={artist.documentId} type={result.type} />
      </CardContainer>
    );
  }
}
