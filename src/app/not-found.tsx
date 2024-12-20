"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import iceCreamSpill from "/public/images/Ice-cream-spill.png";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="mx-4 py-4">
      <h1 className="text-4xl text-primary">Not Found - 404</h1>
      <p className="mt-2 text-xl text-black/50">找不到此網頁</p>
      <Image width={320} height={320} alt="ice cream" src={iceCreamSpill} />
      <Button
        className="text-base text-black"
        onClick={() => {
          router.back();
        }}
        variant={"link"}
      >
        回上一頁
      </Button>
      <Button
        className="text-base text-black"
        asChild
        onClick={() => {
          router.back();
        }}
        variant={"link"}
      >
        <Link href="/">回到首頁</Link>
      </Button>
    </div>
  );
}
