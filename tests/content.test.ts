import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  certifications,
  education,
  experiences,
  keywords,
  languages,
  skillGroups,
} from "@/content/resume";
import { projects } from "@/content/projects";
import { stats } from "@/content/profile";
import { locales } from "@/lib/i18n";

describe("resume", () => {
  it("tem exatamente um cargo atual", () => {
    expect(experiences.filter((exp) => exp.end === null)).toHaveLength(1);
  });

  it("lista experiências da mais recente para a mais antiga", () => {
    const starts = experiences.map((exp) => exp.start);
    expect([...starts].sort().reverse()).toEqual(starts);
  });

  it("usa datas no formato AAAA-MM", () => {
    for (const exp of experiences) {
      expect(exp.start).toMatch(/^\d{4}-\d{2}$/);
      if (exp.end !== null) expect(exp.end).toMatch(/^\d{4}-\d{2}$/);
    }
  });

  it("preenche bullets nos dois idiomas", () => {
    for (const exp of experiences) {
      for (const locale of locales) {
        expect(exp.bullets[locale].length).toBeGreaterThan(0);
      }
    }
  });

  it("tem formação, certificações, idiomas e competências populados", () => {
    expect(education.length).toBeGreaterThan(0);
    expect(certifications.length).toBeGreaterThan(0);
    expect(languages.length).toBeGreaterThan(0);
    expect(skillGroups.length).toBeGreaterThan(0);
    expect(keywords.length).toBeGreaterThan(20);
  });
});

describe("projects", () => {
  it("tem slugs únicos", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("dá alt text em ambos os idiomas para toda imagem", () => {
    for (const project of projects) {
      expect(project.images.length).toBeGreaterThan(0);
      for (const image of project.images) {
        expect(image.src).toMatch(/^\/project-images\/.+\.(png|jpg|webp)$/);
        for (const locale of locales) {
          expect(image.alt[locale].trim().length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("aponta apenas para imagens que existem em public/", () => {
    const missing = projects
      .flatMap((project) => project.images.map((image) => image.src))
      .filter((src) => !existsSync(join(process.cwd(), "public", src)));

    expect(missing).toEqual([]);
  });

  it("traz features e contribuições nos dois idiomas", () => {
    for (const project of projects) {
      for (const locale of locales) {
        expect(project.features[locale].length).toBeGreaterThan(0);
        expect(project.contributions[locale].length).toBeGreaterThan(0);
      }
    }
  });

  it("usa URLs absolutas quando declaradas", () => {
    for (const project of projects) {
      if (project.liveUrl) expect(project.liveUrl).toMatch(/^https:\/\//);
      if (project.repoUrl) expect(project.repoUrl).toMatch(/^https:\/\//);
    }
  });
});

describe("stats", () => {
  // O <CountUp> do hero anima `Number.parseInt` do valor sem o "+"; qualquer
  // outro formato ("35%", "6+") sairia na tela como NaN ou perderia o sufixo.
  it("usa apenas dígitos, com um \"+\" opcional à frente", () => {
    for (const stat of stats) {
      expect(stat.value).toMatch(/^\+?\d+$/);
    }
  });

  it("rotula cada número nos dois idiomas", () => {
    for (const stat of stats) {
      for (const locale of locales) {
        expect(stat.label[locale].trim().length).toBeGreaterThan(0);
      }
    }
  });
});
