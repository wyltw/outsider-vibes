"use client";

import { Search } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSearchTextContext } from "@/lib/hooks";

type SearchFormProps = { isHeaderSearchForm: boolean };

export default function SearchForm({ isHeaderSearchForm }: SearchFormProps) {
  const { searchText, handleChangeSearchText } = useSearchTextContext();
  const router = useRouter();
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeSearchText(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search/${searchText}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "z-10 flex self-stretch",
        isHeaderSearchForm && "w-full max-w-lg",
      )}
    >
      <label className="flex flex-1 justify-end">
        <Input
          onChange={handleInput}
          value={searchText}
          name="search"
          className={cn(
            "hover:w-50 rounded-e-none text-base placeholder:text-base focus-visible:ring-primary md:h-14",
            isHeaderSearchForm &&
              "h-10 w-2/5 transition-all duration-700 focus-visible:w-full md:h-10",
          )}
          placeholder="輸入藝人或者專輯，找到喜歡的風格..."
        />
      </label>
      <Button
        size={isHeaderSearchForm ? "icon" : "lg"}
        className={cn(
          "h-10 rounded-s-none md:h-14",
          isHeaderSearchForm && "md:h-10",
        )}
      >
        <Search />
      </Button>
    </form>
  );
}