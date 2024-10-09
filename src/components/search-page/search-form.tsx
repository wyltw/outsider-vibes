"use client";

import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useResultsListContext } from "@/lib/hooks";

type SearchFormProps = {
  context: "header" | "home" | "sheet";
  onToggleSheet?: (open: boolean) => void;
};

type Params = { query: string };

export default function SearchForm({
  context,
  onToggleSheet,
}: SearchFormProps) {
  const router = useRouter();
  const params: Params = useParams();
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    if (params.query) {
      setSearchText(decodeURIComponent(params.query));
    }
  }, [params.query]);
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search/${searchText}?type=release&page=1`);
    if (onToggleSheet) {
      onToggleSheet(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "z-10 flex self-stretch",
        context === "header" && "hidden w-full max-w-lg sm:flex",
      )}
    >
      <label className="flex flex-1 justify-end">
        <Input
          onChange={handleInput}
          value={searchText}
          name="search"
          className={cn(
            "rounded-e-none text-base transition-all placeholder:text-base focus-visible:ring-primary md:h-14",
            context === "header" &&
              "h-10 w-2/5 transition-all duration-700 focus-visible:w-full md:h-10",
            context === "sheet" && "rounded-e-md md:h-10",
          )}
          placeholder="輸入藝人或者專輯..."
        />
      </label>
      <Button
        size={context === "header" ? "icon" : "lg"}
        className={cn(
          "h-10 rounded-s-none md:h-14",
          context === "header" && "md:h-10",
          context === "sheet" && "hidden",
        )}
      >
        <Search />
      </Button>
    </form>
  );
}
