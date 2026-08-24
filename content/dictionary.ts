import type { LocalizedText } from "./types";

const text = (pt: string, en: string): LocalizedText => ({ pt, en });

export const dictionary = {
  meta: {
    title: text(
      "David Artagnan — Front-end Lead | React, Next.js, TypeScript",
      "David Artagnan — Front-end Lead | React, Next.js, TypeScript",
    ),
    description: text(
      "Front-end Lead com 6 anos de experiência em React, Next.js, React Native e TypeScript. Mais de 70 projetos web e mobile entregues do Figma ao deploy. Uberlândia, MG — remoto e híbrido.",
      "Front-end Lead with 6 years of experience in React, Next.js, React Native and TypeScript. 70+ web and mobile projects delivered from Figma to deploy. Based in Brazil — open to remote work.",
    ),
    resumeTitle: text(
      "Currículo — David Artagnan, Front-end Lead",
      "Resume — David Artagnan, Front-end Lead",
    ),
    resumeDescription: text(
      "Currículo completo de David Artagnan: experiência, competências técnicas, projetos entregues, formação e certificações.",
      "Full resume of David Artagnan: experience, technical skills, delivered projects, education and certifications.",
    ),
  },
  nav: {
    about: text("Sobre", "About"),
    experience: text("Experiência", "Experience"),
    skills: text("Competências", "Skills"),
    work: text("Projetos", "Projects"),
    contact: text("Contato", "Contact"),
    resume: text("Currículo", "Resume"),
  },
  actions: {
    skipToContent: text("Ir para o conteúdo", "Skip to content"),
    getInTouch: text("Falar comigo", "Get in touch"),
    viewResume: text("Ver currículo", "View resume"),
    downloadPdf: text("Baixar em PDF", "Download as PDF"),
    backToSite: text("Voltar ao site", "Back to site"),
    viewLive: text("Ver em produção", "View live"),
    viewSource: text("Código fonte", "Source code"),
    openProject: text("Ver detalhes do projeto", "See project details"),
    backToWork: text("Voltar aos projetos", "Back to projects"),
    nextProject: text("Próximo projeto", "Next project"),
    toggleTheme: text("Alternar tema", "Toggle theme"),
    // Par intencionalmente cruzado: o rótulo em PT oferece inglês e vice-versa.
    switchLanguage: text("Ver em inglês", "Ver em português"),
    openMenu: text("Abrir menu", "Open menu"),
    closeMenu: text("Fechar menu", "Close menu"),
    home: text("Voltar ao topo", "Back to top"),
  },
  /*
   * Os títulos de seção quebram em duas linhas por decisão editorial: o "\n" é
   * a quebra, respeitada pelo utilitário `.section-title` (white-space:
   * pre-line). Vale só no site — o currículo monta seus blocos com
   * `dictionary.nav` e `dictionary.labels`, que seguem em linha única.
   */
  sections: {
    aboutEyebrow: text("Sobre", "About"),
    aboutTitle: text(
      "Front-end de ponta a ponta,\ndo Figma ao deploy",
      "End-to-end front-end,\nfrom Figma to deploy",
    ),
    experienceEyebrow: text("Experiência", "Experience"),
    experienceTitle: text(
      "De desenvolvedor a Front-end Lead\nem seis anos",
      "From developer to Front-end Lead\nin six years",
    ),
    skillsEyebrow: text("Competências", "Skills"),
    skillsTitle: text("Ferramentas\ne prática", "Tools\nand practice"),
    workEyebrow: text("Projetos", "Projects"),
    workTitle: text("Produtos\nem produção", "Products\nin production"),
    contactEyebrow: text("Contato", "Contact"),
    contactTitle: text("Vamos\nconversar", "Let's\ntalk"),
    contactBody: text(
      "Estou aberto a posições de liderança técnica em front-end, remotas ou híbridas. Respondo em até um dia útil.",
      "I'm open to front-end technical leadership roles, remote or hybrid. I reply within one business day.",
    ),
  },
  labels: {
    current: text("Atual", "Current"),
    present: text("Presente", "Present"),
    stack: text("Stack", "Stack"),
    about: text("Sobre o projeto", "About the project"),
    features: text("Funcionalidades", "Features"),
    contribution: text("Minha contribuição", "My contribution"),
    gallery: text("Galeria", "Gallery"),
    technologies: text("Tecnologias utilizadas", "Technologies used"),
    education: text("Formação", "Education"),
    certifications: text("Certificações", "Certifications"),
    languages: text("Idiomas", "Languages"),
    keywords: text("Palavras-chave", "Keywords"),
    profile: text("Resumo profissional", "Professional summary"),
    projects: text("Projetos em destaque", "Featured projects"),
    deliveredAt: text("Entregue na", "Delivered at"),
    allDeliveredAt: text(
      "Todos os projetos entregues na",
      "All projects delivered at",
    ),
  },
  footer: {
    rights: text("Todos os direitos reservados.", "All rights reserved."),
    builtWith: text(
      "Next.js, TypeScript e Tailwind CSS. Sem WebGL, sem bloat.",
      "Next.js, TypeScript and Tailwind CSS. No WebGL, no bloat.",
    ),
  },
} as const;
