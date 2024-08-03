import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-y-4">
      <Skeleton className="h-28 w-28 bg-slate-300" />
      <Skeleton className="h-4 w-3/4 bg-slate-300" />
      <Skeleton className="h-4 w-2/6 bg-slate-300" />
      <Skeleton className="h-4 w-11/12 bg-slate-300" />
    </div>
  );
}
