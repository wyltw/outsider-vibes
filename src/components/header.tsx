import React, { ReactNode } from "react";
import Logo from "./logo";

type HeaderProps = { children: ReactNode; className?: string };

export default function Header({ children, className }: HeaderProps) {
  return (
    <header className={className}>
      <div className="container flex h-20 items-center justify-between">
        <Logo width={128} height={76} />
        <nav className="flex gap-x-4">{children}</nav>
      </div>
    </header>
  );
}
