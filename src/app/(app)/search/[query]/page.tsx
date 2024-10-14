import SearchResultsWrapper from "@/components/search-page/search-results-wrapper";
import SpinnerLoading from "@/components/spinner-loading";
import { DiscogsSearchType } from "@/lib/types";
import React, { Suspense } from "react";

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
      <Suspense fallback={<SpinnerLoading />}>
        <SearchResultsWrapper
          query={params.query}
          searchParams={searchParams}
        />
      </Suspense>
    </section>
  );
}
