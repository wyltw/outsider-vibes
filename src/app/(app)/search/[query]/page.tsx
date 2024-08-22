import SearchResults from "@/components/search-results";
import SectionHeading from "@/components/section-heading";
import React from "react";

type Props = { params: { query: string } };

export default function SearchPage({ params }: Props) {
  return (
    <section>
      <SectionHeading
        level="h1"
        className="mb-4 text-3xl font-medium text-primary"
      >
        {decodeURIComponent(params.query)}
      </SectionHeading>
      <SearchResults query={params.query}></SearchResults>
    </section>
  );
}
