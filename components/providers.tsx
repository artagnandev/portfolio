"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { LazyMotion, domAnimation, MotionConfig } from "motion/react";

export const Providers = ({ children }: { children: ReactNode }) => (
  // defaultTheme="system": com "light" o visitante de SO escuro recebia a
  // paleta clara, enquanto o themeColor do viewport já anunciava a escura.
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
    {/* domAnimation carrega ~5 kB em vez do bundle completo do Motion. */}
    <LazyMotion features={domAnimation} strict>
      {/* reducedMotion="user" faz o Motion respeitar a preferência do SO. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  </ThemeProvider>
);
