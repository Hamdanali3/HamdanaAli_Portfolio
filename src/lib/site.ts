import { PROFILE } from "@/data/portfolio";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://hamdana-ali-portfolio.vercel.app"
).replace(/\/+$/, "");

export const SITE_NAME = "Hamdan Ali Portfolio";
export const DEFAULT_OG_IMAGE = "/opengraph-image";

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildSiteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: "Hamdan Ali - Full-Stack & AI Software Engineering",
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image`,
        logo: `${SITE_URL}/icon.svg`,
        email: PROFILE.email,
        description:
          "Full-stack web application development, AI-powered product engineering, Flutter mobile apps, and resilient cloud APIs by Hamdan Ali.",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Islamabad",
          addressRegion: "ICT",
          addressCountry: "PK",
        },
        areaServed: [
          {
            "@type": "Country",
            name: "Pakistan",
          },
          {
            "@type": "Place",
            name: "Worldwide",
          },
        ],
        founder: {
          "@id": `${SITE_URL}/#person`,
        },
        knowsAbout: [
          "Full-Stack Web Development",
          "Next.js",
          "React",
          "TypeScript",
          "Laravel 12",
          "Flutter",
          "Python",
          "AI-Powered Products",
          "Cloud & REST APIs",
        ],
        sameAs: [PROFILE.github],
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: PROFILE.name,
        alternateName: PROFILE.urduName,
        url: SITE_URL,
        image: `${SITE_URL}/images/hamdan.jpg`,
        email: `mailto:${PROFILE.email}`,
        jobTitle: "Full-Stack Developer",
        description:
          "Full-Stack Developer building AI-powered web platforms, Flutter mobile apps, and reliable backend APIs.",
        alumniOf: {
          "@type": "Organization",
          name: "HindukushSoft Technologies",
        },
        affiliation: {
          "@type": "CollegeOrUniversity",
          name: "Air University, Islamabad",
        },
        knowsLanguage: ["en", "ur"],
        sameAs: [PROFILE.github],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: {
          "@id": `${SITE_URL}/#person`,
        },
        inLanguage: "en-US",
      },
    ],
  };
}
