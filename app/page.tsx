import { Header } from "@/layouts/portfolio/header";
import { Hero } from "@/layouts/portfolio/hero";
import { About } from "@/layouts/portfolio/about";
import { Experience } from "@/layouts/portfolio/experience";
import { Skills } from "@/layouts/portfolio/skills";
import { Projects } from "@/layouts/portfolio/projects";
import { Education } from "@/layouts/portfolio/education";
import { Contact } from "@/layouts/portfolio/contact";
import { Footer } from "@/layouts/portfolio/footer";

export default function Page() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="conteudo-principal">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        {/* <Education /> */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "David Artagnan",
    jobTitle: "Front-end Lead",
    description:
      "Desenvolvedor front-end com mais de 5 anos de experiencia em React, Next.js, React Native e TypeScript.",
    url: "https://www.linkedin.com/in/david-artagnan",
    email: "davidrezendeartagnan619@gmail.com",
    telephone: "+5534996915092",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Uberlandia",
      addressRegion: "Minas Gerais",
      addressCountry: "BR",
    },
    worksFor: {
      "@type": "Organization",
      name: "Flow - Lab Tech",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Centro Universitario Una",
      },
      {
        "@type": "EducationalOrganization",
        name: "Rocketseat",
      },
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "React Native",
      "TypeScript",
      "JavaScript",
      "WordPress",
      "SEO",
      "Clean Code",
    ],
    sameAs: ["https://www.linkedin.com/in/david-artagnan"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
