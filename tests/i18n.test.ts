import { describe, expect, it } from "vitest";
import { defaultLocale, isLocale, locales, t } from "@/lib/i18n";

describe("i18n", () => {
  it("expõe exatamente pt e en", () => {
    expect([...locales]).toEqual(["pt", "en"]);
  });

  it("usa pt como padrão", () => {
    expect(defaultLocale).toBe("pt");
  });

  it("reconhece locales válidos e rejeita inválidos", () => {
    expect(isLocale("pt")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("es")).toBe(false);
    expect(isLocale("")).toBe(false);
  });

  it("t() resolve o valor do locale pedido", () => {
    expect(t({ pt: "obra", en: "work" }, "en")).toBe("work");
    expect(t({ pt: ["a"], en: ["b"] }, "pt")).toEqual(["a"]);
  });
});
