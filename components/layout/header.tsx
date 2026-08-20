"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X } from "lucide-react";
import { dictionary } from "@/content/dictionary";
import { otherLocale, t, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const sections = ["about", "experience", "skills", "work", "contact"] as const;

const anchors: Record<(typeof sections)[number], string> = {
  about: "#about",
  experience: "#experience",
  skills: "#skills",
  work: "#work",
  contact: "#contact",
};

export const Header = ({ locale }: { locale: Locale }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();

  // Sentinela + IntersectionObserver em vez de listener de scroll: o callback
  // é assíncrono (sem setState síncrono no effect) e não roda a cada pixel.
  useEffect(() => {
    const target = sentinel.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry?.isIntersecting),
      { rootMargin: "-24px 0px 0px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const target = otherLocale(locale);
  const swapPath = pathname.replace(`/${locale}`, `/${target}`);

  return (
    <>
      {/* Alvo do IntersectionObserver: sai do viewport assim que a página rola. */}
      <div ref={sentinel} aria-hidden="true" className="absolute top-0 h-px w-full" />

      <header
        data-site-header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled ? "border-b border-rule bg-paper/85 backdrop-blur-md" : "bg-transparent",
        )}
      >
      <div className="shell flex items-center justify-between py-5">
        <Link
          href={`/${locale}`}
          className="font-display text-xl leading-none tracking-tight"
          aria-label={t(dictionary.actions.home, locale)}
        >
          DA<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Principal">
          {sections.map((section) => (
            <a
              key={section}
              href={anchors[section]}
              className="text-sm text-ink-muted transition-colors hover:text-accent"
            >
              {t(dictionary.nav[section], locale)}
            </a>
          ))}
          <Link
            href={`/${locale}/curriculo`}
            className="border-b border-accent pb-0.5 text-sm text-ink transition-colors hover:text-accent"
          >
            {t(dictionary.nav.resume, locale)}
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href={swapPath}
            hrefLang={target}
            className="px-2.5 py-2 font-mono text-xs uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-accent"
            aria-label={t(dictionary.actions.switchLanguage, locale)}
          >
            {target}
          </Link>

          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-2 text-ink-muted transition-colors hover:text-accent"
            aria-label={t(dictionary.actions.toggleTheme, locale)}
          >
            {/* Ambos os ícones são renderizados; o CSS decide qual aparece.
                Evita o estado `mounted` e qualquer mismatch de hidratação. */}
            <Moon size={17} className="dark:hidden" aria-hidden="true" />
            <Sun size={17} className="hidden dark:block" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="p-2 text-ink-muted transition-colors hover:text-accent md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={t(
              open ? dictionary.actions.closeMenu : dictionary.actions.openMenu,
              locale,
            )}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-rule bg-paper md:hidden" aria-label="Principal">
          <ul className="shell flex flex-col py-3">
            {sections.map((section) => (
              <li key={section}>
                <a
                  href={anchors[section]}
                  onClick={() => setOpen(false)}
                  className="block border-b border-rule/60 py-4 font-display text-step-1"
                >
                  {t(dictionary.nav[section], locale)}
                </a>
              </li>
            ))}
            <li>
              <Link
                href={`/${locale}/curriculo`}
                onClick={() => setOpen(false)}
                className="block py-4 font-display text-step-1 text-accent"
              >
                {t(dictionary.nav.resume, locale)}
              </Link>
            </li>
          </ul>
          </nav>
        )}
      </header>
    </>
  );
};
