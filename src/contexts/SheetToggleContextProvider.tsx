"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

type TSheetToggleContext = {
  isOpen: boolean;
  handleSheetToggle: (open: boolean) => void;
};

export const SheetToggleContext = createContext<TSheetToggleContext | null>(
  null,
);

type SheetToggleContextProviderProps = { children: ReactNode };

export default function SheetToggleContextProvider({
  children,
}: SheetToggleContextProviderProps) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const handleSheetToggle = (open: boolean) => {
    setIsOpen(open);
  };
  useEffect(() => {
    handleSheetToggle(false);
  }, [pathName, searchParams]);

  const context = { isOpen, handleSheetToggle };

  return (
    <SheetToggleContext.Provider value={context}>
      {children}
    </SheetToggleContext.Provider>
  );
}
