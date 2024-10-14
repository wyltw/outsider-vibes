import SearchResultsWrapper from "@/components/search-page/search-results-wrapper";
import SpinnerLoading from "@/components/spinner-loading";
import { DiscogsSearchType } from "@/lib/types";
import { handleError } from "@/lib/utils";
import { searchParamsSchema } from "@/lib/validations";
import React, { Suspense } from "react";

type SearchPageProps = {
  params: { query: string };
  searchParams: {
    type: DiscogsSearchType;
    page: string;
  };
};

export default function SearchPage({ params, searchParams }: SearchPageProps) {
  const validatedSearchParams = searchParamsSchema.safeParse(searchParams);
  if (!validatedSearchParams.success) {
    throw new Error("Invalid searchParams");
  }
  return (
    <section>
      <h1 className="mb-4 text-4xl font-medium text-primary">
        {decodeURIComponent(params.query)}
      </h1>
      <Suspense
        key={params.query + searchParams.page}
        fallback={<SpinnerLoading />}
      >
        <SearchResultsWrapper
          query={params.query}
          searchParams={validatedSearchParams.data}
        />
      </Suspense>
    </section>
  );
}
