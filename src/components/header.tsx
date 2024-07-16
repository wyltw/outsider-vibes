import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import { headerRoutes } from "@/lib/constants";
import RouteList from "./route-list";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between">
      <Logo width={128} height={76} className="h-auto w-full max-w-[128px]" />
      <nav className="flex gap-x-4">
        <RouteList
          routes={headerRoutes}
          className="hidden items-center gap-x-4 sm:flex"
        />

        <Sheet>
          <SheetTrigger asChild>
            <Button className="sm:hidden" variant="ghost" size="icon">
              <Menu className="text-primary" />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Lorem ipsum dolor sit amet.</SheetDescription>
            </SheetHeader>
            <RouteList
              routes={headerRoutes}
              className="flex flex-col gap-y-4"
            />
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
