import { cn } from "@/lib/utils";
import { Music } from "lucide-react";
import React, { ReactNode } from "react";

type FeatureCardProps = {
  children: ReactNode;
  text: string;
};

export default function FeatureCard({ children, text }: FeatureCardProps) {
  return (
    <section
      className={
        "flex w-60 flex-col items-center justify-center gap-y-6 rounded-2xl bg-primary-50/20 px-6 py-6"
      }
    >
      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary-50/30">
        {children}
      </div>
      <p className="flex flex-col items-center text-2xl after:content-[url('/images/underline.svg')]">
        {text}
      </p>
    </section>
  );
}
