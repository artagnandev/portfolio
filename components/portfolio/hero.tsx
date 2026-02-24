"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Linkedin, Mail, Phone } from "lucide-react";

const roles = [
  "Front-end Lead",
  "React Developer",
  "Next.js Specialist",
  "React Native Dev",
];

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-6"
      aria-label="Introducao"
    >
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow effect */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"
        aria-hidden="true"
      />

      <div
        className={`relative z-10 mx-auto max-w-3xl text-center transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            Disponível para novos projetos
          </span>
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
          David Artagnan
        </h1>

        <div className="mb-6 h-8 overflow-hidden" aria-live="polite">
          <p
            key={currentRole}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-lg font-medium text-primary sm:text-xl"
          >
            {roles[currentRole]}
          </p>
        </div>

        <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
          Desenvolvedor front-end com{" "}
          <b className="text-white/70">mais de 5 anos de experiência</b> em
          construção de aplicações <b className="text-white/70">web</b> e{" "}
          <b className="text-white/70">mobile</b> escaláveis, utilizando
          JavaScript, TypeScript, React, Next.js e React Native.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contato"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Mail size={16} />
            Entrar em contato
          </a>
          <a
            href="https://www.linkedin.com/in/david-artagnan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
          <a
            href="tel:+5534996915092"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Phone size={16} />
            Ligar
          </a>
        </div>
      </div>

      <a
        href="#sobre"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground transition-colors hover:text-primary"
        aria-label="Rolar para a seção sobre"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
