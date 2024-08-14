import React, { ReactNode } from "react";

type SectionHeadingProps = {
  level: string;
  className: string;
  children: ReactNode;
};

export default function SectionHeading({
  level,
  className,
  children,
}: SectionHeadingProps) {
  const htmlTag = level;
  return <>SectionHeading</>;
}
