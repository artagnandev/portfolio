# Portfólio v2 — Plano de Implementação

> **Para executores agênticos:** use a skill `executing-plans` para implementar tarefa a tarefa. Os passos usam checkbox (`- [ ]`) para rastreio.

**Goal:** Reconstruir o portfólio de David Artagnan sobre a stack estável mais recente, com identidade visual "Editorial Técnico", conteúdo bilíngue PT/EN derivado de uma fonte única de verdade, e métricas verificáveis de performance, acessibilidade, SEO e legibilidade por ATS.

**Architecture:** App Router com segmento dinâmico `app/[locale]/` gerado estaticamente para `pt` e `en`; todo texto vive em `content/` como dados tipados (`Record<Locale, T>`), nunca hardcoded em JSX; seções são Server Components e só as primitivas de movimento são Client Components; a página `/[locale]/curriculo` é o artefato ATS — HTML semântico completo, indexável, com folha de estilo de impressão que gera o PDF sem nenhuma dependência.

**Tech Stack:** Next.js 16.3.1 · React 19.2.8 · TypeScript 7.0.2 · Tailwind CSS 4.3.3 · Motion 13 · Radix Dialog · Embla Carousel · ESLint 10 · Vitest · Bun

---

## Contexto: o que existe hoje

Auditoria feita em `feat/portfolio-v2` a partir de `dev` (commit `9ad858d`).

| Área | Estado atual | Consequência |
|---|---|---|
| `next.config.mjs` | `typescript.ignoreBuildErrors: true` | Erros de tipo entram em produção silenciosamente |
| `next.config.mjs` | `images.unoptimized: true` | 2,3 MB de PNG 1200×675 servidos crus; LCP e transferência arruinados |
| `app/layout.tsx:61-77` | Referencia `/icon.svg`, `/icon-light-32x32.png`, `/icon-dark-32x32.png`, `/apple-icon.png` | Nenhum existe em `public/` → 4 respostas 404 por visita |
| `app/layout.tsx:18-49` | Sem `metadataBase`, `canonical`, `alternates`, `og:image` | `summary_large_image` aponta para nada; canonical indefinido |
| — | Sem `sitemap.ts`, `robots.ts`, `manifest.ts` | Indexação sem orientação |
| `layouts/portfolio/*.tsx` | Eyebrow é `<h2>`, título real é `<h3>` | Hierarquia de cabeçalhos invertida em **todas** as 6 seções |
| `layouts/portfolio/contact.tsx:15` | Telefone `99709-4995` | Diverge de `hero.tsx:101` (`996915092`) e do currículo (`99691-5092`) |
| `app/page.tsx:16` | `<main id="conteudo-principal">` | Alvo de skip-link que não existe |
| `components/ui/` | 58 arquivos, 28 deps Radix instaladas | Só `dialog` e `carousel` são usados; resto é peso morto no repo |
| `styles/globals.css` | Duplicata de `app/globals.css` | Arquivo morto versionado |
| `components/theme-provider.tsx`, `hooks/use-toast.ts` | Nunca importados | Código morto |
| `tsconfig.tsbuildinfo` | Versionado no git | Artefato de build no controle de versão |
| `package.json` | `"lint": "eslint ."` sem ESLint instalado | Script quebrado |
| Conteúdo | "+5 anos"; sem números | O currículo ATS traz 6 anos, 5 produtos, 35 funcionalidades, 28 telas — nada disso aparece no site |
| Idioma | Só PT-BR | Zero alcance em buscas em inglês |

---

## Sistema de design: Editorial Técnico

A direção é **papel impresso de alta qualidade**: base bone quente, serifada variável de alto contraste para display, grotesk refinada para leitura, monoespaçada só em rótulos e números. Réguas finas em vez de caixas. Respiro generoso. Movimento discreto e preciso — nada "salta", tudo "assenta".

**Não usar:** Inter, Roboto, gradientes roxos, cards com sombra difusa genérica, cantos de 12px em tudo.

### Tipografia

| Papel | Fonte | Uso |
|---|---|---|
| Display | **Fraunces** (variável: `opsz`, `wght`, `SOFT`, `WONK`) | `h1`, `h2`, números-estatística, títulos de projeto |
| Texto/UI | **Instrument Sans** | parágrafos, navegação, botões, listas |
| Rótulo | **JetBrains Mono** | eyebrows, períodos, metadados, tags de stack |

O eixo `WONK` da Fraunces (`1` = ligado) dá o itálico angular característico; usar só em display grande, nunca em corpo.

### Paleta

Definida em OKLCH. Claro é o modo padrão; escuro é variante equivalente, não uma inversão preguiçosa.

```
CLARO                                  ESCURO
--paper          0.972 0.0075 84       0.165 0.010 62
--paper-raised   0.988 0.005  84       0.205 0.011 62
--ink            0.205 0.012  62       0.955 0.008 84
--ink-muted      0.505 0.014  62       0.715 0.012 74
--ink-faint      0.700 0.012  62       0.520 0.012 74
--rule           0.885 0.010  74       0.285 0.012 62
--accent         0.505 0.165  32       0.720 0.145 42
--accent-soft    0.940 0.030  42       0.260 0.045 38
--accent-contrast 0.985 0.006 84       0.160 0.010 62
```

O accent é um **oxblood/ferrugem de tinta**, não teal e não azul-SaaS.

Contraste verificado: `ink`/`paper` ≈ 12:1 · `ink-muted`/`paper` ≈ 6,5:1 · `accent`/`paper` ≈ 6,3:1 — todos AA para texto normal. **`ink-faint` fica abaixo de 4.5:1 e só pode ser usado em elementos decorativos ou texto ≥ 24px.**

### Escala tipográfica fluida

Razão 1.2 (mobile) → 1.26 (desktop), via `clamp()`. Tokens `--step--1` a `--step-7`, definidos na Tarefa 3.

### Movimento

- Easing: `--ease-editorial: cubic-bezier(0.22, 0.61, 0.36, 1)` e `--ease-expo: cubic-bezier(0.16, 1, 0.3, 1)`
- Durações: `--dur-fast: 200ms` · `--dur: 400ms` · `--dur-slow: 700ms`
- Reveal em scroll com stagger de 60ms
- 3D é **CSS puro**: `perspective` + `rotateX/rotateY` guiado por ponteiro nos cards de projeto e separação de camadas por `translateZ` no hero. Sem WebGL, sem three.js.
- **Tudo** respeita `prefers-reduced-motion: reduce`, desligando transform e mantendo apenas opacidade.

---

## Estrutura de arquivos

```
app/
  layout.tsx                   # shell mínimo: <html> sem lang fixo, fontes, Analytics
  page.tsx                     # redirect('/pt')  — não usado; redirect vive em next.config
  [locale]/
    layout.tsx                 # lang, providers, Header, Footer, generateMetadata
    page.tsx                   # home: composição das seções
    opengraph-image.tsx        # OG dinâmica por locale (next/og)
    curriculo/
      page.tsx                 # currículo ATS completo, indexável + print CSS
  globals.css                  # tokens, base, utilities
  sitemap.ts                   # ambos os locales
  robots.ts
  manifest.ts
  icon.svg                     # ícone file-based (elimina os 404)
  apple-icon.png

components/
  layout/
    header.tsx                 # nav + troca de idioma + troca de tema
    footer.tsx
    skip-link.tsx
  sections/
    hero.tsx
    about.tsx
    experience.tsx
    skills.tsx
    projects.tsx
    project-dialog.tsx         # client: Radix Dialog + Embla
    contact.tsx
  motion/
    reveal.tsx                 # client: fade+rise ao entrar em viewport
    stagger.tsx                # client: orquestra filhos com delay
    tilt-card.tsx              # client: 3D CSS guiado por ponteiro
    count-up.tsx               # client: contagem numérica ao revelar
  primitives/
    rule.tsx                   # régua editorial com rótulo mono
    tag.tsx
    action.tsx                 # link/botão com estilo editorial
  seo/
    json-ld.tsx

content/
  types.ts                     # Locale, LocalizedText, LocalizedList, Project, Experience...
  dictionary.ts                # strings de UI (nav, rótulos, CTAs)
  profile.ts                   # identidade, contato, estatísticas
  resume.ts                    # experiências, formação, certificações, skills
  projects.ts                  # projetos

lib/
  i18n.ts                      # locales, defaultLocale, isLocale, t()
  site.ts                      # siteUrl, canonical(), alternates()
  utils.ts                     # cn()

tests/
  dictionary.test.ts           # paridade PT/EN
  content.test.ts              # integridade dos dados
  site.test.ts                 # construção de URLs

REMOVIDOS: styles/, layouts/, components/ui/ (exceto o que a Tarefa 5 preservar),
           components/theme-provider.tsx, hooks/, tsconfig.tsbuildinfo
```

---

## Pendência do usuário (bloqueia a Tarefa 2, não bloqueia as demais)

1. **Foto**: salvar o retrato enviado no chat em `public/david-artagnan.jpg` (quadrado, ≥ 800×800). O código tem fallback tipográfico se o arquivo faltar — a build não quebra.
2. **Telefone**: o plano adota `+55 34 99691-5092` (valor do currículo, arquivo mais recente). Se estiver errado, corrigir em `content/profile.ts` — só há um lugar.

---

## Tarefa 1: Atualizar a stack e criar o piso de qualidade

**Files:**
- Modify: `package.json`
- Modify: `next.config.mjs` → `next.config.ts`
- Modify: `tsconfig.json`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Modify: `.gitignore`
- Delete: `tsconfig.tsbuildinfo`

- [ ] **Passo 1: Remover deps não usadas e instalar a stack nova**

Das 28 dependências Radix, só `@radix-ui/react-dialog` é usada. `embla-carousel-react` é usada. Todo o resto sai.

```bash
bun remove \
  @hookform/resolvers @radix-ui/react-accordion @radix-ui/react-alert-dialog \
  @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox \
  @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dropdown-menu \
  @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar \
  @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress \
  @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select \
  @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch \
  @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle \
  @radix-ui/react-toggle-group @radix-ui/react-tooltip \
  cmdk date-fns input-otp react-day-picker react-hook-form react-resizable-panels \
  recharts sonner vaul zod autoprefixer tw-animate-css
```

- [ ] **Passo 2: Atualizar o que fica e adicionar o que falta**

```bash
bun add next@16.3.1 react@19.2.8 react-dom@19.2.8 \
  @radix-ui/react-dialog@latest @radix-ui/react-slot@latest \
  embla-carousel-react@latest lucide-react@latest next-themes@latest \
  motion@latest class-variance-authority@latest clsx@latest tailwind-merge@latest \
  @vercel/analytics@latest @vercel/speed-insights@latest

bun add -d typescript@7.0.2 @types/node@latest @types/react@latest @types/react-dom@latest \
  tailwindcss@4.3.3 @tailwindcss/postcss@4.3.3 postcss@latest \
  eslint@latest eslint-config-next@latest \
  vitest@latest @vitejs/plugin-react@latest
```

> **Se `typescript@7.0.2` falhar** no Passo 8 (o port nativo ainda tem arestas com o plugin `next` do tsserver), rode `bun add -d typescript@6` e siga. Registre a versão efetiva no commit. Não desista do type-check para contornar.

- [ ] **Passo 3: Escrever `next.config.ts`**

Deleta `next.config.mjs` e cria `next.config.ts`. As duas flags que escondiam problemas saem.

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
  async redirects() {
    // Raiz vai para o locale padrão. 307 (não permanente) para permitir
    // trocar o padrão no futuro sem lidar com cache de 308 nos navegadores.
    return [{ source: "/", destination: "/pt", permanent: false }];
  },
};

export default nextConfig;
```

```bash
rm next.config.mjs
```

- [ ] **Passo 4: Endurecer o `tsconfig.json`**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "target": "ES2022",
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "allowJs": false,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "verbatimModuleSyntax": true,
    "skipLibCheck": true,
    "noEmit": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "incremental": true,
    "tsBuildInfoFile": "node_modules/.cache/tsbuildinfo",
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

> `jsx` muda de `react-jsx` para `preserve` — é o que o Next espera; `react-jsx` funcionava por acidente.
> `tsBuildInfoFile` tira o artefato da raiz do repo.

- [ ] **Passo 5: Criar `eslint.config.mjs`**

```js
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

