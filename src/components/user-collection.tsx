import {
  DiscogsReleasesApiResponse,
  DiscogsArtistsApiResponse,
} from "@/lib/types";
import { replaceWithDefaultPicture } from "@/lib/utils";
import React, { ReactNode } from "react";
import { Card } from "./ui/card";
import CardImage from "./card-image";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

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
  return <div className="flex flex-wrap gap-x-2 gap-y-4">{children}</div>;
}

function CardContainer({ children }: { children: ReactNode }) {
  return (
    <Card className="flex basis-full flex-col items-center gap-y-2 p-2 sm:basis-0">
      {children}
    </Card>
  );
}

function FourthHeading({ children }: { children: ReactNode }) {
  return (
    <h4 className="whitespace-nowrap text-center text-xl text-primary">
      {children}
    </h4>
  );
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
        <div className="h-48 max-w-48">
          <CardImage
            alt="release cover"
            src={image || replaceWithDefaultPicture(image, "release")}
          />
        </div>
        <FourthHeading>{release.title}</FourthHeading>
        <Button variant={"outline"} size={"icon"}>
          <Trash2 />
        </Button>
      </CardContainer>
    );
  }
  if (result.type === "artist") {
    const artist = result.data;
    const image = artist.images ? artist.images[0].uri : "";
    return (
      <CardContainer>
        <div className="sm: max-h-80 w-full sm:max-h-48 sm:w-auto">
          <CardImage
            alt="artist cover"
            src={image || replaceWithDefaultPicture(image, "artist")}
          />
        </div>
        <FourthHeading>{artist.name}</FourthHeading>
        <Button variant={"outline"} size={"icon"}>
          <Trash2 />
        </Button>
      </CardContainer>
    );
  }
}
