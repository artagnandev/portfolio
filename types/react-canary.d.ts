/**
 * `<ViewTransition>` existe em runtime — o App Router roda sobre o build canary
 * do React que o próprio Next empacota (`next/dist/compiled/react`). Os tipos,
 * porém, só são declarados no canal canary do `@types/react`, que não entra por
 * padrão. Esta referência liga essas declarações ao módulo `react`.
 *
 * @see https://nextjs.org/docs/app/guides/view-transitions
 */
/// <reference types="react/canary" />
