"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useUpdatedSearchParams } from "@/lib/hooks";
import { DEFAULT_PERPAGE, DISCOGS_PAGES_LIMIT } from "@/lib/constants";

type PaginationControllProps = {
  resultsCount: number | undefined;
  page: number;
};

export default function PaginationControll({ page }: PaginationControllProps) {
  const { getPageSearchParams } = useUpdatedSearchParams();
  return (
    <>
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={getPageSearchParams("previous")} />
            </PaginationItem>
          )}

          {Array.from({ length: 4 }).map((_, index) => (
            <PaginationItem>
              <PaginationLink href={getPageSearchParams(_, index)}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href={""}>{DISCOGS_PAGES_LIMIT}</PaginationLink>
          </PaginationItem>
          {page < DISCOGS_PAGES_LIMIT && (
            <PaginationItem>
              <PaginationNext href={getPageSearchParams("next")} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}
