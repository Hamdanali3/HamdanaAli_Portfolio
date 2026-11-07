import React from "react";
import type { Metadata } from "next";
import { SiteShell } from "@/components/chrome/SiteShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Selected Work & Case Studies | Hamdan Ali",
  description:
    "Explore shipped full-stack web applications, Flutter mobile software, Laravel 12 REST APIs, and AI product case studies by Hamdan Ali (Sentinel Chitral, GridPulse, UniSelection v2.0, Edge-IIoTset PP-PSFE, TaskFlow, CRM Suite).",
  alternates: {
    canonical: absoluteUrl("/work"),
  },
  openGraph: {
    title: "Selected Work & Case Studies | Hamdan Ali",
    description:
      "Shipped full-stack web platforms, Flutter mobile apps, and AI engineering case studies with interactive previews.",
    url: absoluteUrl("/work"),
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Selected Work & Case Studies by Hamdan Ali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Selected Work & Case Studies | Hamdan Ali",
    description:
      "Shipped full-stack web platforms, Flutter mobile apps, and AI engineering case studies with interactive previews.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: "Selected Work & Case Studies by Hamdan Ali",
      },
    ],
  },
};

export default function WorkPage() {
  return (
    <SiteShell activeRoute="/work">
      <main id="main-content" className="flex-1">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Selected Work", path: "/work" },
          ]}
        />

        <header className="mx-auto max-w-[1340px] px-4 sm:px-8 pt-8 pb-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/10 px-3.5 py-1 text-xs font-mono font-medium text-signal shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
            <span>PROJECT INDEX · 02 FLAGSHIP PRODUCTION SYSTEMS</span>
          </div>
          <h1 className="mt-4 text-[clamp(2.2rem,4.6vw,4.1rem)] font-extrabold tracking-[-0.038em] leading-[1.03] text-ink">
            Flagship{" "}
            <span className="font-serif italic font-normal text-signal">
              full-stack
            </span>{" "}
            &amp; AI case studies.
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-ink-secondary">
            Explore the live deployments, interactive telemetry simulators, and end-to-end
            system architecture behind Sentinel Chitral and GridPulse.
          </p>
        </header>

        <WorkShowcase hideHeader />
      </main>
      <ContactFooter hideContactSection />
    </SiteShell>
  );
}
