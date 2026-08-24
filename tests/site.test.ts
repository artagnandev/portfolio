import { describe, expect, it } from "vitest";
import { absoluteUrl, alternatesFor, siteUrl } from "@/lib/site";

describe("site", () => {
  it("expõe uma origem absoluta sem barra final", () => {
    expect(siteUrl).toMatch(/^https:\/\/[^/]+$/);
  });

  it("monta URLs absolutas a partir de caminhos", () => {
    expect(absoluteUrl("/pt")).toBe(`${siteUrl}/pt`);
    expect(absoluteUrl("pt")).toBe(`${siteUrl}/pt`);
  });

  it("gera canonical e hreflang para os dois locales", () => {
    const alternates = alternatesFor("pt", "");
    expect(alternates.canonical).toBe(`${siteUrl}/pt`);
    expect(alternates.languages["pt-BR"]).toBe(`${siteUrl}/pt`);
    expect(alternates.languages["en"]).toBe(`${siteUrl}/en`);
    expect(alternates.languages["x-default"]).toBe(`${siteUrl}/pt`);
  });

  it("preserva o subcaminho nos alternates", () => {
    const alternates = alternatesFor("en", "/curriculo");
    expect(alternates.canonical).toBe(`${siteUrl}/en/curriculo`);
    expect(alternates.languages["pt-BR"]).toBe(`${siteUrl}/pt/curriculo`);
    expect(alternates.languages["en"]).toBe(`${siteUrl}/en/curriculo`);
  });
});
