import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function CallToAction() {
  return (
    <section className="px-36 py-52">
      <section className="max-w-md">
        <h1 className="text-5xl font-semibold tracking-tight">
          找尋你的音樂<span className="text-secondary">共鳴</span>
        </h1>
        <p className="text-3xl font-semibold tracking-tight">
          Find your music <span className="text-secondary">resonance</span>
        </p>
        <p className="text mt-3 leading-tight text-black/50">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim neque
          deserunt odit.
        </p>
        <div className="mt-6 space-x-4">
          <Button variant="outline" size={"lg"} asChild>
            <Link href="./home">Visit our community</Link>
          </Button>
          <Button size={"lg"} asChild>
            <Link href="./home">Sign up</Link>
          </Button>
        </div>
      </section>
    </section>
  );
}
