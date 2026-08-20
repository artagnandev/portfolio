# Portfólio — instruções do projeto

## Regra principal

Nenhuma string de interface em JSX. Todo texto vem de `content/` como `Record<Locale, T>` e é resolvido com `t(valor, locale)`.

## Convenções

- Seções são Server Components. Levam `"use client"` apenas: `components/motion/*`, `layout/header.tsx`, `sections/projects.tsx`, `sections/project-dialog.tsx`, `resume/print-button.tsx`, `providers.tsx` e `hooks/use-reduced-motion.ts`.
- Uma seção tem exatamente um `<h2>`. O eyebrow é `<Rule label>`, que **não** é cabeçalho.
- Cores só por token: `paper`, `paper-raised`, `ink`, `ink-muted`, `rule`, `accent`, `accent-soft`, `accent-contrast`. Nunca hex literal no JSX.
- `text-ink-faint` não passa em contraste AA para texto pequeno — usar só em decoração ou texto ≥ 24px.
- Movimento sempre via `components/motion/*`, que já respeita `prefers-reduced-motion`.
- Motion se importa como `m` de `motion/react`, nunca `motion` — o `LazyMotion` está em modo `strict` e quebra em runtime se o componente completo for usado.

## Regra de LCP

**Nada acima da dobra pode depender da hidratação para ficar visível.**

A dobra inicial anima com os utilitários CSS `.rise`, `.rise-1`…`.rise-4` (`app/globals.css`), que rodam no primeiro paint. O `<Reveal>` do Motion só entra abaixo da dobra — ele começa em `opacity: 0` e, se envolvesse o `<h1>`, o LCP saltaria de ~1s para ~4s em mobile.

## Sem setState síncrono em effect

O `react-hooks/set-state-in-effect` está ativo e é erro. Padrões já usados no projeto para contorná-lo corretamente:

- Estado de scroll → `IntersectionObserver` sobre uma sentinela (`layout/header.tsx`)
- Tema → renderizar ambos os ícones e deixar o CSS escolher, sem estado `mounted`
- Media query → `useSyncExternalStore` (`hooks/use-reduced-motion.ts`)

## Ícones

`lucide-react` 1.x removeu todos os ícones de marca (`Github`, `Linkedin`). Usar ícones genéricos.

## Antes de commitar

```bash
bun run check
```
