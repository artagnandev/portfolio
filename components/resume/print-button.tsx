"use client";

import { Printer } from "lucide-react";

export const PrintButton = ({ label }: { label: string }) => (
  <button
    type="button"
    onClick={() => window.print()}
    className="inline-flex items-center gap-2 border border-ink/25 px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent print:hidden"
  >
    <Printer size={14} />
    {label}
  </button>
);
