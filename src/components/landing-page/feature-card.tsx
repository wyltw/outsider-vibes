"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: { opacity: 1, y: 0 },
};

type FeatureCardProps = {
  children: ReactNode;
  text: string;
  duration?: number;
};

export default function FeatureCard({
  children,
  text,
  duration,
}: FeatureCardProps) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView={"visible"}
      transition={{ duration: duration }}
      className={
        "flex w-full max-w-md flex-col items-center justify-center gap-y-6 rounded-2xl bg-primary-50/20 px-6 py-6 shadow md:max-w-lg lg:w-60"
      }
    >
      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary-50/30">
        {children}
      </div>
      <p className="flex flex-col items-center text-xl after:content-[url('/images/underline.svg')]">
        {text}
      </p>
    </motion.div>
  );
}
