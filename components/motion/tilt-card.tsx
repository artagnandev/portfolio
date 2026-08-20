"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { m, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Amplitude máxima da rotação, em graus. */
  intensity?: number;
};

/**
 * O "3D" do projeto: perspectiva real em CSS, guiada pelo ponteiro, com mola.
 * Zero WebGL, zero textura, zero KB de biblioteca gráfica.
 */
export const TiltCard = ({ children, className, intensity = 7 }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const spring = { stiffness: 220, damping: 24, mass: 0.6 };
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [intensity, -intensity]), spring);
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-intensity, intensity]), spring);

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    // Só ponteiros finos inclinam: em touch, o gesto pertence ao scroll.
    if (event.pointerType !== "mouse") return;
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set((event.clientX - bounds.left) / bounds.width);
    pointerY.set((event.clientY - bounds.top) / bounds.height);
  };

  const reset = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <div className="tilt-scene">
      <m.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn("will-change-transform", className)}
      >
        {children}
      </m.div>
    </div>
  );
};
