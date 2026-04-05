const skillCategories = [
  {
    title: "Linguagens",
    skills: ["JavaScript", "TypeScript", "HTML5", "CSS3"],
  },
  {
    title: "Frameworks & Bibliotecas",
    skills: ["React", "Next.js", "React Native", "WordPress"],
  },
  {
    title: "Ferramentas & Práticas",
    skills: [
      "Chrome DevTools",
      "SEO On-Page",
      "Clean Code",
      "HTTP",
      "Git",
      "Performance",
    ],
  },
  {
    title: "Certificações",
    skills: [
      "HTTP e Performance",
      "Fundamentos do React",
      "Aprofundando em Hooks",
      "Clean Code",
    ],
  },
];

export function Skills() {
  return (
    <section
      id="competencias"
      className="scroll-mt-24 bg-card/50 px-6 py-24"
      aria-labelledby="competencias-titulo"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px flex-1 max-w-12 bg-primary" aria-hidden="true" />
          <h2
            id="competencias-titulo"
            className="text-xs font-semibold uppercase tracking-widest text-primary"
          >
            Competências
          </h2>
        </div>

        <h3 className="mb-12 text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
          Tecnologias e habilidades
        </h3>

        <div className="grid gap-6 sm:grid-cols-2">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/20"
            >
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                {category.title}
              </h4>
              <div
                className="flex flex-wrap gap-2"
                role="list"
                aria-label={category.title}
              >
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    role="listitem"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
