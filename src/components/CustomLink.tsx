import Link from "next/link";
import React, { ReactNode } from "react";

type CustomLinkProps = { children: ReactNode; href: string };

export default function CustomLink({ href, children }: CustomLinkProps) {
  return (
    <Link
      href={href}
      className="text-sm text-black/50 underline-offset-4 transition hover:text-black/100 hover:underline"
    >
      {children}
    </Link>
  );
}
