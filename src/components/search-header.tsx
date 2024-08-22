"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { searchTabs } from "@/lib/constants";

export default function SearchHeader() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return (
    <>
      <div className="flex justify-between border-b">
        <section className="flex gap-x-4">
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
        </section>
      </div>
    </>
  );
}
