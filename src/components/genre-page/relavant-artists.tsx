import { fetchDiscogsDataByArtists } from "@/lib/server-utils";
import React, { ReactNode } from "react";
import CustomError from "../custom-error";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import RelavantCard from "./relavant-card";
import { sleep } from "@/lib/utils";
import ErrorBlock from "../error-block";

type RelavantAritistsProps = { genre: string };

export default async function RelavantAritists({
  genre,
}: RelavantAritistsProps) {
  await sleep(5000).then((data) => {
    console.log(data);
  });
  const result = await fetchDiscogsDataByArtists(genre, 1, 10, {
    type: "artist",
  });
  if (!result.success) {
    return <CustomError error={result.error} />;
  }
  if (!result.data.pagination.items) {
    return <ErrorBlock error="沒有相關的搜尋結果，建議更換搜尋關鍵字" />;
  }
  const artists = result.data.results;
  return (
    <CarouselContainer>
      <CarouselContent>
        {artists.map((artist) => {
          return (
            <CarouselItem key={artist.id} className="md:basis-1/3 xl:basis-1/4">
              <RelavantCard data={{ type: "artist", artist: artist }} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </CarouselContainer>
  );
}

type CarouselContainerProps = { children: ReactNode };

function CarouselContainer({ children }: CarouselContainerProps) {
  return (
    <Carousel
      className="max-w-xs md:max-w-2xl xl:max-w-4xl 2xl:max-w-5xl"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      {children}
      <CarouselPrevious className="-left-0 sm:-left-5" />
      <CarouselNext className="-right-0 sm:-right-5" />
    </Carousel>
  );
}
