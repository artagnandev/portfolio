import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { Action } from "@/components/primitives/action";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { dictionary } from "@/content/dictionary";
import { profile, stats } from "@/content/profile";
import { publicAssetExists } from "@/lib/assets";
import { t, type Locale } from "@/lib/i18n";

export const Hero = ({ locale }: { locale: Locale }) => {
  const hasPortrait = publicAssetExists(profile.photo);

  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44" aria-labelledby="hero-title">
      {/* Wash de accent atrás do retrato — atmosfera sem custo de rede. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-0 h-[38rem] w-[38rem] rounded-full bg-accent-soft opacity-70 blur-[110px]"
      />

      <div className="shell relative grid gap-14 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow mb-7">
              {t(profile.role, locale)} · {t(profile.availability, locale)}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 id="hero-title" className="text-step-6 sm:text-step-7">
              {profile.name}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="measure mt-7 text-step-1 text-ink-muted">
              {t(profile.headline, locale)}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Action href="#contact">
                {t(dictionary.actions.getInTouch, locale)}
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Action>
              <Action href={`/${locale}/curriculo`} variant="outline">
                <FileText size={15} />
                {t(dictionary.actions.viewResume, locale)}
              </Action>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:col-span-5">
          <figure className="relative">
            <div className="relative aspect-square w-full max-w-sm overflow-hidden border border-rule lg:ml-auto">
              {hasPortrait ? (
                <Image
                  src={profile.photo}
                  alt={`${profile.name} — ${t(profile.role, locale)}`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 24rem"
                  className="object-cover grayscale-[0.35] transition-[filter] duration-700 hover:grayscale-0"
                  priority
                />
              ) : (
                // Fallback tipográfico enquanto o retrato não existe em public/.
                <div
                  className="flex h-full w-full items-center justify-center bg-paper-raised"
                  aria-hidden="true"
                >
                  <span className="font-display text-step-7 leading-none text-ink">
                    DA<span className="text-accent">.</span>
                  </span>
                </div>
              )}
            </div>
            <figcaption className="eyebrow mt-4 lg:text-right">
              {t(profile.location, locale)}
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <div className="shell relative mt-20 border-t border-rule pt-10">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.value + stat.label.pt}>
              <dt className="sr-only">{t(stat.label, locale)}</dt>
              <dd>
                <span className="tabular font-display text-step-5 leading-none">
                  <CountUp value={stat.value} />
                </span>
                <span className="eyebrow mt-3 block">{t(stat.label, locale)}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
