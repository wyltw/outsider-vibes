"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { searchTabs } from "@/lib/constants";

import SortDropdown from "../sort-dropdown";
import SearchFilter from "./search-filter";
import { DiscogsArtistsResult, DiscogsReleasesResult } from "@/lib/types";

type SearchHeaderProps = {
  genreList?: string[];
  styleList?: string[];
  results?: DiscogsReleasesResult[] | DiscogsArtistsResult[];
};

export default function SearchHeader({
  genreList = [],
  styleList = [],
}: SearchHeaderProps) {
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
          <SortDropdown />
        </div>
        {type === "release" && (
          <SearchFilter genreList={genreList} styleList={styleList} />
        )}
        {/* props drilling here. */}
      </section>
    </>
  );
}
