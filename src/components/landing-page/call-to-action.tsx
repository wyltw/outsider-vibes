import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export default function CallToAction() {
  return (
    <section className="flex justify-center py-80 md:block">
      <section className="flex max-w-md flex-col items-center md:items-start">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          找尋你的音樂<span className="text-secondary">共鳴</span>
        </h1>
        <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Find your music <span className="text-secondary">resonance</span>
        </p>
        <p className="mt-3 max-w-sm break-keep text-center leading-tight text-black/50 md:text-left">
          每個音符都有故事，每種旋律都有共鳴。
          加入我們的社區，發現更多令人驚喜的音樂。
        </p>

        <div className="mt-6 flex w-full max-w-sm flex-col gap-4 md:flex-row">
          <Button variant="outline" size={"lg"} asChild>
            <Link href="./home">Visit our community</Link>
          </Button>
          <Button size={"lg"} asChild>
            <Link href="./sign-up">Sign up</Link>
          </Button>
        </div>
      </section>
    </section>
  );
}
