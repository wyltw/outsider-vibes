"use client";

import { DiscogsResultsList, TSortType } from "@/lib/types";
import React, { createContext, ReactNode, useMemo, useState } from "react";

type ResultsListContextProviderProps = { children: ReactNode };

type TResultsListContext = {
  sortedResultsList: DiscogsResultsList;
  sortBy: TSortType;
  handleChangeList: (resultList: DiscogsResultsList) => void;
  handleChangeSortBy: (sortBy: TSortType) => void;
};

export const ResultsListContext = createContext<TResultsListContext | null>(
  null,
);

export default function ResultsListContextProvider({
  children,
}: ResultsListContextProviderProps) {
  const [resultsList, setResultsList] = useState<DiscogsResultsList>([]);
  const [sortBy, setSortBy] = useState<TSortType>("default");

  const handleChangeList = (ResultsList: DiscogsResultsList) => {
    setResultsList(ResultsList);
  };
  const handleChangeSortBy = (sortBy: TSortType) => {
    setSortBy(sortBy);
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

  return (
    <ResultsListContext.Provider
      value={{
        handleChangeList,
        handleChangeSortBy,
        sortedResultsList,
        sortBy,
      }}
    >
      {children}
    </ResultsListContext.Provider>
  );
}
