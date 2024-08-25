import React from "react";
import SkeletonCard from "./skeleton-card";

export default function CardLoading() {
  return (
    <div className="flex h-[350px] w-full items-center justify-between">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