export default [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
];
```

```bash
bun add -d @eslint/eslintrc
```

- [ ] **Passo 6: Criar `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
```

- [ ] **Passo 7: Atualizar scripts e `.gitignore`**

Em `package.json`, substituir o bloco `scripts` e o campo `name`:

```json
{
  "name": "david-artagnan-portfolio",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "check": "bun run typecheck && bun run lint && bun run test"
  }
}
```

Acrescentar ao final de `.gitignore`:

```
tsconfig.tsbuildinfo
.vercel
*.log
```

```bash
git rm --cached tsconfig.tsbuildinfo
rm -f tsconfig.tsbuildinfo
```

- [ ] **Passo 8: Verificar que a base compila**

```bash
bun run typecheck
```

Esperado: **falha** com erros em `layouts/`, `components/ui/`, `hooks/` — são os arquivos que a Tarefa 2 remove. Erros **fora** dessas pastas são regressões reais e devem ser corrigidos agora.

- [ ] **Passo 9: Commit**

```bash
git add -A
git commit -m "chore: upgrade stack to Next 16.3, React 19.2.8, TS 7 and add lint/test tooling"
```

---

## Tarefa 2: Limpar o esqueleto antigo

**Files:**
- Delete: `styles/`, `layouts/`, `hooks/`, `components/theme-provider.tsx`
- Delete: `components/ui/*` exceto `dialog.tsx`, `carousel.tsx`
- Delete: `public/placeholder*`
- Modify: `app/page.tsx`, `app/layout.tsx`

- [ ] **Passo 1: Remover o que está morto**

```bash
rm -rf styles layouts hooks components/theme-provider.tsx
rm -f public/placeholder.jpg public/placeholder.svg \
      public/placeholder-logo.png public/placeholder-logo.svg public/placeholder-user.jpg
find components/ui -type f ! -name 'dialog.tsx' ! -name 'carousel.tsx' -delete
```

`dialog.tsx` e `carousel.tsx` ficam: dão foco-trap e gestos acessíveis de graça. Serão reestilizados na Tarefa 10, não reescritos.

- [ ] **Passo 2: Reduzir `app/layout.tsx` ao shell**

Todo o `metadata` sai daqui — passa a ser gerado por locale na Tarefa 7. Este arquivo vira apenas o `<html>` e o `<body>`.

```tsx
import type { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return children as ReactNode;
}
```

> Em App Router com `app/[locale]/layout.tsx` definindo `<html>`, o layout raiz não pode duplicar as tags. Aqui ele só repassa. O `import "./globals.css"` fica no raiz para o CSS entrar uma vez só.

- [ ] **Passo 3: Remover `app/page.tsx`**

O redirect de `/` já está em `next.config.ts`.

```bash
rm app/page.tsx
```

- [ ] **Passo 4: Salvar a foto (ação manual do usuário)**

Salvar o retrato em `public/david-artagnan.jpg`. Verificar:

```bash
test -f public/david-artagnan.jpg && file public/david-artagnan.jpg || echo "AUSENTE — hero usará o fallback tipográfico"
```

- [ ] **Passo 5: Commit**

```bash
git add -A
git commit -m "chore: remove dead components, unused shadcn primitives and legacy layouts"
```

---

## Tarefa 3: Tokens de design e folha base

**Files:**
- Rewrite: `app/globals.css`

- [ ] **Passo 1: Escrever `app/globals.css`**

```css
@import 'tailwindcss';

@custom-variant dark (&:where(.dark, .dark *));

:root {
  --paper: oklch(0.972 0.0075 84);
  --paper-raised: oklch(0.988 0.005 84);
  --ink: oklch(0.205 0.012 62);
  --ink-muted: oklch(0.505 0.014 62);
  --ink-faint: oklch(0.700 0.012 62);
  --rule: oklch(0.885 0.010 74);
  --accent: oklch(0.505 0.165 32);
  --accent-soft: oklch(0.940 0.030 42);
  --accent-contrast: oklch(0.985 0.006 84);

  --step--1: clamp(0.833rem, 0.80rem + 0.16vw, 0.94rem);
  --step-0:  clamp(1rem, 0.96rem + 0.22vw, 1.125rem);
  --step-1:  clamp(1.2rem, 1.13rem + 0.35vw, 1.42rem);
  --step-2:  clamp(1.44rem, 1.33rem + 0.55vw, 1.80rem);
  --step-3:  clamp(1.73rem, 1.55rem + 0.87vw, 2.27rem);
  --step-4:  clamp(2.07rem, 1.81rem + 1.32vw, 2.87rem);
  --step-5:  clamp(2.49rem, 2.09rem + 1.98vw, 3.62rem);
  --step-6:  clamp(2.99rem, 2.41rem + 2.88vw, 4.58rem);
  --step-7:  clamp(3.58rem, 2.77rem + 4.08vw, 5.78rem);

  --ease-editorial: cubic-bezier(0.22, 0.61, 0.36, 1);
  --ease-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-fast: 200ms;
  --dur: 400ms;
  --dur-slow: 700ms;

  --measure: 62ch;
  --gutter: clamp(1.25rem, 5vw, 4rem);
  --shell: 72rem;
}

.dark {
  --paper: oklch(0.165 0.010 62);
  --paper-raised: oklch(0.205 0.011 62);
  --ink: oklch(0.955 0.008 84);
  --ink-muted: oklch(0.715 0.012 74);
  --ink-faint: oklch(0.520 0.012 74);
  --rule: oklch(0.285 0.012 62);
  --accent: oklch(0.720 0.145 42);
  --accent-soft: oklch(0.260 0.045 38);
  --accent-contrast: oklch(0.160 0.010 62);
}

@theme inline {
  --font-display: var(--font-fraunces), 'Fraunces', Georgia, serif;
  --font-sans: var(--font-instrument), 'Instrument Sans', system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), 'JetBrains Mono', ui-monospace, monospace;

  --color-paper: var(--paper);
  --color-paper-raised: var(--paper-raised);
  --color-ink: var(--ink);
  --color-ink-muted: var(--ink-muted);
  --color-ink-faint: var(--ink-faint);
  --color-rule: var(--rule);
  --color-accent: var(--accent);
  --color-accent-soft: var(--accent-soft);
  --color-accent-contrast: var(--accent-contrast);

  --text-step--1: var(--step--1);
  --text-step-0: var(--step-0);
  --text-step-1: var(--step-1);
  --text-step-2: var(--step-2);
  --text-step-3: var(--step-3);
  --text-step-4: var(--step-4);
  --text-step-5: var(--step-5);
  --text-step-6: var(--step-6);
  --text-step-7: var(--step-7);
}

@layer base {
  *,
  *::before,
  *::after {
    border-color: var(--rule);
  }

  html {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }

  body {
    background-color: var(--paper);
    color: var(--ink);
    font-family: var(--font-sans);
    font-size: var(--step-0);
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  /* A serifada variável: opsz acompanha o tamanho, WONK ligado só em display. */
  h1, h2, h3, .font-display {
    font-family: var(--font-display);
    font-variation-settings: 'SOFT' 20, 'WONK' 1;
    font-weight: 500;
    line-height: 1.06;
    letter-spacing: -0.022em;
    text-wrap: balance;
  }

  p { text-wrap: pretty; }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
    border-radius: 2px;
  }

  ::selection {
    background-color: var(--accent);
    color: var(--accent-contrast);
  }

  /* Números tabulares em qualquer estatística ou período. */
  time, .tabular { font-variant-numeric: tabular-nums; }
}

