import { Reveal } from "@/components/motion/reveal";
import { Rule } from "@/components/primitives/rule";
import { dictionary } from "@/content/dictionary";
import { profile } from "@/content/profile";
import { t, type Locale } from "@/lib/i18n";

export const About = ({ locale }: { locale: Locale }) => (
  <section id="about" className="scroll-mt-28 py-24" aria-labelledby="about-title">
    <div className="shell">
      <Rule label={t(dictionary.sections.aboutEyebrow, locale)} className="mb-12" />

      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <h2 id="about-title" className="section-title text-step-4">
            {t(dictionary.sections.aboutTitle, locale)}
          </h2>
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-5">
          <p className="measure text-ink-muted">{t(profile.summary, locale)}</p>
        </Reveal>
      </div>
    </div>
  </section>
);
