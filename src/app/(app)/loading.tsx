import Spinner from "@/components/spinner";
import React from "react";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh_-_144px)] items-center justify-center">
      {/* 扣掉header和main的padding的高度 */}
      <Spinner />
    </div>
  );
}
