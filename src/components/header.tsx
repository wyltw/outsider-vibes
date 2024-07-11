import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between py-2">
      <Logo width={128} height={76} />
      <nav className="flex items-center gap-x-6">
        <ul>
          <li>
            <Link
              className="text-primary hover:bg-primary-50/20 flex h-9 items-center rounded-md px-3 transition"
              href="./home"
            >
              Home
            </Link>
          </li>
        </ul>
        <Button size="sm">Sign Up</Button>
      </nav>
    </header>
  );
}
