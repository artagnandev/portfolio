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
import { projects, type Project } from "@/data/projects";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [dialogApi, setDialogApi] = useState<CarouselApi>();
  const [dialogCurrent, setDialogCurrent] = useState(0);
  const [dialogCount, setDialogCount] = useState(0);

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
        <div className="relative z-10 mx-auto max-w-5xl">
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

          <h3 className="mb-12 text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
            Trabalhos em destaque
          </h3>

          <ul className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.title} className="min-w-0">
                <button
                  type="button"
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
              </li>
            ))}
            <li className="min-w-0">
              <div
                className="relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-dashed border-primary/20 bg-linear-to-b from-primary/[0.07] via-card/60 to-muted/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur"
                role="note"
                aria-label="Contribuição em mais de 50 projetos"
              >
                <div
                  className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden"
                  aria-hidden="true"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_30%,var(--primary)_0%,transparent_55%)] opacity-[0.14]" />
                  <div className="pointer-events-none absolute -left-10 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
                  <div className="pointer-events-none absolute -right-8 bottom-0 h-36 w-36 rounded-full bg-primary/15 blur-2xl" />

                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="flex items-center">
                      <span className="text-5xl font-extrabold leading-none tracking-tighter text-primary tabular-nums sm:text-6xl">
                        +50
                      </span>
                    </div>

                    <p className="text-xs font-medium uppercase tracking-widest leading-snug text-muted-foreground">
                      projetos desenvolvidos
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Subtle grid background */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
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
        <DialogContent
          className="sm:max-w-2xl max-h-[90vh] p-0 gap-0 overflow-hidden flex flex-col"
          closeButtonClassName="rounded-full bg-black/55 p-2 text-white opacity-100 shadow-md ring-black/20 backdrop-blur-sm transition-colors hover:bg-black/75 hover:text-white data-[state=open]:bg-black/55 data-[state=open]:text-white focus:ring-white/40 [&_svg]:size-5"
        >
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
                                : "w-1.5 bg-black/45 shadow-sm ring-1 ring-black/15 backdrop-blur-[1px] dark:bg-white/35 dark:ring-white/20"
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

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Minha contribuição
                  </h4>
                  <ul className="space-y-1">
                    {selectedProject.contributions.map((contribution, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span
                          className="mt-2 h-1 w-1 min-w-1 shrink-0 rounded-full bg-primary/60"
                          aria-hidden="true"
                        />
                        {contribution}
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
                        Ver em produção
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
