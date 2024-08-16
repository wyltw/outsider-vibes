import { SearchTextContext } from "@/contexts/SearchTextContextProvider";
import { useContext } from "react";

export const useSearchTextContext = () => {
  const context = useContext(SearchTextContext);
  if (!context) {
    throw new Error("check if SearchTextContextProvider is placing correctly");
  }
  return context;
};
