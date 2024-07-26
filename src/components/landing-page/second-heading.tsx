import React, { ReactNode } from "react";

type SecondHeadingProps = { children: ReactNode };
export default function SecondHeading({ children }: SecondHeadingProps) {
  return (
    <h2 className="text-center text-3xl font-semibold text-primary sm:text-4xl">
      {children}
    </h2>
  );
}
