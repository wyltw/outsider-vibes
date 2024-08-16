import React from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";
import { headerRoutes } from "@/lib/constants";
import RouteList from "../route-list";
import Header from "../header";

export default function LandingHeader() {
  return (
    <>
      <Header page="landing">
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
            <RouteList routes={headerRoutes} context="sheet" />
          </SheetContent>
        </Sheet>
      </Header>
    </>
  );
}
