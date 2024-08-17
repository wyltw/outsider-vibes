"use client";
import React from "react";
import Header from "../header";
import RouteList from "../route-list";
import { headerRoutes } from "@/lib/constants";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
} from "../ui/sheet";
import SearchForm from "../search-form";
import { useSheetToggleContext } from "@/lib/hooks";

export default function HomeHeader() {
  const { isOpen, handleChangeSheetToggle } = useSheetToggleContext();
  return (
    <>
      <Header page="home">
        <RouteList routes={headerRoutes} context="header" />
        <Sheet open={isOpen} onOpenChange={handleChangeSheetToggle}>
          <SheetTrigger asChild>
            <Button className="md:hidden" variant="ghost" size="icon">
              <Menu className="text-primary" />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle className="mb-4">Menu</SheetTitle>
            </SheetHeader>
            <div className="space-y-4">
              <SearchForm context="sheet" />
              <RouteList context="sheet" routes={headerRoutes} />
            </div>
          </SheetContent>
        </Sheet>
      </Header>
    </>
  );
}
