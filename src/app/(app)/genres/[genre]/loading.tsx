import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <div className="flex h-24 max-w-3xl flex-col justify-center space-y-3">
      <Skeleton className="h-4 w-3/4 bg-slate-300" />
      <Skeleton className="h-4 w-2/6 bg-slate-300" />
      <Skeleton className="h-4 w-11/12 bg-slate-300" />
    </div>
  );
}
