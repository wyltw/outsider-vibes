"use client";

import { DiscogsSearchResultsList, TSortType } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import React, { createContext, ReactNode, useMemo, useState } from "react";

type ResultsListContextProviderProps = { children: ReactNode };

type TResultsListContext = {
  sortedResultsList: DiscogsSearchResultsList;
  sortBy: TSortType | string;
  handleSetList: (resultList: DiscogsSearchResultsList) => void;
};

export const ResultsListContext = createContext<TResultsListContext | null>(
  null,
);

export default function ResultsListContextProvider({
  children,
}: ResultsListContextProviderProps) {
  const [resultsList, setResultsList] = useState<DiscogsSearchResultsList>([]);
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "default";
  const handleSetList = (resultsList: DiscogsSearchResultsList) => {
    setResultsList(resultsList);
  };

  const sortedResultsList = useMemo(
    //return here isn't strict enough.
    () =>
      [...resultsList].sort((a, b) => {
        if (sortBy === "year" && "year" in a) {
          const yearA = "year" in a ? Number(a.year) : 0;
          const yearB = "year" in b ? Number(b.year) : 0;
          return yearA - yearB;
        } else if (sortBy === "title") {
          const titleA = a.title.toUpperCase();
          const titleB = b.title.toUpperCase();
          return titleA.localeCompare(titleB);
        }
        return 0;
      }),
    [resultsList, sortBy],
  );

  const context = {
    handleSetList,
    sortedResultsList,
    sortBy,
  };

  return (
    <ResultsListContext.Provider value={context}>
      {children}
    </ResultsListContext.Provider>
  );
}
