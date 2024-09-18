import { DiscogsArtistsResult, DiscogsReleasesResult } from "@/lib/types";
import React, { createContext, ReactNode, useMemo, useState } from "react";

type ResultListContextProviderProps = { children: ReactNode };

type TResultListContext = {
  handleChangeList: (
    resultList: DiscogsReleasesResult[] | DiscogsArtistsResult[],
  ) => void;
  handleChangeSortby: (sortBy: TSortType) => void;
};

type TSortType = "default" | "year" | "title";

export const ResultListContext = createContext(null);

export default function ResultListContextProvider({
  children,
}: ResultListContextProviderProps) {
  const [resultList, setResultList] = useState<
    DiscogsReleasesResult[] | DiscogsArtistsResult[]
  >([]);
  const [sortBy, setSortBy] = useState<TSortType>("default");

  const handleChangeList = (
    resultList: DiscogsReleasesResult[] | DiscogsArtistsResult[],
  ) => {
    setResultList(resultList);
  };
  const handleChangeSortBy = (sortBy: TSortType) => {
    setSortBy(sortBy);
  };

  const sortedResultList = () => {
    if (sortBy === "year") {
      return [...resultList].sort((a, b) => {
        const yearA = "year" in a ? Number(a.year) : 0;
        const yearB = "year" in b ? Number(b.year) : 0;
        return yearA - yearB;
      });
    } else if (sortBy === "title") {
      return [...resultList].sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        return titleA.localeCompare(titleB);
      });
    } else {
      return resultList;
    }
  };

  return (
    <ResultListContext.Provider value={{}}>
      {children}
    </ResultListContext.Provider>
  );
}
