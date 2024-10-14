import { ResultsListContext } from "@/contexts/ResultsListContextProvider";
import { SheetToggleContext } from "@/contexts/SheetToggleContextProvider";
import { useSearchParams } from "next/navigation";
import { useCallback, useContext } from "react";
import { TSortType } from "./types";

export function useSheetToggleContext() {
  const context = useContext(SheetToggleContext);
  if (!context) {
    throw new Error("check if SheetToggleContextProvider is placing correctly");
  }
  return context;
}

export function useResultsListContext() {
  const context = useContext(ResultsListContext);
  if (!context) {
    throw new Error("check if ResultsListContextProvider is placing correctly");
  }
  return context;
}

export function useUpdatedSearchParams() {
  const searchParams = useSearchParams();
  //先取得當下的searchParams後進行後續操作，因為這個實例是read only的
  const getFilterSearchParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const previousValue = params.get(name) || "";
    const valueArray = [previousValue];
    //採用陣列以便過濾第一個空字串及插入空格，第一個空字串是因為previousValue的默認值，及尚未選取任何filter的初始狀態,函式在渲染Link時就已經執行了
    if (!valueArray[0].includes(value)) {
      //此條件檢查目前的genre/style字串中是否與渲染中的值相同
      const filteredValueArray = [...valueArray, value]
        .filter((elem) => elem)
        //排除空字串
        .join(" ");
      //以空格作為每個filter的間隔成為一個字串
      params.set(name, filteredValueArray);
    }
    params.set("page", "1");
    return "?" + params.toString();
  };

  const getResetSearchParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("style");
    params.delete("genre");
    params.set("page", "1");
    return "?" + params.toString();
  };

  const getSwitchedPageSearchParams = (type: "previous" | "next") => {
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

  const getPageSearchParams = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return "?" + params.toString();
  };

  const getSortBySearchParams = (sortBy: TSortType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", String(sortBy));
    return "?" + params.toString();
  };

  return {
    getFilterSearchParams,
    getResetSearchParams,
    getSwitchedPageSearchParams,
    getPageSearchParams,
    getSortBySearchParams,
  };
}

export function useSelectedFilter() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  params.delete("type");
  params.delete("page");
  params.delete("sortBy");
  const selectedFilterArray: string[] = [];
  for (const value of params.values()) {
    selectedFilterArray.push(...value.split(" "));
    //push可以接受多個參數,因此展開陣列正好
  }
  return { selectedFilterArray };
}
