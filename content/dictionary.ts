import type { LocalizedText } from "./types";

const text = (pt: string, en: string): LocalizedText => ({ pt, en });

export const dictionary = {
  meta: {
    title: text(
      "David Artagnan — Front-end Lead | React, Next.js, TypeScript",
      "David Artagnan — Front-end Lead | React, Next.js, TypeScript",
    ),
    description: text(
      "Front-end Lead com 6 anos de experiência em React, Next.js, React Native e TypeScript. 5 produtos em produção, 35 funcionalidades e 28 telas entregues do Figma ao deploy. Uberlândia, MG — remoto e híbrido.",
      "Front-end Lead with 6 years of experience in React, Next.js, React Native and TypeScript. 5 products in production, 35 features and 28 screens delivered from Figma to deploy. Based in Brazil — open to remote work.",
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
    experience: text("Trajetória", "Experience"),
    skills: text("Competências", "Skills"),
    work: text("Obra", "Work"),
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
    openProject: text("Abrir detalhes do projeto", "Open project details"),
    previousImage: text("Imagem anterior", "Previous image"),
    nextImage: text("Próxima imagem", "Next image"),
    goToImage: text("Ir para a imagem", "Go to image"),
    toggleTheme: text("Alternar tema", "Toggle theme"),
    // Par intencionalmente cruzado: o rótulo em PT oferece inglês e vice-versa.
    switchLanguage: text("Ver em inglês", "Ver em português"),
    openMenu: text("Abrir menu", "Open menu"),
    closeMenu: text("Fechar menu", "Close menu"),
    home: text("Voltar ao topo", "Back to top"),
  },
  sections: {
    aboutEyebrow: text("Sobre", "About"),
    aboutTitle: text(
      "Interface é onde a decisão de negócio encontra a pessoa que usa.",
      "The interface is where a business decision meets the person using it.",
    ),
    experienceEyebrow: text("Trajetória", "Experience"),
    experienceTitle: text("Seis anos, quatro setores", "Six years, four industries"),
    skillsEyebrow: text("Competências", "Skills"),
    skillsTitle: text("Ferramentas e prática", "Tools and practice"),
    workEyebrow: text("Obra", "Work"),
    workTitle: text("Produtos em produção", "Products in production"),
    contactEyebrow: text("Contato", "Contact"),
    contactTitle: text("Vamos conversar", "Let's talk"),
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
    technologies: text("Tecnologias utilizadas", "Technologies used"),
    education: text("Formação", "Education"),
    certifications: text("Certificações", "Certifications"),
    languages: text("Idiomas", "Languages"),
    keywords: text("Palavras-chave", "Keywords"),
    profile: text("Resumo profissional", "Professional summary"),
    projects: text("Projetos em destaque", "Featured projects"),
  },
  footer: {
    rights: text("Todos os direitos reservados.", "All rights reserved."),
    builtWith: text(
      "Next.js, TypeScript e Tailwind CSS. Sem WebGL, sem bloat.",
      "Next.js, TypeScript and Tailwind CSS. No WebGL, no bloat.",
    ),
  },
} as const;
