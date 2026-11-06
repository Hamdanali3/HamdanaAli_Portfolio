import React from "react";
import type { Metadata } from "next";
import { SiteShell } from "@/components/chrome/SiteShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FieldNotesGallery } from "@/components/sections/FieldNotesGallery";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { EVENTS } from "@/content/events";
import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Field Notes & Event Gallery | Hamdan Ali",
  description:
    "Explore Hamdan Ali's engineering field notes, Top 5 featured launch highlights, campus showcases at Air University Islamabad, and HindukushSoft capstone reviews.",
  alternates: {
    canonical: absoluteUrl("/field-notes"),
  },
  openGraph: {
    title: "Field Notes & Event Gallery | Hamdan Ali",
    description:
      "Top 5 featured launch highlights, campus showcases, and filterable photo gallery from Hamdan Ali's build log.",
    url: absoluteUrl("/field-notes"),
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Field Notes & Event Gallery by Hamdan Ali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Field Notes & Event Gallery | Hamdan Ali",
    description:
      "Top 5 featured launch highlights, campus showcases, and filterable photo gallery from Hamdan Ali's build log.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: "Field Notes & Event Gallery by Hamdan Ali",
      },
    ],
  },
};

export default function FieldNotesPage() {
  return (
    <SiteShell activeRoute="/field-notes">
      <main id="main-content" className="flex-1">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Field Notes", path: "/field-notes" },
          ]}
        />

        <header className="mx-auto max-w-[1340px] px-4 sm:px-8 pt-8 pb-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/10 px-3.5 py-1 text-xs font-mono font-medium text-signal shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
            <span>CHAPTER 03 · FIELD NOTES &amp; EVENT ARCHIVE</span>
          </div>
          <h1 className="mt-4 text-[clamp(2.2rem,4.6vw,4.1rem)] font-extrabold tracking-[-0.038em] leading-[1.03] text-ink">
            Field notes, launches &amp;{" "}
            <span className="font-serif italic font-normal text-signal">
              moments
            </span>{" "}
            from the build log.
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-ink-secondary">
            Top 5 featured milestones and a filterable gallery of product launches,
            internship reviews, and campus showcases.
          </p>
        </header>

        <FieldNotesGallery events={EVENTS} hideHeader />
      </main>
      <ContactFooter hideContactSection />
    </SiteShell>
  );
}
