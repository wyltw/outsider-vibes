import SearchResults from "@/components/search-page/search-results";
import React from "react";

type Props = { params: { query: string } };

export default function SearchPage({ params }: Props) {
  return (
    <section>
      <h1 className="mb-4 text-4xl font-medium text-primary">
        {decodeURIComponent(params.query)}
      </h1>
      <SearchResults query={params.query}></SearchResults>
    </section>
  );
}
