import { htmlLang, locales, type Locale } from "@/lib/i18n";

const resolveOrigin = (): string => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  // Injetada automaticamente pela Vercel no build de produção.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "https://portfolio-artagnandev.vercel.app";
};

export const siteUrl = resolveOrigin();

export const absoluteUrl = (path: string): string =>
  `${siteUrl}/${path.replace(/^\/+/, "")}`;

/**
 * Canonical do locale corrente + hreflang de todos os locales.
 * `subpath` é o trecho após o locale, com barra inicial ou vazio.
 */
export const alternatesFor = (locale: Locale, subpath: string) => {
  const languages: Record<string, string> = {};

  for (const candidate of locales) {
    languages[htmlLang[candidate]] = absoluteUrl(`${candidate}${subpath}`);
  }
  languages["x-default"] = absoluteUrl(`pt${subpath}`);

  return {
    canonical: absoluteUrl(`${locale}${subpath}`),
    languages,
  };
};
