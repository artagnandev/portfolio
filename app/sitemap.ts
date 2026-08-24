import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { htmlLang, locales } from "@/lib/i18n";
import { projects } from "@/content/projects";

const priorities: Record<string, number> = { "": 1, "/curriculo": 0.8 };

const paths: string[] = [
  "",
  "/curriculo",
  ...projects.map((project) => `/projetos/${project.slug}`),
];

const sitemap = (): MetadataRoute.Sitemap =>
  locales.flatMap((locale) =>
    paths.map((path) => ({
      url: absoluteUrl(`${locale}${path}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: priorities[path] ?? 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((candidate) => [
            htmlLang[candidate],
            absoluteUrl(`${candidate}${path}`),
          ]),
        ),
      },
    })),
  );

export default sitemap;
