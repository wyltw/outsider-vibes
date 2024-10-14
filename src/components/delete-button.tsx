"use client";

import { Loader, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ApiResponse, DiscogsSearchType } from "@/lib/types";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useRouter } from "next/navigation";

type DeleteButtonProps = { documentId: string; type: DiscogsSearchType };

export default function DeleteButton({ documentId, type }: DeleteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleDeleteUserSavedItem = async () => {
    setIsLoading(true);
    const response = await fetch("/api/users/collections", {
      method: "DELETE",
      body: JSON.stringify({ documentId, type }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result: ApiResponse = await response.json();
    router.refresh();
    result.success
      ? toast.success(result.message)
      : toast.error(result.message);
    setIsLoading(false);
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild className="mt-auto">
          <Button variant={"outline"} size={"icon"}>
            {isLoading ? <Loader className="animate-spin" /> : <Trash2 />}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確定要刪除此項目嗎？</AlertDialogTitle>
            <AlertDialogDescription>
              請確保您已經在其他音樂平台收藏此項目
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUserSavedItem}>
              刪除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
