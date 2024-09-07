import { SheetToggleContext } from "@/contexts/SheetToggleContextProvider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useState } from "react";

export function useSheetToggleContext() {
  const context = useContext(SheetToggleContext);
  if (!context) {
    throw new Error("check if SheetToggleContextProvider is placing correctly");
  }
  return context;
}

export function useUpdatedSearchParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  //先取得當下的searchParams後進行後續操作
  const updateSearchParams = useCallback(
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
      return "?" + params.toString();
    },
    [searchParams],
  );
  const deleteSearchParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("style");
    params.delete("genre");
    router.push(`${pathname}?${params.toString()}`);
  };
  return { updateSearchParams, deleteSearchParams };
}

export function useSelectedFilter() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  params.delete("type");
  const selectedFilterArray: string[] = [];
  for (const value of params.values()) {
    selectedFilterArray.push(...value.split(" "));
    //push可以接受多個參數
  }
  return { selectedFilterArray };
}
