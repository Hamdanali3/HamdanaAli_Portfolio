import React from "react";
import type { Metadata } from "next";
import { SiteShell } from "@/components/chrome/SiteShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArchitectureBento } from "@/components/sections/ArchitectureBento";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Technical Stack & Capabilities | Hamdan Ali",
  description:
    "Proof-backed engineering stack and core software principles of Hamdan Ali: Next.js App Router, TypeScript, Laravel 12, Flutter, Python, XGBoost, PostgreSQL, and Groq AI copilots.",
  alternates: {
    canonical: absoluteUrl("/stack"),
  },
  openGraph: {
    title: "Technical Stack & Capabilities | Hamdan Ali",
    description:
      "Every capability linked directly to shipped repositories and case studies: Next.js, TypeScript, Laravel 12, Flutter, Python, and AI guardrails.",
    url: absoluteUrl("/stack"),
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Technical Stack & Capabilities of Hamdan Ali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Stack & Capabilities | Hamdan Ali",
    description:
      "Every capability linked directly to shipped repositories and case studies: Next.js, TypeScript, Laravel 12, Flutter, Python, and AI guardrails.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: "Technical Stack & Capabilities of Hamdan Ali",
      },
    ],
  },
};

export default function StackPage() {
  return (
    <SiteShell activeRoute="/stack">
      <main id="main-content" className="flex-1">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Technical Stack", path: "/stack" },
          ]}
        />

        <header className="mx-auto max-w-[1340px] px-4 sm:px-8 pt-8 pb-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/10 px-3.5 py-1 text-xs font-mono font-medium text-signal shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
            <span>CHAPTER 04 · PROOF-BACKED CAPABILITIES</span>
          </div>
          <h1 className="mt-4 text-[clamp(2.2rem,4.6vw,4.1rem)] font-extrabold tracking-[-0.038em] leading-[1.03] text-ink">
            Proof-backed{" "}
            <span className="font-serif italic font-normal text-signal">
              technical stack
            </span>{" "}
            &amp; engineering principles.
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-ink-secondary">
            Zero arbitrary percentage bars. Every framework, database, and AI integration
            is linked directly to the shipped case study where it runs in production.
          </p>
        </header>

        <ArchitectureBento hideHeader />
      </main>
      <ContactFooter hideContactSection />
    </SiteShell>
  );
}
