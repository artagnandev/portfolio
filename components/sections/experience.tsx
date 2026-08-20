import { Reveal } from "@/components/motion/reveal";
import { Rule } from "@/components/primitives/rule";
import { Tag } from "@/components/primitives/tag";
import { dictionary } from "@/content/dictionary";
import { experiences } from "@/content/resume";
import { formatMonth } from "@/lib/dates";
import { t, type Locale } from "@/lib/i18n";

export const Experience = ({ locale }: { locale: Locale }) => (
  <section id="experience" className="scroll-mt-28 py-24" aria-labelledby="experience-title">
    <div className="shell">
      <Rule label={t(dictionary.sections.experienceEyebrow, locale)} className="mb-12" />

      <Reveal>
        <h2 id="experience-title" className="mb-16 text-step-4">
          {t(dictionary.sections.experienceTitle, locale)}
        </h2>
      </Reveal>

      <ol className="border-t border-rule">
        {experiences.map((exp, index) => (
          <Reveal
            as="li"
            key={`${exp.company}-${exp.start}`}
            delay={index * 0.05}
            className="grid gap-5 border-b border-rule py-10 md:grid-cols-12 md:gap-8"
          >
            <div className="md:col-span-3">
              <p className="tabular font-mono text-xs uppercase tracking-[0.1em] text-ink-muted">
                <time dateTime={exp.start}>{formatMonth(exp.start, locale)}</time>
                {" — "}
                {exp.end ? (
                  <time dateTime={exp.end}>{formatMonth(exp.end, locale)}</time>
                ) : (
                  <span className="text-accent">{t(dictionary.labels.present, locale)}</span>
                )}
              </p>
              <p className="eyebrow mt-2">{t(exp.location, locale)}</p>
            </div>

            <div className="md:col-span-9">
              <h3 className="text-step-2">{t(exp.role, locale)}</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-accent">
                {exp.company}
              </p>

              <ul className="measure mt-5 space-y-2.5">
                {t(exp.bullets, locale).map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-step--1 text-ink-muted">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>

              {exp.stack.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {exp.stack.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);
