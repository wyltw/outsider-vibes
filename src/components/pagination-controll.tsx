"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
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
import { ChevronsLeft, ChevronsRight } from "lucide-react";
type PaginationControllProps = {
  resultsCount: number | undefined;
  page: number;
};

export default function PaginationControll({
  page,
  resultsCount = 0,
}: PaginationControllProps) {
  const siblingCount = 2;
  const totalPage =
    Math.ceil(resultsCount / DEFAULT_PERPAGE) > DISCOGS_PAGES_LIMIT
      ? DISCOGS_PAGES_LIMIT
      : Math.ceil(resultsCount / DEFAULT_PERPAGE);
  const { getSwitchedPageSearchParams, getPageSearchParams } =
    useUpdatedSearchParams();
  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {page - DEFAULT_PAGE > siblingCount && (
          <PaginationItem>
            <PaginationLink
              isActive={page === DEFAULT_PAGE}
              href={getPageSearchParams(DEFAULT_PAGE)}
            >
              <ChevronsLeft />
            </PaginationLink>
          </PaginationItem>
        )}
        {/* 當前頁碼減去第一頁大於siblingCount的時候，代表頁碼陣列的渲染範圍已經不包括第一頁，如當前第四頁，陣列為[2, 3, 4, 5, 6]*/}
        {page > DEFAULT_PAGE && (
          <PaginationItem>
            <PaginationPrevious
              href={getSwitchedPageSearchParams("previous")}
            />
          </PaginationItem>
        )}

        {getPageArray(page, siblingCount, totalPage).map((currentPage) => (
          <PaginationItem key={currentPage}>
            <PaginationLink
              isActive={currentPage === page}
              href={getPageSearchParams(currentPage)}
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        ))}

        {page < totalPage && (
          <PaginationItem>
            <PaginationNext href={getSwitchedPageSearchParams("next")} />
          </PaginationItem>
        )}
        {totalPage - page > siblingCount && (
          <PaginationItem>
            <PaginationLink
              isActive={page === totalPage}
              href={getPageSearchParams(totalPage)}
            >
              <ChevronsRight />
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
