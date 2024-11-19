import Image from "next/image";
import jeanPhilippeDelberghe from "/public/images/jean-philippe-delberghe-75xPHEQBmvA-unsplash.jpg";
import React, { ReactNode } from "react";

type BackgroundPatternProps = { children: ReactNode };

export default function BackgroundPattern({
  children,
}: BackgroundPatternProps) {
  {
    /* BackgroundPattern的大小依賴於section的內容。而Image則使用position:absolute跳出文檔流使自身不佔據空間，調整z-index，最終使container隱藏背景超出section的部分。需要注意Image組件的fill prop完成了大部分工作,如position absolute*/
  }
  return (
    <div className="relative overflow-hidden">
      <Image
        className="-z-10 h-auto max-w-full opacity-30"
        src={jeanPhilippeDelberghe}
        alt="background"
        fill
        quality={100}
        loading="lazy"
        placeholder="blur"
      />
      {children}
    </div>
  );
}
