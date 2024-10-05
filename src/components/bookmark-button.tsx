"use client";

import { PlusSquare } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { ApiResponse, DiscogsSearchType } from "@/lib/types";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

type BookmarkButtonProps = {
  itemId: string;
  type: DiscogsSearchType;
};

export default function BookmarkButton({ type, itemId }: BookmarkButtonProps) {
  const { data: session } = useSession();
  const handleSaveItems = async () => {
    if (!session?.user) {
      toast.error("請先登入再使用添加功能");
      return;
    }
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
