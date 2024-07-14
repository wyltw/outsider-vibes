import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { Button } from "./ui/button";
import { routes } from "@/lib/constants";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between py-2">
      <Logo width={128} height={76} />
      <nav>
        <ul className="flex items-center gap-x-4">
          {routes.map((route) => (
            <li key={route.name}>
              <Button variant={route.variant} size="sm" asChild>
                <Link href={route.path}>{route.name}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