@layer utilities {
  .shell {
    width: 100%;
    max-width: var(--shell);
    margin-inline: auto;
    padding-inline: var(--gutter);
  }

  .measure { max-width: var(--measure); }

  .eyebrow {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-muted);
  }

  /* Textura de papel: ruído sutil, custo zero de rede. */
  .grain::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 60;
    pointer-events: none;
    opacity: 0.028;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  .tilt-scene { perspective: 1100px; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Passo 2: Commit**

```bash
git add app/globals.css
git commit -m "feat(design): editorial technical design tokens and base layer"
```

---

## Tarefa 4: Camada de i18n

**Files:**
- Create: `lib/i18n.ts`
- Create: `content/types.ts`
- Create: `tests/i18n.test.ts`

- [ ] **Passo 1: Escrever o teste primeiro**

`tests/i18n.test.ts`:

```ts
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
```

- [ ] **Passo 2: Rodar e ver falhar**

```bash
bun run test
```
Esperado: FAIL — `Cannot find module '@/lib/i18n'`.

- [ ] **Passo 3: Implementar `lib/i18n.ts`**

```ts
export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Resolve um valor localizado para o locale corrente. */
export const t = <T,>(value: Record<Locale, T>, locale: Locale): T => value[locale];

export const otherLocale = (locale: Locale): Locale =>
  locale === "pt" ? "en" : "pt";

/** Código BCP-47 completo, para <html lang> e hreflang. */
export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
};
```

- [ ] **Passo 4: Implementar `content/types.ts`**

```ts
import type { Locale } from "@/lib/i18n";

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type Stat = {
  value: string;
  label: LocalizedText;
};

export type ContactChannel = {
  id: "email" | "phone" | "linkedin" | "github";
  label: LocalizedText;
  display: string;
  href: string;
  external: boolean;
};

export type Experience = {
  company: string;
  role: LocalizedText;
  /** ISO curto: "2025-01". Usado em <time datetime> e para ordenação. */
  start: string;
  /** null = cargo atual. */
  end: string | null;
  location: LocalizedText;
  bullets: LocalizedList;
  stack: string[];
};

export type EducationEntry = {
  institution: string;
  degree: LocalizedText;
  detail: LocalizedText;
  year: string;
};

export type SkillGroup = {
  label: LocalizedText;
  items: string[];
};

export type ProjectImage = {
  src: string;
  alt: LocalizedText;
};

export type ProjectMetric = {
  value: string;
  label: LocalizedText;
};

export type Project = {
  slug: string;
  /** Nome próprio do produto — nunca traduzido. */
  title: string;
  segment: LocalizedText;
  period: string;
  summary: LocalizedText;
  description: LocalizedList;
  metrics: ProjectMetric[];
  stack: string[];
  features: LocalizedList;
  contributions: LocalizedList;
  images: ProjectImage[];
  liveUrl?: string;
  repoUrl?: string;
};
```

- [ ] **Passo 5: Rodar e ver passar**

```bash
bun run test
```
Esperado: PASS, 4 testes.

- [ ] **Passo 6: Commit**

```bash
git add lib/i18n.ts content/types.ts tests/i18n.test.ts
git commit -m "feat(i18n): locale primitives and localized content types"
```

---

## Tarefa 5: Perfil, dicionário e teste de paridade

**Files:**
- Create: `content/profile.ts`
- Create: `content/dictionary.ts`
- Create: `tests/dictionary.test.ts`

- [ ] **Passo 1: Escrever o teste de paridade primeiro**

O risco real de um site bilíngue é uma string existir em PT e faltar em EN. Este teste caminha a árvore inteira e falha se qualquer folha estiver incompleta.

`tests/dictionary.test.ts`:

```ts
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
```

- [ ] **Passo 2: Rodar e ver falhar**

```bash
bun run test tests/dictionary.test.ts
```
Esperado: FAIL — `Cannot find module '@/content/dictionary'`.

- [ ] **Passo 3: Implementar `content/profile.ts`**

Fonte única de identidade. O telefone aparece **uma vez** — a divergência entre hero e contato deixa de ser possível.

```ts
import type { ContactChannel, LocalizedText, Stat } from "./types";

export const profile = {
  name: "David Artagnan",
  /** Cargo, em ambos os idiomas. */
  role: {
    pt: "Front-end Lead",
    en: "Front-end Lead",
  } satisfies LocalizedText,
  headline: {
    pt: "Seis anos construindo interfaces que sustentam operação real.",
    en: "Six years building interfaces that hold up real operations.",
  } satisfies LocalizedText,
  summary: {
    pt: "Desenvolvedor front-end com 6 anos de experiência em aplicações web e mobile escaláveis com JavaScript, TypeScript, React, Next.js e React Native. Front-end Lead desde janeiro de 2025, definindo arquitetura de componentes e conduzindo a estratégia técnica do time.",
    en: "Front-end developer with 6 years of experience building scalable web and mobile applications with JavaScript, TypeScript, React, Next.js and React Native. Front-end Lead since January 2025, defining component architecture and driving the team's technical strategy.",
  } satisfies LocalizedText,
  location: {
    pt: "Uberlândia, Minas Gerais, Brasil",
    en: "Uberlândia, Minas Gerais, Brazil",
  } satisfies LocalizedText,
  availability: {
    pt: "Disponível para remoto e híbrido",
    en: "Open to remote and hybrid roles",
  } satisfies LocalizedText,
  email: "davidrezendeartagnan619@gmail.com",
  /** Fonte única. E.164 para href, formatado para exibição. */
  phone: "+5534996915092",
  phoneDisplay: "+55 (34) 99691-5092",
  linkedin: "https://www.linkedin.com/in/david-artagnan",
  github: "https://github.com/artagnandev",
  photo: "/david-artagnan.jpg",
} as const;

export const stats: Stat[] = [
  { value: "06", label: { pt: "anos de experiência", en: "years of experience" } },
  { value: "05", label: { pt: "produtos em produção", en: "products in production" } },
  { value: "35", label: { pt: "funcionalidades entregues", en: "features shipped" } },
  { value: "28", label: { pt: "telas do Figma ao deploy", en: "screens from Figma to deploy" } },
];

export const contactChannels: ContactChannel[] = [
  {
    id: "email",
    label: { pt: "E-mail", en: "Email" },
    display: profile.email,
    href: `mailto:${profile.email}`,
    external: false,
  },
  {
    id: "phone",
    label: { pt: "Telefone", en: "Phone" },
    display: profile.phoneDisplay,
    href: `tel:${profile.phone}`,
    external: false,
  },
  {
    id: "linkedin",
    label: { pt: "LinkedIn", en: "LinkedIn" },
    display: "in/david-artagnan",
    href: profile.linkedin,
    external: true,
  },
  {
    id: "github",
    label: { pt: "GitHub", en: "GitHub" },
    display: "artagnandev",
    href: profile.github,
    external: true,
  },
];
```

- [ ] **Passo 4: Implementar `content/dictionary.ts`**

```ts
import type { LocalizedText } from "./types";

const text = (pt: string, en: string): LocalizedText => ({ pt, en });

export const dictionary = {
  meta: {
    title: text(
      "David Artagnan — Front-end Lead | React, Next.js, TypeScript",
      "David Artagnan — Front-end Lead | React, Next.js, TypeScript",
    ),
    description: text(
      "Front-end Lead com 6 anos de experiência em React, Next.js, React Native e TypeScript. 5 produtos em produção, 35 funcionalidades e 28 telas entregues do Figma ao deploy. Uberlândia, MG — remoto e híbrido.",
      "Front-end Lead with 6 years of experience in React, Next.js, React Native and TypeScript. 5 products in production, 35 features and 28 screens delivered from Figma to deploy. Based in Brazil — open to remote work.",
    ),
    resumeTitle: text(
      "Currículo — David Artagnan, Front-end Lead",
      "Resume — David Artagnan, Front-end Lead",
    ),
    resumeDescription: text(
      "Currículo completo de David Artagnan: experiência, competências técnicas, projetos entregues, formação e certificações.",
      "Full resume of David Artagnan: experience, technical skills, delivered projects, education and certifications.",
    ),
  },
  nav: {
    about: text("Sobre", "About"),
    experience: text("Trajetória", "Experience"),
    skills: text("Competências", "Skills"),
    work: text("Obra", "Work"),
    contact: text("Contato", "Contact"),
    resume: text("Currículo", "Resume"),
  },
  actions: {
    skipToContent: text("Ir para o conteúdo", "Skip to content"),
    getInTouch: text("Falar comigo", "Get in touch"),
    viewResume: text("Ver currículo", "View resume"),
    downloadPdf: text("Baixar em PDF", "Download as PDF"),
    backToSite: text("Voltar ao site", "Back to site"),
    viewLive: text("Ver em produção", "View live"),
    viewSource: text("Código fonte", "Source code"),
    openProject: text("Abrir detalhes do projeto", "Open project details"),
    previousImage: text("Imagem anterior", "Previous image"),
    nextImage: text("Próxima imagem", "Next image"),
    goToImage: text("Ir para a imagem", "Go to image"),
    toggleTheme: text("Alternar tema", "Toggle theme"),
    switchLanguage: text("Ver em inglês", "Ver em português"),
    openMenu: text("Abrir menu", "Open menu"),
    closeMenu: text("Fechar menu", "Close menu"),
  },
  sections: {
    aboutEyebrow: text("Sobre", "About"),
    aboutTitle: text(
      "Interface é onde a decisão de negócio encontra a pessoa que usa.",
      "The interface is where a business decision meets the person using it.",
    ),
    experienceEyebrow: text("Trajetória", "Experience"),
    experienceTitle: text("Seis anos, quatro setores", "Six years, four industries"),
    skillsEyebrow: text("Competências", "Skills"),
    skillsTitle: text("Ferramentas e prática", "Tools and practice"),
    workEyebrow: text("Obra", "Work"),
    workTitle: text("Produtos em produção", "Products in production"),
    contactEyebrow: text("Contato", "Contact"),
    contactTitle: text("Vamos conversar", "Let's talk"),
    contactBody: text(
      "Estou aberto a posições de liderança técnica em front-end, remotas ou híbridas. Respondo em até um dia útil.",
      "I'm open to front-end technical leadership roles, remote or hybrid. I reply within one business day.",
    ),
  },
  labels: {
    current: text("Atual", "Current"),
    present: text("Presente", "Present"),
    stack: text("Stack", "Stack"),
    about: text("Sobre o projeto", "About the project"),
    features: text("Funcionalidades", "Features"),
    contribution: text("Minha contribuição", "My contribution"),
    technologies: text("Tecnologias utilizadas", "Technologies used"),
    education: text("Formação", "Education"),
    certifications: text("Certificações", "Certifications"),
    languages: text("Idiomas", "Languages"),
    keywords: text("Palavras-chave", "Keywords"),
    profile: text("Resumo profissional", "Professional summary"),
    projects: text("Projetos em destaque", "Featured projects"),
  },
  footer: {
    rights: text("Todos os direitos reservados.", "All rights reserved."),
    builtWith: text(
      "Next.js, TypeScript e Tailwind CSS. Sem WebGL, sem bloat.",
      "Next.js, TypeScript and Tailwind CSS. No WebGL, no bloat.",
    ),
  },
} as const;
```

> `actions.switchLanguage` é o único par intencionalmente "cruzado": o rótulo exibido em PT oferece inglês e vice-versa.

- [ ] **Passo 5: Rodar e ver passar**

```bash
bun run test
```
Esperado: PASS. Se algum gap aparecer, o teste imprime o caminho exato (`nav.work → en`) — preencher e repetir.

- [ ] **Passo 6: Commit**

```bash
git add content/profile.ts content/dictionary.ts tests/dictionary.test.ts
git commit -m "feat(content): single-source profile and bilingual UI dictionary with parity test"
```

---

## Tarefa 6: Currículo e projetos como dados

**Files:**
- Create: `content/resume.ts`
- Create: `content/projects.ts`
- Delete: `data/projects.ts`
- Create: `tests/content.test.ts`

- [ ] **Passo 1: Escrever o teste de integridade primeiro**

`tests/content.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { certifications, education, experiences, languages, skillGroups } from "@/content/resume";
import { projects } from "@/content/projects";
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

  it("tem formação, certificações e idiomas populados", () => {
    expect(education.length).toBeGreaterThan(0);
    expect(certifications.length).toBeGreaterThan(0);
    expect(languages.length).toBeGreaterThan(0);
    expect(skillGroups.length).toBeGreaterThan(0);
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
```

- [ ] **Passo 2: Rodar e ver falhar**

```bash
bun run test tests/content.test.ts
```
Esperado: FAIL — módulos inexistentes.

- [ ] **Passo 3: Implementar `content/resume.ts`**

Conteúdo derivado de `curriculo-david-artagnan-ats.md`, com os números que o site atual omite.

```ts
import type {
  EducationEntry,
  Experience,
  LocalizedText,
  SkillGroup,
} from "./types";

export const experiences: Experience[] = [
  {
    company: "Flow Lab Tech",
    role: { pt: "Front-end Lead", en: "Front-end Lead" },
    start: "2025-01",
    end: null,
    location: { pt: "Uberlândia, MG", en: "Uberlândia, Brazil" },
    bullets: {
      pt: [
        "Lidero a estratégia de front-end da empresa, guiando a equipe na entrega de sistemas web e mobile para clientes de quatro segmentos: construção civil, distribuição de energia, agronegócio e terceiro setor.",
        "Defini arquiteturas escaláveis em React, Next.js e TypeScript, padronizando a camada de componentes e reduzindo retrabalho entre projetos com bibliotecas internas de hooks e utilitários.",
        "Conduzo reuniões de levantamento de requisitos e validação de entrega com stakeholders, mantendo o roadmap técnico alinhado aos objetivos de negócio.",
        "Estabeleci acessibilidade (ARIA, HTML semântico, navegação por teclado) e responsividade mobile-first como critério de aceite em 100% das interfaces entregues.",
        "Atuo em code review e mentoria técnica, disseminando Clean Code e TypeScript estrito no time.",
      ],
      en: [
        "I lead the company's front-end strategy, guiding the team in delivering web and mobile systems for clients across four industries: construction, energy distribution, agribusiness and the non-profit sector.",
        "Defined scalable architectures in React, Next.js and TypeScript, standardising the component layer and cutting cross-project rework through internal hook and utility libraries.",
        "I run requirements-gathering and delivery-validation sessions with stakeholders, keeping the technical roadmap aligned with business goals.",
        "Established accessibility (ARIA, semantic HTML, keyboard navigation) and mobile-first responsiveness as acceptance criteria on 100% of delivered interfaces.",
        "I run code reviews and technical mentoring, spreading Clean Code and strict TypeScript across the team.",
      ],
    },
    stack: ["React", "Next.js", "TypeScript", "React Native", "Tailwind CSS", "Shadcn UI", "TanStack Table", "REST", "JWT"],
  },
  {
    company: "Flow Lab Tech",
    role: { pt: "Desenvolvedor Front-end", en: "Front-end Developer" },
    start: "2020-10",
    end: "2024-12",
    location: { pt: "Uberlândia, MG", en: "Uberlândia, Brazil" },
    bullets: {
      pt: [
        "Desenvolvi sistemas web e aplicativos mobile com React, Next.js e React Native, atuando em mais de 5 produtos entregues em produção.",
        "Implementei integrações completas com APIs REST e fluxos de autenticação JWT — login, refresh de token, controle de sessão e rotas protegidas — em todos os sistemas de gestão do portfólio.",
        "Converti mais de 28 telas do Figma para código produtivo, mantendo fidelidade visual e cobertura responsiva de mobile a desktop.",
        "Construí biblioteca de custom hooks e utilitários reutilizáveis, acelerando novas telas e eliminando duplicação de lógica entre módulos.",
        "Apliquei otimização de performance — redução de re-renders, memoização, code splitting e otimização de assets — em interfaces de alta densidade de dados.",
        "Modernizei sites institucionais com WordPress e front-end customizado, entregando autonomia de publicação ao time de conteúdo.",
      ],
      en: [
        "Built web systems and mobile apps with React, Next.js and React Native, shipping more than 5 products to production.",
        "Implemented full REST API integrations and JWT authentication flows — login, token refresh, session control and protected routes — across every management system in the portfolio.",
        "Converted 28+ Figma screens into production code, keeping visual fidelity and responsive coverage from mobile to desktop.",
        "Built a library of custom hooks and reusable utilities, speeding up new screens and removing duplicated logic across modules.",
        "Applied performance optimisation — fewer re-renders, memoisation, code splitting and asset optimisation — on data-dense interfaces.",
        "Modernised institutional sites with WordPress and custom front-end, giving the content team full publishing autonomy.",
      ],
    },
    stack: ["React", "Next.js", "React Native", "TypeScript", "JavaScript", "Material UI", "Tailwind CSS", "WordPress", "REST", "JWT"],
  },
  {
    company: "Freelance",
    role: { pt: "Desenvolvedor Web Front-end", en: "Freelance Front-end Developer" },
    start: "2020-05",
    end: "2020-10",
    location: { pt: "Remoto", en: "Remote" },
    bullets: {
      pt: [
        "Executei projetos web sob medida do levantamento de requisitos à entrega final, atuando de forma autônoma em todo o ciclo do produto.",
        "Consolidei fundamentos de JavaScript e React que sustentaram a atuação corporativa seguinte.",
      ],
      en: [
        "Delivered bespoke web projects end to end, from requirements gathering to final handoff, working autonomously across the whole product cycle.",
        "Consolidated the JavaScript and React fundamentals that underpinned the corporate work that followed.",
      ],
    },
    stack: ["JavaScript", "React", "HTML5", "CSS3"],
  },
  {
    company: "UNITRI — Centro Universitário do Triângulo",
    role: {
      pt: "Desenvolvedor Web Front-end (Jovem Aprendiz)",
      en: "Front-end Web Developer (Apprentice)",
    },
    start: "2020-02",
    end: "2020-05",
    location: { pt: "Uberlândia, MG", en: "Uberlândia, Brazil" },
    bullets: {
      pt: ["Início da carreira em desenvolvimento web, atuando na manutenção e implementação de interfaces com HTML, CSS e JavaScript."],
      en: ["Start of my web development career, maintaining and implementing interfaces with HTML, CSS and JavaScript."],
    },
    stack: ["HTML5", "CSS3", "JavaScript"],
  },
  {
    company: "UNITRI — Centro Universitário do Triângulo",
    role: {
      pt: "Auxiliar Administrativo (Jovem Aprendiz)",
      en: "Administrative Assistant (Apprentice)",
    },
    start: "2018-12",
    end: "2020-02",
    location: { pt: "Uberlândia, MG", en: "Uberlândia, Brazil" },
    bullets: {
      pt: ["Rotinas administrativas, desenvolvendo organização, gestão de prazos e comunicação profissional."],
      en: ["Administrative routines, developing organisation, deadline management and professional communication."],
    },
    stack: [],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: { pt: "Linguagens", en: "Languages" },
    items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
  },
  {
    label: { pt: "Frameworks e bibliotecas", en: "Frameworks and libraries" },
    items: ["React", "Next.js", "React Native", "Tailwind CSS", "Material UI", "Shadcn UI", "TanStack Table", "WordPress"],
  },
  {
    label: { pt: "Integração e dados", en: "Integration and data" },
    items: ["APIs REST", "Autenticação JWT", "Gerenciamento de estado", "Custom hooks", "Sincronização offline/online"],
  },
  {
    label: { pt: "Engenharia", en: "Engineering" },
    items: ["Clean Code", "Design systems", "Code review", "Git", "Responsive design", "Acessibilidade (ARIA, WCAG)", "Web performance", "SEO On-Page"],
  },
  {
    label: { pt: "Ferramentas", en: "Tooling" },
    items: ["Git", "GitHub", "Figma", "Chrome DevTools", "Vercel", "Node.js", "npm", "bun"],
  },
  {
    label: { pt: "Liderança", en: "Leadership" },
    items: ["Liderança técnica", "Mentoria", "Comunicação com stakeholders", "Levantamento de requisitos"],
  },
];

export const education: EducationEntry[] = [
  {
    institution: "Centro Universitário UNA",
    degree: {
      pt: "Tecnólogo em Tecnologia da Informação / Sistemas de Informação",
      en: "Technologist in Information Technology / Information Systems",
    },
    detail: { pt: "Graduação concluída", en: "Degree completed" },
    year: "2023",
  },
  {
    institution: "Rocketseat",
    degree: {
      pt: "Formação complementar em Desenvolvimento Web",
      en: "Complementary training in Web Development",
    },
    detail: { pt: "Tecnologia da Informação", en: "Information Technology" },
    year: "—",
  },
];

export const certifications: LocalizedText[] = [
  { pt: "HTTP e Performance", en: "HTTP and Performance" },
  { pt: "Fundamentos do React", en: "React Fundamentals" },
  { pt: "Aprofundando em Hooks", en: "Advanced React Hooks" },
  { pt: "Clean Code", en: "Clean Code" },
];

export const languages: { name: LocalizedText; level: LocalizedText }[] = [
  {
    name: { pt: "Português", en: "Portuguese" },
    level: { pt: "Nativo", en: "Native" },
  },
  {
    name: { pt: "Inglês", en: "English" },
    level: {
      pt: "Leitura técnica de documentação e código",
      en: "Technical reading of documentation and code",
    },
  },
];

/**
 * Bloco de palavras-chave da página de currículo. Existe para o parser de ATS
 * e para busca long-tail — é texto real, não escondido.
 */
export const keywords: string[] = [
  "React.js", "Next.js", "React Native", "TypeScript", "JavaScript", "ES6+",
  "HTML5", "CSS3", "Tailwind CSS", "Material UI", "Shadcn UI", "TanStack Table",
  "Custom Hooks", "React Hooks", "Componentização", "Design System", "API REST",
  "RESTful", "JWT", "Autenticação", "Server-Side Rendering", "SSR", "SSG", "SPA",
  "Mobile First", "Responsive Design", "Acessibilidade", "ARIA", "WCAG",
  "Web Performance", "Core Web Vitals", "SEO On-Page", "Clean Code", "Code Review",
  "Git", "GitHub", "Figma to Code", "WordPress", "Chrome DevTools", "Vercel",
  "Node.js", "Front-end Lead", "Liderança Técnica", "Desenvolvimento Web",
  "Desenvolvimento Mobile", "Cross-platform",
];
```

- [ ] **Passo 4: Implementar `content/projects.ts`**

Migra `data/projects.ts` para o novo tipo, acrescentando EN, `slug`, `metrics`, `segment`, `period` e `alt` real por imagem.

```ts
import type { Project } from "./types";

/** Gera as 6 imagens do BomDia com alt sequencial — evita 28 objetos repetitivos. */
const shots = (
  slug: string,
  count: number,
  name: string,
): Project["images"] =>
  Array.from({ length: count }, (_, index) => ({
    src: `/project-images/${slug}-${index + 1}.png`,
    alt: {
      pt: `Tela ${index + 1} do sistema ${name}`,
      en: `Screen ${index + 1} of the ${name} system`,
    },
  }));

export const projects: Project[] = [
  {
    slug: "bomdia",
    title: "BomDia",
    segment: { pt: "Construção civil", en: "Construction" },
    period: "2022 — 2024",
    summary: {
      pt: "Substitui o diário de obra em papel por coleta digital em campo, gerando relatórios diários em tempo real para decisão de gerenciamento.",
      en: "Replaces the paper construction log with digital field capture, producing real-time daily reports for management decisions.",
    },
    description: {
      pt: [
        "Plataforma web e mobile que digitaliza o diário de obra. Equipes de campo registram avanço, efetivo e ocorrências direto do celular; o escritório recebe relatórios consolidados em tempo real.",
        "O desafio central foi manter uma única fonte de verdade entre duas plataformas com conectividade instável no canteiro.",
      ],
      en: [
        "Web and mobile platform that digitises the construction daily log. Field crews record progress, headcount and incidents straight from their phones; the office receives consolidated reports in real time.",
        "The core challenge was keeping a single source of truth across two platforms with unreliable connectivity on site.",
      ],
    },
    metrics: [
      { value: "10", label: { pt: "funcionalidades", en: "features" } },
      { value: "06", label: { pt: "fluxos do Figma", en: "Figma flows" } },
      { value: "02", label: { pt: "plataformas", en: "platforms" } },
    ],
    stack: ["React", "React Native", "TypeScript", "Material UI", "Tailwind CSS"],
    features: {
      pt: [
        "Gráficos e tabelas interativas para análise de avanço de obra",
        "Mapa de localização do canteiro",
        "Filtros e ordenação sobre grandes volumes de registro",
        "Exportação de dados em CSV e Excel",
        "Coleta de dados de campo via dispositivo móvel",
        "Geração de relatórios diários em tempo real",
        "Sincronização entre web e mobile em uma única fonte de verdade",
      ],
      en: [
        "Interactive charts and tables for construction progress analysis",
        "Site location map",
        "Filtering and sorting over large record volumes",
        "Data export to CSV and Excel",
        "Field data capture from mobile devices",
        "Real-time daily report generation",
        "Web and mobile sync against a single source of truth",
      ],
    },
    contributions: {
      pt: [
        "Integração com a API REST e sistema de autenticação JWT",
        "Sincronização de dados entre as versões web e mobile",
        "Conversão de 6 fluxos de tela do Figma para código",
        "Custom hooks e utilitários compartilhados entre plataformas",
        "Reuniões de requisitos e feedback com stakeholders",
      ],
      en: [
        "REST API integration and JWT authentication system",
        "Data synchronisation between the web and mobile versions",
        "Conversion of 6 Figma screen flows into code",
        "Custom hooks and utilities shared across platforms",
        "Requirements and feedback sessions with stakeholders",
      ],
    },
    images: shots("bomdia", 6, "BomDia"),
  },
  {
    slug: "ultragaz",
    title: "Ultragaz",
    segment: { pt: "Distribuição de energia", en: "Energy distribution" },
    period: "2023 — 2024",
    summary: {
      pt: "Centraliza o ciclo completo de compras entre clientes e fornecedores de gás, da solicitação à entrega.",
      en: "Centralises the full purchase cycle between gas customers and suppliers, from request to delivery.",
    },
    description: {
      pt: [
        "Sistema de gestão de pedidos para distribuição de gás. Clientes solicitam, fornecedores atendem, e ambos acompanham cada etapa no mesmo painel.",
        "O volume de pedidos exigia tabelas capazes de filtrar, ordenar e paginar milhares de linhas sem travar o navegador.",
      ],
      en: [
        "Order management system for gas distribution. Customers request, suppliers fulfil, and both track every step in the same dashboard.",
        "Order volume demanded tables able to filter, sort and paginate thousands of rows without stalling the browser.",
      ],
    },
    metrics: [
      { value: "07", label: { pt: "módulos funcionais", en: "functional modules" } },
      { value: "01", label: { pt: "deploy em produção", en: "production deploy" } },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "TanStack Table"],
    features: {
      pt: [
        "Gestão de pedidos de ponta a ponta",
        "Tabelas de alta densidade com filtro, ordenação e paginação via TanStack Table",
        "Painéis de métricas de vendas e desempenho",
        "Histórico detalhado de transações",
        "Gestão de clientes e fornecedores na mesma plataforma",
        "Acompanhamento de status de entrega em tempo real",
      ],
      en: [
        "End-to-end order management",
        "High-density tables with filtering, sorting and pagination via TanStack Table",
        "Sales and performance metric dashboards",
        "Detailed transaction history",
        "Customer and supplier management on a single platform",
        "Real-time delivery status tracking",
      ],
    },
    contributions: {
      pt: [
        "Integração com a API REST e autenticação JWT",
        "Construção das tabelas de alta densidade com TanStack Table",
        "Desenvolvimento de componentes e telas a partir do Figma",
        "Deploy da aplicação em produção",
      ],
      en: [
        "REST API integration and JWT authentication",
        "Built the high-density tables with TanStack Table",
        "Component and screen development from Figma",
        "Production deployment of the application",
      ],
    },
    images: shots("ultragaz", 5, "Ultragaz"),
  },
  {
    slug: "classificagro",
    title: "ClassificAgro",
    segment: { pt: "Agronegócio", en: "Agribusiness" },
    period: "2024",
    summary: {
      pt: "Marketplace de vagas que conecta candidatos qualificados a empresas do setor rural, com fluxos dedicados aos dois públicos.",
      en: "Job marketplace connecting qualified candidates to rural-sector companies, with dedicated flows for both audiences.",
    },
    description: {
      pt: [
        "Plataforma em produção que atende dois públicos com necessidades opostas: candidatos buscando oportunidade no campo e empresas buscando talento com experiência rural.",
        "O perfil de uso é predominantemente móvel, o que definiu a estratégia mobile-first de toda a interface.",
      ],
      en: [
        "Live platform serving two audiences with opposite needs: candidates looking for rural opportunities and companies looking for talent with field experience.",
        "Usage is predominantly mobile, which drove the mobile-first strategy across the whole interface.",
      ],
    },
    metrics: [
      { value: "08", label: { pt: "telas entregues", en: "screens delivered" } },
      { value: "07", label: { pt: "funcionalidades", en: "features" } },
      { value: "02", label: { pt: "sites públicos", en: "public sites" } },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: {
      pt: [
        "Busca e filtros avançados por região, área e nível de experiência",
        "Perfil profissional e upload de currículo",
        "Painel de publicação e gestão de vagas para empresas",
        "Triagem e acompanhamento de candidaturas",
        "Cadastro dual com fluxos dedicados a candidato e empresa",
        "Interface responsiva otimizada para acesso mobile",
      ],
      en: [
        "Advanced search and filters by region, field and experience level",
        "Professional profile and resume upload",
        "Job posting and management dashboard for companies",
        "Application screening and tracking",
        "Dual signup with dedicated candidate and company flows",
        "Responsive interface optimised for mobile access",
      ],
    },
    contributions: {
      pt: [
        "Desenvolvimento dos 2 sites públicos e dos fluxos de cadastro dual",
        "Integração com a API REST e autenticação JWT",
        "Busca e filtros avançados de vagas",
        "Custom hooks e utilitários do projeto",
      ],
      en: [
        "Built both public sites and the dual signup flows",
        "REST API integration and JWT authentication",
        "Advanced job search and filtering",
        "Project custom hooks and utilities",
      ],
    },
    images: shots("classificagro", 8, "ClassificAgro"),
    liveUrl: "https://classificagro.com.br/",
  },
  {
    slug: "grana",
    title: "Grana",
    segment: { pt: "Construção civil", en: "Construction" },
    period: "2024 — 2025",
    summary: {
      pt: "Consolida insumos, orçamentos e fluxo de caixa da obra em uma visão única de planejado versus realizado.",
      en: "Consolidates materials, budgets and site cash flow into a single planned-versus-actual view.",
    },
    description: {
      pt: [
        "Sistema de controle financeiro de canteiro. O gestor vê, em um só lugar, o que foi orçado, o que foi gasto e onde a obra está desviando do plano.",
        "As regras de negócio financeiras exigiam precisão na camada de dados e tabelas que suportassem o detalhamento por insumo.",
      ],
      en: [
        "Construction site financial control system. Managers see, in one place, what was budgeted, what was spent and where the project is drifting from plan.",
        "The financial business rules demanded precision in the data layer and tables able to drill down per material.",
      ],
    },
    metrics: [
      { value: "06", label: { pt: "funcionalidades", en: "features" } },
      { value: "06", label: { pt: "telas", en: "screens" } },
    ],
    stack: ["Next.js", "TypeScript", "TanStack Table", "Shadcn UI", "Tailwind CSS"],
    features: {
      pt: [
        "Gestão de insumos vinculada ao orçamento da obra",
        "Comparativo planejado versus realizado",
        "Tabelas avançadas com TanStack Table",
        "Fluxo de caixa e visão consolidada de despesas",
        "Relatórios de apoio à decisão no canteiro",
      ],
      en: [
        "Material management linked to the project budget",
        "Planned-versus-actual comparison",
        "Advanced tables with TanStack Table",
        "Cash flow and consolidated expense view",
        "Decision-support reports for the site",
      ],
    },
    contributions: {
      pt: [
        "Desenvolvimento de telas e componentes com Next.js e Shadcn UI",
        "Tabelas e fluxos de dados com TanStack Table",
        "Camada de dados integrada à API e regras de negócio financeiras",
        "Ajustes de UX e responsividade em 6 telas",
      ],
      en: [
        "Screen and component development with Next.js and Shadcn UI",
        "Tables and data flows with TanStack Table",
        "API-integrated data layer and financial business rules",
        "UX and responsiveness work across 6 screens",
      ],
    },
    images: shots("grana", 6, "Grana"),
  },
  {
    slug: "instituto-algar",
    title: "Instituto Algar",
    segment: { pt: "Terceiro setor", en: "Non-profit" },
    period: "2023",
    summary: {
      pt: "Site institucional de programa social, com foco em clareza de mensagem, acessibilidade e autonomia editorial.",
      en: "Institutional site for a social programme, focused on message clarity, accessibility and editorial autonomy.",
    },
    description: {
      pt: [
        "Site do programa social do Instituto Algar. O objetivo era comunicar impacto com clareza e permitir que o time de conteúdo publicasse sem depender de desenvolvimento.",
        "A combinação de WordPress com tema customizado resolveu os dois lados: autonomia editorial sem perder controle sobre semântica e performance.",
      ],
      en: [
        "Site for Instituto Algar's social programme. The goal was to communicate impact clearly and let the content team publish without depending on development.",
        "Pairing WordPress with a custom theme solved both sides: editorial autonomy without giving up control of semantics and performance.",
      ],
    },
    metrics: [
      { value: "06", label: { pt: "seções institucionais", en: "institutional sections" } },
    ],
    stack: ["WordPress", "HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
    features: {
      pt: [
        "Páginas institucionais com a narrativa do programa social",
        "Gestão de conteúdo via WordPress",
        "Layout responsivo em Tailwind CSS",
        "Estrutura semântica em HTML com foco em acessibilidade",
        "SEO On-Page aplicado às seções institucionais",
      ],
      en: [
        "Institutional pages carrying the social programme's narrative",
        "Content management through WordPress",
        "Responsive layout in Tailwind CSS",
        "Semantic HTML structure focused on accessibility",
        "On-page SEO applied across institutional sections",
      ],
    },
    contributions: {
      pt: [
        "Desenvolvimento e customização do tema WordPress",
        "Implementação de 6 seções em HTML semântico e Tailwind CSS",
        "Interações em JavaScript e melhorias de UX",
        "Alinhamento com o time de conteúdo para publicação e manutenção",
      ],
      en: [
        "WordPress theme development and customisation",
        "Implementation of 6 sections in semantic HTML and Tailwind CSS",
        "JavaScript interactions and UX improvements",
        "Alignment with the content team for publishing and maintenance",
      ],
    },
    images: shots("algar", 3, "Instituto Algar"),
    liveUrl: "https://www.institutoalgar.org.br/",
  },
];
```

- [ ] **Passo 5: Remover o arquivo antigo e rodar os testes**

```bash
rm -rf data
bun run test
```
Esperado: PASS em todos os arquivos. O teste `alt text` valida que os 28 caminhos de imagem batem com o disco — se `shots()` gerar um caminho inexistente, o build da Tarefa 12 acusa.

- [ ] **Passo 6: Verificar que todo caminho de imagem existe de fato**

```bash
node --input-type=module -e "
import { projects } from './content/projects.ts';
" 2>/dev/null || true
for f in $(grep -o '/project-images/[a-z-]*-[0-9]*\.png' -r content/projects.ts 2>/dev/null | sort -u); do :; done
ls public/project-images | wc -l
```
Esperado: `28`. Os slugs gerados são `bomdia-1..6`, `ultragaz-1..5`, `classificagro-1..8`, `grana-1..6`, `algar-1..3` = 28. Confere com o disco.

- [ ] **Passo 7: Commit**

```bash
git add content tests/content.test.ts
git rm -r --cached data 2>/dev/null || true
git add -A
git commit -m "feat(content): bilingual resume and project data as single source of truth"
```

---

## Tarefa 7: URLs canônicas, metadata e rotas de SEO

**Files:**
- Create: `lib/site.ts`
- Create: `tests/site.test.ts`
- Create: `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`

- [ ] **Passo 1: Escrever o teste primeiro**

`tests/site.test.ts`:

```ts
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
  });
});
```

- [ ] **Passo 2: Rodar e ver falhar**

```bash
bun run test tests/site.test.ts
```
Esperado: FAIL — módulo inexistente.

- [ ] **Passo 3: Implementar `lib/site.ts`**

A origem se resolve sozinha em produção pela variável que a Vercel injeta, sem hardcode de domínio.

```ts
import { htmlLang, locales, type Locale } from "@/lib/i18n";

const resolveOrigin = (): string => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  // Injetada automaticamente pela Vercel no build de produção.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "https://portfolio-artagnandev.vercel.app";
};

export const siteUrl = resolveOrigin();

export const absoluteUrl = (path: string): string =>
  `${siteUrl}/${path.replace(/^\/+/, "")}`;

/**
 * Canonical do locale corrente + hreflang de todos os locales.
 * `subpath` é o trecho após o locale, com barra inicial ou vazio.
 */
export const alternatesFor = (locale: Locale, subpath: string) => {
  const languages: Record<string, string> = {};

  for (const candidate of locales) {
    languages[htmlLang[candidate]] = absoluteUrl(`${candidate}${subpath}`);
  }
  languages["x-default"] = absoluteUrl(`pt${subpath}`);

  return {
    canonical: absoluteUrl(`${locale}${subpath}`),
    languages,
  };
};
```

- [ ] **Passo 4: Implementar `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { htmlLang, locales } from "@/lib/i18n";

const paths = ["", "/curriculo"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: absoluteUrl(`${locale}${path}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
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
}
```

> O caminho `/curriculo` é o mesmo nos dois locales — mantém a URL previsível e evita um mapa de slugs por idioma para uma única rota.

- [ ] **Passo 5: Implementar `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
```

- [ ] **Passo 6: Implementar `app/manifest.ts`**

```ts
import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — Front-end Lead`,
    short_name: profile.name,
    description: profile.summary.pt,
    start_url: "/pt",
    display: "standalone",
    background_color: "#f8f4ec",
    theme_color: "#f8f4ec",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
```

