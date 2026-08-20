import type { Locale } from "@/lib/i18n";

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type Stat = {
  value: string;
  label: LocalizedText;
};

export type ContactChannel = {
  id: "email" | "phone" | "linkedin" | "github";
  label: LocalizedText;
  display: string;
  href: string;
  external: boolean;
};

export type Experience = {
  company: string;
  role: LocalizedText;
  /** ISO curto: "2025-01". Usado em <time datetime> e para ordenação. */
  start: string;
  /** null = cargo atual. */
  end: string | null;
  location: LocalizedText;
  bullets: LocalizedList;
  stack: string[];
};

export type EducationEntry = {
  institution: string;
  degree: LocalizedText;
  detail: LocalizedText;
  year: string;
};

export type SkillGroup = {
  label: LocalizedText;
  items: string[];
};

export type ProjectImage = {
  src: string;
  alt: LocalizedText;
};

export type Project = {
  slug: string;
  /** Nome próprio do produto — nunca traduzido. */
  title: string;
  segment: LocalizedText;
  period: string;
  summary: LocalizedText;
  description: LocalizedList;
  stack: string[];
  features: LocalizedList;
  contributions: LocalizedList;
  images: ProjectImage[];
  liveUrl?: string;
  repoUrl?: string;
};
