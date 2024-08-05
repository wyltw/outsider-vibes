"use client";

import React, { useEffect } from "react";
import toast from "react-hot-toast";
import ErrorBlock from "./error-block";

type CustomErrorProps = { error: string };

export default function CustomError({ error }: CustomErrorProps) {
  //Suspense/loading改變了toast的渲染行為
  useEffect(() => {
    toast.error(error);
  }, [error]);

  return (
    <>
      <ErrorBlock error={error} />
    </>
  );
}
