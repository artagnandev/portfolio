"use client";

import { useState } from "react";
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
  image: string;
  tags: string[];
  features: string[];
  liveUrl?: string;
  repoUrl?: string;
};

const projects: Project[] = [
  {
    title: "Sistema de Gestão Empresarial",
    shortDescription:
      "Plataforma completa para gerenciamento de processos internos, com dashboards interativos e relatórios em tempo real.",
    fullDescription: [
      "Sistema web desenvolvido para otimizar a gestão de processos internos de empresas de médio porte, com foco em usabilidade e performance.",
      "A plataforma inclui dashboards interativos com gráficos e métricas em tempo real, permitindo tomada de decisão baseada em dados.",
      "Implementação de autenticação robusta, controle de permissões por perfil e histórico completo de auditoria.",
    ],
    image: "/placeholder.svg",
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    features: [
      "Dashboards interativos com gráficos em tempo real",
      "Controle de acesso baseado em perfis",
      "Relatórios exportáveis em PDF e Excel",
      "Notificações em tempo real via WebSocket",
      "Interface responsiva e acessível",
    ],
  },
  {
    title: "App de Delivery Mobile",
    shortDescription:
      "Aplicativo mobile para delivery com rastreamento em tempo real, catálogo de produtos e sistema de pagamento integrado.",
    fullDescription: [
      "Aplicativo mobile desenvolvido com React Native para plataformas iOS e Android, focado na experiência do usuário final.",
      "Integração com APIs de geolocalização para rastreamento em tempo real de pedidos, oferecendo transparência ao cliente.",
      "Sistema de pagamento integrado com múltiplas formas de pagamento e checkout otimizado para conversão.",
    ],
    image: "/placeholder.svg",
    tags: ["React Native", "TypeScript", "Expo", "Firebase"],
    features: [
      "Rastreamento de pedidos em tempo real",
      "Catálogo de produtos com busca e filtros",
      "Múltiplas formas de pagamento",
      "Push notifications para status do pedido",
      "Avaliação e histórico de pedidos",
    ],
  },
  {
    title: "E-commerce Institucional",
    shortDescription:
      "Loja virtual de alta performance com SSR, SEO otimizado e integração com gateway de pagamento.",
    fullDescription: [
      "E-commerce desenvolvido com Next.js utilizando Server-Side Rendering para máxima performance e otimização de SEO.",
      "Implementação de catálogo dinâmico com filtros avançados, carrinho persistente e checkout multi-etapas.",
      "Otimização de Core Web Vitals resultando em pontuação acima de 90 no Lighthouse em todas as métricas.",
    ],
    image: "/placeholder.svg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    features: [
      "Server-Side Rendering para SEO",
      "Catálogo com filtros avançados",
      "Carrinho persistente e checkout otimizado",
      "Integração com gateway de pagamento",
      "Core Web Vitals acima de 90",
    ],
  },
  {
    title: "Portal de Conteúdo WordPress",
    shortDescription:
      "Site institucional com CMS customizado, blog integrado e painel administrativo personalizado.",
    fullDescription: [
      "Portal de conteúdo desenvolvido com WordPress headless, consumindo a API REST para renderização no front-end React.",
      "Customização completa do painel administrativo para facilitar a gestão de conteúdo pela equipe editorial.",
      "Implementação de SEO técnico avançado, incluindo schema markup, sitemap dinâmico e otimização de imagens.",
    ],
    image: "/placeholder.svg",
    tags: ["WordPress", "React", "PHP", "SEO"],
    features: [
      "CMS headless com API REST",
      "Painel administrativo customizado",
      "Blog com categorias e tags",
      "SEO técnico avançado",
      "Otimização de imagens automática",
    ],
  },
  {
    title: "Dashboard de Analytics",
    shortDescription:
      "Painel de métricas e análises com visualizações interativas e exportação de relatórios customizados.",
    fullDescription: [
      "Dashboard de analytics desenvolvido para consolidar dados de múltiplas fontes em uma interface unificada e intuitiva.",
      "Gráficos interativos com drill-down, permitindo análise detalhada de métricas de negócio em diferentes granularidades.",
      "Sistema de exportação de relatórios customizados em múltiplos formatos, com agendamento de envio automático.",
    ],
    image: "/placeholder.svg",
    tags: ["React", "TypeScript", "D3.js", "Node.js"],
    features: [
      "Gráficos interativos com drill-down",
      "Consolidação de múltiplas fontes de dados",
      "Relatórios customizáveis e exportáveis",
      "Filtros avançados por período e segmento",
      "Agendamento de relatórios automáticos",
    ],
  },
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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

  return (
    <>
      <section
        id="projetos"
        className="scroll-mt-24 px-6 py-24"
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
                        src={project.image}
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

                      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
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
      </section>

      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] p-0 gap-0 overflow-hidden">
          {selectedProject && (
            <>
              <div className="relative aspect-video w-full overflow-hidden bg-secondary">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              <ScrollArea className="max-h-[calc(90vh-240px)]">
                <div className="p-6 space-y-6">
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
                    <ul className="space-y-2">
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
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
