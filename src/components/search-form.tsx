"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function SearchForm() {
  const [searchText, setSearchText] = useState("");
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  return (
    <form className="z-10 flex self-stretch">
      <label className="w-full">
        <Input
          onChange={handleInput}
          value={searchText}
          className="rounded-e-none text-base placeholder:text-base focus-visible:ring-primary md:h-14"
          placeholder="輸入想要尋找的藝人或者專輯..."
        />
      </label>
      <Button size="lg" className="h-10 rounded-s-none md:h-14">
        <Search />
      </Button>
    </form>
  );
}
