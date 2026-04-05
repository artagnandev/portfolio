export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border px-6 py-8" role="contentinfo">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          {`© ${currentYear} David Artagnan. Todos os direitos reservados.`}
        </p>
        <p className="text-xs text-muted-foreground/60">
          {"Desenvolvido com Next.js e Tailwind CSS"}
        </p>
      </div>
    </footer>
  )
}
