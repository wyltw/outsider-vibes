import { cn } from "@/lib/utils";
import React from "react";

type CopyrightProps = { className?: string };

export default function Copyright({ className }: CopyrightProps) {
  return (
    <small className={cn("text-center text-black/50", className)}>
      &copy;2024 By wyltw
    </small>
  );
}
