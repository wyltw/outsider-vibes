import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";

type PropositionCardProps = {
  imageAlt: string;
  imageSrc: string;
  label: string;
  children: ReactNode;
  textLines: string;
  className?: string;
};

export default function PropositionCard({
  imageAlt,
  imageSrc,
  label,
  children,
  textLines,
  className,
}: PropositionCardProps) {
  return (
    <section className="flex w-full max-w-7xl flex-wrap items-center justify-around rounded-2xl bg-accent px-4 py-14 shadow">
      <Image src={imageSrc} alt={imageAlt} width={280} height={280} />
      <div className={cn("max-w-sm", className)}>
        <PropositionCardlabel>{label}</PropositionCardlabel>
        {children}
        <div className="mt-2 break-keep text-black/50">{textLines}</div>
      </div>
    </section>
  );
}

function PropositionCardlabel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm tracking-wider text-secondary">{children}</p>;
}
