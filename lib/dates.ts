import type { Locale } from "@/lib/i18n";

const monthNames: Record<Locale, string[]> = {
  pt: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

/** "2025-01" → "jan 2025" / "Jan 2025". */
export const formatMonth = (iso: string, locale: Locale): string => {
  const [year, month] = iso.split("-");
  const index = Number.parseInt(month ?? "1", 10) - 1;
  return `${monthNames[locale][index] ?? ""} ${year}`;
};
