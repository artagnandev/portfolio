import type { ContactChannel, LocalizedText, Stat } from "./types";

export const profile = {
  name: "David Artagnan",
  role: {
    pt: "Front-end Lead",
    en: "Front-end Lead",
  } satisfies LocalizedText,
  headline: {
    pt: "Seis anos construindo interfaces que sustentam operação real.",
    en: "Six years building interfaces that hold up real operations.",
  } satisfies LocalizedText,
  summary: {
    pt: "Desenvolvedor front-end com 6 anos de experiência em aplicações web e mobile escaláveis com JavaScript, TypeScript, React, Next.js e React Native. Front-end Lead desde janeiro de 2025, definindo arquitetura de componentes e conduzindo a estratégia técnica do time.",
    en: "Front-end developer with 6 years of experience building scalable web and mobile applications with JavaScript, TypeScript, React, Next.js and React Native. Front-end Lead since January 2025, defining component architecture and driving the team's technical strategy.",
  } satisfies LocalizedText,
  location: {
    pt: "Uberlândia, Minas Gerais, Brasil",
    en: "Uberlândia, Minas Gerais, Brazil",
  } satisfies LocalizedText,
  availability: {
    pt: "Disponível para remoto e híbrido",
    en: "Open to remote and hybrid roles",
  } satisfies LocalizedText,
  email: "davidrezendeartagnan619@gmail.com",
  /** Fonte única. E.164 para href, formatado para exibição. */
  phone: "+5534997094995",
  phoneDisplay: "+55 (34) 99709-4995",
  linkedin: "https://www.linkedin.com/in/david-artagnan",
  github: "https://github.com/artagnandev",
  photo: "/david-artagnan.png",
} as const;

/**
 * Agência por trás de todos os projetos do portfólio. Fonte única do crédito —
 * exibido na seção de projetos e em cada página de detalhe.
 */
export const agency = {
  name: "Flow Lab Tech",
  url: "https://www.flowlabtech.com.br/",
} as const;

/**
 * Dois números apenas — os únicos verificáveis. A faixa do hero, o currículo e
 * a imagem de OG leem daqui; o layout de cada um assume exatamente dois itens.
 */
export const stats: Stat[] = [
  {
    value: "06",
    label: { pt: "anos de experiência", en: "years of experience" },
  },
  {
    value: "+70",
    label: { pt: "projetos entregues em web e mobile", en: "projects delivered across web and mobile" },
  },
];

export const contactChannels: ContactChannel[] = [
  {
    id: "email",
    label: { pt: "E-mail", en: "Email" },
    display: profile.email,
    href: `mailto:${profile.email}`,
    external: false,
  },
  {
    id: "phone",
    label: { pt: "Telefone", en: "Phone" },
    display: profile.phoneDisplay,
    href: `tel:${profile.phone}`,
    external: false,
  },
  {
    id: "linkedin",
    label: { pt: "LinkedIn", en: "LinkedIn" },
    display: "in/david-artagnan",
    href: profile.linkedin,
    external: true,
  },
  {
    id: "github",
    label: { pt: "GitHub", en: "GitHub" },
    display: "artagnandev",
    href: profile.github,
    external: true,
  },
];
