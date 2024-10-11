"use client";

import { Trash2 } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { ApiResponse, DiscogsSearchType } from "@/lib/types";
import toast from "react-hot-toast";

type DeleteButtonProps = { documentId: string; type: DiscogsSearchType };

export default function DeleteButton({ documentId, type }: DeleteButtonProps) {
  const handleDeleteUserSavedItem = async () => {
    const response = await fetch("/api/users/collections", {
      method: "DELETE",
      body: JSON.stringify({ documentId, type }),
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
    <Button
      onClick={handleDeleteUserSavedItem}
      variant={"outline"}
      size={"icon"}
    >
      <Trash2 />
    </Button>
  );
}
