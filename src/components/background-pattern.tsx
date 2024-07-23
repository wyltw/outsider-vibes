import Image from "next/image";
import React, { ReactNode } from "react";

type BackgroundPatternProps = { children: ReactNode };

export default function BackgroundPattern({
  children,
}: BackgroundPatternProps) {
  {
    /* BackgroundPattern的大小依賴於section的內容。而Image則使用position:absolute跳出文檔流使自身不佔據空間，調整z-index，最終使container隱藏背景超出section的部分。*/
  }
  return (
    <div className="relative overflow-hidden">
      <Image
        className="-z-10 h-auto max-w-full opacity-[0.3]"
        src="/images/jean-philippe-delberghe-75xPHEQBmvA-unsplash.jpg"
        alt="background"
        fill
      />
      {children}
    </div>
  );
}
