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

export default function HomeHeader() {
  return (
    <>
      <Header page="home">
        <RouteList routes={headerRoutes} context="header" />
        <Sheet>
          <SheetTrigger asChild>
            <Button className="sm:hidden" variant="ghost" size="icon">
              <Menu className="text-primary" />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle className="mb-4">Menu</SheetTitle>
            </SheetHeader>
            <SearchForm context="header" />
            <RouteList context="sheet" routes={headerRoutes} />
          </SheetContent>
        </Sheet>
      </Header>
    </>
  );
}
