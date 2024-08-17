import { RouteItem } from "@/lib/types";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type RouteListProps = {
  routes: RouteItem[];
  page?: "landing" | "home";
  context: "header" | "sheet" | "sidebar";
};

export default function RouteList({ routes, context, page }: RouteListProps) {
  return (
    <>
      <ul
        className={cn({
          "hidden items-center gap-x-4 sm:flex":
            page === "landing" && context === "header",
          "hidden items-center gap-x-4 md:flex":
            page === "home" && context === "header",
          "flex flex-col gap-y-4": context === "sheet",
          "self-stretch": context === "sidebar",
        })}
      >
        {routes.map((route) => (
          <li key={route.name}>
            <Button
              className={cn(
                "w-full text-base",
                context === "sidebar" && "justify-start",
              )}
              variant={route.variant}
              asChild
            >
              <Link href={route.path}>{route.name}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}
