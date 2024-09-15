import { SheetToggleContext } from "@/contexts/SheetToggleContextProvider";
import { useSearchParams } from "next/navigation";
import { useCallback, useContext } from "react";

export function useSheetToggleContext() {
  const context = useContext(SheetToggleContext);
  if (!context) {
    throw new Error("check if SheetToggleContextProvider is placing correctly");
  }
  return context;
}

export function useUpdatedSearchParams() {
  const searchParams = useSearchParams();
  //先取得當下的searchParams後進行後續操作
  const getFilterSearchParams = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const previousValue = params.get(name) || "";
      const valueArray = [previousValue];
      //採用陣列以便過濾第一個空字串及保持空格
      if (!valueArray[0].includes(value)) {
        const filteredValueArray = [...valueArray, value]
          .filter((elem) => elem)
          .join(" ");
        params.set(name, filteredValueArray);
      }
      params.set("page", "1");
      return "?" + params.toString();
    },
    [searchParams],
  );

  const getResetSearchParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("style");
    params.delete("genre");
    params.set("page", "1");
    return "?" + params.toString();
  };

  const getSwitchedPageParams = (type: "previous" | "next") => {
    const params = new URLSearchParams(searchParams.toString());
    let currentPage = Number(params.get("page"));
    if (type === "previous") {
      currentPage = currentPage - 1;
    } else if (type === "next") {
      currentPage = currentPage + 1;
    }
    params.set("page", String(currentPage));
    return "?" + params.toString();
  };

  const getPageParams = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return "?" + params.toString();
  };

  return {
    getFilterSearchParams,
    getResetSearchParams,
    getSwitchedPageParams,
    getPageParams,
  };
}

export function useSelectedFilter() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  params.delete("type");
  params.delete("page");
  const selectedFilterArray: string[] = [];
  for (const value of params.values()) {
    selectedFilterArray.push(...value.split(" "));
    //push可以接受多個參數,因此展開陣列正好
  }
  return { selectedFilterArray };
}
