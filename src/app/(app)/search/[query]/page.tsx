import SearchResults from "@/components/search-page/search-results";
import { DiscogsSearchType } from "@/lib/types";
import React from "react";

type SearchPageProps = {
  params: { query: string };
  searchParams: {
    type: DiscogsSearchType;
    genre: string;
    style: string;
    page: string;
  };
};

export default function SearchPage({ params, searchParams }: SearchPageProps) {
  return (
    <section>
      <h1 className="mb-4 text-4xl font-medium text-primary">
        {decodeURIComponent(params.query)}
      </h1>
      <SearchResults query={params.query} searchParams={searchParams} />
    </section>
  );
}
