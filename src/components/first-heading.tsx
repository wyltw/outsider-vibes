import { cn } from "@/lib/utils";
import React from "react";

type FirstHeadingProps = {
  mainText: string;
  highlightText: string;
  className?: string;
};

export default function FirstHeading({
  mainText,
  highlightText,
  className,
}: FirstHeadingProps) {
  return (
    <h1
      className={cn(
        "text-4xl font-semibold tracking-tight sm:text-5xl",
        className,
      )}
    >
      {mainText}
      <span className="text-secondary">{highlightText}</span>
    </h1>
  );
}
