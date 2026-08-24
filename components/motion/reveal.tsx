"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Atraso em segundos. Combine com o índice para escalonar listas. */
  delay?: number;
  as?: "div" | "li" | "section" | "article";
};

export const Reveal = ({ children, className, delay = 0, as = "div" }: RevealProps) => {
  const Component = m[as];

  return (
    <Component
      className={cn(className)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
};
