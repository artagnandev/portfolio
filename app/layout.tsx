import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "David Artagnan | Front-end Lead | React, Next.js, TypeScript",
  description:
    "Desenvolvedor front-end com mais de 5 anos de experiência em React, Next.js, React Native e TypeScript. Front-end Lead na Flow Lab Tech, Uberlândia-MG.",
  keywords: [
    "David Artagnan",
    "Desenvolvedor Front-end",
    "React",
    "Next.js",
    "React Native",
    "TypeScript",
    "JavaScript",
    "Front-end Lead",
    "Uberlândia",
    "Flow Lab Tech",
  ],
  authors: [{ name: "David Artagnan" }],
  creator: "David Artagnan",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "David Artagnan | Front-end Lead",
    description:
      "Desenvolvedor front-end com mais de 5 anos de experiência em React, Next.js, React Native e TypeScript.",
    siteName: "David Artagnan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "David Artagnan | Front-end Lead",
    description:
      "Desenvolvedor front-end com mais de 5 anos de experiência em React, Next.js, React Native e TypeScript.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a2332",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
