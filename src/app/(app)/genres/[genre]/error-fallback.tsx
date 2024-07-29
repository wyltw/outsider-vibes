"use client";

import { CircleX } from "lucide-react";
import React from "react";

export default function ErrorFallback({ error }: { error: Error }) {
  return (
    <>
      <p className="flex items-center gap-x-2 text-xl text-red-600">
        <CircleX />
        Oops! Something went wrong: {error.message}
      </p>
    </>
  );
}
