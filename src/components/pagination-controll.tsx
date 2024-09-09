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

type PaginationControllProps = { page: number };

export default function PaginationControll({ page }: PaginationControllProps) {
  const { getPageSearchParams } = useUpdatedSearchParams();
  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={getPageSearchParams("previous")} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href={getPageSearchParams("next")} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
