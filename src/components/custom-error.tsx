"use client";

import React, { useEffect } from "react";
import toast from "react-hot-toast";
import EmbarrassedIcon from "./embarrased-icon";

type CustomErrorProps = { error: string };

export default function CustomError({ error }: CustomErrorProps) {
  //Suspense/loading改變了toast的渲染行為
  useEffect(() => {
    toast.error(error);
  }, [error]);

  return (
    <>
      <div className="flex h-24 items-center gap-x-2">
        <EmbarrassedIcon />
        <p className="text-lg text-black/50">{error}</p>
      </div>
    </>
  );
}
