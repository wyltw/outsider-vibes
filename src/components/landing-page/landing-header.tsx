import React from "react";
import Logo from "../logo";
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
      <Header className="bg__landing">
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
              <SheetTitle className="mb-4">Menu</SheetTitle>
            </SheetHeader>
            <RouteList
              routes={headerRoutes}
              className="flex flex-col gap-y-4"
            />
          </SheetContent>
        </Sheet>
      </Header>
    </>
  );
}
