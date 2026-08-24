"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type CountUpProps = {
  /** String como "06" ou "+70" — zeros à esquerda e o "+" são preservados. */
  value: string;
  className?: string;
};

export const CountUp = ({ value, className }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduced = useReducedMotion();
  // "+70" anima como 70 e reexibe o "+"; "06" mantém o zero à esquerda.
  const prefix = value.startsWith("+") ? "+" : "";
  const digits = value.slice(prefix.length);
  const target = Number.parseInt(digits, 10);
  const pad = digits.length;
  // `null` até a animação começar: no HTML do servidor (e sem JS) o número
  // precisa sair pronto — começar em 0 publicava "00" para quem não hidrata.
  const [count, setCount] = useState<number | null>(null);

  const animatable = !reduced && !Number.isNaN(target);

  useEffect(() => {
    if (!inView || !animatable) return;

    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      // O callback do Motion é assíncrono — não há setState no corpo do effect.
      onUpdate: (latest) => setCount(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, animatable, target]);

  // Sem animação (movimento reduzido, valor não numérico ou antes do primeiro
  // quadro), mostra o valor final direto.
  const display =
    animatable && count !== null ? prefix + String(count).padStart(pad, "0") : value;

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};
