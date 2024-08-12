import Link from "next/link";
import React from "react";

const genreList = ["rock", "grunge", "jazz", "electro", "dnb", "uk hardcore"];

type Props = { searchParams: { genre: string } };

export default function SearchPage({ searchParams }: Props) {
  const genre = searchParams.genre;

  return (
    <div>
      <Link
        href={`?${new URLSearchParams({ genre: genreList[Math.floor(Math.random() * genreList.length)] })}`}
      >
        <button>change</button>
      </Link>
      <p>{genre}</p>
    </div>
  );
}
