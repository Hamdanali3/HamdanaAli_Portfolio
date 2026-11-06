import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass, FolderGit2, Mail } from "lucide-react";
import { SiteShell } from "@/components/chrome/SiteShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ContactFooter } from "@/components/sections/ContactFooter";

export const metadata: Metadata = {
  title: "404: Page Not Found | Hamdan Ali",
  description:
    "The page you requested could not be found. Explore Hamdan Ali's full-stack web, mobile, and AI case studies or return to the portfolio overview.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <SiteShell activeRoute="/404">
      <main id="main-content" className="flex-1">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "404 Not Found", path: "/404" },
          ]}
        />

        <section className="mx-auto max-w-[1340px] px-4 sm:px-8 py-16 sm:py-24 border-b border-hairline">
          <SpotlightCard showFiducials className="p-8 sm:p-12 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/10 px-3.5 py-1 text-xs font-mono font-medium text-signal">
              <span>HTTP 404 · ROUTE NOT FOUND</span>
            </div>

            <h1 className="mt-5 text-[clamp(2.25rem,5vw,4rem)] font-extrabold tracking-[-0.038em] leading-[1.03] text-ink">
              Page not{" "}
              <span className="font-serif italic font-normal text-signal">
                found.
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink-secondary max-w-xl">
              The URL you requested does not match an active page or project case study.
              Use the direct links below to return to the overview, inspect shipped
              projects, or get in touch.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-signal-fill px-6 py-3 text-xs font-semibold text-white hover:opacity-95"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Home Overview</span>
              </Link>

              <Link
                href="/work"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-strong bg-surface-2 px-5 py-3 text-xs font-semibold text-ink hover:border-signal"
              >
                <FolderGit2 className="h-3.5 w-3.5 text-signal" />
                <span>Browse Selected Work (/work)</span>
              </Link>

              <Link
                href="/stack"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-surface-1 px-4 py-3 text-xs font-medium text-ink-secondary hover:border-strong hover:text-ink"
              >
                <Compass className="h-3.5 w-3.5 text-telemetry" />
                <span>Technical Stack (/stack)</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-surface-1 px-4 py-3 text-xs font-medium text-ink-secondary hover:border-strong hover:text-ink"
              >
                <Mail className="h-3.5 w-3.5 text-champagne" />
                <span>Contact (/contact)</span>
              </Link>
            </div>
          </SpotlightCard>
        </section>
      </main>
      <ContactFooter hideContactSection />
    </SiteShell>
  );
}
