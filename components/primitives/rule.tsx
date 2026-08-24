import { cn } from "@/lib/utils";

type RuleProps = {
  label: string;
  className?: string;
};

/**
 * Régua editorial com rótulo. Substitui os eyebrows que o site antigo
 * marcava como <h2>, invertendo a hierarquia de cabeçalhos.
 * Isto não é um cabeçalho — é ornamento tipográfico.
 */
export const Rule = ({ label, className }: RuleProps) => (
  <div className={cn("flex items-center gap-4", className)}>
    <span className="eyebrow shrink-0">{label}</span>
    <span className="h-px flex-1 bg-rule" aria-hidden="true" />
  </div>
);
