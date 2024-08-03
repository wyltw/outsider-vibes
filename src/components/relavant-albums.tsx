import { fetchDiscogsDataByReleases } from "@/lib/server-utils";
import React from "react";
import CustomError from "./custom-error";
import Album from "./album";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { sleep } from "@/lib/utils";

type RelavantAlbumsProps = { genre: string };

export default async function RelavantAlbums({ genre }: RelavantAlbumsProps) {
  await sleep(5000).then((data) => {
    console.log(data);
  });
  const result = await fetchDiscogsDataByReleases(genre, 1, 10);
  if (!result.success) {
    return <CustomError error={result.error} />;
  }
  const albums = result.data.results;
  return (
    <section className="flex flex-col items-center gap-y-6">
      <h2 className="self-start text-2xl text-primary">帶有此風格的專輯：</h2>
      <Carousel
        className="max-w-xs md:max-w-2xl xl:max-w-4xl 2xl:max-w-5xl"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {albums.map((album) => {
            return (
              <CarouselItem
                key={album.id}
                className="md:basis-1/3 xl:basis-1/4"
              >
                <Album album={album} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
