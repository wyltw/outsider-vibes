import { fetchDiscogsData } from "@/lib/server-utils";
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
import { discogsArtistsSchema, discogsReleasesSchema } from "@/lib/validations";
import {
  DiscogsArtistsApiResponse,
  DiscogsReleasesApiResponse,
} from "@/lib/types";

type RelavantSectionProps = { genre: string; type: "release" | "artist" };

export default async function RelavantSection({
  genre,
  type,
}: RelavantSectionProps) {
  await sleep(5000).then((data) => {
    console.log(data);
  });

  let results;
  if (type === "release") {
    const result = await fetchDiscogsData<DiscogsReleasesApiResponse>(
      genre,
      {
        type,
      },
      discogsReleasesSchema,
      1,
      10,
    );
    if (!result.success) {
      return <CustomError error={result.error} />;
    }
    if (!result.data.pagination.items) {
      return <ErrorBlock error="沒有相關的搜尋結果，建議更換搜尋關鍵字" />;
    }
    results = result.success ? result.data.results : [];
    return (
      <CarouselContainer>
        <CarouselContent>
          {results &&
            results.map((result) => {
              return (
                <CarouselItem
                  key={result.id}
                  className="md:basis-1/3 xl:basis-1/4"
                >
                  <RelavantCard data={{ type: type, result: result }} />
                </CarouselItem>
              );
            })}
        </CarouselContent>
      </CarouselContainer>
    );
  }
  if (type === "artist") {
    const result = await fetchDiscogsData<DiscogsArtistsApiResponse>(
      genre,
      {
        type,
      },
      discogsArtistsSchema,
      1,
      10,
    );
    if (!result.success) {
      return <CustomError error={result.error} />;
    }
    if (!result.data.pagination.items) {
      return <ErrorBlock error="沒有相關的搜尋結果，建議更換搜尋關鍵字" />;
    }
    results = result.success ? result.data.results : [];
    return (
      <CarouselContainer>
        <CarouselContent>
          {results &&
            results.map((result) => {
              return (
                <CarouselItem
                  key={result.id}
                  className="md:basis-1/3 xl:basis-1/4"
                >
                  <RelavantCard data={{ type: type, result: result }} />
                </CarouselItem>
              );
            })}
        </CarouselContent>
      </CarouselContainer>
    );
  }
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
