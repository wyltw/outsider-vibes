import React, { createElement, ReactNode } from "react";

type SectionHeadingProps = {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className: string;
  children: ReactNode;
};

export default function SectionHeading({
  level,
  className,
  children,
}: SectionHeadingProps): React.ReactElement {
  return createElement(level, { className: className }, children);
}
