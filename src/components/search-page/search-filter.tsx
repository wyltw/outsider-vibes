"use client";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import React, { ReactNode, RefObject, useRef } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useUpdatedSearchParams } from "@/lib/hooks";

type SearchFilterProps = { genreList: string[]; styleList: string[] };

export default function SearchFilter({
  genreList,
  styleList,
}: SearchFilterProps) {
  const { getFilterSearchParams } = useUpdatedSearchParams();
  return (
    <>
      <Collapsible className="border-b py-2">
        <CollapsibleTrigger asChild>
          <Button variant={"ghost"} size={"sm"} className="gap-x-2">
            <SlidersHorizontal />
            <span className="text-base text-primary">篩選條件</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-3 rounded-md bg-white py-4 shadow">
          <Filter text="流派：">
            {genreList.map((genre, index) => (
              <PillButton key={genre + index}>
                <Link href={getFilterSearchParams("genre", genre)}>
                  {genre}
                </Link>
              </PillButton>
            ))}
          </Filter>
          <Filter text="風格：">
            {styleList.map((style, index) => (
              <PillButton key={style + index}>
                <Link href={getFilterSearchParams("style", style)}>
                  {style}
                </Link>
              </PillButton>
            ))}
          </Filter>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}

type FilterProps = { children: ReactNode; text: string };

function Filter({ children, text }: FilterProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const handleScroll = (
    ref: RefObject<HTMLDivElement>,
    scrollOffset: number,
    direction: "left" | "right",
  ) => {
    if (!ref.current) {
      return;
    }
    if (direction === "left") {
      ref.current.scrollLeft -= scrollOffset;
    } else if (direction === "right") {
      ref.current.scrollLeft += scrollOffset;
    }
  };
  return (
    <div className="ms-3 text-primary">
      <p className="mb-2 whitespace-nowrap">{text}</p>
      <div className="flex">
        <Button
          onClick={() => handleScroll(divRef, 50, "left")}
          size={"icon"}
          variant={"ghost"}
        >
          <ChevronLeft />
        </Button>
        <div
          ref={divRef}
          className="feather-edge flex justify-start gap-x-2 overflow-x-auto scroll-smooth py-2"
        >
          {children}
        </div>
        <Button
          onClick={() => handleScroll(divRef, 50, "right")}
          size={"icon"}
          variant={"ghost"}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

function PillButton({ children }: { children: ReactNode }) {
  return (
    <Button asChild className="h-7 rounded-full" size="sm" variant="outline">
      {children}
    </Button>
  );
}
