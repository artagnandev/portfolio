import type { EducationEntry, Experience, LocalizedText, SkillGroup } from "./types";

export const experiences: Experience[] = [
  {
    company: "Flow Lab Tech",
    role: { pt: "Front-end Lead", en: "Front-end Lead" },
    start: "2025-01",
    end: null,
    location: { pt: "Uberlândia, MG", en: "Uberlândia, Brazil" },
    bullets: {
      pt: [
        "Lidero a estratégia de front-end da empresa, guiando a equipe na entrega de sistemas web e mobile para clientes de quatro segmentos: construção civil, distribuição de energia, agronegócio e impacto social.",
        "Defini arquiteturas escaláveis em React, Next.js e TypeScript, padronizando a camada de componentes e reduzindo retrabalho entre projetos com bibliotecas internas de hooks e utilitários.",
        "Conduzo reuniões de levantamento de requisitos e validação de entrega com stakeholders, mantendo o roadmap técnico alinhado aos objetivos de negócio.",
        "Estabeleci acessibilidade (ARIA, HTML semântico, navegação por teclado) e responsividade mobile-first como critério de aceite em 100% das interfaces entregues.",
        "Atuo em code review e mentoria técnica, disseminando Clean Code e TypeScript estrito no time.",
        "Incorporei agentes de IA ao fluxo de desenvolvimento do time sob guard-rails explícitos — contexto e convenções versionados no repositório, revisão humana obrigatória e checagem automatizada de tipos, lint e testes antes de qualquer merge.",
        "Uso IA para encurtar as etapas repetitivas da entrega (scaffolding, refatoração, cobertura de testes e documentação) sem abrir mão dos critérios de qualidade, mantendo o time em contato com as práticas correntes do mercado.",
      ],
      en: [
        "I lead the company's front-end strategy, guiding the team in delivering web and mobile systems for clients across four industries: construction, energy distribution, agribusiness and social impact.",
        "Defined scalable architectures in React, Next.js and TypeScript, standardising the component layer and cutting cross-project rework through internal hook and utility libraries.",
        "I run requirements-gathering and delivery-validation sessions with stakeholders, keeping the technical roadmap aligned with business goals.",
        "Established accessibility (ARIA, semantic HTML, keyboard navigation) and mobile-first responsiveness as acceptance criteria on 100% of delivered interfaces.",
        "I run code reviews and technical mentoring, spreading Clean Code and strict TypeScript across the team.",
        "Brought AI agents into the team's development workflow behind explicit guard-rails — context and conventions versioned in the repository, mandatory human review, and automated type, lint and test checks before any merge.",
        "I use AI to shorten the repetitive parts of delivery (scaffolding, refactoring, test coverage and documentation) without loosening quality criteria, keeping the team in touch with current market practice.",
      ],
    },
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "React Native",
      "Tailwind CSS",
      "Shadcn UI",
      "TanStack Table",
      "REST",
      "JWT",
      "AI Agents",
    ],
  },
  {
    company: "Flow Lab Tech",
    role: { pt: "Desenvolvedor Front-end", en: "Front-end Developer" },
    start: "2020-10",
    end: "2024-12",
    location: { pt: "Uberlândia, MG", en: "Uberlândia, Brazil" },
    bullets: {
      pt: [
        "Desenvolvi sistemas web e aplicativos mobile com React, Next.js e React Native, atuando em mais de 5 produtos entregues em produção.",
        "Implementei integrações completas com APIs REST e fluxos de autenticação JWT — login, refresh de token, controle de sessão e rotas protegidas — em todos os sistemas de gestão do portfólio.",
        "Converti mais de 28 telas do Figma para código produtivo, mantendo fidelidade visual e cobertura responsiva de mobile a desktop.",
        "Construí biblioteca de custom hooks e utilitários reutilizáveis, acelerando novas telas e eliminando duplicação de lógica entre módulos.",
        "Apliquei otimização de performance — redução de re-renders, memoização, code splitting e otimização de assets — em interfaces de alta densidade de dados.",
        "Modernizei sites institucionais com WordPress e front-end customizado, entregando autonomia de publicação ao time de conteúdo.",
      ],
      en: [
        "Built web systems and mobile apps with React, Next.js and React Native, shipping more than 5 products to production.",
        "Implemented full REST API integrations and JWT authentication flows — login, token refresh, session control and protected routes — across every management system in the portfolio.",
        "Converted 28+ Figma screens into production code, keeping visual fidelity and responsive coverage from mobile to desktop.",
        "Built a library of custom hooks and reusable utilities, speeding up new screens and removing duplicated logic across modules.",
        "Applied performance optimisation — fewer re-renders, memoisation, code splitting and asset optimisation — on data-dense interfaces.",
        "Modernised institutional sites with WordPress and custom front-end, giving the content team full publishing autonomy.",
      ],
    },
    stack: [
      "React",
      "Next.js",
      "React Native",
      "TypeScript",
      "JavaScript",
      "Material UI",
      "Tailwind CSS",
      "WordPress",
      "REST",
      "JWT",
    ],
  },
  {
    company: "Freelance",
    role: { pt: "Desenvolvedor Web Front-end", en: "Freelance Front-end Developer" },
    start: "2020-05",
    end: "2020-10",
    location: { pt: "Remoto", en: "Remote" },
    bullets: {
      pt: [
        "Executei projetos web sob medida do levantamento de requisitos à entrega final, atuando de forma autônoma em todo o ciclo do produto.",
        "Consolidei fundamentos de JavaScript e React que sustentaram a atuação corporativa seguinte.",
      ],
      en: [
        "Delivered bespoke web projects end to end, from requirements gathering to final handoff, working autonomously across the whole product cycle.",
        "Consolidated the JavaScript and React fundamentals that underpinned the corporate work that followed.",
      ],
    },
    stack: ["JavaScript", "React", "HTML5", "CSS3"],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: { pt: "Linguagens", en: "Languages" },
    items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
  },
  {
    label: { pt: "Frameworks e bibliotecas", en: "Frameworks and libraries" },
    items: [
      "React",
      "Next.js",
      "React Native",
      "Tailwind CSS",
      "Material UI",
      "Shadcn UI",
      "TanStack Table",
      "WordPress",
    ],
  },
  {
    label: { pt: "Integração e dados", en: "Integration and data" },
    items: [
      "APIs REST",
      "Autenticação JWT",
      "Gerenciamento de estado",
      "Custom hooks",
      "Sincronização offline/online",
    ],
  },
  {
    label: { pt: "Engenharia", en: "Engineering" },
    items: [
      "Clean Code",
      "Design systems",
      "Code review",
      "Responsive design",
      "Acessibilidade (ARIA, WCAG)",
      "Web performance",
      "SEO On-Page",
      "Desenvolvimento assistido por IA",
      "Guard-rails para agentes",
    ],
  },
  {
    label: { pt: "Ferramentas", en: "Tooling" },
    items: ["Git", "GitHub", "Figma", "Chrome DevTools", "Vercel", "Node.js", "npm", "bun"],
  },
  {
    label: { pt: "Liderança", en: "Leadership" },
    items: [
      "Liderança técnica",
      "Mentoria",
      "Comunicação com stakeholders",
      "Levantamento de requisitos",
    ],
  },
];

