import { RouteItem } from "@/lib/type";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

type RouteListProps = { routes: RouteItem[] };

export default function RouteList({ routes }: RouteListProps) {
  return (
    <>
      <ul className="flex flex-col gap-y-4">
        {routes.map((route) => (
          <li key={route.name}>
            <Button
              className="w-full"
              variant={route.variant}
              size="sm"
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
