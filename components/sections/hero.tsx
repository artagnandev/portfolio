import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { Action } from "@/components/primitives/action";
import { CountUp } from "@/components/motion/count-up";
import { ParticleField } from "@/components/motion/particle-field";
import { dictionary } from "@/content/dictionary";
import { profile, stats } from "@/content/profile";
import { publicAssetExists } from "@/lib/assets";
import { t, type Locale } from "@/lib/i18n";

/**
 * A dobra inicial anima por CSS (utilitários .rise-*), não por Motion.
 * O <h1> é o elemento de LCP: se dependesse da hidratação para sair de
 * opacity:0, o LCP saltaria de ~1s para ~4s em mobile.
 */
export const Hero = ({ locale }: { locale: Locale }) => {
  const hasPortrait = publicAssetExists(profile.photo);

  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44" aria-labelledby="hero-title">
      {/* Wash de accent atrás do retrato — atmosfera sem custo de rede. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-0 h-[38rem] w-[38rem] rounded-full bg-accent-soft opacity-70 blur-[110px]"
      />

      {/* Malha de pontos guiada pelo ponteiro. Decoração: nasce depois da
          hidratação, atrás do conteúdo, e fica parada no movimento reduzido. */}
      <ParticleField className="field-mask" />

      <div className="shell relative grid gap-14 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow rise mb-7">
            {t(profile.role, locale)} · {t(profile.availability, locale)}
          </p>

          <h1 id="hero-title" className="rise-1 text-step-6 sm:text-step-7">
            {profile.name}
          </h1>

          <p className="measure rise-2 mt-7 text-step-1 text-ink-muted">
            {t(profile.headline, locale)}
          </p>

          <div className="rise-3 mt-10 flex flex-wrap gap-3">
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
        </div>

        <figure className="rise-2 relative lg:col-span-5">
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
      </div>

      {/*
       * São dois números apenas. Em vez de uma grade de colunas estreitas, cada
       * um ocupa metade da faixa com o valor grande e o rótulo centrado no eixo
       * vertical — a divisória vertical faz o papel que as colunas faziam antes.
       * Centrar (e não alinhar pela base) evita que o rótulo de três linhas
       * fique pendurado abaixo do número.
       */}
      <div className="shell relative mt-20 border-t border-rule pt-10">
        <dl className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
          {stats.map((stat, index) => (
            <div
              key={stat.value}
              className={index === 0 ? undefined : "sm:border-l sm:border-rule sm:pl-12"}
            >
              <dt className="sr-only">{t(stat.label, locale)}</dt>
              <dd className="flex items-center gap-5">
                <span className="tabular font-display text-step-6 leading-none">
                  <CountUp value={stat.value} />
                </span>
                <span className="eyebrow max-w-[26ch] text-balance leading-[1.6]">
                  {t(stat.label, locale)}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
