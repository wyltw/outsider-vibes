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
import { DEFAULT_PAGE, DISCOGS_PAGES_LIMIT } from "@/lib/constants";
import next from "next";

type PaginationControllProps = {
  resultsCount: number | undefined;
  page: number;
};

export default function PaginationControll({ page }: PaginationControllProps) {
  const siblingCount = 3;
  const getPageArray = (currentPage: number, count: number) => {
    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;
    let pageArray = [];
    if (currentPage - count === DEFAULT_PAGE) {
      for (let i = count; i > DEFAULT_PAGE; i--) {
        pageArray.push(i);
      }
      return pageArray;
    }
    if (currentPage + count === DISCOGS_PAGES_LIMIT) {
      for (let i = currentPage; i < DISCOGS_PAGES_LIMIT; i++) {
        pageArray.push(i);
      }
      return pageArray;
    }
    return (pageArray = [previousPage, currentPage, nextPage]);
  };
  const { getSwitchedPageParams } = useUpdatedSearchParams();
  return (
    <section className="mt-4">
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={getSwitchedPageParams("previous")} />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink isActive={page === DEFAULT_PAGE} href={""}>
              {DEFAULT_PAGE}
            </PaginationLink>
          </PaginationItem>
          {page - DEFAULT_PAGE > siblingCount && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {getPageArray(page, siblingCount).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink href={""}>{page}</PaginationLink>
            </PaginationItem>
          ))}
          {DISCOGS_PAGES_LIMIT - page > siblingCount && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink isActive={page === DISCOGS_PAGES_LIMIT} href={""}>
              {DISCOGS_PAGES_LIMIT}
            </PaginationLink>
          </PaginationItem>
          {page < DISCOGS_PAGES_LIMIT && (
            <PaginationItem>
              <PaginationNext href={getSwitchedPageParams("next")} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </section>
  );
}
