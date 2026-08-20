import { cn } from "@/lib/utils";

export const Tag = ({ children, className }: { children: string; className?: string }) => (
  <span
    className={cn(
      "border border-rule px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-muted",
      className,
    )}
  >
    {children}
  </span>
);
