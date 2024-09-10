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
import { cn } from "@/lib/utils";

type PaginationControllProps = {
  resultsCount: number | undefined;
  page: number;
};

export default function PaginationControll({ page }: PaginationControllProps) {
  const { switchPageParams } = useUpdatedSearchParams();
  return (
    <section className="mt-4">
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={switchPageParams("previous")} />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink isActive={page === DEFAULT_PAGE} href={""}>
              {DEFAULT_PAGE}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href={""}>{DISCOGS_PAGES_LIMIT}</PaginationLink>
          </PaginationItem>
          {page < DISCOGS_PAGES_LIMIT && (
            <PaginationItem>
              <PaginationNext href={switchPageParams("next")} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </section>
  );
}
