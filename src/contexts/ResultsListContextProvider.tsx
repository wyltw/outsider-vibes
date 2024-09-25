"use client";

import { DiscogsResultsList, TSortType } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import React, { createContext, ReactNode, useMemo, useState } from "react";

type ResultsListContextProviderProps = { children: ReactNode };

type TResultsListContext = {
  sortedResultsList: DiscogsResultsList;
  sortBy: TSortType | string;
  handleChangeList: (resultList: DiscogsResultsList) => void;
};

export const ResultsListContext = createContext<TResultsListContext | null>(
  null,
);

export default function ResultsListContextProvider({
  children,
}: ResultsListContextProviderProps) {
  const [resultsList, setResultsList] = useState<DiscogsResultsList>([]);
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "default";
  const handleChangeList = (ResultsList: DiscogsResultsList) => {
    setResultsList(ResultsList);
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
          return titleB.localeCompare(titleA);
        }
        return 0;
      }),
    [resultsList, sortBy],
  );

  const context = {
    handleChangeList,
    sortedResultsList,
    sortBy,
  };

  return (
    <ResultsListContext.Provider value={context}>
      {children}
    </ResultsListContext.Provider>
  );
}
