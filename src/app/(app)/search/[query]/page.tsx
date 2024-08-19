import SearchForm from "@/components/search-form";
import SectionHeading from "@/components/section-heading";
import React from "react";

type Props = { params: { query: string } };

export default function SearchPage({ params }: Props) {
  return (
    <>
      <SectionHeading level="h1" className="text-3xl font-medium text-primary">
        {decodeURIComponent(params.query)}
      </SectionHeading>
    </>
  );
}
