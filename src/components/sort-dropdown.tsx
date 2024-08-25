import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { ArrowDownUp } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const dropdownItemList = [{ text: "按年份排序", value: "year" }];

export default function SortDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"sm"} className="gap-x-2">
          <ArrowDownUp />
          <span className="text-base text-primary">排序方式</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup>
          {dropdownItemList.map((item) => (
            <DropdownMenuRadioItem key={item.text} value={item.value}>
              {item.text}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
