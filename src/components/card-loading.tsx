import React from "react";
import SkeletonCard from "./skeleton-card";

export default function CardLoading() {
  return (
    <div className="flex h-[350px] max-w-3xl items-center justify-between space-y-3">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
