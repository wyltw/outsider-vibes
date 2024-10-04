"use client";

import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type NavigationButtonProps = { url: string; children: ReactNode };

export default function NavigationButton({
  children,
  url,
}: NavigationButtonProps) {
  const { data: session } = useSession();
  const handleClick = () => {
    if (!session?.user) {
      toast.error("請先登入");
      return;
    }
    router.push(url);
  };
  const router = useRouter();
  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      className="w-full"
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