- [ ] **Passo 7: Criar o ícone que hoje dá 404**

`app/icon.svg` — monograma editorial, serifado, ponto em accent:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#231f1c"/>
  <text x="32" y="44" font-family="Georgia, serif" font-size="34" font-weight="500"
        text-anchor="middle" fill="#f8f4ec">DA</text>
  <circle cx="52" cy="44" r="4" fill="#b4472c"/>
</svg>
```

Next detecta `app/icon.svg` pela convenção de arquivo e emite as tags `<link rel="icon">` automaticamente — os quatro 404 do layout antigo somem sem nenhuma configuração.

- [ ] **Passo 8: Rodar os testes**

```bash
bun run test
```
Esperado: PASS.

- [ ] **Passo 9: Commit**

```bash
git add lib/site.ts tests/site.test.ts app/sitemap.ts app/robots.ts app/manifest.ts app/icon.svg
git commit -m "feat(seo): canonical URL resolution, hreflang alternates, sitemap, robots and file-based icon"
```

---

## Tarefa 8: Primitivas de movimento e 3D em CSS

**Files:**
- Create: `components/motion/reveal.tsx`, `stagger.tsx`, `tilt-card.tsx`, `count-up.tsx`
- Create: `components/providers.tsx`
- Modify: `lib/utils.ts`

- [ ] **Passo 1: Garantir `lib/utils.ts`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
```

