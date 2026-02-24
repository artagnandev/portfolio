import { Mail, Phone, Linkedin, ArrowUpRight } from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    label: "E-mail",
    value: "davidrezendeartagnan619@gmail.com",
    href: "mailto:davidrezendeartagnan619@gmail.com",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "+55 (34) 99691-5092",
    href: "tel:+5534996915092",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/david-artagnan",
    href: "https://www.linkedin.com/in/david-artagnan",
    external: true,
  },
];

export function Contact() {
  return (
    <section
      id="contato"
      className="scroll-mt-24 bg-card/50 px-6 py-24"
      aria-labelledby="contato-titulo"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px flex-1 max-w-12 bg-primary" aria-hidden="true" />
          <h2
            id="contato-titulo"
            className="text-xs font-semibold uppercase tracking-widest text-primary"
          >
            Contato
          </h2>
        </div>

        <h3 className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
          Vamos conversar?
        </h3>

        <p className="mb-12 max-w-xl text-muted-foreground leading-relaxed">
          Estou disponível para novos projetos e oportunidades. Se você quer
          discutir um projeto ou apenas trocar uma ideia, entre em contato.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {contactItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <item.icon size={20} />
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground break-all">
                  {item.value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
