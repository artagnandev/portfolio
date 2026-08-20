import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Reveal } from "@/components/motion/reveal";
import { Rule } from "@/components/primitives/rule";
import { dictionary } from "@/content/dictionary";
import { skillGroups } from "@/content/resume";
import { t, type Locale } from "@/lib/i18n";

export const Skills = ({ locale }: { locale: Locale }) => (
  <section id="skills" className="scroll-mt-28 py-24" aria-labelledby="skills-title">
    <div className="shell">
      <Rule label={t(dictionary.sections.skillsEyebrow, locale)} className="mb-12" />

      <Reveal>
        <h2 id="skills-title" className="mb-16 text-step-4">
          {t(dictionary.sections.skillsTitle, locale)}
        </h2>
      </Reveal>

      <Stagger className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <StaggerItem key={group.label.pt}>
            <h3 className="eyebrow border-b border-rule pb-3 text-accent">
              {t(group.label, locale)}
            </h3>
            <ul className="mt-5 space-y-2">
              {group.items.map((item) => (
                <li key={item} className="text-step--1 text-ink-muted">
                  {item}
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
);
