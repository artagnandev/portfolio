import { GraduationCap } from "lucide-react";

const educationItems = [
  {
    institution: "Centro Universitário UNA",
    degree: "Tecnologo em Tecnologia da Informacao / Sistemas da Informacao",
    year: "Concluído em Junho de 2023",
  },
  {
    institution: "Rocketseat",
    degree: "Tecnologia da Informação / Sistemas da Informação",
    year: "Formação complementar",
  },
];

export function Education() {
  return (
    <section
      id="formacao"
      className="scroll-mt-24 px-6 py-24"
      aria-labelledby="formacao-titulo"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px flex-1 max-w-12 bg-primary" aria-hidden="true" />
          <h2
            id="formacao-titulo"
            className="text-xs font-semibold uppercase tracking-widest text-primary"
          >
            Formação
          </h2>
        </div>

        <h3 className="mb-12 text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
          Formação acadêmica
        </h3>

        <div className="grid gap-6 sm:grid-cols-2">
          {educationItems.map((item) => (
            <article
              key={item.institution}
              className="group flex gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/20"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <GraduationCap size={24} />
              </div>
              <div>
                <h4 className="text-base font-bold text-foreground">
                  {item.institution}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.degree}
                </p>
                <p className="mt-2 text-xs font-medium text-primary/70">
                  {item.year}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
