import { fetchDiscogsDataByArtists } from "@/lib/server-utils";
import React from "react";
import CustomError from "../custom-error";
import PageSection from "../page-section";
import { CarouselContent, CarouselItem } from "../ui/carousel";
import RelavantCard from "./relavant-card";
import { sleep } from "@/lib/utils";
import ErrorBlock from "../error-block";
import CarouselContainer from "../carousel-container";

type RelavantAritistsProps = { genre: string };

export default async function RelavantAritists({
  genre,
}: RelavantAritistsProps) {
  await sleep(5000).then((data) => {
    console.log(data);
  });
  const result = await fetchDiscogsDataByArtists(genre, "artist", 1, 10);
  if (!result.success) {
    return <CustomError error={result.error} />;
  }
  if (!result.data.pagination.items) {
    return <ErrorBlock error="沒有相關的搜尋結果，建議更換搜尋關鍵字" />;
  }
  const artists = result.data.results;
  return (
    <PageSection>
      <CarouselContainer>
        <CarouselContent>
          {artists.map((artist) => {
            return (
              <CarouselItem
                key={artist.id}
                className="md:basis-1/3 xl:basis-1/4"
              >
                <RelavantCard data={{ type: "artist", artist: artist }} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </CarouselContainer>
    </PageSection>
  );
}
