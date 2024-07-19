"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";
import { motion } from "framer-motion";

type PropositionCardProps = {
  imageAlt: string;
  imageSrc: string;
  label: string;
  children: ReactNode;
  textLines: string;
  className?: string;
};

const MotionImage = motion(Image);

const sectionVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, when: "beforeChildren", staggerChildren: 0.3 },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

const divVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
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
    <motion.section
      variants={sectionVariants}
      initial={"hidden"}
      whileInView={"visible"}
      className="flex w-full max-w-7xl flex-wrap items-center justify-around rounded-2xl bg-accent px-4 py-14 shadow"
    >
      <MotionImage
        variants={imageVariants}
        src={imageSrc}
        alt={imageAlt}
        width={280}
        height={280}
      />
      <motion.div variants={divVariants} className={cn("max-w-sm", className)}>
        <PropositionCardlabel>{label}</PropositionCardlabel>
        {children}
        <div className="mt-2 break-keep text-black/50">{textLines}</div>
      </motion.div>
    </motion.section>
  );
}

function PropositionCardlabel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm tracking-wider text-secondary">{children}</p>;
}
