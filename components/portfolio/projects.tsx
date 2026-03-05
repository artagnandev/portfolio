"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

type Project = {
  title: string;
  shortDescription: string;
  fullDescription: string[];
  images: string[];
  tags: string[];
  features: string[];
  liveUrl?: string;
  repoUrl?: string;
};

const projects: Project[] = [
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
  },
  {
    title: "Ultragaz",
    shortDescription:
      "Plataforma de gestão de pedidos para clientes e fornecedores de gás, centralizando todo o ciclo de compras.",
    fullDescription: [
      "A Ultragaz é uma plataforma completa de gestão de pedidos desenvolvida para otimizar a relação entre clientes e fornecedores no segmento de distribuição de gás. O sistema centraliza todo o ciclo de compras — desde a solicitação até a entrega — proporcionando visibilidade total sobre cada etapa do processo.",
      "Com foco em eficiência operacional, a plataforma oferece painéis de controle intuitivos, histórico detalhado de transações e ferramentas de acompanhamento em tempo real, permitindo que gestores e equipes de campo tomem decisões mais ágeis e baseadas em dados.",
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
  },
  {
    title: "ClassificAgro",
    shortDescription:
      "Plataforma de vagas do agronegócio que conecta candidatos qualificados a empresas do setor rural.",
    fullDescription: [
      "O ClassificAgro é uma plataforma especializada em recrutamento e seleção para o agronegócio, conectando profissionais qualificados a empresas do setor rural de forma ágil e direcionada. A plataforma atende tanto candidatos em busca de oportunidades quanto empresas que precisam encontrar talentos com experiência no campo.",
      "Para candidatos, o sistema oferece busca inteligente de vagas, criação de perfil profissional e candidatura simplificada. Para empresas, disponibiliza ferramentas completas de publicação de vagas, triagem de currículos e gestão de processos seletivos — tudo pensado para as particularidades do mercado agro.",
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
  },
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const [dialogApi, setDialogApi] = useState<CarouselApi>();
  const [dialogCurrent, setDialogCurrent] = useState(0);
  const [dialogCount, setDialogCount] = useState(0);

  function onApiChange(newApi: CarouselApi) {
    setApi(newApi);
    if (!newApi) return;

    const updateButtons = () => {
      setCanScrollPrev(newApi.canScrollPrev());
      setCanScrollNext(newApi.canScrollNext());
    };

    updateButtons();
    newApi.on("select", updateButtons);
    newApi.on("reInit", updateButtons);
  }

  const onDialogApiChange = useCallback((newApi: CarouselApi) => {
    setDialogApi(newApi);
    if (!newApi) return;

    const updateState = () => {
      setDialogCurrent(newApi.selectedScrollSnap());
      setDialogCount(newApi.scrollSnapList().length);
    };

    updateState();
    newApi.on("select", updateState);
    newApi.on("reInit", updateState);
  }, []);

  return (
    <>
      <section
        id="projetos"
        className="scroll-mt-24 px-6 py-24 relative"
        aria-labelledby="projetos-titulo"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex items-center gap-3">
            <div
              className="h-px flex-1 max-w-12 bg-primary"
              aria-hidden="true"
            />
            <h2
              id="projetos-titulo"
              className="text-xs font-semibold uppercase tracking-widest text-primary"
            >
              Projetos
            </h2>
          </div>

          <div className="mb-12 flex items-end justify-between gap-4">
            <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
              Trabalhos em destaque
            </h3>

            <div className="hidden items-center gap-2 sm:flex">
              <button
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted-foreground"
                aria-label="Projeto anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted-foreground"
                aria-label="Próximo projeto"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            setApi={onApiChange}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {projects.map((project) => (
                <CarouselItem
                  key={project.title}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card text-left transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-secondary">
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-card/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h4 className="mb-2 text-base font-bold text-foreground line-clamp-1">
                        {project.title}
                      </h4>

                      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {project.shortDescription}
                      </p>

                      <div
                        className="flex flex-wrap gap-1.5"
                        aria-label="Tecnologias utilizadas"
                      >
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Subtle grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow effect */}
        <div
          className="pointer-events-none absolute top-1/4 left-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"
          aria-hidden="true"
        />
      </section>

      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] p-0 gap-0 overflow-hidden flex flex-col">
          {selectedProject && (
            <>
              <div className="relative w-full shrink-0 bg-secondary">
                <Carousel
                  opts={{ align: "start", loop: true }}
                  setApi={onDialogApiChange}
                  className="w-full"
                >
                  <CarouselContent>
                    {selectedProject.images.map((img, i) => (
                      <CarouselItem key={i}>
                        <div className="relative aspect-video w-full overflow-hidden">
                          <Image
                            src={img}
                            alt={`${selectedProject.title} - imagem ${i + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {dialogCount > 1 && (
                    <>
                      <button
                        onClick={() => dialogApi?.scrollPrev()}
                        className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
                        aria-label="Imagem anterior"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={() => dialogApi?.scrollNext()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
                        aria-label="Próxima imagem"
                      >
                        <ChevronRight size={16} />
                      </button>

                      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                        {selectedProject.images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => dialogApi?.scrollTo(i)}
                            className={`h-1.5 rounded-full transition-all ${
                              i === dialogCurrent
                                ? "w-6 bg-primary"
                                : "w-1.5 bg-foreground/30"
                            }`}
                            aria-label={`Ir para imagem ${i + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </Carousel>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-foreground">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    Detalhes do projeto {selectedProject.title}
                  </DialogDescription>
                </DialogHeader>

                <div
                  className="flex flex-wrap gap-2"
                  aria-label="Tecnologias utilizadas"
                >
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Sobre o projeto
                  </h4>
                  <div className="space-y-2">
                    {selectedProject.fullDescription.map((desc, i) => (
                      <p
                        key={i}
                        className="text-sm leading-relaxed text-muted-foreground"
                      >
                        {desc}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Funcionalidades
                  </h4>
                  <ul className="space-y-1">
                    {selectedProject.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {(selectedProject.liveUrl || selectedProject.repoUrl) && (
                  <div className="flex flex-wrap gap-3 border-t border-border pt-4">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
                      >
                        <ExternalLink size={14} />
                        Ver projeto
                      </a>
                    )}
                    {selectedProject.repoUrl && (
                      <a
                        href={selectedProject.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/50 hover:text-primary"
                      >
                        <Github size={14} />
                        Código fonte
                      </a>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
