import React, { ReactNode } from "react";
import Logo from "./logo";
import { cn } from "@/lib/utils";
import SearchForm from "./search-form";

type HeaderProps = {
  children: ReactNode;
  isLanding?: boolean;
};

export default function Header({ children, isLanding = true }: HeaderProps) {
  return (
    <header className={isLanding ? "bg--landing" : "sticky top-0 bg-white"}>
      <div
        className={cn(
          "flex h-20 items-center justify-between",
          isLanding && "container",
          !isLanding && "px-8 shadow",
        )}
      >
        <Logo width={128} height={76} />
        <div className="flex flex-1 justify-end gap-x-4">
          {!isLanding && <SearchForm isHeaderSearchForm={true} />}
          <nav className="flex gap-x-4">{children}</nav>
        </div>
      </div>
    </header>
  );
}
