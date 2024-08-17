import { SheetToggleContext } from "@/contexts/SheetToggleContextProvider";
import { useContext } from "react";

export const useSheetToggleContext = () => {
  const context = useContext(SheetToggleContext);
  if (!context) {
    throw new Error("check if SheetToggleContextProvider is placing correctly");
  }
  return context;
};