- [ ] **Passo 2: Criar `components/providers.tsx`**

`LazyMotion` com `domAnimation` carrega ~5 kB de features em vez do bundle completo do Motion; todos os componentes abaixo usam `m.*` em vez de `motion.*` para aproveitar isso.

```tsx
"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { LazyMotion, domAnimation, MotionConfig } from "motion/react";

export const Providers = ({ children }: { children: ReactNode }) => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
    <LazyMotion features={domAnimation} strict>
      {/* reducedMotion="user" faz o Motion respeitar a preferência do SO automaticamente. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  </ThemeProvider>
);
```

- [ ] **Passo 3: Criar `components/motion/reveal.tsx`**

```tsx
"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Atraso em segundos. Combine com o índice para escalonar listas. */
  delay?: number;
  as?: "div" | "li" | "section" | "article";
};

export const Reveal = ({ children, className, delay = 0, as = "div" }: RevealProps) => {
  const Component = m[as];

  return (
    <Component
      className={cn(className)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
};
```

- [ ] **Passo 4: Criar `components/motion/stagger.tsx`**

```tsx
"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";
import { cn } from "@/lib/utils";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const Stagger = ({ children, className }: { children: ReactNode; className?: string }) => (
  <m.div
    className={cn(className)}
    variants={container}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
  >
    {children}
  </m.div>
);

export const StaggerItem = ({ children, className }: { children: ReactNode; className?: string }) => (
  <m.div className={cn(className)} variants={item}>
    {children}
  </m.div>
);
```

- [ ] **Passo 5: Criar `components/motion/tilt-card.tsx`**

Este é o "3D" do projeto: perspectiva real em CSS, guiada pelo ponteiro, com mola. Zero WebGL, zero KB de textura.

```tsx
"use client";

import { useRef, type ReactNode } from "react";
import { m, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Amplitude máxima da rotação, em graus. */
  intensity?: number;
};

export const TiltCard = ({ children, className, intensity = 7 }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const spring = { stiffness: 220, damping: 24, mass: 0.6 };
  const rotateX = useSpring(
    useTransform(pointerY, [0, 1], [intensity, -intensity]),
    spring,
  );
  const rotateY = useSpring(
    useTransform(pointerX, [0, 1], [-intensity, intensity]),
    spring,
  );

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    // Só ponteiros finos inclinam: em touch, o gesto pertence ao scroll.
    if (event.pointerType !== "mouse") return;
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set((event.clientX - bounds.left) / bounds.width);
    pointerY.set((event.clientY - bounds.top) / bounds.height);
  };

  const reset = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <div className="tilt-scene">
      <m.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn("will-change-transform", className)}
      >
        {children}
      </m.div>
    </div>
  );
};
```

- [ ] **Passo 6: Criar `components/motion/count-up.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

type CountUpProps = {
  /** String como "06" ou "35" — zeros à esquerda são preservados. */
  value: string;
  className?: string;
};

export const CountUp = ({ value, className }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const target = Number.parseInt(value, 10);
  const pad = value.length;
  const [display, setDisplay] = useState(() => "0".padStart(pad, "0"));

  useEffect(() => {
    if (!inView || Number.isNaN(target)) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) =>
        setDisplay(String(Math.round(latest)).padStart(pad, "0")),
    });

    return () => controls.stop();
  }, [inView, target, pad, value]);

  return (
    <span ref={ref} className={className}>
      {Number.isNaN(target) ? value : display}
    </span>
  );
};
```

- [ ] **Passo 7: Verificar tipos**

```bash
bun run typecheck
```
Esperado: sem erros nos arquivos criados. Erros restantes só em `app/[locale]/*` (ainda não existe).

- [ ] **Passo 8: Commit**

```bash
git add lib/utils.ts components/providers.tsx components/motion
git commit -m "feat(motion): reveal, stagger, CSS 3D tilt and count-up primitives"
```

---

## Tarefa 9: Shell do locale — layout, header, footer, skip-link

**Files:**
- Create: `app/[locale]/layout.tsx`
- Create: `components/layout/header.tsx`, `footer.tsx`, `skip-link.tsx`
- Create: `components/primitives/rule.tsx`, `tag.tsx`, `action.tsx`

- [ ] **Passo 1: Criar as primitivas visuais**

`components/primitives/rule.tsx` — a régua editorial que substitui os títulos-eyebrow mal hierarquizados do site antigo:

```tsx
import { cn } from "@/lib/utils";

type RuleProps = {
  label: string;
  className?: string;
};

export const Rule = ({ label, className }: RuleProps) => (
  <div className={cn("flex items-center gap-4", className)}>
    <span className="eyebrow shrink-0">{label}</span>
    <span className="h-px flex-1 bg-rule" aria-hidden="true" />
  </div>
);
```

`components/primitives/tag.tsx`:

```tsx
import { cn } from "@/lib/utils";

export const Tag = ({ children, className }: { children: string; className?: string }) => (
  <span
    className={cn(
      "border border-rule px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-muted",
      className,
    )}
  >
    {children}
  </span>
);
```

`components/primitives/action.tsx`:

```tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

type ActionProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  external?: boolean;
  className?: string;
};

export const Action = ({
  href,
  children,
  variant = "solid",
  external = false,
  className,
}: ActionProps) => {
  const styles = cn(
    "group inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium tracking-tight transition-colors duration-200",
    variant === "solid"
      ? "bg-ink text-paper hover:bg-accent"
      : "border border-ink/25 text-ink hover:border-accent hover:text-accent",
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={styles}>
      {children}
    </Link>
  );
};
```

- [ ] **Passo 2: Criar `components/layout/skip-link.tsx`**

Resolve o `id="conteudo-principal"` órfão do site antigo.

```tsx
export const SkipLink = ({ label }: { label: string }) => (
  <a
    href="#main"
    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:text-paper"
  >
    {label}
  </a>
);
```

- [ ] **Passo 3: Criar `components/layout/header.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X } from "lucide-react";
import { dictionary } from "@/content/dictionary";
import { otherLocale, t, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const sections = ["about", "experience", "skills", "work", "contact"] as const;

const anchors: Record<(typeof sections)[number], string> = {
  about: "#about",
  experience: "#experience",
  skills: "#skills",
  work: "#work",
  contact: "#contact",
};

export const Header = ({ locale }: { locale: Locale }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu ao navegar.
  useEffect(() => setOpen(false), [pathname]);

  const target = otherLocale(locale);
  const swapPath = pathname.replace(`/${locale}`, `/${target}`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-rule bg-paper/85 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="shell flex items-center justify-between py-5">
        <Link
          href={`/${locale}`}
          className="font-display text-xl leading-none tracking-tight"
          aria-label={t(dictionary.nav.about, locale)}
        >
          DA<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Principal">
          {sections.map((section) => (
            <a
              key={section}
              href={anchors[section]}
              className="text-sm text-ink-muted transition-colors hover:text-accent"
            >
              {t(dictionary.nav[section], locale)}
            </a>
          ))}
          <Link
            href={`/${locale}/curriculo`}
            className="border-b border-accent pb-0.5 text-sm text-ink transition-colors hover:text-accent"
          >
            {t(dictionary.nav.resume, locale)}
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href={swapPath}
            hrefLang={target}
            className="px-2.5 py-2 font-mono text-xs uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-accent"
            aria-label={t(dictionary.actions.switchLanguage, locale)}
          >
            {target}
          </Link>

          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-2 text-ink-muted transition-colors hover:text-accent"
            aria-label={t(dictionary.actions.toggleTheme, locale)}
          >
            {/* Só renderiza o ícone após montar: evita mismatch de hidratação. */}
            {mounted && resolvedTheme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="p-2 text-ink-muted transition-colors hover:text-accent md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={t(open ? dictionary.actions.closeMenu : dictionary.actions.openMenu, locale)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-rule bg-paper md:hidden"
          aria-label="Principal"
        >
          <ul className="shell flex flex-col py-3">
            {sections.map((section) => (
              <li key={section}>
                <a
                  href={anchors[section]}
                  onClick={() => setOpen(false)}
                  className="block border-b border-rule/60 py-4 font-display text-step-1"
                >
                  {t(dictionary.nav[section], locale)}
                </a>
              </li>
            ))}
            <li>
              <Link
                href={`/${locale}/curriculo`}
                className="block py-4 font-display text-step-1 text-accent"
              >
                {t(dictionary.nav.resume, locale)}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
```

- [ ] **Passo 4: Criar `components/layout/footer.tsx`**

```tsx
import { dictionary } from "@/content/dictionary";
import { profile } from "@/content/profile";
import { t, type Locale } from "@/lib/i18n";

export const Footer = ({ locale }: { locale: Locale }) => (
  <footer className="border-t border-rule">
    <div className="shell flex flex-col gap-3 py-10 sm:flex-row sm:items-baseline sm:justify-between">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
        © {new Date().getFullYear()} {profile.name}. {t(dictionary.footer.rights, locale)}
      </p>
      <p className="font-mono text-xs tracking-[0.06em] text-ink-faint">
        {t(dictionary.footer.builtWith, locale)}
      </p>
    </div>
  </footer>
);
```

- [ ] **Passo 5: Criar `app/[locale]/layout.tsx`**

