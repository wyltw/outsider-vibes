"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="mx-4 py-4">
      <h1 className="text-4xl text-primary">Not Found - 404</h1>
      <p className="mt-2 text-xl text-black/50">找不到此網頁</p>
      <Image
        width={320}
        height={320}
        alt="ice cream"
        src={"/images/ice-cream-spill.png"}
      />
      <Button
        className="text-base text-black"
        onClick={() => {
          router.back();
        }}
        variant={"link"}
      >
        回上一頁
      </Button>
      <Link className="py-2 underline-offset-4 hover:underline" href="/">
        回到首頁
      </Link>
    </div>
  );
}