export const education: EducationEntry[] = [
  {
    institution: "Centro Universitário UNA",
    degree: {
      pt: "Tecnólogo em Tecnologia da Informação / Sistemas de Informação",
      en: "Technologist in Information Technology / Information Systems",
    },
    detail: { pt: "Graduação concluída", en: "Degree completed" },
    year: "2023",
  },
  {
    institution: "Rocketseat",
    degree: {
      pt: "Formação complementar em Desenvolvimento Web",
      en: "Complementary training in Web Development",
    },
    detail: { pt: "Tecnologia da Informação", en: "Information Technology" },
    year: "—",
  },
];

export const certifications: LocalizedText[] = [
  { pt: "HTTP e Performance", en: "HTTP and Performance" },
  { pt: "Fundamentos do React", en: "React Fundamentals" },
  { pt: "Aprofundando em Hooks", en: "Advanced React Hooks" },
  { pt: "Clean Code", en: "Clean Code" },
];

export const languages: { name: LocalizedText; level: LocalizedText }[] = [
  {
    name: { pt: "Português", en: "Portuguese" },
    level: { pt: "Nativo", en: "Native" },
  },
  {
    name: { pt: "Inglês", en: "English" },
    level: { pt: "Intermediário", en: "Intermediate" },
  },
];

/**
 * Bloco de palavras-chave da página de currículo. Existe para o parser de ATS
 * e para busca long-tail — é texto real, visível, não escondido.
 */
export const keywords: string[] = [
  "React.js",
  "Next.js",
  "React Native",
  "TypeScript",
  "JavaScript",
  "ES6+",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Material UI",
  "Shadcn UI",
  "TanStack Table",
  "Custom Hooks",
  "React Hooks",
  "Componentização",
  "Design System",
  "API REST",
  "RESTful",
  "JWT",
  "Autenticação",
  "Server-Side Rendering",
  "SSR",
  "SSG",
  "SPA",
  "Mobile First",
  "Responsive Design",
  "Acessibilidade",
  "ARIA",
  "WCAG",
  "Web Performance",
  "Core Web Vitals",
  "SEO On-Page",
  "Clean Code",
  "Code Review",
  "Git",
  "GitHub",
  "Figma to Code",
  "WordPress",
  "Chrome DevTools",
  "Vercel",
  "Node.js",
  "Desenvolvimento assistido por IA",
  "AI-assisted Development",
  "Agentes de IA",
  "AI Agents",
  "Guard-rails",
  "Front-end Lead",
  "Liderança Técnica",
  "Desenvolvimento Web",
  "Desenvolvimento Mobile",
  "Cross-platform",
];
