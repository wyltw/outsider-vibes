import { RouteItem } from "@/lib/types";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type RouteListProps = {
  routes: RouteItem[];
  context: "header" | "sheet" | "sidebar";
};

export default function RouteList({ routes, context }: RouteListProps) {
  return (
    <>
      <ul
        className={cn(
          context === "header" && "hidden items-center gap-x-4 md:flex",
          context === "sheet" && "flex flex-col gap-y-4",
          context == "sidebar" && "self-stretch",
        )}
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
