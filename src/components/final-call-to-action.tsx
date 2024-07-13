import React from "react";
import SecondHeading from "./second-heading";
import Image from "next/image";
import { Button } from "./ui/button";

export default function FinalCallToAction() {
  return (
    <section className="flex flex-col items-center gap-y-6 pb-16">
      <SecondHeading>加入我們一起探索音樂世界</SecondHeading>
      <Image
        src="/images/being-creative-2.svg"
        alt="creative"
        width={240}
        height={240}
      />
      <Button size={"lg"} className="text-base">
        Join us
      </Button>
    </section>
  );
}
