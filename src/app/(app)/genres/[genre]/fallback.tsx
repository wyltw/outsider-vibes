"use client";

import { CircleX } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Fallback({ error }: { error: Error }) {
  const [errorMessage, setErrorMessage] = useState(error.message);
  useEffect(() => {
    setErrorMessage(error.message);
    toast.error(errorMessage);
  }, [errorMessage, error.message]);
  return (
    <>
      <p className="flex items-center gap-x-2 text-xl text-red-600">
        <CircleX />
        Oops! Something went wrong: {errorMessage}
      </p>
    </>
  );
}
