"use client";
import { createContext, ReactNode, useState } from "react";

type TSheetToggleContext = {
  isOpen: boolean;
  handleChangeSheetToggle: (open: boolean) => void;
};

export const SheetToggleContext = createContext<TSheetToggleContext | null>(
  null,
);

type SheetToggleContextProviderProps = { children: ReactNode };

export default function SheetToggleContextProvider({
  children,
}: SheetToggleContextProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleChangeSheetToggle = (open: boolean) => {
    setIsOpen(open);
  };
  const context = { isOpen, handleChangeSheetToggle };
  console.log(context);
  return (
    <SheetToggleContext.Provider value={context}>
      {children}
    </SheetToggleContext.Provider>
  );
}
