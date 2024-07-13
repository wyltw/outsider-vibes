import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";

type PropositionCardProps = {
  imageAlt: string;
  imageSrc: string;
  label: string;
  children: ReactNode;
  textLines: string[];
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
    <section className="grid w-full max-w-7xl grid-cols-2 place-items-center rounded-2xl bg-accent px-4 py-14">
      <Image src={imageSrc} alt={imageAlt} width={280} height={280} />
      <div className={cn("max-w-md", className)}>
        <PropositionCardlabel>{label}</PropositionCardlabel>
        {children}
        <PropositionCardTextLines>
          {textLines.map((textLine) => (
            <p key={textLine}>{textLine}</p>
          ))}
        </PropositionCardTextLines>
      </div>
    </section>
  );
}

function PropositionCardlabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 tracking-wider text-secondary">{children}</p>;
}

function PropositionCardTextLines({ children }: { children: React.ReactNode }) {
  return <div className="whitespace-nowrap text-black/50">{children}</div>;
}
