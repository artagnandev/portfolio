"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";
import { cn } from "@/lib/utils";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const Stagger = ({ children, className }: { children: ReactNode; className?: string }) => (
  <m.div
    className={cn(className)}
    variants={container}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
  >
    {children}
  </m.div>
);

export const StaggerItem = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <m.div className={cn(className)} variants={item}>
    {children}
  </m.div>
);
