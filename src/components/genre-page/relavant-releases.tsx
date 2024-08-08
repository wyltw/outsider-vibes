import { fetchDiscogsDataByReleases } from "@/lib/server-utils";
import React from "react";
import CustomError from "../custom-error";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { sleep } from "@/lib/utils";
import PageSection from "../page-section";
import RelavantCard from "./relavant-card";
import ErrorBlock from "../error-block";

type RelavantReleasesProps = { genre: string };

export default async function RelavantReleases({
  genre,
}: RelavantReleasesProps) {
  await sleep(3000).then((data) => {
    console.log(data);
  });
  const result = await fetchDiscogsDataByReleases(genre, 1, 10);
  if (!result.success) {
    return <CustomError error={result.error} />;
  }
  if (!result.data.pagination.items) {
    return <ErrorBlock error="沒有相關的搜尋結果，建議更換搜尋關鍵字" />;
  }
  const releases = result.data.results;
  return (
    <PageSection>
      <Carousel
        className="max-w-xs md:max-w-2xl xl:max-w-4xl 2xl:max-w-5xl"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {releases.map((release) => {
            return (
              <CarouselItem
                key={release.id}
                className="md:basis-1/3 xl:basis-1/4"
              >
                <RelavantCard data={{ type: "release", release: release }} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="-left-0 sm:-left-5" />
        <CarouselNext className="-right-0 sm:-right-5" />
      </Carousel>
    </PageSection>
  );
}