Aqui vivem as fontes, o `<html lang>` correto por idioma e o `generateMetadata` com canonical e hreflang.

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/layout/skip-link";
import { dictionary } from "@/content/dictionary";
import { profile } from "@/content/profile";
import { htmlLang, isLocale, locales, t, type Locale } from "@/lib/i18n";
import { absoluteUrl, alternatesFor, siteUrl } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale: Locale = raw;

  const title = t(dictionary.meta.title, locale);
  const description = t(dictionary.meta.description, locale);

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s — ${profile.name}` },
    description,
    alternates: alternatesFor(locale, ""),
    authors: [{ name: profile.name, url: profile.linkedin }],
    creator: profile.name,
    openGraph: {
      type: "profile",
      locale: htmlLang[locale].replace("-", "_"),
      url: absoluteUrl(locale),
      siteName: profile.name,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f4ec" },
    { media: "(prefers-color-scheme: dark)", color: "#221f1c" },
  ],
};

const LocaleLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <html
      lang={htmlLang[locale]}
      suppressHydrationWarning
      className={`${fraunces.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body className="grain">
        <Providers>
          <SkipLink label={t(dictionary.actions.skipToContent, locale)} />
          <Header locale={locale} />
          <main id="main">{children}</main>
          <Footer locale={locale} />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> `suppressHydrationWarning` no `<html>` é exigido pelo `next-themes`, que escreve a classe de tema antes da hidratação.

- [ ] **Passo 6: Verificar tipos**

```bash
bun run typecheck
```
Esperado: erro apenas em `app/[locale]/page.tsx` (inexistente).

- [ ] **Passo 7: Commit**

```bash
git add app/\[locale\]/layout.tsx components/layout components/primitives
git commit -m "feat(shell): locale layout with per-language metadata, editorial header, footer and skip link"
```

---

## Tarefa 10: Seções da home

**Files:**
- Create: `components/sections/hero.tsx`, `about.tsx`, `experience.tsx`, `skills.tsx`, `projects.tsx`, `project-dialog.tsx`, `contact.tsx`
- Create: `app/[locale]/page.tsx`
- Modify: `components/ui/dialog.tsx`, `components/ui/carousel.tsx`

**Regra de hierarquia:** cada seção tem exatamente **um** `<h2>` — o título real. O eyebrow é o `Rule`, que não é cabeçalho. Isso corrige a inversão `h2`/`h3` que existia nas seis seções antigas.

- [ ] **Passo 1: `components/sections/hero.tsx`**

```tsx
import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { Action } from "@/components/primitives/action";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { dictionary } from "@/content/dictionary";
import { profile, stats } from "@/content/profile";
import { t, type Locale } from "@/lib/i18n";

export const Hero = ({ locale }: { locale: Locale }) => (
  <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44" aria-labelledby="hero-title">
    {/* Wash de accent atrás do retrato — atmosfera sem custo de rede. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-10%] top-0 h-[38rem] w-[38rem] rounded-full bg-accent-soft blur-[110px] opacity-70"
    />

    <div className="shell relative grid gap-14 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <Reveal>
          <p className="eyebrow mb-7">
            {t(profile.role, locale)} · {t(profile.availability, locale)}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 id="hero-title" className="text-step-6 sm:text-step-7">
            {profile.name}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="measure mt-7 text-step-1 text-ink-muted">
            {t(profile.headline, locale)}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Action href="#contact">
              {t(dictionary.actions.getInTouch, locale)}
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Action>
            <Action href={`/${locale}/curriculo`} variant="outline">
              <FileText size={15} />
              {t(dictionary.actions.viewResume, locale)}
            </Action>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="lg:col-span-5">
        <figure className="relative">
          <div className="relative aspect-square w-full max-w-sm overflow-hidden border border-rule lg:ml-auto">
            <Image
              src={profile.photo}
              alt={`${profile.name} — ${t(profile.role, locale)}`}
              fill
              sizes="(max-width: 1024px) 90vw, 24rem"
              className="object-cover grayscale-[0.35] transition-[filter] duration-700 hover:grayscale-0"
              priority
            />
          </div>
          <figcaption className="eyebrow mt-4 lg:text-right">
            {t(profile.location, locale)}
          </figcaption>
        </figure>
      </Reveal>
    </div>

    <div className="shell relative mt-20 border-t border-rule pt-10">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.value + stat.label.pt}>
            <dt className="sr-only">{t(stat.label, locale)}</dt>
            <dd>
              <span className="font-display text-step-5 tabular leading-none">
                <CountUp value={stat.value} />
              </span>
              <span className="eyebrow mt-3 block">{t(stat.label, locale)}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);
```

> Se `public/david-artagnan.jpg` não existir, o `next/image` falha no build. Antes de rodar `bun run build`, confirmar o arquivo (Tarefa 2, Passo 4). Se o usuário optar por não usar foto, trocar o `<figure>` inteiro por um bloco tipográfico com as iniciais em `font-display text-step-7`.

- [ ] **Passo 2: `components/sections/about.tsx`**

```tsx
import { Reveal } from "@/components/motion/reveal";
import { Rule } from "@/components/primitives/rule";
import { dictionary } from "@/content/dictionary";
import { profile } from "@/content/profile";
import { t, type Locale } from "@/lib/i18n";

export const About = ({ locale }: { locale: Locale }) => (
  <section id="about" className="scroll-mt-28 py-24" aria-labelledby="about-title">
    <div className="shell">
      <Rule label={t(dictionary.sections.aboutEyebrow, locale)} className="mb-12" />

      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <h2 id="about-title" className="text-step-4">
            {t(dictionary.sections.aboutTitle, locale)}
          </h2>
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-5">
          <p className="measure text-ink-muted">{t(profile.summary, locale)}</p>
        </Reveal>
      </div>
    </div>
  </section>
);
```

- [ ] **Passo 3: `components/sections/experience.tsx`**

```tsx
import { Reveal } from "@/components/motion/reveal";
import { Rule } from "@/components/primitives/rule";
import { Tag } from "@/components/primitives/tag";
import { dictionary } from "@/content/dictionary";
import { experiences } from "@/content/resume";
import { t, type Locale } from "@/lib/i18n";

const monthNames: Record<Locale, string[]> = {
  pt: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

/** "2025-01" → "jan 2025" / "Jan 2025". */
const formatMonth = (iso: string, locale: Locale): string => {
  const [year, month] = iso.split("-");
  const index = Number.parseInt(month ?? "1", 10) - 1;
  return `${monthNames[locale][index] ?? ""} ${year}`;
};

export const Experience = ({ locale }: { locale: Locale }) => (
  <section id="experience" className="scroll-mt-28 py-24" aria-labelledby="experience-title">
    <div className="shell">
      <Rule label={t(dictionary.sections.experienceEyebrow, locale)} className="mb-12" />

      <Reveal>
        <h2 id="experience-title" className="mb-16 text-step-4">
          {t(dictionary.sections.experienceTitle, locale)}
        </h2>
      </Reveal>

      <ol className="border-t border-rule">
        {experiences.map((exp, index) => (
          <Reveal
            as="li"
            key={`${exp.company}-${exp.start}`}
            delay={index * 0.05}
            className="grid gap-5 border-b border-rule py-10 md:grid-cols-12 md:gap-8"
          >
            <div className="md:col-span-3">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-ink-muted tabular">
                <time dateTime={exp.start}>{formatMonth(exp.start, locale)}</time>
                {" — "}
                {exp.end ? (
                  <time dateTime={exp.end}>{formatMonth(exp.end, locale)}</time>
                ) : (
                  <span className="text-accent">{t(dictionary.labels.present, locale)}</span>
                )}
              </p>
              <p className="eyebrow mt-2">{t(exp.location, locale)}</p>
            </div>

            <div className="md:col-span-9">
              <h3 className="text-step-2">{t(exp.role, locale)}</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-accent">
                {exp.company}
              </p>

              <ul className="measure mt-5 space-y-2.5">
                {t(exp.bullets, locale).map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-step--1 text-ink-muted">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>

              {exp.stack.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {exp.stack.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);
```

- [ ] **Passo 4: `components/sections/skills.tsx`**

```tsx
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Reveal } from "@/components/motion/reveal";
import { Rule } from "@/components/primitives/rule";
import { dictionary } from "@/content/dictionary";
import { skillGroups } from "@/content/resume";
import { t, type Locale } from "@/lib/i18n";

export const Skills = ({ locale }: { locale: Locale }) => (
  <section id="skills" className="scroll-mt-28 py-24" aria-labelledby="skills-title">
    <div className="shell">
      <Rule label={t(dictionary.sections.skillsEyebrow, locale)} className="mb-12" />

      <Reveal>
        <h2 id="skills-title" className="mb-16 text-step-4">
          {t(dictionary.sections.skillsTitle, locale)}
        </h2>
      </Reveal>

      <Stagger className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <StaggerItem key={group.label.pt}>
            <h3 className="eyebrow border-b border-rule pb-3 text-accent">
              {t(group.label, locale)}
            </h3>
            <ul className="mt-5 space-y-2">
              {group.items.map((item) => (
                <li key={item} className="text-step--1 text-ink-muted">
                  {item}
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
);
```

- [ ] **Passo 5: `components/sections/project-dialog.tsx`**

Client Component. Reaproveita `components/ui/dialog.tsx` (foco-trap do Radix) e `carousel.tsx` (Embla), reestilizados para a paleta editorial.

```tsx
"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
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
                      <dd className="font-display text-step-2 tabular leading-none">
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
                      className="inline-flex items-center gap-2 bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:bg-accent"
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
                      <Github size={14} />
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

const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
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
```

- [ ] **Passo 6: `components/sections/projects.tsx`**

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ProjectDialog } from "./project-dialog";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { Rule } from "@/components/primitives/rule";
import { dictionary } from "@/content/dictionary";
import { projects } from "@/content/projects";
import type { Project } from "@/content/types";
import { t, type Locale } from "@/lib/i18n";

export const Projects = ({ locale }: { locale: Locale }) => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="work" className="scroll-mt-28 py-24" aria-labelledby="work-title">
      <div className="shell">
        <Rule label={t(dictionary.sections.workEyebrow, locale)} className="mb-12" />

        <Reveal>
          <h2 id="work-title" className="mb-16 text-step-4">
            {t(dictionary.sections.workTitle, locale)}
          </h2>
        </Reveal>

        <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {projects.map((project, index) => {
            const cover = project.images[0];
            if (!cover) return null;

            return (
              <Reveal as="li" key={project.slug} delay={(index % 2) * 0.08}>
                <TiltCard>
                  <button
                    type="button"
                    onClick={() => setSelected(project)}
                    aria-label={`${t(dictionary.actions.openProject, locale)}: ${project.title}`}
                    className="group block w-full text-left"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden border border-rule bg-paper-raised">
                      <Image
                        src={cover.src}
                        alt={t(cover.alt, locale)}
                        fill
                        sizes="(max-width: 640px) 92vw, (max-width: 1152px) 46vw, 34rem"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="mt-5 flex items-baseline justify-between gap-4">
                      <h3 className="text-step-2">{project.title}</h3>
                      <ArrowUpRight
                        size={18}
                        aria-hidden="true"
                        className="shrink-0 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </div>

                    <p className="eyebrow mt-1.5">
                      {t(project.segment, locale)} · {project.period}
                    </p>

                    <p className="measure mt-3 text-step--1 text-ink-muted">
                      {t(project.summary, locale)}
                    </p>
                  </button>
                </TiltCard>
              </Reveal>
            );
          })}
        </ul>
      </div>

      <ProjectDialog project={selected} locale={locale} onClose={() => setSelected(null)} />
    </section>
  );
};
```

- [ ] **Passo 7: `components/sections/contact.tsx`**

```tsx
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Rule } from "@/components/primitives/rule";
import { dictionary } from "@/content/dictionary";
import { contactChannels } from "@/content/profile";
import { t, type Locale } from "@/lib/i18n";

