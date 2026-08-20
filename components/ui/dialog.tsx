"use client";

import type { ComponentProps } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Wrapper mínimo sobre o Radix Dialog. Mantido pela acessibilidade que o
 * primitivo entrega (foco-trap, Esc, aria-modal) — a aparência é toda nossa.
 * As animações vêm de keyframes em globals.css, não do tw-animate-css.
 */
const Dialog = (props: ComponentProps<typeof DialogPrimitive.Root>) => (
  <DialogPrimitive.Root data-slot="dialog" {...props} />
);

const DialogOverlay = ({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Overlay>) => (
  <DialogPrimitive.Overlay
    data-slot="dialog-overlay"
    className={cn(
      "fixed inset-0 z-50 bg-ink/55 backdrop-blur-[2px]",
      "data-[state=open]:animate-dialog-in data-[state=closed]:animate-dialog-out",
      className,
    )}
    {...props}
  />
);

const DialogContent = ({
  className,
  children,
  closeLabel = "Fechar",
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & { closeLabel?: string }) => (
  <DialogPrimitive.Portal data-slot="dialog-portal">
    <DialogOverlay />
    <DialogPrimitive.Content
      data-slot="dialog-content"
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 bg-paper text-ink shadow-2xl shadow-ink/10",
        "data-[state=open]:animate-dialog-in data-[state=closed]:animate-dialog-out",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        data-slot="dialog-close"
        className="absolute right-4 top-4 z-10 border border-rule bg-paper/90 p-2 backdrop-blur-sm transition-colors hover:text-accent"
      >
        <X size={16} />
        <span className="sr-only">{closeLabel}</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);

const DialogHeader = ({ className, ...props }: ComponentProps<"div">) => (
  <div data-slot="dialog-header" className={cn("flex flex-col gap-2", className)} {...props} />
);

const DialogTitle = ({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title
    data-slot="dialog-title"
    className={cn("leading-none", className)}
    {...props}
  />
);

const DialogDescription = ({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) => (
  <DialogPrimitive.Description
    data-slot="dialog-description"
    className={cn("text-step--1", className)}
    {...props}
  />
);

export { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle };
