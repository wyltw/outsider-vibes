"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { headerRoutes } from "@/lib/constants";
import { Menu } from "lucide-react";
import RouteList from "../route-list";
import SearchForm from "../search-page/search-form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useSheetToggleContext } from "@/lib/hooks";

type SheetContainerProps = { page: "home" | "landing" };

export default function SheetContainer({ page }: SheetContainerProps) {
  const { isOpen, handleSheetToggle } = useSheetToggleContext();
  return (
    <>
      <Sheet open={isOpen} onOpenChange={handleSheetToggle}>
        <SheetTrigger asChild>
          <Button
            className={cn(
              page === "landing" && "sm:hidden",
              page === "home" && "lg:hidden",
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
              <SearchForm context="sheet" onToggleSheet={handleSheetToggle} />
              <RouteList page="home" context="sheet" routes={headerRoutes} />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
