import { SheetToggleContext } from "@/contexts/SheetToggleContextProvider";
import { useSearchParams } from "next/navigation";
import { useContext } from "react";

export function useSheetToggleContext() {
  const context = useContext(SheetToggleContext);
  if (!context) {
    throw new Error("check if SheetToggleContextProvider is placing correctly");
  }
  return context;
}

export function useUpdatedSearchParams() {
  const searchParams = useSearchParams();

  const updateSearchParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const previousValue = params.get(name) || "";
    const valueArray = [];
    valueArray.push(previousValue);
    params.set(name, [...valueArray, value].filter((elem) => elem).join(" "));
    return "?" + params.toString();
  };
  return { updateSearchParams };
}
