import React, { ReactNode } from "react";
import { Carousel, CarouselPrevious, CarouselNext } from "./ui/carousel";

type CarouselContainerProps = { children: ReactNode };

export default function CarouselContainer({
  children,
}: CarouselContainerProps) {
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
