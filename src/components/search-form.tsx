"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search/${searchText}`);
  };
  return (
    <form onSubmit={handleSubmit} className="z-10 flex self-stretch">
      <label className="w-full">
        <Input
          onChange={handleInput}
          value={searchText}
          name="search"
          className="rounded-e-none text-base placeholder:text-base focus-visible:ring-primary md:h-14"
          placeholder="輸入藝人或者專輯，找到喜歡的風格..."
        />
      </label>
      <Button size="lg" className="h-10 rounded-s-none md:h-14">
        <Search />
      </Button>
    </form>
  );
}
