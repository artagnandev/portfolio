import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/layout/skip-link";
import { dictionary } from "@/content/dictionary";
import { profile } from "@/content/profile";
import { htmlLang, isLocale, locales, t, type Locale } from "@/lib/i18n";
import { absoluteUrl, alternatesFor, siteUrl } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale: Locale = raw;

  const title = t(dictionary.meta.title, locale);
  const description = t(dictionary.meta.description, locale);

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s — ${profile.name}` },
    description,
    alternates: alternatesFor(locale, ""),
    authors: [{ name: profile.name, url: profile.linkedin }],
    creator: profile.name,
    openGraph: {
      type: "profile",
      locale: htmlLang[locale].replace("-", "_"),
      url: absoluteUrl(locale),
      siteName: profile.name,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f4ec" },
    { media: "(prefers-color-scheme: dark)", color: "#221f1c" },
  ],
};

const LocaleLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    // suppressHydrationWarning é exigido pelo next-themes, que escreve a
    // classe de tema antes da hidratação.
    <html
      lang={htmlLang[locale]}
      suppressHydrationWarning
      className={`${fraunces.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body className="grain">
        <Providers>
          <SkipLink label={t(dictionary.actions.skipToContent, locale)} />
          <Header locale={locale} />
          <main id="main">{children}</main>
          <Footer locale={locale} />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default LocaleLayout;
