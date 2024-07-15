import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type LogoProps = { width: number; height: number; className?: string };

export default function Logo({ width, height, className }: LogoProps) {
  return (
    <Link href="/">
      <Image
        src="/images/brand.svg"
        alt="Logo"
        width={width}
        height={height}
        className={cn("h-auto", className)}
      />
    </Link>
  );
}
