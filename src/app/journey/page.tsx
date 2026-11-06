import React from "react";
import type { Metadata } from "next";
import { SiteShell } from "@/components/chrome/SiteShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JourneyTimeline } from "@/components/sections/JourneyTimeline";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Engineering Journey & Education | Hamdan Ali",
  description:
    "Chronological engineering timeline of Hamdan Ali: BS Software Engineering at Air University Islamabad, Full-Stack Developer Internship at HindukushSoft Technologies, and shipped web, mobile, and ML platforms.",
  alternates: {
    canonical: absoluteUrl("/journey"),
  },
  openGraph: {
    title: "Engineering Journey & Education | Hamdan Ali",
    description:
      "From BS Software Engineering at Air University Islamabad to full-stack internship builds at HindukushSoft Technologies and live regional platforms.",
    url: absoluteUrl("/journey"),
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Engineering Journey & Education of Hamdan Ali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Journey & Education | Hamdan Ali",
    description:
      "From BS Software Engineering at Air University Islamabad to full-stack internship builds at HindukushSoft Technologies and live regional platforms.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: "Engineering Journey & Education of Hamdan Ali",
      },
    ],
  },
};

export default function JourneyPage() {
  return (
    <SiteShell activeRoute="/journey">
      <main id="main-content" className="flex-1">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Engineering Journey", path: "/journey" },
          ]}
        />

        <header className="mx-auto max-w-[1340px] px-4 sm:px-8 pt-8 pb-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/10 px-3.5 py-1 text-xs font-mono font-medium text-signal shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
            <span>CHAPTER 05 · EXPERIENCE &amp; EDUCATION</span>
          </div>
          <h1 className="mt-4 text-[clamp(2.2rem,4.6vw,4.1rem)] font-extrabold tracking-[-0.038em] leading-[1.03] text-ink">
            Engineering{" "}
            <span className="font-serif italic font-normal text-signal">
              journey
            </span>
            , internship &amp; education.
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-ink-secondary">
            Consistent shipping across Air University Islamabad coursework, an 8-week
            software engineering internship at HindukushSoft Technologies, and live
            regional platforms.
          </p>
        </header>

        <JourneyTimeline hideHeader />
      </main>
      <ContactFooter hideContactSection />
    </SiteShell>
  );
}
