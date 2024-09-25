"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="ms-4 mt-24">
      <h1 className="text-4xl text-primary">{error.message}</h1>
      <p>It seems like the URL is invalid or something went wrong. You can:</p>
      <div className="mt-6 space-x-4">
        <Button size={"sm"} onClick={() => router.back()}>
          Go Back
        </Button>
        <Button size={"sm"} onClick={() => router.push("/")}>
          Return to Home
        </Button>
      </div>
    </main>
  );
}
