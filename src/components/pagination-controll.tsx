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
import { Button } from "./ui/button";

type PaginationControllProps = {
  resultsCount: number | undefined;
  page: number;
};

export default function PaginationControll({ page }: PaginationControllProps) {
  const siblingCount = 3;
  const getPageArray = (currentPage: number, count: number) => {
    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;
    let pageArray: number[] = [];
    if (currentPage - count === DEFAULT_PAGE) {
      for (let i = currentPage; i > DEFAULT_PAGE; i--) {
        pageArray.push(i);
      }
      return pageArray.reverse();
    }
    if (currentPage + count === DISCOGS_PAGES_LIMIT) {
      for (let i = currentPage; i < DISCOGS_PAGES_LIMIT; i++) {
        pageArray.push(i);
      }
      return pageArray;
    }
    if (currentPage - 1 === DEFAULT_PAGE) {
      return [currentPage, nextPage];
    }
    if (currentPage + 1 === DISCOGS_PAGES_LIMIT) {
      return [previousPage, currentPage];
    }
    if (currentPage === DEFAULT_PAGE || currentPage === DISCOGS_PAGES_LIMIT) {
      return pageArray;
    }
    pageArray = [previousPage, currentPage, nextPage];
    return pageArray;
  };
  const { getSwitchedPageParams } = useUpdatedSearchParams();
  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {page > DEFAULT_PAGE && (
          <PaginationItem>
            <PaginationPrevious href={getSwitchedPageParams("previous")} />
          </PaginationItem>
        )}
        {page >= DEFAULT_PAGE && (
          <PaginationItem>
            <PaginationLink isActive={page === DEFAULT_PAGE} href={""}>
              {DEFAULT_PAGE}
            </PaginationLink>
          </PaginationItem>
        )}

        {page - DEFAULT_PAGE > siblingCount && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {getPageArray(page, siblingCount).map((currentPage) => (
          <PaginationItem key={currentPage}>
            <PaginationLink isActive={currentPage === page} href={""}>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        ))}
        {DISCOGS_PAGES_LIMIT - page > siblingCount && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page <= DISCOGS_PAGES_LIMIT && (
          <PaginationItem>
            <PaginationLink isActive={page === DISCOGS_PAGES_LIMIT} href={""}>
              {DISCOGS_PAGES_LIMIT}
            </PaginationLink>
          </PaginationItem>
        )}

        {page < DISCOGS_PAGES_LIMIT && (
          <PaginationItem>
            <PaginationNext href={getSwitchedPageParams("next")} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
