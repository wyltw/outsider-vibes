import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { headerRoutes } from "@/lib/constants";
import RouteList from "./route-list";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between">
      <Logo width={128} height={76} />
      <nav className="flex gap-x-4">
        <ul className="hidden items-center gap-x-4 sm:flex">
          {headerRoutes.map((route) => (
            <li key={route.name}>
              <Button variant={route.variant} size="sm" asChild>
                <Link href={route.path}>{route.name}</Link>
              </Button>
            </li>
          ))}
        </ul>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="sm:hidden" variant="ghost" size="icon">
              <Menu className="text-primary" />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <h3 className="text-lg font-semibold">Menu</h3>
              <RouteList routes={headerRoutes} />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
