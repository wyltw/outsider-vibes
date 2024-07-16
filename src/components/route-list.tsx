import { RouteItem } from "@/lib/type";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

type RouteListProps = { routes: RouteItem[]; className: string };

export default function RouteList({ routes, className }: RouteListProps) {
  return (
    <>
      <ul className={className}>
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
