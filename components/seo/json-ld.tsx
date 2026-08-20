import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { experiences, keywords } from "@/content/resume";
import { dictionary } from "@/content/dictionary";
import { t, type Locale } from "@/lib/i18n";
import { absoluteUrl, siteUrl } from "@/lib/site";

export const JsonLd = ({ locale }: { locale: Locale }) => {
  const personId = `${siteUrl}/#person`;
  const current = experiences.find((exp) => exp.end === null);

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        jobTitle: t(profile.role, locale),
        description: t(profile.summary, locale),
        url: absoluteUrl(locale),
        image: absoluteUrl(profile.photo),
        email: `mailto:${profile.email}`,
        telephone: profile.phone,
        knowsLanguage: ["pt-BR", "en"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Uberlândia",
          addressRegion: "MG",
          addressCountry: "BR",
        },
        worksFor: current ? { "@type": "Organization", name: current.company } : undefined,
        alumniOf: [
          { "@type": "EducationalOrganization", name: "Centro Universitário UNA" },
          { "@type": "EducationalOrganization", name: "Rocketseat" },
        ],
        knowsAbout: keywords.slice(0, 24),
        sameAs: [profile.linkedin, profile.github],
      },
      {
        "@type": "ProfilePage",
        "@id": `${absoluteUrl(locale)}#page`,
        url: absoluteUrl(locale),
        name: t(dictionary.meta.title, locale),
        description: t(dictionary.meta.description, locale),
        inLanguage: locale === "pt" ? "pt-BR" : "en",
        mainEntity: { "@id": personId },
        about: { "@id": personId },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: profile.name,
        inLanguage: ["pt-BR", "en"],
        publisher: { "@id": personId },
      },
      {
        "@type": "ItemList",
        "@id": `${absoluteUrl(locale)}#work`,
        name: t(dictionary.labels.projects, locale),
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.title,
            description: t(project.summary, locale),
            about: t(project.segment, locale),
            keywords: project.stack.join(", "),
            image: absoluteUrl(project.images[0]?.src ?? profile.photo),
            creator: { "@id": personId },
            ...(project.liveUrl ? { url: project.liveUrl } : {}),
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify remove as chaves `undefined` automaticamente.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
};
