const experiences = [
  {
    company: "Flow - Lab Tech",
    role: "Front End Lead",
    period: "Jan 2025 - Presente",
    location: "Uberlândia, MG",
    description: [
      "Lidero a estratégia de desenvolvimento front-end, guiando equipes na entrega de soluções inovadoras para sistemas web e mobile.",
      "Implemento arquiteturas escaláveis com React e TypeScript, elevando a performance e a experiência do usuário.",
      "Colaboração direta com stakeholders para alinhar tecnologia as necessidades do negócio, garantindo resultados de alto impacto.",
    ],
    tags: ["React", "TypeScript", "Lideranca", "Arquitetura"],
    isCurrent: true,
  },
  {
    company: "Flow - Lab Tech",
    role: "Desenvolvedor Front-end",
    period: "Out 2020 - Dez 2024",
    location: "Uberlândia, MG",
    description: [
      "Desenvolvi sistemas web e aplicativos para empresas de diversos setores, utilizando React, Next.js e React Native com foco em performance e escalabilidade.",
      "Apliquei boas práticas de desenvolvimento, como Clean Code e otimização de performance, resultando em interfaces rápidas e confiáveis.",
      "Contribui para a modernização de sites institucionais, aumentando o engajamento do usuário e a eficiência operacional.",
    ],
    tags: ["React", "Next.js", "React Native", "Clean Code"],
    isCurrent: false,
  },
  {
    company: "Freelance",
    role: "Desenvolvedor Web Front-end",
    period: "Mai 2020 - Out 2020",
    location: "Remoto",
    description: [
      "Executei projetos personalizados, entregando soluções web sob medida que atenderam as necessidades específicas de clientes.",
      "Dediquei-me ao aprimoramento continuo, aprofundando conhecimentos em JavaScript e React.",
    ],
    tags: ["JavaScript", "React", "Freelance"],
    isCurrent: false,
  },
  {
    company: "UNITRI - Centro Universitario do Triangulo",
    role: "Desenvolvedor Web Front-end - Jovem Aprendiz",
    period: "Fev 2020 - Mai 2020",
    location: "Uberlândia, MG",
    description: [
      "Inicio da carreira em desenvolvimento, atuando como jovem aprendiz.",
    ],
    tags: ["HTML", "CSS", "JavaScript"],
    isCurrent: false,
  },
  {
    company: "UNITRI - Centro Universitario do Triangulo",
    role: "Auxiliar Administrativo - Jovem Aprendiz",
    period: "Dez 2018 - Fev 2020",
    location: "Uberlândia, MG",
    description: [
      "Atuação como jovem aprendiz na área administrativa, desenvolvendo habilidades organizacionais e profissionais.",
    ],
    tags: ["Administrativo"],
    isCurrent: false,
  },
];

export function Experience() {
  return (
    <section
      id="experiencia"
      className="scroll-mt-24 px-6 py-24"
      aria-labelledby="experiencia-titulo"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px flex-1 max-w-12 bg-primary" aria-hidden="true" />
          <h2
            id="experiencia-titulo"
            className="text-xs font-semibold uppercase tracking-widest text-primary"
          >
            Experiência
          </h2>
        </div>

        <h3 className="mb-12 text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
          Trajetória profissional
        </h3>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute top-0 bottom-0 left-0 w-px bg-border md:left-[140px]"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <article
                key={`${exp.company}-${exp.role}`}
                className="group relative pl-8 md:pl-[180px]"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 top-1 flex h-3 w-3 -translate-x-[5px] items-center justify-center md:left-[140px] ${
                    exp.isCurrent ? "animate-pulse" : ""
                  }`}
                  aria-hidden="true"
                >
                  <div
                    className={`h-3 w-3 rounded-full border-2 ${
                      exp.isCurrent
                        ? "border-primary bg-primary"
                        : "border-border bg-background"
                    }`}
                  />
                </div>

                {/* Period label for desktop */}
                <div className="absolute left-0 top-0 hidden w-[120px] text-right md:block">
                  <time className="text-xs font-medium text-muted-foreground">
                    {exp.period}
                  </time>
                </div>

                <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/20">
                  <div className="mb-1 md:hidden">
                    <time className="text-xs font-medium text-muted-foreground">
                      {exp.period}
                    </time>
                  </div>

                  <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
                    <h4 className="text-base font-bold text-foreground">
                      {exp.role}
                    </h4>
                    {exp.isCurrent && (
                      <span className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        Atual
                      </span>
                    )}
                  </div>

                  <p className="mb-3 text-sm font-medium text-primary/80">
                    {exp.company}
                    <span className="text-muted-foreground">
                      {" · "}
                      {exp.location}
                    </span>
                  </p>

                  <ul className="mb-4 space-y-2" role="list">
                    {exp.description.map((desc, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60"
                          aria-hidden="true"
                        />
                        {desc}
                      </li>
                    ))}
                  </ul>

                  <div
                    className="flex flex-wrap gap-2"
                    role="list"
                    aria-label="Tecnologias utilizadas"
                  >
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                        role="listitem"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
