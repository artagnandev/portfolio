export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Resolve um valor localizado para o locale corrente. */
export const t = <T,>(value: Record<Locale, T>, locale: Locale): T => value[locale];

export const otherLocale = (locale: Locale): Locale => (locale === "pt" ? "en" : "pt");

/** Código BCP-47 completo, para <html lang> e hreflang. */
export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
};
