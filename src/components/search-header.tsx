"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { searchTabs } from "@/lib/constants";
import { ArrowDownUp, SlidersHorizontal } from "lucide-react";

export default function SearchHeader() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return (
    <>
      <section className="space-y-4">
        <div className="flex justify-between border-b">
          <div className="flex">
            {searchTabs.map((tab) => (
              <div key={tab.name} className="relative">
                <Button
                  className="text-base"
                  variant={tab.variant}
                  size={"default"}
                  asChild
                >
                  <Link href={tab.path}>{tab.name}</Link>
                </Button>
                {tab.path.includes(type || "") && (
                  <motion.div
                    layoutId="active-link"
                    className="absolute bottom-0 h-[2px] w-full bg-primary"
                  ></motion.div>
                )}
              </div>
            ))}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"sm"} className="gap-x-2">
                <ArrowDownUp />
                <span className="text-base text-primary">排序方式</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup>
                <DropdownMenuRadioItem value="year">
                  按年份排序
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="alphabetical">
                  按英文字母排序
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Collapsible className="border-b py-2">
          <CollapsibleTrigger asChild>
            <Button variant={"ghost"} size={"sm"} className="gap-x-2">
              <SlidersHorizontal />
              <span className="text-base text-primary">篩選條件</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            Yes. Free to use for personal and commercial projects. No
            attribution required.
          </CollapsibleContent>
        </Collapsible>
      </section>
    </>
  );
}
