"use client";
import { createContext, ReactNode, useState } from "react";

type TSearchTextContext = {
  searchText: string;
  handleChangeSearchText: (searchText: string) => void;
};

export const SearchTextContext = createContext<TSearchTextContext | null>(null);

type SearchTextContextProviderProps = { children: ReactNode };

export default function SearchTextContextProvider({
  children,
}: SearchTextContextProviderProps) {
  const [searchText, setSearchText] = useState("");
  const handleChangeSearchText = (searchText: string) => {
    setSearchText(searchText);
  };
  return (
    <SearchTextContext.Provider value={{ searchText, handleChangeSearchText }}>
      {children}
    </SearchTextContext.Provider>
  );
}
