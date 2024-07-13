import React, { ReactNode } from "react";

type SecondHeadingProps = { children: ReactNode };
export default function SecondHeading({ children }: SecondHeadingProps) {
  return (
    <h2 className="text-center text-4xl font-semibold text-primary">
      {children}
    </h2>
  );
}
