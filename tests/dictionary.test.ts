import { describe, expect, it } from "vitest";
import { dictionary } from "@/content/dictionary";
import { locales } from "@/lib/i18n";

type Node = Record<string, unknown>;

const isLeaf = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value) &&
  locales.some((locale) => locale in (value as Node));

const collectGaps = (node: Node, path: string[] = []): string[] => {
  const gaps: string[] = [];

  for (const [key, value] of Object.entries(node)) {
    const here = [...path, key];

    if (isLeaf(value)) {
      for (const locale of locales) {
        const text = (value as Record<string, unknown>)[locale];
        if (typeof text !== "string" || text.trim() === "") {
          gaps.push(`${here.join(".")} → ${locale}`);
        }
      }
      continue;
    }

    if (typeof value === "object" && value !== null) {
      gaps.push(...collectGaps(value as Node, here));
    }
  }

  return gaps;
};

describe("dictionary", () => {
  it("tem toda folha preenchida em todos os locales", () => {
    expect(collectGaps(dictionary as unknown as Node)).toEqual([]);
  });
});
