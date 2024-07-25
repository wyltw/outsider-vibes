import React, { ReactNode } from "react";
import Logo from "./logo";
import { cn } from "@/lib/utils";

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
        <nav className="flex gap-x-4">{children}</nav>
      </div>
    </header>
  );
}
