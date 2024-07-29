"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

type CustomErrorProps = { error: string };

const renderToast = (error: string) => {
  toast.error(error);
};

export default function CustomError({ error }: CustomErrorProps) {
  useEffect(() => {
    renderToast(error);
  }, [error]);

  return (
    <>
      <div className="flex h-24 items-center gap-x-2">
        <Image
          className="opacity-50"
          src="/images/embarrassed.png"
          alt="oops"
          width={36}
          height={36}
        />
        <p className="text-lg text-black/50">維基百科暫時沒有相關敘述</p>
      </div>
    </>
  );
}
