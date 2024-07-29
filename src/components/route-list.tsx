import { RouteItem } from "@/lib/types";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

type RouteListProps = {
  routes: RouteItem[];
  ulClassName?: string;
  buttonClassName?: string;
};

export default function RouteList({
  routes,
  ulClassName,
  buttonClassName,
}: RouteListProps) {
  return (
    <>
      <ul className={ulClassName}>
        {routes.map((route) => (
          <li key={route.name}>
            <Button
              className={`w-full text-base ${buttonClassName}`}
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
