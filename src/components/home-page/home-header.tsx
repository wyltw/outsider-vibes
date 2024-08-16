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
      <Header isLanding={false}>
        <RouteList
          routes={headerRoutes}
          ulClassName="hidden items-center gap-x-4 md:flex"
        />
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
            <SearchForm isHeaderSearchForm={false} />
            <RouteList
              routes={headerRoutes}
              ulClassName="flex flex-col gap-y-4"
            />
          </SheetContent>
        </Sheet>
      </Header>
    </>
  );
}
