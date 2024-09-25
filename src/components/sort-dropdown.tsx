"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { ArrowDownUp } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useResultsListContext, useUpdatedSearchParams } from "@/lib/hooks";
import { TSortType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type TDropdownItemList = { text: string; value: TSortType };
const dropdownItemList: TDropdownItemList[] = [
  { text: "按默認排序", value: "default" },
  { text: "按年份排序", value: "year" },
  { text: "按字母排序", value: "title" },
];

export default function SortDropdown() {
  const { sortBy } = useResultsListContext();
  const searchParams = useSearchParams();
  const { getSortBySearchParams } = useUpdatedSearchParams();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"sm"} className="gap-x-2">
          <ArrowDownUp />
          <span className="text-base text-primary">排序方式</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup>
          {dropdownItemList.map((item) => {
            if (
              searchParams.get("type") === "artist" &&
              item.value === "year"
            ) {
              return null;
            }
            //排除搜尋類別為藝人時的年份篩選
            return (
              <DropdownMenuRadioItem
                className={cn(sortBy === item.value && "bg-primary-50/30")}
                key={item.text}
                value={sortBy}
              >
                <Link href={getSortBySearchParams(item.value)}>
                  {item.text}
                </Link>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
