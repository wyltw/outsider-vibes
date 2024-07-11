import Image from "next/image";
import React from "react";

type LogoProps = { width: number; height: number };

export default function Logo({ width, height }: LogoProps) {
  return (
    <Image src="/images/brand.svg" alt="Logo" width={width} height={height} />
  );
}
