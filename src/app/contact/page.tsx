import React from "react";
import type { Metadata } from "next";
import { SiteShell } from "@/components/chrome/SiteShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Collaboration | Hamdan Ali",
  description:
    "Get in touch with Hamdan Ali for Full-Stack Developer roles, AI-powered web applications, Flutter mobile builds, or backend API engineering. Based in Islamabad, Pakistan (UTC+5).",
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
  openGraph: {
    title: "Contact & Collaboration | Hamdan Ali",
    description:
      "Reach out directly to Hamdan Ali for Full-Stack Developer and AI product roles or software collaborations.",
    url: absoluteUrl("/contact"),
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Contact Hamdan Ali: Full-Stack Developer · AI-Powered Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Collaboration | Hamdan Ali",
    description:
      "Reach out directly to Hamdan Ali for Full-Stack Developer and AI product roles or software collaborations.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: "Contact Hamdan Ali: Full-Stack Developer · AI-Powered Products",
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <SiteShell activeRoute="/contact">
      <main id="main-content" className="flex-1">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]}
        />
        <ContactFooter headingAs="h1" />
      </main>
    </SiteShell>
  );
}
