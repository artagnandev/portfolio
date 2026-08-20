import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PrintButton } from "@/components/resume/print-button";
import { dictionary } from "@/content/dictionary";
import { contactChannels, profile, stats } from "@/content/profile";
import {
  certifications,
  education,
  experiences,
  keywords,
  languages,
  skillGroups,
} from "@/content/resume";
import { projects } from "@/content/projects";
import { formatMonth } from "@/lib/dates";
import { isLocale, locales, t, type Locale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/site";
import "./print.css";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};

  return {
    title: t(dictionary.meta.resumeTitle, raw),
    description: t(dictionary.meta.resumeDescription, raw),
    alternates: alternatesFor(raw, "/curriculo"),
  };
};

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <article className="resume shell max-w-3xl py-32 print:py-0">
      <div className="mb-10 flex flex-wrap items-center gap-3 print:hidden">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} />
          {t(dictionary.actions.backToSite, locale)}
        </Link>
        <PrintButton label={t(dictionary.actions.downloadPdf, locale)} />
      </div>

      <header className="border-b border-rule pb-8">
        <h1 className="text-step-5">{profile.name}</h1>
        <p className="mt-2 text-step-1 text-ink-muted">{t(profile.role, locale)}</p>
        <p className="mt-4 text-step--1 text-ink-muted">
          {t(profile.location, locale)} · {t(profile.availability, locale)}
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5 text-step--1">
          {contactChannels.map((channel) => (
            <li key={channel.id}>
              <a href={channel.href} className="text-ink-muted hover:text-accent">
                {channel.display}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <Block title={t(dictionary.labels.profile, locale)}>
        <p className="text-step--1 text-ink-muted">{t(profile.summary, locale)}</p>
        <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
          {stats.map((stat) => (
            <li key={stat.value} className="text-step--1 text-ink-muted">
              <strong className="tabular text-ink">{stat.value}</strong> {t(stat.label, locale)}
            </li>
          ))}
        </ul>
      </Block>

      <Block title={t(dictionary.nav.skills, locale)}>
        <dl className="space-y-3">
          {skillGroups.map((group) => (
            <div key={group.label.pt} className="text-step--1">
              <dt className="inline font-semibold">{t(group.label, locale)}: </dt>
              <dd className="inline text-ink-muted">{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block title={t(dictionary.nav.experience, locale)}>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <section key={`${exp.company}-${exp.start}`} className="resume-entry">
              <h3 className="text-step-0">
                {t(exp.role, locale)} — {exp.company}
              </h3>
              <p className="tabular mt-1 text-step--1 text-ink-muted">
                <time dateTime={exp.start}>{formatMonth(exp.start, locale)}</time>
                {" — "}
                {exp.end ? (
                  <time dateTime={exp.end}>{formatMonth(exp.end, locale)}</time>
                ) : (
                  t(dictionary.labels.present, locale)
                )}
                {" · "}
                {t(exp.location, locale)}
              </p>
              <ul className="mt-3 space-y-1.5">
                {t(exp.bullets, locale).map((bullet) => (
                  <li key={bullet} className="flex gap-2.5 text-step--1 text-ink-muted">
                    <span aria-hidden="true">·</span>
                    {bullet}
                  </li>
                ))}
              </ul>
              {exp.stack.length > 0 && (
                <p className="mt-2.5 text-step--1 text-ink-muted">
                  {t(dictionary.labels.technologies, locale)}: {exp.stack.join(", ")}
                </p>
              )}
            </section>
          ))}
        </div>
      </Block>

      <Block title={t(dictionary.labels.projects, locale)}>
        <div className="space-y-6">
          {projects.map((project) => (
            <section key={project.slug} className="resume-entry">
              <h3 className="text-step-0">
                {project.title} — {t(project.segment, locale)}
              </h3>
              <p className="mt-1 text-step--1 text-ink-muted">{project.stack.join(", ")}</p>
              <p className="mt-2 text-step--1 text-ink-muted">{t(project.summary, locale)}</p>
              <ul className="mt-2 space-y-1.5">
                {t(project.contributions, locale).map((item) => (
                  <li key={item} className="flex gap-2.5 text-step--1 text-ink-muted">
                    <span aria-hidden="true">·</span>
                    {item}
                  </li>
                ))}
              </ul>
              {project.liveUrl && (
                <p className="mt-2 text-step--1">
                  <a href={project.liveUrl} className="text-accent">
                    {project.liveUrl}
                  </a>
                </p>
              )}
            </section>
          ))}
        </div>
      </Block>

      <Block title={t(dictionary.labels.education, locale)}>
        <ul className="space-y-3">
          {education.map((entry) => (
            <li key={entry.institution} className="text-step--1">
              <strong>{t(entry.degree, locale)}</strong>
              <span className="text-ink-muted">
                {" — "}
                {entry.institution} · {entry.year} · {t(entry.detail, locale)}
              </span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title={t(dictionary.labels.certifications, locale)}>
        <ul className="flex flex-wrap gap-x-6 gap-y-1.5">
          {certifications.map((certification) => (
            <li key={certification.pt} className="text-step--1 text-ink-muted">
              {t(certification, locale)}
            </li>
          ))}
        </ul>
      </Block>

      <Block title={t(dictionary.labels.languages, locale)}>
        <ul className="space-y-1.5">
          {languages.map((language) => (
            <li key={language.name.pt} className="text-step--1 text-ink-muted">
              <strong className="text-ink">{t(language.name, locale)}</strong>
              {" — "}
              {t(language.level, locale)}
            </li>
          ))}
        </ul>
      </Block>

      <Block title={t(dictionary.labels.keywords, locale)}>
        <p className="text-step--1 leading-relaxed text-ink-muted">{keywords.join(" · ")}</p>
      </Block>
    </article>
  );
};

const Block = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="resume-block mt-10 border-t border-rule pt-6">
    <h2 className="mb-4 text-step-1">{title}</h2>
    {children}
  </section>
);

export default Page;
