"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ProjectDialog } from "./project-dialog";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { Rule } from "@/components/primitives/rule";
import { dictionary } from "@/content/dictionary";
import { projects } from "@/content/projects";
import type { Project } from "@/content/types";
import { t, type Locale } from "@/lib/i18n";

export const Projects = ({ locale }: { locale: Locale }) => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="work" className="scroll-mt-28 py-24" aria-labelledby="work-title">
      <div className="shell">
        <Rule label={t(dictionary.sections.workEyebrow, locale)} className="mb-12" />

        <Reveal>
          <h2 id="work-title" className="mb-16 text-step-4">
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
                  <button
                    type="button"
                    onClick={() => setSelected(project)}
                    aria-label={`${t(dictionary.actions.openProject, locale)}: ${project.title}`}
                    className="group block w-full text-left"
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
                  </button>
                </TiltCard>
              </Reveal>
            );
          })}
        </ul>
      </div>

      <ProjectDialog project={selected} locale={locale} onClose={() => setSelected(null)} />
    </section>
  );
};
