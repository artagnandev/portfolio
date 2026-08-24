import { ArrowUpRight } from "lucide-react";
import { ParticleField } from "@/components/motion/particle-field";
import { Reveal } from "@/components/motion/reveal";
import { Rule } from "@/components/primitives/rule";
import { dictionary } from "@/content/dictionary";
import { contactChannels } from "@/content/profile";
import { t, type Locale } from "@/lib/i18n";

export const Contact = ({ locale }: { locale: Locale }) => (
  <section id="contact" className="relative scroll-mt-28 py-24" aria-labelledby="contact-title">
    {/*
     * O mesmo campo do hero fecha a página, com o foco no vazio que a coluna
     * da esquerda deixa embaixo. Abertura e fecho emoldurados; o miolo do
     * site fica limpo de propósito.
     */}
    <ParticleField className="field-mask [--field-x:26%] [--field-y:88%]" />

    {/* `relative` obrigatório: sem contexto de pintura, o canvas absoluto
        subiria por cima do conteúdo estático. */}
    <div className="shell relative">
      <Rule label={t(dictionary.sections.contactEyebrow, locale)} className="mb-12" />

      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <h2 id="contact-title" className="section-title text-step-5">
            {t(dictionary.sections.contactTitle, locale)}
          </h2>
          <p className="measure mt-6 text-ink-muted">
            {t(dictionary.sections.contactBody, locale)}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6">
          {/*
           * Vidro fosco sobre a malha de pontos: o campo continua visível
           * atrás dos canais, mas some de baixo do texto. Uma placa só, no
           * <ul> — uma por item deixaria costura em cada divisória.
           */}
          <ul className="border-t border-rule bg-paper/65 backdrop-blur-[4px]">
            {contactChannels.map((channel) => (
              <li key={channel.id}>
                <a
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noopener noreferrer" : undefined}
                  className="group flex items-baseline justify-between gap-6 border-b border-rule py-5 transition-colors hover:text-accent"
                >
                  <span className="eyebrow">{t(channel.label, locale)}</span>
                  <span className="flex items-center gap-2 break-all text-step--1">
                    {channel.display}
                    <ArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className="shrink-0 text-ink-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  </section>
);
