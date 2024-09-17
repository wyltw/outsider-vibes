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
import {
  DEFAULT_PAGE,
  DEFAULT_PERPAGE,
  DISCOGS_PAGES_LIMIT,
} from "@/lib/constants";
import { getPageArray } from "@/lib/utils";
type PaginationControllProps = {
  resultsCount: number | undefined;
  page: number;
};

export default function PaginationControll({
  page,
  resultsCount = 0,
}: PaginationControllProps) {
  const siblingCount = 3;
  const totalPage =
    Math.ceil(resultsCount / DEFAULT_PERPAGE) > DISCOGS_PAGES_LIMIT
      ? DISCOGS_PAGES_LIMIT
      : Math.ceil(resultsCount / DEFAULT_PERPAGE);
  const { getSwitchedPageParams, getPageParams } = useUpdatedSearchParams();
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
            <PaginationLink
              isActive={page === DEFAULT_PAGE}
              href={getPageParams(DEFAULT_PAGE)}
            >
              {DEFAULT_PAGE}
            </PaginationLink>
          </PaginationItem>
        )}
        {page - DEFAULT_PAGE > siblingCount && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {getPageArray(page, siblingCount, totalPage).map((currentPage) => (
          <PaginationItem key={currentPage}>
            <PaginationLink
              isActive={currentPage === page}
              href={getPageParams(currentPage)}
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPage - page > siblingCount && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page <= totalPage && (
          <PaginationItem>
            <PaginationLink
              isActive={page === totalPage}
              href={getPageParams(totalPage)}
            >
              {totalPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {page < totalPage && (
          <PaginationItem>
            <PaginationNext href={getSwitchedPageParams("next")} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
