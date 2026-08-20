# Portfólio — David Artagnan

Front-end Lead · React, Next.js, React Native, TypeScript

## Stack

Next.js 16 (App Router) · React 19 · TypeScript 6 · Tailwind CSS 4 · Motion · Vitest · Bun

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

**Toda entrada precisa de `pt` e `en`.** `bun run test` falha apontando o caminho exato da string faltante (ex.: `nav.work → en`).

## Adicionar um projeto

1. Colocar as imagens em `public/project-images/<slug>-1.png`, `-2.png`, …
2. Acrescentar a entrada em `content/projects.ts` usando o helper `shots(slug, quantidade, nome)`
3. `bun run test` — valida slug único, existência de cada arquivo de imagem em disco e paridade de idioma

## A foto do hero

O hero espera `public/david-artagnan.jpg` (quadrado, ≥ 800×800). O arquivo **não** está no repositório.

Enquanto ele não existir, o hero mostra um bloco tipográfico com as iniciais — a build não quebra e nenhuma requisição 404 é feita. A checagem acontece em tempo de build, em `lib/assets.ts`.

Basta salvar o arquivo e rodar `bun run build`.

## Idiomas

- `/pt` — português (padrão; `/` redireciona para cá com 307)
- `/en` — inglês

Cada rota tem canonical próprio e `hreflang` para os dois idiomas mais `x-default`.

Para adicionar um terceiro idioma: incluir o código em `locales` (`lib/i18n.ts`), preencher a chave em todo `Record<Locale, …>` de `content/`, e rodar os testes — eles apontam o que falta.

## Domínio

Em produção a origem canônica vem de `VERCEL_PROJECT_PRODUCTION_URL`, injetada automaticamente pela Vercel. Com domínio próprio, definir nas variáveis de ambiente do projeto:

```
NEXT_PUBLIC_SITE_URL=https://seudominio.com
```

Sem nenhuma das duas, o fallback é `https://portfolio-artagnandev.vercel.app` (`lib/site.ts`).

## Currículo

`/pt/curriculo` e `/en/curriculo` são gerados de `content/resume.ts` e `content/projects.ts`. São HTML semântico completo e indexável — é essa página que um ATS e o Google leem.

O botão "Baixar em PDF" chama `window.print()` sobre a folha de impressão em `app/[locale]/curriculo/print.css`. Não existe um PDF separado no repositório, então não há como o arquivo divergir do site.

## Notas de versão da stack

Duas dependências estão deliberadamente abaixo do último major:

- **TypeScript 6** (e não 7): `typescript-eslint`, dependência do `eslint-config-next`, ainda não suporta a API do TS 7.
- **ESLint 9** (e não 10): `eslint-plugin-react`, também transitivo do Next, usa APIs removidas no ESLint 10.

Revisar quando o ecossistema do Next atualizar.
