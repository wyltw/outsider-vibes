import React, { createElement, ReactNode } from "react";

type HeadingProps = {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className: string;
  children: ReactNode;
};

export default function Heading({
  level,
  className,
  children,
}: HeadingProps): React.ReactElement {
  return createElement(level, { className: className }, children);
}
