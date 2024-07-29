"use client";

import { CircleX } from "lucide-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

type CustomErrorProps = { error: string };

export default function CustomError({ error }: CustomErrorProps) {
  useEffect(() => {
    toast.error(error);
  }, [error]);

  return (
    <p className="flex items-center gap-x-2 text-xl text-red-600">
      <CircleX />
      Oops! Something went wrong: {error}
    </p>
  );
}
