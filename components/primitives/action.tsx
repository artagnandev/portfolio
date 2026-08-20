import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ActionProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  external?: boolean;
  className?: string;
};

export const Action = ({
  href,
  children,
  variant = "solid",
  external = false,
  className,
}: ActionProps) => {
  const styles = cn(
    "group inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium tracking-tight transition-colors duration-200",
    variant === "solid"
      ? "bg-ink text-paper hover:bg-accent hover:text-accent-contrast"
      : "border border-ink/25 text-ink hover:border-accent hover:text-accent",
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={styles}>
      {children}
    </Link>
  );
};
