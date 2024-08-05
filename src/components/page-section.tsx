import React, { ReactNode } from "react";

type PageSectionProps = { children: ReactNode };

export default function PageSection({ children }: PageSectionProps) {
  return (
    <>
      <section className="mt-4 flex flex-col items-center py-6">
        {children}
      </section>
    </>
  );
}
