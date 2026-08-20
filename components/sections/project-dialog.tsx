"use client";

import { useCallback, useState, type ReactNode } from "react";
import Image from "next/image";
// lucide-react 1.x removeu os ícones de marca; GitBranch substitui o antigo Github.
import { ChevronLeft, ChevronRight, ExternalLink, GitBranch } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tag } from "@/components/primitives/tag";
import { dictionary } from "@/content/dictionary";
import type { Project } from "@/content/types";
import { t, type Locale } from "@/lib/i18n";

type ProjectDialogProps = {
  project: Project | null;
  locale: Locale;
  onClose: () => void;
};

export const ProjectDialog = ({ project, locale, onClose }: ProjectDialogProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const handleApi = useCallback((instance: CarouselApi) => {
    setApi(instance);
    if (!instance) return;

    const sync = () => {
      setCurrent(instance.selectedScrollSnap());
      setCount(instance.scrollSnapList().length);
    };

    sync();
    instance.on("select", sync);
    instance.on("reInit", sync);
  }, []);

  return (
    <Dialog open={project !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex h-dvh w-full max-w-none flex-col gap-0 overflow-hidden rounded-none border-0 bg-paper p-0 sm:h-auto sm:max-h-[88vh] sm:max-w-3xl sm:border sm:border-rule">
        {project && (
          <>
            <div className="relative shrink-0 border-b border-rule">
              <Carousel opts={{ align: "start", loop: true }} setApi={handleApi}>
                <CarouselContent>
                  {project.images.map((image) => (
                    <CarouselItem key={image.src}>
                      <div className="relative aspect-video w-full">
                        <Image
                          src={image.src}
                          alt={t(image.alt, locale)}
                          fill
                          sizes="(max-width: 640px) 100vw, 48rem"
                          className="object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => api?.scrollPrev()}
                    aria-label={t(dictionary.actions.previousImage, locale)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 border border-rule bg-paper/90 p-2 backdrop-blur-sm transition-colors hover:text-accent"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => api?.scrollNext()}
                    aria-label={t(dictionary.actions.nextImage, locale)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 border border-rule bg-paper/90 p-2 backdrop-blur-sm transition-colors hover:text-accent"
                  >
                    <ChevronRight size={16} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {project.images.map((image, index) => (
                      <button
                        key={image.src}
                        type="button"
                        onClick={() => api?.scrollTo(index)}
                        aria-label={`${t(dictionary.actions.goToImage, locale)} ${index + 1}`}
                        aria-current={index === current}
                        className={
                          index === current
                            ? "h-1 w-6 bg-accent"
                            : "h-1 w-1.5 bg-paper/70 ring-1 ring-ink/20"
                        }
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto p-7 sm:p-9">
              <DialogHeader className="space-y-2 text-left">
                <p className="eyebrow">
                  {t(project.segment, locale)} · {project.period}
                </p>
                <DialogTitle className="font-display text-step-3">{project.title}</DialogTitle>
                <DialogDescription className="text-ink-muted">
                  {t(project.summary, locale)}
                </DialogDescription>
              </DialogHeader>

              {project.metrics.length > 0 && (
                <dl className="flex flex-wrap gap-x-10 gap-y-4 border-y border-rule py-5">
                  {project.metrics.map((metric) => (
                    <div key={metric.label.pt}>
                      <dd className="tabular font-display text-step-2 leading-none">
                        {metric.value}
                      </dd>
                      <dt className="eyebrow mt-1.5">{t(metric.label, locale)}</dt>
                    </div>
                  ))}
                </dl>
              )}

              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>

              <Block title={t(dictionary.labels.about, locale)}>
                {t(project.description, locale).map((paragraph) => (
                  <p key={paragraph} className="text-step--1 text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </Block>

              <Block title={t(dictionary.labels.features, locale)}>
                <List items={t(project.features, locale)} />
              </Block>

              <Block title={t(dictionary.labels.contribution, locale)}>
                <List items={t(project.contributions, locale)} />
              </Block>

              {(project.liveUrl || project.repoUrl) && (
                <div className="flex flex-wrap gap-3 border-t border-rule pt-6">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:bg-accent hover:text-accent-contrast"
                    >
                      <ExternalLink size={14} />
                      {t(dictionary.actions.viewLive, locale)}
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-ink/25 px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
                    >
                      <GitBranch size={14} />
                      {t(dictionary.actions.viewSource, locale)}
                    </a>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

const Block = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="space-y-3">
    <h3 className="eyebrow text-accent">{title}</h3>
    <div className="space-y-2">{children}</div>
  </section>
);

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item} className="flex gap-3 text-step--1 text-ink-muted">
        <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
        {item}
      </li>
    ))}
  </ul>
);