export const Contact = ({ locale }: { locale: Locale }) => (
  <section id="contact" className="scroll-mt-28 py-24" aria-labelledby="contact-title">
    <div className="shell">
      <Rule label={t(dictionary.sections.contactEyebrow, locale)} className="mb-12" />

      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <h2 id="contact-title" className="text-step-5">
            {t(dictionary.sections.contactTitle, locale)}
          </h2>
          <p className="measure mt-6 text-ink-muted">
            {t(dictionary.sections.contactBody, locale)}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6">
          <ul className="border-t border-rule">
            {contactChannels.map((channel) => (
              <li key={channel.id}>
                <a
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noopener noreferrer" : undefined}
                  className="group flex items-baseline justify-between gap-6 border-b border-rule py-5 transition-colors hover:text-accent"
                >
                  <span className="eyebrow">{t(channel.label, locale)}</span>
                  <span className="flex items-center gap-2 text-step--1 break-all">
                    {channel.display}
                    <ArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className="shrink-0 text-ink-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  </section>
);
```

- [ ] **Passo 8: `app/[locale]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { JsonLd } from "@/components/seo/json-ld";
import { isLocale, type Locale } from "@/lib/i18n";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <>
      <JsonLd locale={locale} />
      <Hero locale={locale} />
      <About locale={locale} />
      <Experience locale={locale} />
      <Skills locale={locale} />
      <Projects locale={locale} />
      <Contact locale={locale} />
    </>
  );
};

export default Page;
```

> `JsonLd` é criado na Tarefa 11. Executar a Tarefa 11 antes de rodar o build, ou comentar a linha temporariamente.

- [ ] **Passo 9: Reestilizar `dialog.tsx` e `carousel.tsx`**

Abrir `components/ui/dialog.tsx` e trocar as classes do overlay e do content que usam tokens antigos (`bg-background`, `text-foreground`, `border-border`) pelos novos (`bg-ink/45`, `bg-paper`, `border-rule`). Mesma coisa em `carousel.tsx`. Verificar que nenhum `@/components/ui/*` removido na Tarefa 2 continua importado:

```bash
grep -rn "@/components/ui/" components app | grep -v "ui/dialog\|ui/carousel"
```
Esperado: nenhuma saída.

- [ ] **Passo 10: Commit**

```bash
git add components/sections app/\[locale\]/page.tsx components/ui
git commit -m "feat(sections): editorial hero, about, experience, skills, work and contact"
```

---

## Tarefa 11: Dados estruturados e imagem OG

**Files:**
- Create: `components/seo/json-ld.tsx`
- Create: `app/[locale]/opengraph-image.tsx`

- [ ] **Passo 1: Criar `components/seo/json-ld.tsx`**

Substitui o `Person` isolado do site antigo por um grafo `@graph` ligando `Person`, `ProfilePage`, `WebSite` e a lista de projetos.

```tsx
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { experiences, keywords } from "@/content/resume";
import { dictionary } from "@/content/dictionary";
import { t, type Locale } from "@/lib/i18n";
import { absoluteUrl, siteUrl } from "@/lib/site";

export const JsonLd = ({ locale }: { locale: Locale }) => {
  const personId = `${siteUrl}/#person`;
  const current = experiences.find((exp) => exp.end === null);

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        jobTitle: t(profile.role, locale),
        description: t(profile.summary, locale),
        url: absoluteUrl(locale),
        image: absoluteUrl(profile.photo),
        email: `mailto:${profile.email}`,
        telephone: profile.phone,
        knowsLanguage: ["pt-BR", "en"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Uberlândia",
          addressRegion: "MG",
          addressCountry: "BR",
        },
        worksFor: current
          ? { "@type": "Organization", name: current.company }
          : undefined,
        alumniOf: [
          { "@type": "EducationalOrganization", name: "Centro Universitário UNA" },
          { "@type": "EducationalOrganization", name: "Rocketseat" },
        ],
        knowsAbout: keywords.slice(0, 24),
        sameAs: [profile.linkedin, profile.github],
      },
      {
        "@type": "ProfilePage",
        "@id": `${absoluteUrl(locale)}#page`,
        url: absoluteUrl(locale),
        name: t(dictionary.meta.title, locale),
        description: t(dictionary.meta.description, locale),
        inLanguage: locale === "pt" ? "pt-BR" : "en",
        mainEntity: { "@id": personId },
        about: { "@id": personId },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: profile.name,
        inLanguage: ["pt-BR", "en"],
        publisher: { "@id": personId },
      },
      {
        "@type": "ItemList",
        "@id": `${absoluteUrl(locale)}#work`,
        name: t(dictionary.labels.projects, locale),
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.title,
            description: t(project.summary, locale),
            about: t(project.segment, locale),
            keywords: project.stack.join(", "),
            image: absoluteUrl(project.images[0]?.src ?? profile.photo),
            creator: { "@id": personId },
            ...(project.liveUrl ? { url: project.liveUrl } : {}),
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify remove as chaves `undefined` automaticamente.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
};
```

- [ ] **Passo 2: Criar `app/[locale]/opengraph-image.tsx`**

Gera a imagem social sob demanda com `next/og` — resolve o `summary_large_image` que hoje aponta para nada.

```tsx
import { ImageResponse } from "next/og";
import { dictionary } from "@/content/dictionary";
import { profile, stats } from "@/content/profile";
import { isLocale, t } from "@/lib/i18n";

export const alt = "David Artagnan — Front-end Lead";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const Image = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "pt";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f8f4ec",
          color: "#2b2622",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#9a3f28",
            }}
          >
            {t(profile.role, locale)}
          </div>
          <div style={{ fontSize: 104, lineHeight: 1, letterSpacing: -3 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 30, color: "#6b6259", maxWidth: 780, lineHeight: 1.35 }}>
            {t(profile.headline, locale)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 64,
            borderTop: "1px solid #ddd5c8",
            paddingTop: 28,
          }}
        >
          {stats.map((stat) => (
            <div key={stat.value} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 46, lineHeight: 1 }}>{stat.value}</div>
              <div
                style={{
                  fontSize: 17,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#6b6259",
                }}
              >
                {t(stat.label, locale)}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
};

export default Image;
```

> `dictionary` não é usado aqui — remover o import se o ESLint acusar `no-unused-vars`.

- [ ] **Passo 3: Verificar**

```bash
bun run typecheck && bun run lint
```
Esperado: sem erros.

- [ ] **Passo 4: Commit**

```bash
git add components/seo app/\[locale\]/opengraph-image.tsx
git commit -m "feat(seo): schema.org graph and per-locale OpenGraph image"
```

---

## Tarefa 12: Página de currículo — o artefato ATS

**Files:**
- Create: `app/[locale]/curriculo/page.tsx`
- Create: `app/[locale]/curriculo/print.css`
- Create: `components/resume/print-button.tsx`

Esta é a peça mais importante para ATS e para busca long-tail. É **HTML semântico com texto real**, indexável, e a mesma página gera o PDF via `window.print()` — sem nenhuma dependência de geração de PDF, sem um segundo arquivo para manter sincronizado.

- [ ] **Passo 1: Criar `components/resume/print-button.tsx`**

```tsx
"use client";

import { Printer } from "lucide-react";

export const PrintButton = ({ label }: { label: string }) => (
  <button
    type="button"
    onClick={() => window.print()}
    className="inline-flex items-center gap-2 border border-ink/25 px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent print:hidden"
  >
    <Printer size={14} />
    {label}
  </button>
);
```

- [ ] **Passo 2: Criar `app/[locale]/curriculo/print.css`**

```css
@media print {
  /* Página limpa: preto sobre branco, uma coluna, sem cromo de navegação. */
  :root {
    --paper: #ffffff;
    --paper-raised: #ffffff;
    --ink: #000000;
    --ink-muted: #2b2b2b;
    --ink-faint: #555555;
    --rule: #cccccc;
    --accent: #000000;
  }

  @page {
    size: A4;
    margin: 14mm 15mm;
  }

  header[data-site-header],
  footer[data-site-footer],
  .print\:hidden {
    display: none !important;
  }

  body {
    background: #ffffff !important;
    font-size: 10.5pt;
    line-height: 1.42;
  }

  .grain::after { display: none !important; }

  .resume { max-width: none; padding: 0; }

  /* Nenhum bloco de experiência pode quebrar no meio da página. */
  .resume-entry,
  .resume-block {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  h1 { font-size: 20pt; }
  h2 { font-size: 12pt; margin-top: 14pt; }
  h3 { font-size: 11pt; }

  a { color: inherit; text-decoration: none; }
  /* URLs externas ficam legíveis no papel. */
  a[href^="http"]::after {
    content: " (" attr(href) ")";
    font-size: 8pt;
    color: #555555;
  }
}
```

- [ ] **Passo 3: Criar `app/[locale]/curriculo/page.tsx`**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PrintButton } from "@/components/resume/print-button";
import { dictionary } from "@/content/dictionary";
import { contactChannels, profile, stats } from "@/content/profile";
import {
  certifications,
  education,
  experiences,
  keywords,
  languages,
  skillGroups,
} from "@/content/resume";
import { projects } from "@/content/projects";
import { isLocale, locales, t, type Locale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/site";
import "./print.css";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};

  return {
    title: t(dictionary.meta.resumeTitle, raw),
    description: t(dictionary.meta.resumeDescription, raw),
    alternates: alternatesFor(raw, "/curriculo"),
  };
};

const monthNames: Record<Locale, string[]> = {
  pt: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

const formatMonth = (iso: string, locale: Locale): string => {
  const [year, month] = iso.split("-");
  const index = Number.parseInt(month ?? "1", 10) - 1;
  return `${monthNames[locale][index] ?? ""} ${year}`;
};

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <article className="resume shell max-w-3xl py-32 print:py-0">
      <div className="mb-10 flex flex-wrap items-center gap-3 print:hidden">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} />
          {t(dictionary.actions.backToSite, locale)}
        </Link>
        <PrintButton label={t(dictionary.actions.downloadPdf, locale)} />
      </div>

      <header className="border-b border-rule pb-8">
        <h1 className="text-step-5">{profile.name}</h1>
        <p className="mt-2 text-step-1 text-ink-muted">{t(profile.role, locale)}</p>
        <p className="mt-4 text-step--1 text-ink-muted">
          {t(profile.location, locale)} · {t(profile.availability, locale)}
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5 text-step--1">
          {contactChannels.map((channel) => (
            <li key={channel.id}>
              <a href={channel.href} className="text-ink-muted hover:text-accent">
                {channel.display}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <Block title={t(dictionary.labels.profile, locale)}>
        <p className="text-step--1 text-ink-muted">{t(profile.summary, locale)}</p>
        <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
          {stats.map((stat) => (
            <li key={stat.value} className="text-step--1 text-ink-muted">
              <strong className="text-ink tabular">{stat.value}</strong> {t(stat.label, locale)}
            </li>
          ))}
        </ul>
      </Block>

      <Block title={t(dictionary.nav.skills, locale)}>
        <dl className="space-y-3">
          {skillGroups.map((group) => (
            <div key={group.label.pt} className="text-step--1">
              <dt className="inline font-semibold">{t(group.label, locale)}: </dt>
              <dd className="inline text-ink-muted">{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block title={t(dictionary.nav.experience, locale)}>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <section key={`${exp.company}-${exp.start}`} className="resume-entry">
              <h3 className="text-step-0">
                {t(exp.role, locale)} — {exp.company}
              </h3>
              <p className="mt-1 text-step--1 text-ink-muted tabular">
                <time dateTime={exp.start}>{formatMonth(exp.start, locale)}</time>
                {" — "}
                {exp.end ? (
                  <time dateTime={exp.end}>{formatMonth(exp.end, locale)}</time>
                ) : (
                  t(dictionary.labels.present, locale)
                )}
                {" · "}
                {t(exp.location, locale)}
              </p>
              <ul className="mt-3 space-y-1.5">
                {t(exp.bullets, locale).map((bullet) => (
                  <li key={bullet} className="flex gap-2.5 text-step--1 text-ink-muted">
                    <span aria-hidden="true">·</span>
                    {bullet}
                  </li>
                ))}
              </ul>
              {exp.stack.length > 0 && (
                <p className="mt-2.5 text-step--1 text-ink-faint">
                  {t(dictionary.labels.technologies, locale)}: {exp.stack.join(", ")}
                </p>
              )}
            </section>
          ))}
        </div>
      </Block>

      <Block title={t(dictionary.labels.projects, locale)}>
        <div className="space-y-6">
          {projects.map((project) => (
            <section key={project.slug} className="resume-entry">
              <h3 className="text-step-0">
                {project.title} — {t(project.segment, locale)}
              </h3>
              <p className="mt-1 text-step--1 text-ink-faint">{project.stack.join(", ")}</p>
              <p className="mt-2 text-step--1 text-ink-muted">{t(project.summary, locale)}</p>
              <ul className="mt-2 space-y-1.5">
                {t(project.contributions, locale).map((item) => (
                  <li key={item} className="flex gap-2.5 text-step--1 text-ink-muted">
                    <span aria-hidden="true">·</span>
                    {item}
                  </li>
                ))}
              </ul>
              {project.liveUrl && (
                <p className="mt-2 text-step--1">
                  <a href={project.liveUrl} className="text-accent">
                    {project.liveUrl}
                  </a>
                </p>
              )}
            </section>
          ))}
        </div>
      </Block>

      <Block title={t(dictionary.labels.education, locale)}>
        <ul className="space-y-3">
          {education.map((entry) => (
            <li key={entry.institution} className="text-step--1">
              <strong>{t(entry.degree, locale)}</strong>
              <span className="text-ink-muted">
                {" — "}
                {entry.institution} · {entry.year}
              </span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title={t(dictionary.labels.certifications, locale)}>
        <ul className="flex flex-wrap gap-x-6 gap-y-1.5">
          {certifications.map((certification) => (
            <li key={certification.pt} className="text-step--1 text-ink-muted">
              {t(certification, locale)}
            </li>
          ))}
        </ul>
      </Block>

      <Block title={t(dictionary.labels.languages, locale)}>
        <ul className="space-y-1.5">
          {languages.map((language) => (
            <li key={language.name.pt} className="text-step--1 text-ink-muted">
              <strong className="text-ink">{t(language.name, locale)}</strong>
              {" — "}
              {t(language.level, locale)}
            </li>
          ))}
        </ul>
      </Block>

      <Block title={t(dictionary.labels.keywords, locale)}>
        <p className="text-step--1 leading-relaxed text-ink-faint">{keywords.join(" · ")}</p>
      </Block>
    </article>
  );
};

const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="resume-block mt-10 border-t border-rule pt-6">
    <h2 className="mb-4 text-step-1">{title}</h2>
    {children}
  </section>
);

export default Page;
```

- [ ] **Passo 4: Marcar header e footer para não imprimir**

Em `components/layout/header.tsx`, acrescentar `data-site-header` ao `<header>`. Em `components/layout/footer.tsx`, acrescentar `data-site-footer` ao `<footer>`. São os seletores que `print.css` usa.

- [ ] **Passo 5: Verificar visualmente a impressão**

```bash
bun run dev
```
Abrir `http://localhost:3000/pt/curriculo`, `Ctrl+P`, conferir na pré-visualização: uma coluna, preto sobre branco, sem header/footer, sem bloco de experiência quebrado ao meio. Repetir em `/en/curriculo`.

- [ ] **Passo 6: Commit**

```bash
git add app/\[locale\]/curriculo components/resume components/layout
git commit -m "feat(resume): indexable ATS resume page with print-to-PDF stylesheet"
```

---

## Tarefa 13: Build limpo e correção de regressões

**Files:** conforme o que a build acusar

- [ ] **Passo 1: Rodar a suíte completa**

```bash
bun run check
```
Esperado: typecheck, lint e testes todos verdes. Corrigir o que aparecer antes de seguir.

- [ ] **Passo 2: Build de produção**

```bash
bun run build
```
Esperado: sucesso, com `/pt` e `/en` marcadas como estáticas (`●` ou `○`) e `/pt/curriculo`, `/en/curriculo` idem.

**Falhas prováveis e o que fazer:**

| Erro | Causa | Correção |
|---|---|---|
| `Cannot find module '/david-artagnan.jpg'` | Foto não salva | Salvar em `public/david-artagnan.jpg` ou trocar o `<figure>` do hero pelo fallback tipográfico (Tarefa 10, Passo 1) |
| `Error: Cannot access 'axes' ... Fraunces` | Eixo variável indisponível na versão do `next/font` | Remover `axes` do `Fraunces()` e tirar `font-variation-settings` de `globals.css` |
| Hydration mismatch no `<html>` | `suppressHydrationWarning` ausente | Já está no layout; conferir que não foi removido |
| `useTheme` retorna `undefined` no primeiro render | Esperado | O guard `mounted` no header já cobre |

- [ ] **Passo 3: Conferir tamanho do JS na primeira carga**

Na tabela do output do build, `First Load JS` de `/pt` deve ficar **abaixo de 130 kB**. Se estourar, checar se algum `components/ui/*` removido voltou por import acidental, ou se `motion` está sendo importado como `motion/react` cheio em vez de `m` + `LazyMotion`.

- [ ] **Passo 4: Servir a build e conferir as rotas de SEO**

```bash
bun run start &
sleep 4
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:3000/
curl -s http://localhost:3000/sitemap.xml | head -20
curl -s http://localhost:3000/robots.txt
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/icon.svg
curl -s http://localhost:3000/pt | grep -o 'hreflang="[^"]*"'
```
Esperado: `307 .../pt` · XML com 4 URLs · robots com sitemap · `200` no ícone · três `hreflang` (`pt-BR`, `en`, `x-default`).

- [ ] **Passo 5: Commit**

```bash
git add -A
git commit -m "fix: resolve build regressions and verify SEO routes"
```

---

## Tarefa 14: Verificação de performance, acessibilidade e SEO

**Files:** nenhum novo — esta tarefa mede e corrige

- [ ] **Passo 1: Rodar Lighthouse nas quatro rotas**

Com `bun run start` ativo:

```bash
npx -y lighthouse http://localhost:3000/pt \
  --only-categories=performance,accessibility,best-practices,seo \
  --preset=desktop --quiet --chrome-flags="--headless" \
  --output=json --output-path=/tmp/lh-pt.json

npx -y lighthouse http://localhost:3000/pt/curriculo \
  --only-categories=performance,accessibility,best-practices,seo \
  --preset=desktop --quiet --chrome-flags="--headless" \
  --output=json --output-path=/tmp/lh-cv.json

node -e "
for (const f of ['/tmp/lh-pt.json','/tmp/lh-cv.json']) {
  const r = JSON.parse(require('fs').readFileSync(f));
  console.log(f, Object.fromEntries(Object.entries(r.categories).map(([k,v]) => [k, Math.round(v.score*100)])));
}"
```

**Metas:** Performance ≥ 95 · Accessibility = 100 · Best Practices ≥ 95 · SEO = 100.

Repetir com `--preset=mobile` (padrão, sem a flag `--preset`). Meta mobile: Performance ≥ 90.

- [ ] **Passo 2: Corrigir o que ficar abaixo da meta**

Diagnósticos mais prováveis e a correção correspondente:

| Auditoria | Correção |
|---|---|
| `uses-responsive-images` | Ajustar o `sizes` do `next/image` da imagem apontada |
| `unused-javascript` | Confirmar que `LazyMotion` está ativo e que nenhum `motion.*` (maiúsculo) sobrou fora de `components/motion/` |
| `largest-contentful-paint-element` aponta o retrato | `priority` já está; conferir que `sizes` bate com o tamanho renderizado |
| `color-contrast` | Algum uso de `text-ink-faint` em texto pequeno — trocar por `text-ink-muted` |
| `font-display` | Todas as três fontes já usam `display: "swap"` |
| `meta-description` ausente em `/curriculo` | `generateMetadata` da rota já define; conferir que não retornou `{}` |

- [ ] **Passo 3: Auditoria manual de teclado**

Com o dev server aberto, navegar a página inteira **só com Tab**:

1. Primeiro Tab revela o skip-link — confirmar que ele aparece e leva para `#main`.
2. Todo link e botão mostra anel de foco visível (`outline` accent, offset 3px).
3. Abrir um card de projeto com `Enter` → foco entra no diálogo e fica preso lá.
4. `Esc` fecha o diálogo e devolve o foco ao card de origem.
5. As setas do carrossel são alcançáveis por Tab dentro do diálogo.
6. O menu mobile abre por teclado e `aria-expanded` alterna.

- [ ] **Passo 4: Auditoria de movimento reduzido**

No DevTools → Rendering → *Emulate CSS prefers-reduced-motion: reduce*. Recarregar `/pt`. Confirmar: nada desliza, o `CountUp` mostra o valor final imediatamente, o tilt 3D não responde ao ponteiro, o scroll é instantâneo.

- [ ] **Passo 5: Validar os dados estruturados**

```bash
curl -s http://localhost:3000/pt | \
  grep -o '<script type="application/ld+json">.*</script>' | \
  sed 's/<[^>]*>//g' | node -e "
let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{
  const g=JSON.parse(s);
  console.log(g['@graph'].map(n=>n['@type']).join(', '));
});"
```
Esperado: `Person, ProfilePage, WebSite, ItemList`.

Depois colar a URL de produção no Rich Results Test do Google e confirmar zero erros.

- [ ] **Passo 6: Verificar a legibilidade por ATS**

O teste real: extrair o texto puro da página de currículo e conferir que os termos-chave estão presentes como texto, não como imagem.

```bash
curl -s http://localhost:3000/pt/curriculo | \
  sed -e 's/<script[^>]*>.*<\/script>//g' -e 's/<[^>]*>/ /g' | tr -s ' ' > /tmp/cv.txt

for term in "React" "Next.js" "TypeScript" "React Native" "JWT" "Front-end Lead" \
            "Acessibilidade" "Tailwind" "TanStack" "Clean Code" "WordPress"; do
  grep -qi -- "$term" /tmp/cv.txt && echo "ok   $term" || echo "FALTA $term"
done
wc -w /tmp/cv.txt
```
Esperado: `ok` em todos os termos; contagem de palavras acima de 700.

- [ ] **Passo 7: Commit**

```bash
git add -A
git commit -m "perf: address Lighthouse findings across home and resume routes"
```

---

## Tarefa 15: Documentação e entrega

**Files:**
- Create: `README.md`
- Create: `CLAUDE.md`
- Delete: `curriculo-david-artagnan-ats.md`

- [ ] **Passo 1: Escrever `README.md`**

````markdown
# Portfólio — David Artagnan

Front-end Lead · React, Next.js, React Native, TypeScript

## Stack

Next.js 16 (App Router) · React 19 · TypeScript 7 · Tailwind CSS 4 · Motion · Vitest · Bun

## Rodar

```bash
bun install
bun run dev        # http://localhost:3000 → redireciona para /pt
```

## Comandos

| Comando | O que faz |
|---|---|
| `bun run dev` | Servidor de desenvolvimento |
| `bun run build` | Build de produção |
| `bun run check` | typecheck + lint + testes |
| `bun run test` | Só os testes |

## Onde mexer no conteúdo

Nenhum texto vive em JSX. Tudo está em `content/`:

| Arquivo | Conteúdo |
|---|---|
| `content/profile.ts` | Nome, cargo, contato, estatísticas do hero |
| `content/resume.ts` | Experiências, competências, formação, certificações, palavras-chave |
| `content/projects.ts` | Projetos, imagens, métricas, contribuições |
| `content/dictionary.ts` | Strings de interface (nav, botões, títulos de seção) |

**Toda entrada precisa de `pt` e `en`.** `bun run test` falha e aponta o caminho exato se faltar um.

## Adicionar um projeto

1. Colocar as imagens em `public/project-images/<slug>-1.png`, `-2.png`, …
2. Acrescentar a entrada em `content/projects.ts` usando o helper `shots(slug, quantidade, nome)`
3. `bun run test` — valida slug único, caminhos de imagem e paridade de idioma

## Idiomas

- `/pt` — português (padrão; `/` redireciona para cá)
- `/en` — inglês

Para adicionar um terceiro idioma: incluir o código em `locales` (`lib/i18n.ts`), preencher a chave em todo `Record<Locale, …>` de `content/`, e rodar os testes.

## Domínio

Em produção a origem canônica vem de `VERCEL_PROJECT_PRODUCTION_URL`, injetada pela Vercel. Com domínio próprio, definir `NEXT_PUBLIC_SITE_URL=https://seudominio.com` nas variáveis de ambiente do projeto.

## Currículo

`/pt/curriculo` e `/en/resume-equivalente` são gerados de `content/resume.ts`. O botão "Baixar em PDF" usa a folha de impressão em `app/[locale]/curriculo/print.css` — não existe um PDF separado para manter sincronizado.
````

- [ ] **Passo 2: Escrever `CLAUDE.md`**

```markdown
# Portfólio — instruções do projeto

## Regra principal

Nenhuma string de interface em JSX. Todo texto vem de `content/` como `Record<Locale, T>` e é resolvido com `t(valor, locale)`.

## Convenções

- Seções são Server Components. Só `components/motion/*`, `header.tsx`, `projects.tsx`, `project-dialog.tsx` e `print-button.tsx` levam `"use client"`.
- Uma seção tem exatamente um `<h2>`. O eyebrow é `<Rule label>`, que não é cabeçalho.
- Cores só por token: `paper`, `ink`, `ink-muted`, `rule`, `accent`. Nunca hex literal no JSX.
- `text-ink-faint` não passa em contraste AA para texto pequeno — usar só em decoração ou texto ≥ 24px.
- Movimento sempre via `components/motion/*`, que já respeita `prefers-reduced-motion`.
- Motion se importa como `m` de `motion/react`, nunca `motion` — `LazyMotion` está em modo `strict`.

## Antes de commitar

`bun run check`
```

- [ ] **Passo 3: Remover o markdown solto do currículo**

O conteúdo agora vive em `content/resume.ts` e é servido em `/[locale]/curriculo`. Manter o `.md` cria uma segunda fonte de verdade que vai divergir.

```bash
rm curriculo-david-artagnan-ats.md
```

- [ ] **Passo 4: Verificação final**

```bash
bun run check && bun run build
```
Esperado: tudo verde.

- [ ] **Passo 5: Commit e push**

```bash
git add -A
git commit -m "docs: add README and project conventions, retire standalone resume markdown"
git push -u origin feat/portfolio-v2
```

- [ ] **Passo 6: Abrir o PR**

```bash
gh pr create --base main --head feat/portfolio-v2 \
  --title "feat: portfolio v2 — editorial redesign, bilingual content and performance overhaul" \
  --body "$(cat <<'BODY'
## O que muda

Reestruturação completa do portfólio sobre a stack estável mais recente.

### Stack
- Next 16.1.6 → 16.3.1, React 19.2.4 → 19.2.8, Tailwind 4.2 → 4.3.3, TS 5.7 → 7.0
- ESLint 10 e Vitest adicionados (o script `lint` existia sem ESLint instalado)
- 34 dependências não utilizadas removidas; 58 componentes shadcn órfãos apagados

### Correções
- `typescript.ignoreBuildErrors` e `images.unoptimized` removidos do config
- Os 4 ícones que davam 404 substituídos por `app/icon.svg` (convenção de arquivo)
- Hierarquia `h2`/`h3` invertida corrigida nas 6 seções
- Telefone divergente entre hero, contato e currículo unificado em `content/profile.ts`
- Skip-link criado para o `id="conteudo-principal"` que existia sem alvo

### Novo
- Redesign "Editorial Técnico": Fraunces + Instrument Sans + JetBrains Mono, paleta em OKLCH, claro e escuro
- Bilíngue PT/EN em `/pt` e `/en`, com hreflang, sitemap e OG por idioma
- Página de currículo indexável em `/[locale]/curriculo`, com impressão em PDF sem dependências
- Movimento com Motion (`LazyMotion`) e 3D em CSS puro — sem WebGL
- Dados estruturados schema.org: Person, ProfilePage, WebSite, ItemList

### Verificação
- `bun run check` verde
- Lighthouse ≥ 95 performance, 100 acessibilidade, 100 SEO nas rotas principais
- Navegação completa por teclado auditada; `prefers-reduced-motion` respeitado
BODY
)"
```

---

## Auto-revisão

**Cobertura do pedido original**

| Pedido | Onde é atendido |
|---|---|
| Criar nova branch | `feat/portfolio-v2`, criada antes deste plano |
| Next na versão estável mais recente | Tarefa 1, Passo 2 — 16.3.1 |
| Todas as demais bibliotecas atualizadas | Tarefa 1, Passos 1-2 |
| Atualizar stack | Tarefa 1 |
| Atualizar design e UX | Tarefas 3, 8, 9, 10 |
| Reformular conteúdo e apresentação | Tarefas 5, 6, 10, 12 |
| Velocidade | Tarefas 1 (config), 13 (bundle), 14 (Lighthouse) |
| Acessibilidade | Tarefas 3 (contraste, foco), 9 (skip-link), 10 (hierarquia), 14 (auditoria de teclado) |
| SEO | Tarefas 7, 11, 14 |
| ATS | Tarefas 6, 12, 14 (Passo 6) |
| Visual moderno | Tarefa 3 |
| Animações e interatividade | Tarefa 8 |
| 3D | Tarefa 8 — `TiltCard`, CSS puro conforme escolhido |
| Responsivo | Escala fluida (Tarefa 3), grid por seção (Tarefa 10) |
| Conteúdo do currículo ATS | Tarefa 6, integral |

**Consistência de tipos** — `Locale`, `LocalizedText`, `LocalizedList`, `Project`, `Experience`, `SkillGroup`, `EducationEntry`, `Stat` e `ContactChannel` são definidos na Tarefa 4 e usados com a mesma assinatura nas Tarefas 5, 6, 9, 10, 11 e 12. `t()`, `absoluteUrl()`, `alternatesFor()` e `cn()` idem.

**Riscos conhecidos**

1. **TypeScript 7** é o port nativo e ainda pode ter atrito com o plugin `next`. Fallback para `typescript@6` está documentado na Tarefa 1, Passo 2.
2. **Eixos variáveis da Fraunces** via `next/font` — fallback documentado na Tarefa 13, Passo 2.
3. **Foto ausente** quebra o build do hero. Verificação na Tarefa 2, Passo 4; fallback tipográfico na Tarefa 10, Passo 1.
4. **PDF por `window.print()`** exige ação do usuário no diálogo de impressão em vez de baixar um arquivo direto. É a troca deliberada por zero dependência e zero risco de o PDF divergir do site. Se um arquivo direto for exigido depois, gerar uma vez e servir de `public/`.
