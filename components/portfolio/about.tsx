import { MapPin, Briefcase, Code2 } from "lucide-react";

const highlights = [
  {
    icon: Briefcase,
    label: "Experiência",
    value: "+5 anos",
  },
  {
    icon: Code2,
    label: "Foco",
    value: "Front-end",
  },
  {
    icon: MapPin,
    label: "Localização",
    value: "Uberlândia, MG",
  },
];

export function About() {
  return (
    <section
      id="sobre"
      className="scroll-mt-24 px-6 py-24"
      aria-labelledby="sobre-titulo"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px flex-1 max-w-12 bg-primary" aria-hidden="true" />
          <h2
            id="sobre-titulo"
            className="text-xs font-semibold uppercase tracking-widest text-primary"
          >
            Sobre
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h3 className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
              Construindo experiências digitais que importam
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Desenvolvedor front-end com mais de 5 anos de experiência em
                construção de aplicações web e mobile escaláveis, utilizando
                JavaScript, TypeScript, React, Next.js e React Native.
              </p>
              <p>
                Participei de projetos de sistemas de gestão, aplicativos e
                sites institucionais, aplicando boas praticas de
                desenvolvimento, como Clean Code, e otimizando performance.
              </p>
              <p>
                Domino ferramentas modernas e mantenho-me atualizado com as
                últimas tendências do mercado, garantindo entregas de alta
                qualidade que atendem as necessidades de negócios e usuários.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
