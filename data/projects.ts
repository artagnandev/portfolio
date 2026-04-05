export type Project = {
  title: string;
  shortDescription: string;
  fullDescription: string[];
  images: string[];
  tags: string[];
  features: string[];
  liveUrl?: string;
  repoUrl?: string;
  contributions: string[];
};

export const projects: Project[] = [
  {
    title: "BomDia (Web + Mobile)",
    shortDescription:
      "Simplifica fluxos de trabalho de campo com coleta mobile de dados da obra e relatórios diários em tempo real.",
    fullDescription: [
      "O BomDia simplifica os fluxos de trabalho de campo através da coleta direta, fácil e via mobile dos dados da obra, gerando, em tempo real, relatórios diários precisos que ajudarão a ter insights importantes para as decisões de gerenciamento da obra.",
    ],
    images: [
      "/project-images/bomdia-1.png",
      "/project-images/bomdia-2.png",
      "/project-images/bomdia-3.png",
      "/project-images/bomdia-4.png",
      "/project-images/bomdia-5.png",
      "/project-images/bomdia-6.png",
    ],
    tags: [
      "React",
      "TypeScript",
      "React Native",
      "Material UI",
      "Tailwind CSS",
    ],
    features: [
      "Gráficos e tabelas interativas para análise de dados",
      "Mapas interativos para visualização de localização de obra",
      "Filtros e ordenação de dados para facilitar a busca",
      "Exportação de dados em formatos CSV e Excel",
      "Integração com sistemas de gestão de projetos",
      "Coleta de dados de campo via dispositivos móveis",
      "Geração de relatórios diários em tempo real",
      "Sincronização de dados entre web e mobile",
      "Insights para decisões de gerenciamento de obra",
      "Interface intuitiva para equipes de campo",
    ],
    contributions: [
      "Integração com API Rest",
      "Sistema de autenticação com JWT",
      "Desenvolvimento de componentes e telas (Figma to code)",
      "Desenvolvimento de hooks personalizados e funções utilitárias",
      "Reuniões com stakeholders para entender as necessidades e feedbacks",
    ],
  },
  {
    title: "Ultragaz",
    shortDescription:
      "Plataforma de gestão de pedidos para clientes e fornecedores de gás, centralizando todo o ciclo de compras.",
    fullDescription: [
      "A Ultragaz é uma plataforma completa de gestão de pedidos desenvolvida para otimizar a relação entre clientes e fornecedores no segmento de distribuição de gás. O sistema centraliza todo o ciclo de compras, desde a solicitação até a entrega, proporcionando visibilidade total sobre cada etapa do processo.",
    ],
    images: [
      "/project-images/ultragaz-1.png",
      "/project-images/ultragaz-2.png",
      "/project-images/ultragaz-3.png",
      "/project-images/ultragaz-4.png",
      "/project-images/ultragaz-5.png",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "TanStack Table"],
    features: [
      "Gestão completa do ciclo de pedidos de ponta a ponta",
      "Tabelas avançadas com filtros, ordenação e paginação via TanStack Table",
      "Painéis de controle com métricas de vendas e desempenho",
      "Histórico detalhado de transações e pedidos",
      "Gestão de clientes e fornecedores em uma única plataforma",
      "Acompanhamento de status de entrega em tempo real",
      "Interface responsiva e acessível para diferentes dispositivos",
    ],
    contributions: [
      "Integração com API Rest",
      "Sistema de autenticação com JWT",
      "Desenvolvimento de componentes e telas (Figma to code)",
      "Desenvolvimento de hooks personalizados e funções utilitárias",
      "Reuniões com stakeholders para entender as necessidades e feedbacks",
      "Deploy da aplicação em produção",
    ],
  },
  {
    title: "ClassificAgro",
    shortDescription:
      "Plataforma de vagas do agronegócio que conecta candidatos qualificados a empresas do setor rural.",
    fullDescription: [
      "A plataforma atende tanto candidatos em busca de oportunidades quanto empresas que precisam encontrar talentos com experiência no campo.",
      "Para candidatos, o sistema oferece busca inteligente de vagas, criação de perfil profissional e candidatura simplificada. Para empresas, disponibiliza ferramentas completas de publicação de vagas, triagem de currículos e gestão de processos seletivos, tudo pensado para as particularidades do mercado agro.",
    ],
    images: [
      "/project-images/classificagro-1.png",
      "/project-images/classificagro-2.png",
      "/project-images/classificagro-3.png",
      "/project-images/classificagro-4.png",
      "/project-images/classificagro-5.png",
      "/project-images/classificagro-6.png",
      "/project-images/classificagro-7.png",
      "/project-images/classificagro-8.png",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: [
      "Busca e filtros avançados de vagas por região, área e nível de experiência",
      "Criação de perfil profissional e upload de currículo",
      "Painel para empresas com publicação e gestão de vagas",
      "Triagem e acompanhamento de candidaturas",
      "Cadastro dual: fluxos dedicados para candidatos e empresas",
      "Notificações de novas vagas compatíveis com o perfil",
      "Interface responsiva otimizada para acesso mobile",
    ],
    liveUrl: "https://classificagro.com.br/",
    contributions: [
      "Integração com API Rest",
      "Sistema de autenticação com JWT",
      "Desenvolvimento de componentes e telas (Figma to code)",
      "Desenvolvimento dos sites públicos (candidatos e empresas)",
      "Desenvolvimento de hooks personalizados e funções utilitárias",
      "Reuniões com stakeholders para entender as necessidades e feedbacks",
    ],
  },
  {
    title: "Grana",
    shortDescription:
      "Sistema de gestão financeira de obra: insumos, orçamentos e acompanhamento do fluxo de caixa em um só lugar.",
    fullDescription: [
      "O Grana centraliza a gestão financeira da obra, permitindo controlar insumos, orçamentos e despesas com visibilidade clara do que foi planejado versus o executado.",
    ],
    images: [
      "/project-images/grana-1.png",
      "/project-images/grana-2.png",
      "/project-images/grana-3.png",
      "/project-images/grana-4.png",
      "/project-images/grana-5.png",
      "/project-images/grana-6.png",
    ],
    tags: ["Next.js", "TanStack Table", "Shadcn UI", "Tailwind CSS"],
    features: [
      "Gestão de insumos e vínculo com orçamento da obra",
      "Acompanhamento de orçamentos e comparativos planejado x realizado",
      "Tabelas avançadas com TanStack Table (filtros, ordenação e paginação)",
      "Interface construída com Shadcn UI e Tailwind CSS",
      "Fluxo de caixa e visão consolidada das despesas",
      "Relatórios para apoiar decisões financeiras no canteiro",
    ],
    contributions: [
      "Desenvolvimento de telas e componentes com Next.js e Shadcn UI",
      "Implementação de tabelas e fluxos de dados com TanStack Table",
      "Integração com API e regras de negócio de gestão financeira",
      "Ajustes de UX e responsividade com Tailwind CSS",
    ],
  },
  {
    title: "Instituto Algar",
    shortDescription:
      "Site institucional para apresentação de programa social, com foco em clareza de mensagem e acessibilidade.",
    fullDescription: [
      "O site do Instituto Algar apresenta de forma objetiva o programa social da instituição, destacando impacto, iniciativas e formas de participação.",
      "A solução combina WordPress para gestão de conteúdo com front-end em HTML, CSS, JavaScript e Tailwind, permitindo atualizações frequentes sem perder consistência visual.",
    ],
    images: [
      "/project-images/algar-1.png",
      "/project-images/algar-2.png",
      "/project-images/algar-3.png",
    ],
    tags: ["WordPress", "HTML", "CSS", "JavaScript", "Tailwind CSS"],
    features: [
      "Páginas institucionais com narrativa do programa social",
      "Gestão de conteúdo via WordPress",
      "Layout responsivo com Tailwind CSS",
      "Interações leves com JavaScript",
      "Estrutura semântica em HTML e estilização em CSS",
      "Seções para impacto, iniciativas e contato",
    ],
    contributions: [
      "Desenvolvimento e customização do tema no WordPress",
      "Implementação de layout e componentes em HTML, CSS e Tailwind",
      "Scripts em JavaScript para interações e melhorias de UX",
      "Alinhamento com o time de conteúdo para publicação e manutenção",
    ],
    liveUrl: "https://www.institutoalgar.org.br/",
  },
];
