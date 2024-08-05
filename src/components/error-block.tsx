import React from "react";
import EmbarrassedIcon from "./embarrased-icon";

type ErrorBlockProps = { error: string };

export default function ErrorBlock({ error }: ErrorBlockProps) {
  return (
    <div className="flex h-24 items-center gap-x-2">
      <EmbarrassedIcon />
      <p className="text-lg text-black/50">{error}</p>
    </div>
  );
}
