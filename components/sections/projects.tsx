import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { Rule } from "@/components/primitives/rule";
import { dictionary } from "@/content/dictionary";
import { agency } from "@/content/profile";
import { projects } from "@/content/projects";
import { t, type Locale } from "@/lib/i18n";

export const Projects = ({ locale }: { locale: Locale }) => (
  <section id="work" className="scroll-mt-28 py-24" aria-labelledby="work-title">
    <div className="shell">
      <Rule label={t(dictionary.sections.workEyebrow, locale)} className="mb-12" />

      <Reveal>
        <h2 id="work-title" className="section-title mb-16 text-step-4">
          {t(dictionary.sections.workTitle, locale)}
        </h2>
      </Reveal>

      <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
        {projects.map((project, index) => {
          const cover = project.images[0];
          if (!cover) return null;

          return (
            <Reveal as="li" key={project.slug} delay={(index % 2) * 0.08}>
              <TiltCard>
                <Link
                  href={`/${locale}/projetos/${project.slug}`}
                  aria-label={`${t(dictionary.actions.openProject, locale)}: ${project.title}`}
                  className="group block w-full"
                >
                  {/*
                   * O mesmo `name` existe na página de detalhe: é ele que faz a
                   * capa morfar de miniatura para hero durante a navegação.
                   * `default="none"` impede que as outras quatro capas animem
                   * junto; com ele, o `share` explícito é obrigatório.
                   */}
                  <ViewTransition
                    name={`project-${project.slug}`}
                    share="morph"
                    default="none"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden border border-rule bg-paper-raised">
                      <Image
                        src={cover.src}
                        alt={t(cover.alt, locale)}
                        fill
                        sizes="(max-width: 640px) 92vw, (max-width: 1152px) 46vw, 34rem"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                    </div>
                  </ViewTransition>

                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h3 className="text-step-2">{project.title}</h3>
                    <ArrowUpRight
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </div>

                  <p className="eyebrow mt-1.5">
                    {t(project.segment, locale)} · {project.period}
                  </p>

                  <p className="measure mt-3 text-step--1 text-ink-muted">
                    {t(project.summary, locale)}
                  </p>
                </Link>
              </TiltCard>
            </Reveal>
          );
        })}
      </ul>

      <Reveal>
        <p className="eyebrow mt-14 border-t border-rule pt-6">
          {t(dictionary.labels.allDeliveredAt, locale)}{" "}
          <a
            href={agency.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink transition-colors hover:text-accent"
          >
            {agency.name}
          </a>
        </p>
      </Reveal>
    </div>
  </section>
);
