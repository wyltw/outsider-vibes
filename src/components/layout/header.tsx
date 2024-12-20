import React from "react";
import Logo from "../logo";
import { cn } from "@/lib/utils";
import SearchForm from "../search-page/search-form";
import RouteList from "../route-list";
import { headerRoutes } from "@/lib/constants";
import SheetContainer from "./sheet-container";
import SignIn from "../sign-in";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import UserAvatar from "../collection-page/user-avatar";
import { auth } from "@/auth";
import ProtectedButton from "../protected-button";

type HeaderProps = {
  page: "landing" | "home";
};

export default async function Header({ page }: HeaderProps) {
  let userData;
  const session = await auth();
  if (session?.user) {
    userData = session.user;
  }
  return (
    <header
      className={
        page === "landing" ? "bg--landing" : "sticky top-0 z-50 bg-white"
      }
    >
      <div
        className={cn(
          "flex h-20 items-center justify-between gap-x-2",
          page === "landing" && "container",
          page === "home" && "px-8 shadow",
        )}
      >
        <Logo width={128} height={76} />
        <div className="flex flex-1 justify-end gap-x-4">
          {page === "home" && <SearchForm context="header" />}
          <nav className="flex gap-x-4">
            <RouteList page={page} routes={headerRoutes} context="header" />
            {page === "landing" ? (
              <SignIn context="header" page="landing" />
            ) : (
              <SignIn context="header" />
            )}
            <SheetContainer page={page} />
            <DropdownMenu>
              <DropdownMenuTrigger className="lg:hidden" asChild>
                <Button variant={"ghost"} size={"icon"}>
                  <User />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col items-center">
                <UserAvatar width={48} height={48} context="header" />
                {userData && (
                  <p className="mt-2 text-center text-sm text-black/50">
                    {userData.name}
                  </p>
                )}
                <DropdownMenuSeparator className="self-stretch" />
                <div className="w-full space-y-2">
                  <ProtectedButton
                    url="/user-collection"
                    isDisabled={userData ? false : true}
                  >
                    查看收藏
                  </ProtectedButton>
                  {page === "landing" ? (
                    <SignIn context="dropdown" page="landing" />
                  ) : (
                    <SignIn context="dropdown" />
                  )}
                  {!userData ? (
                    <p className="text-center text-sm text-black/50">
                      登入以添加收藏
                    </p>
                  ) : null}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
