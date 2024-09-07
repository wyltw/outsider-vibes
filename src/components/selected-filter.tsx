"use client";

import { useSelectedFilter, useUpdatedSearchParams } from "@/lib/hooks";
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function SelectedFilter() {
  const { selectedFilterArray } = useSelectedFilter();
  const { deleteSearchParams } = useUpdatedSearchParams();
  return (
    <>
      <p>目前的篩選條件：</p>
      <div className="flex items-center">
        <ul className="flex flex-wrap gap-x-1">
          {selectedFilterArray.map((filter, index) => (
            <li key={filter + index}>
              <Badge variant={"secondary"} className="text-white">
                {filter}
              </Badge>
            </li>
          ))}
        </ul>
        <Button
          onClick={deleteSearchParams}
          className="ms-auto flex"
          size={"sm"}
          variant={"outline"}
        >
          清空篩選
        </Button>
      </div>
    </>
  );
}
