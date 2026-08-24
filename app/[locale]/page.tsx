import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { JsonLd } from "@/components/seo/json-ld";
import { isLocale, type Locale } from "@/lib/i18n";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <>
      <JsonLd locale={locale} />
      <Hero locale={locale} />
      <About locale={locale} />
      <Experience locale={locale} />
      <Skills locale={locale} />
      <Projects locale={locale} />
      <Contact locale={locale} />
    </>
  );
};

export default Page;
