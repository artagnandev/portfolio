"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

type CountUpProps = {
  /** String como "06" ou "35" — zeros à esquerda são preservados. */
  value: string;
  className?: string;
};

export const CountUp = ({ value, className }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const target = Number.parseInt(value, 10);
  const pad = value.length;
  const [display, setDisplay] = useState(() => "0".padStart(pad, "0"));

  useEffect(() => {
    if (!inView || Number.isNaN(target)) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(String(Math.round(latest)).padStart(pad, "0")),
    });

    return () => controls.stop();
  }, [inView, target, pad, value]);

  return (
    <span ref={ref} className={className}>
      {Number.isNaN(target) ? value : display}
    </span>
  );
};
