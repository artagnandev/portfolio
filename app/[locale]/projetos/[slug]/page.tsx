import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, GitBranch } from "lucide-react";
import { ParticleField } from "@/components/motion/particle-field";
import { Reveal } from "@/components/motion/reveal";
import { Tag } from "@/components/primitives/tag";
import { dictionary } from "@/content/dictionary";
import { agency } from "@/content/profile";
import { projects } from "@/content/projects";
import { isLocale, locales, t, type Locale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/site";

type RouteParams = { locale: string; slug: string };

export const generateStaticParams = () =>
  locales.flatMap((locale) => projects.map((project) => ({ locale, slug: project.slug })));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> => {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};

  const project = projects.find((entry) => entry.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: t(project.summary, raw),
    alternates: alternatesFor(raw, `/projetos/${slug}`),
  };
};

const Page = async ({ params }: { params: Promise<RouteParams> }) => {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const index = projects.findIndex((entry) => entry.slug === slug);
  const project = projects[index];
  if (!project) notFound();

  const cover = project.images[0];
  const gallery = project.images.slice(1);
  // Lista circular: o último projeto aponta de volta para o primeiro.
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="pb-24 pt-32 sm:pt-36">
      {/*
       * Cabeçalho do projeto: é a dobra desta página, então repete o campo do
       * hero da home — com o foco à direita, no vazio que o título de uma
       * coluna deixa. O canvas para aqui: cobrir o artigo inteiro seria uma
       * malha de milhares de pontos por nada.
       */}
      <header className="relative overflow-hidden">
        <ParticleField className="field-mask [--field-x:84%] [--field-y:46%]" />

        <div className="shell relative">
          <Link
            href={`/${locale}#work`}
            className="rise inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            {t(dictionary.actions.backToWork, locale)}
          </Link>

          <p className="eyebrow rise mt-10">
            {t(project.segment, locale)} · {project.period} ·{" "}
            <span className="whitespace-nowrap">
              {t(dictionary.labels.deliveredAt, locale)}{" "}
              <a
                href={agency.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink transition-colors hover:text-accent"
              >
                {agency.name}
              </a>
            </span>
          </p>

          <h1 className="rise-1 mt-4 text-step-5 sm:text-step-6">{project.title}</h1>

          <p className="measure rise-2 mt-6 text-step-1 text-ink-muted">
            {t(project.summary, locale)}
          </p>
        </div>
      </header>

      {cover && (
        <div className="shell mt-14">
          {/*
           * Par do `name` usado no card da home: a capa morfa de miniatura para
           * hero. Sem utilitário `.rise` aqui — uma animação de opacidade no
           * elemento nomeado brigaria com o próprio morph.
           */}
          <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
            <div className="relative aspect-video w-full overflow-hidden border border-rule bg-paper-raised">
              <Image
                src={cover.src}
                alt={t(cover.alt, locale)}
                fill
                sizes="(max-width: 1152px) 92vw, 72rem"
                className="object-cover"
                priority
              />
            </div>
          </ViewTransition>
        </div>
      )}

      <div className="shell rise-3 mt-7 flex flex-wrap gap-1.5">
        {project.stack.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>

      <div className="shell mt-20 grid gap-x-8 gap-y-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Block title={t(dictionary.labels.about, locale)}>
            <div className="measure space-y-4">
              {t(project.description, locale).map((paragraph) => (
                <p key={paragraph} className="text-step--1 text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </Block>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <Block title={t(dictionary.labels.contribution, locale)}>
            <List items={t(project.contributions, locale)} />
          </Block>
        </Reveal>
      </div>

      <Reveal className="shell mt-20">
        <Block title={t(dictionary.labels.features, locale)}>
          <ul className="grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
            {t(project.features, locale).map((item) => (
              <li key={item} className="flex gap-3 text-step--1 text-ink-muted">
                <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </Block>
      </Reveal>

      {gallery.length > 0 && (
        <Reveal className="shell mt-20">
          <Block title={t(dictionary.labels.gallery, locale)}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {gallery.map((image) => (
                <li
                  key={image.src}
                  className="relative aspect-video overflow-hidden border border-rule bg-paper-raised"
                >
                  <Image
                    src={image.src}
                    alt={t(image.alt, locale)}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1152px) 46vw, 34rem"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          </Block>
        </Reveal>
      )}

      {(project.liveUrl || project.repoUrl) && (
        <div className="shell mt-16 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:bg-accent hover:text-accent-contrast"
            >
              <ExternalLink size={14} aria-hidden="true" />
              {t(dictionary.actions.viewLive, locale)}
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-ink/25 px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              <GitBranch size={14} aria-hidden="true" />
              {t(dictionary.actions.viewSource, locale)}
            </a>
          )}
        </div>
      )}

      {next && next.slug !== project.slug && (
        <nav className="shell mt-24 border-t border-rule pt-8" aria-label={t(dictionary.sections.workEyebrow, locale)}>
          <Link href={`/${locale}/projetos/${next.slug}`} className="group block">
            <p className="eyebrow">{t(dictionary.actions.nextProject, locale)}</p>
            <p className="mt-2 flex items-center gap-3 font-display text-step-3 transition-colors group-hover:text-accent">
              {next.title}
              <ArrowRight
                size={20}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              />
            </p>
          </Link>
        </nav>
      )}
    </article>
  );
};

/** Um <section> por bloco, com exatamente um <h2> — como no resto do site. */
const Block = ({ title, children }: { title: string; children: ReactNode }) => (
  <section>
    <h2 className="eyebrow mb-5 text-accent">{title}</h2>
    {children}
  </section>
);

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-2.5">
    {items.map((item) => (
      <li key={item} className="flex gap-3 text-step--1 text-ink-muted">
        <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
        {item}
      </li>
    ))}
  </ul>
);

export default Page;
