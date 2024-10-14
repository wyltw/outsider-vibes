import React from "react";
import SkeletonCard from "./skeleton-card";

export default function CardLoading() {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-y-4">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
