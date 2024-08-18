"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { headerRoutes } from "@/lib/constants";
import { Menu } from "lucide-react";
import RouteList from "./route-list";
import SearchForm from "./search-form";
import { Button } from "./ui/button";
import { useSheetToggleContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type SheetContainerProps = { page: "home" | "landing" };

export default function SheetContainer({ page }: SheetContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleSheet = (open: boolean) => {
    setIsOpen(open);
  };
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            className={cn(
              page === "landing" && "sm:hidden",
              page === "home" && "md:hidden",
            )}
            variant="ghost"
            size="icon"
          >
            <Menu className="text-primary" />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="mb-4">Menu</SheetTitle>
          </SheetHeader>
          {page === "landing" && (
            <RouteList page="landing" routes={headerRoutes} context="sheet" />
          )}
          {page === "home" && (
            <div className="space-y-4">
              <SearchForm context="sheet" onToggleSheet={handleToggleSheet} />
              <RouteList page="home" context="sheet" routes={headerRoutes} />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
