import type { ReactNode } from "react";
import "./globals.css";

// O <html> e o <body> vivem em app/[locale]/layout.tsx, onde o idioma é conhecido.
// Este layout raiz existe apenas para carregar a folha de estilo uma única vez.
const RootLayout = ({ children }: { children: ReactNode }) => children;

export default RootLayout;
