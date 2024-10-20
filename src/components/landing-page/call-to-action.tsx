import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import FirstHeading from "../first-heading";
import Image from "next/image";

export default function CallToAction() {
  return (
    <section className="flex justify-center py-52 md:block">
      <div className="flex flex-col items-center justify-around md:flex-row">
        <div className="-mt-10 flex max-w-md flex-col items-center md:-mt-0 md:items-start">
          <FirstHeading
            className="whitespace-nowrap"
            mainText="找尋你的音樂"
            highlightText="共鳴"
          />
          <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Find your music <span className="text-secondary">resonance</span>
          </p>
          <p className="mt-3 max-w-sm break-keep text-center leading-tight text-black/50 md:text-left">
            每個音符都有故事，每種旋律都有共鳴。
            加入我們的社區，發現更多令人驚喜的音樂。
          </p>
          <div className="mt-6 flex w-full max-w-sm gap-4">
            <Button
              className="flex-1 text-xl"
              variant="outline"
              size={"lg"}
              asChild
            >
              <Link href="./home">開始一趟音樂之旅</Link>
            </Button>
          </div>
        </div>
        <div className="-z-10 order-first max-w-80 self-start opacity-80 md:order-none md:max-w-none">
          <Image
            src="/images/headphone-amico.svg"
            alt="headphone"
            width={360}
            height={360}
          />
        </div>
      </div>
    </section>
  );
}
