import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { SlidersHorizontal } from "lucide-react";
import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

type SearchFilterProps = { genreList: string[]; styleList: string[] };

export default function SearchFilter({
  genreList,
  styleList,
}: SearchFilterProps) {
  return (
    <>
      <Collapsible className="border-b py-2">
        <CollapsibleTrigger asChild>
          <Button variant={"ghost"} size={"sm"} className="gap-x-2">
            <SlidersHorizontal />
            <span className="text-base text-primary">篩選條件</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-2 space-y-3 rounded-md bg-white py-4 shadow">
            <Filter text="流派：">
              {genreList.map((genre) => (
                <PillButton>{genre}</PillButton>
              ))}
            </Filter>
            <Filter text="風格：">
              {styleList.map((style) => (
                <PillButton>{style}</PillButton>
              ))}
            </Filter>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}

type FilterProps = { children: ReactNode; text: string };

function Filter({ children, text }: FilterProps) {
  return (
    <div className="ms-3">
      <p className="mb-2 text-nowrap text-primary">{text} </p>
      <ScrollArea>
        <div className="flex justify-start gap-x-2 py-2">
          {children} <ScrollBar orientation="horizontal" />
        </div>
      </ScrollArea>
    </div>
  );
}

function PillButton({ children }: { children: ReactNode }) {
  return (
    <Button className="h-7 rounded-full" size="sm" variant="outline">
      {children}
    </Button>
  );
}
