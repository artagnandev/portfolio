import type { Project, ProjectImage } from "./types";

/**
 * Gera as capturas sequenciais de um projeto.
 * Evita repetir 28 objetos de imagem quase idênticos à mão.
 */
const shots = (slug: string, count: number, name: string): ProjectImage[] =>
  Array.from({ length: count }, (_, index) => ({
    src: `/project-images/${slug}-${index + 1}.png`,
    alt: {
      pt: `Tela ${index + 1} do sistema ${name}`,
      en: `Screen ${index + 1} of the ${name} system`,
    },
  }));

export const projects: Project[] = [
  {
    slug: "bomdia",
    title: "BomDia",
    segment: { pt: "Construção civil", en: "Construction" },
    period: "2022 — 2024",
    summary: {
      pt: "Substitui o diário de obra em papel por coleta digital em campo, gerando relatórios diários em tempo real para decisão de gerenciamento.",
      en: "Replaces the paper construction log with digital field capture, producing real-time daily reports for management decisions.",
    },
    description: {
      pt: [
        "Plataforma web e mobile que digitaliza o diário de obra. Equipes de campo registram avanço, efetivo e ocorrências direto do celular; o escritório recebe relatórios consolidados em tempo real.",
        "O desafio central foi manter uma única fonte de verdade entre duas plataformas com conectividade instável no canteiro.",
      ],
      en: [
        "Web and mobile platform that digitises the construction daily log. Field crews record progress, headcount and incidents straight from their phones; the office receives consolidated reports in real time.",
        "The core challenge was keeping a single source of truth across two platforms with unreliable connectivity on site.",
      ],
    },
    stack: ["React", "React Native", "TypeScript", "Material UI", "Tailwind CSS"],
    features: {
      pt: [
        "Gráficos e tabelas interativas para análise de avanço de obra",
        "Mapa de localização do canteiro",
        "Filtros e ordenação sobre grandes volumes de registro",
        "Exportação de dados em CSV e Excel",
        "Coleta de dados de campo via dispositivo móvel",
        "Geração de relatórios diários em tempo real",
        "Sincronização entre web e mobile em uma única fonte de verdade",
      ],
      en: [
        "Interactive charts and tables for construction progress analysis",
        "Site location map",
        "Filtering and sorting over large record volumes",
        "Data export to CSV and Excel",
        "Field data capture from mobile devices",
        "Real-time daily report generation",
        "Web and mobile sync against a single source of truth",
      ],
    },
    contributions: {
      pt: [
        "Integração com a API REST e sistema de autenticação JWT",
        "Sincronização de dados entre as versões web e mobile",
        "Conversão de 6 fluxos de tela do Figma para código",
        "Custom hooks e utilitários compartilhados entre plataformas",
        "Reuniões de requisitos e feedback com stakeholders",
      ],
      en: [
        "REST API integration and JWT authentication system",
        "Data synchronisation between the web and mobile versions",
        "Conversion of 6 Figma screen flows into code",
        "Custom hooks and utilities shared across platforms",
        "Requirements and feedback sessions with stakeholders",
      ],
    },
    images: shots("bomdia", 6, "BomDia"),
  },
  {
    slug: "ultragaz",
    title: "Ultragaz",
    segment: { pt: "Distribuição de energia", en: "Energy distribution" },
    period: "2023 — 2024",
    summary: {
      pt: "Centraliza o ciclo completo de compras entre clientes e fornecedores de gás, da solicitação à entrega.",
      en: "Centralises the full purchase cycle between gas customers and suppliers, from request to delivery.",
    },
    description: {
      pt: [
        "Sistema de gestão de pedidos para distribuição de gás. Clientes solicitam, fornecedores atendem, e ambos acompanham cada etapa no mesmo painel.",
        "O volume de pedidos exigia tabelas capazes de filtrar, ordenar e paginar milhares de linhas sem travar o navegador.",
      ],
      en: [
        "Order management system for gas distribution. Customers request, suppliers fulfil, and both track every step in the same dashboard.",
        "Order volume demanded tables able to filter, sort and paginate thousands of rows without stalling the browser.",
      ],
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "TanStack Table"],
    features: {
      pt: [
        "Gestão de pedidos de ponta a ponta",
        "Tabelas de alta densidade com filtro, ordenação e paginação via TanStack Table",
        "Painéis de métricas de vendas e desempenho",
        "Histórico detalhado de transações",
        "Gestão de clientes e fornecedores na mesma plataforma",
        "Acompanhamento de status de entrega em tempo real",
      ],
      en: [
        "End-to-end order management",
        "High-density tables with filtering, sorting and pagination via TanStack Table",
        "Sales and performance metric dashboards",
        "Detailed transaction history",
        "Customer and supplier management on a single platform",
        "Real-time delivery status tracking",
      ],
    },
    contributions: {
      pt: [
        "Integração com a API REST e autenticação JWT",
        "Construção das tabelas de alta densidade com TanStack Table",
        "Desenvolvimento de componentes e telas a partir do Figma",
        "Deploy da aplicação em produção",
      ],
      en: [
        "REST API integration and JWT authentication",
        "Built the high-density tables with TanStack Table",
        "Component and screen development from Figma",
        "Production deployment of the application",
      ],
    },
    images: shots("ultragaz", 5, "Ultragaz"),
  },
  {
    slug: "classificagro",
    title: "ClassificAgro",
    segment: { pt: "Agronegócio", en: "Agribusiness" },
    period: "2024",
    summary: {
      pt: "Marketplace de vagas que conecta candidatos qualificados a empresas do setor rural, com fluxos dedicados aos dois públicos.",
      en: "Job marketplace connecting qualified candidates to rural-sector companies, with dedicated flows for both audiences.",
    },
    description: {
      pt: [
        "Plataforma em produção que atende dois públicos com necessidades opostas: candidatos buscando oportunidade no campo e empresas buscando talento com experiência rural.",
        "O perfil de uso é predominantemente móvel, o que definiu a estratégia mobile-first de toda a interface.",
      ],
      en: [
        "Live platform serving two audiences with opposite needs: candidates looking for rural opportunities and companies looking for talent with field experience.",
        "Usage is predominantly mobile, which drove the mobile-first strategy across the whole interface.",
      ],
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: {
      pt: [
        "Busca e filtros avançados por região, área e nível de experiência",
        "Perfil profissional e upload de currículo",
        "Painel de publicação e gestão de vagas para empresas",
        "Triagem e acompanhamento de candidaturas",
        "Cadastro dual com fluxos dedicados a candidato e empresa",
        "Interface responsiva otimizada para acesso mobile",
      ],
      en: [
        "Advanced search and filters by region, field and experience level",
        "Professional profile and resume upload",
        "Job posting and management dashboard for companies",
        "Application screening and tracking",
        "Dual signup with dedicated candidate and company flows",
        "Responsive interface optimised for mobile access",
      ],
    },
    contributions: {
      pt: [
        "Desenvolvimento dos 2 sites públicos e dos fluxos de cadastro dual",
        "Integração com a API REST e autenticação JWT",
        "Busca e filtros avançados de vagas",
        "Custom hooks e utilitários do projeto",
      ],
      en: [
        "Built both public sites and the dual signup flows",
        "REST API integration and JWT authentication",
        "Advanced job search and filtering",
        "Project custom hooks and utilities",
      ],
    },
    images: shots("classificagro", 8, "ClassificAgro"),
    liveUrl: "https://classificagro.com.br/",
  },
  {
    slug: "grana",
    title: "Grana",
    segment: { pt: "Construção civil", en: "Construction" },
    period: "2024 — 2025",
    summary: {
      pt: "Consolida insumos, orçamentos e fluxo de caixa da obra em uma visão única de planejado versus realizado.",
      en: "Consolidates materials, budgets and site cash flow into a single planned-versus-actual view.",
    },
    description: {
      pt: [
        "Sistema de controle financeiro de canteiro. O gestor vê, em um só lugar, o que foi orçado, o que foi gasto e onde a obra está desviando do plano.",
        "As regras de negócio financeiras exigiam precisão na camada de dados e tabelas que suportassem o detalhamento por insumo.",
      ],
      en: [
        "Construction site financial control system. Managers see, in one place, what was budgeted, what was spent and where the project is drifting from plan.",
        "The financial business rules demanded precision in the data layer and tables able to drill down per material.",
      ],
    },
    stack: ["Next.js", "TypeScript", "TanStack Table", "Shadcn UI", "Tailwind CSS"],
    features: {
      pt: [
        "Gestão de insumos vinculada ao orçamento da obra",
        "Comparativo planejado versus realizado",
        "Tabelas avançadas com TanStack Table",
        "Fluxo de caixa e visão consolidada de despesas",
        "Relatórios de apoio à decisão no canteiro",
      ],
      en: [
        "Material management linked to the project budget",
        "Planned-versus-actual comparison",
        "Advanced tables with TanStack Table",
        "Cash flow and consolidated expense view",
        "Decision-support reports for the site",
      ],
    },
    contributions: {
      pt: [
        "Desenvolvimento de telas e componentes com Next.js e Shadcn UI",
        "Tabelas e fluxos de dados com TanStack Table",
        "Camada de dados integrada à API e regras de negócio financeiras",
        "Ajustes de UX e responsividade em 6 telas",
      ],
      en: [
        "Screen and component development with Next.js and Shadcn UI",
        "Tables and data flows with TanStack Table",
        "API-integrated data layer and financial business rules",
        "UX and responsiveness work across 6 screens",
      ],
    },
    images: shots("grana", 6, "Grana"),
  },
  {
    slug: "instituto-algar",
    title: "Instituto Algar",
    segment: { pt: "Impacto social", en: "Social impact" },
    period: "2023",
    summary: {
      pt: "Site institucional de programa social, com foco em clareza de mensagem, acessibilidade e autonomia editorial.",
      en: "Institutional site for a social programme, focused on message clarity, accessibility and editorial autonomy.",
    },
    description: {
      pt: [
        "Site do programa social do Instituto Algar. O objetivo era comunicar impacto com clareza e permitir que o time de conteúdo publicasse sem depender de desenvolvimento.",
        "A combinação de WordPress com tema customizado resolveu os dois lados: autonomia editorial sem perder controle sobre semântica e performance.",
      ],
      en: [
        "Site for Instituto Algar's social programme. The goal was to communicate impact clearly and let the content team publish without depending on development.",
        "Pairing WordPress with a custom theme solved both sides: editorial autonomy without giving up control of semantics and performance.",
      ],
    },
    stack: ["WordPress", "HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
    features: {
      pt: [
        "Páginas institucionais com a narrativa do programa social",
        "Gestão de conteúdo via WordPress",
        "Layout responsivo em Tailwind CSS",
        "Estrutura semântica em HTML com foco em acessibilidade",
        "SEO On-Page aplicado às seções institucionais",
      ],
      en: [
        "Institutional pages carrying the social programme's narrative",
        "Content management through WordPress",
        "Responsive layout in Tailwind CSS",
        "Semantic HTML structure focused on accessibility",
        "On-page SEO applied across institutional sections",
      ],
    },
    contributions: {
      pt: [
        "Desenvolvimento e customização do tema WordPress",
        "Implementação de 6 seções em HTML semântico e Tailwind CSS",
        "Interações em JavaScript e melhorias de UX",
        "Alinhamento com o time de conteúdo para publicação e manutenção",
      ],
      en: [
        "WordPress theme development and customisation",
        "Implementation of 6 sections in semantic HTML and Tailwind CSS",
        "JavaScript interactions and UX improvements",
        "Alignment with the content team for publishing and maintenance",
      ],
    },
    images: shots("algar", 3, "Instituto Algar"),
    liveUrl: "https://www.institutoalgar.org.br/",
  },
];
