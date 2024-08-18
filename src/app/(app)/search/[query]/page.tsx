import SearchForm from "@/components/search-form";
import SectionHeading from "@/components/section-heading";
import React from "react";

type Props = { params: { query: string } };

export default function SearchPage({ params }: Props) {
  return (
    <>
      <SectionHeading level="h1" className="text-2xl font-medium text-primary">
        <span className="text-3xl">{decodeURIComponent(params.query)}</span>
      </SectionHeading>
    </>
  );
}
