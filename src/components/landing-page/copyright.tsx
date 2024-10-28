import { cn } from "@/lib/utils";
import React from "react";
import CustomLink from "../custom-link";

type CopyrightProps = { className?: string };

export default function Copyright({ className }: CopyrightProps) {
  return (
    <small className={cn("text-center text-black/50", className)}>
      &copy;2024 By
      <CustomLink href="https://github.com/wyltw"> wyltw</CustomLink>
    </small>
  );
}
