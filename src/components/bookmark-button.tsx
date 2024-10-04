"use client";

import { PlusSquare } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { ApiResponse, DiscogsSearchType } from "@/lib/types";
import toast from "react-hot-toast";

type BookmarkButtonProps = {
  itemId: string;
  type: DiscogsSearchType;
};

export default function BookmarkButton({ type, itemId }: BookmarkButtonProps) {
  const handleSaveItems = async () => {
    const response = await fetch("/api/users/collections", {
      method: "POST",
      body: JSON.stringify({ type, itemId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result: ApiResponse = await response.json();
    result.success
      ? toast.success(result.message)
      : toast.error(result.message);
  };
  return (
    <>
      <Button
        onClick={() => {
          handleSaveItems();
        }}
        className="ms-auto gap-x-2"
        size={"sm"}
      >
        <PlusSquare />
        添加收藏
      </Button>
    </>
  );
}
