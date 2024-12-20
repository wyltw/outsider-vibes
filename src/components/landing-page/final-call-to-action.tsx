import React from "react";
import SecondHeading from "./second-heading";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import beingCreative2 from "/public/images/being-creative-2.svg";

export default function FinalCallToAction() {
  return (
    <section className="mb-16 flex flex-col items-center gap-y-6">
      <SecondHeading>一起探索音樂世界</SecondHeading>
      <Image src={beingCreative2} alt="creative" width={240} height={240} />

      <Button size={"lg"} className="text-base" asChild>
        <Link href="./home">開始探索</Link>
      </Button>
    </section>
  );
}
