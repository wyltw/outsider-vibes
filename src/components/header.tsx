import React, { ReactNode } from "react";
import Logo from "./logo";
import { cn } from "@/lib/utils";
import SearchForm from "./search-form";

type HeaderProps = {
  children: ReactNode;
  page: "landing" | "home";
};

export default function Header({ children, page }: HeaderProps) {
  return (
    <header
      className={page === "landing" ? "bg--landing" : "sticky top-0 bg-white"}
    >
      <div
        className={cn(
          "flex h-20 items-center justify-between",
          page === "landing" && "container",
          page === "home" && "px-8 shadow",
        )}
      >
        <Logo width={128} height={76} />
        <div className="flex flex-1 justify-end gap-x-4">
          {page === "home" && <SearchForm context="home" />}
          <nav className="flex gap-x-4">{children}</nav>
        </div>
      </div>
    </header>
  );
}
