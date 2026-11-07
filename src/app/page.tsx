import React from "react";
import type { Metadata } from "next";
import { SiteShell } from "@/components/chrome/SiteShell";
import { HeroSection } from "@/components/hero/HeroSection";
import { VelocityMarquee } from "@/components/sections/VelocityMarquee";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { FieldNotesGallery } from "@/components/sections/FieldNotesGallery";
import { ResearchSpotlight } from "@/components/sections/ResearchSpotlight";
import { ArchitectureBento } from "@/components/sections/ArchitectureBento";
import { JourneyTimeline } from "@/components/sections/JourneyTimeline";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { ChapterTransitionSeam } from "@/components/navigation/ChapterTransitionSeam";
import { EVENTS } from "@/content/events";
import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";

/**
 * FEATURE FLAG - Preserved IEEE ML Security Section:
 * Currently demoted to a project card ("Edge-IIoTset & PP-PSFE: ML security study")
 * inside Selected Work. Flip `ENABLE_RESEARCH_SPOTLIGHT` to `true` in the future
 * when ready to restore a standalone multi-study research section.
 */
const ENABLE_RESEARCH_SPOTLIGHT = false;

export const metadata: Metadata = {
  title: "Hamdan Ali | Full-Stack Developer · AI-Powered Products",
  description:
    "Portfolio of Hamdan Ali: Full-Stack Developer building AI-powered web applications, Flutter mobile apps, and reliable backend APIs (Sentinel Chitral, GridPulse, UniSelection v2.0). BS Software Engineering at Air University Islamabad.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "Hamdan Ali | Full-Stack Developer · AI-Powered Products",
    description:
      "Full-Stack Developer building AI-powered web platforms, Flutter mobile apps, and resilient cloud APIs, from Chitral hazard alerts to university admissions software.",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Hamdan Ali: Full-Stack Developer · AI-Powered Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamdan Ali | Full-Stack Developer · AI-Powered Products",
    description:
      "Full-Stack Developer building AI-powered web platforms, Flutter mobile apps, and resilient cloud APIs.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: "Hamdan Ali: Full-Stack Developer · AI-Powered Products",
      },
    ],
  },
};

export default function PortfolioPage() {
  const hasEventsSection = true;

  return (
    <SiteShell activeRoute="/" showSpine>
      <main id="main-content" className="flex-1">
        <HeroSection hasEventsSection={hasEventsSection} />
        <VelocityMarquee />
        <ChapterTransitionSeam
          fromChapter="01"
          fromName="Overview"
          toChapter="02"
          toName="Selected Work"
          toId="work"
        />
        <WorkShowcase />
        <ChapterTransitionSeam
          fromChapter="02"
          fromName="Selected Work"
          toChapter="03"
          toName="Tech Events & Hackathons"
          toId="field-notes"
        />
        <FieldNotesGallery events={EVENTS} />
        {ENABLE_RESEARCH_SPOTLIGHT && <ResearchSpotlight />}
        <ChapterTransitionSeam
          fromChapter="03"
          fromName="Events & Hackathons"
          toChapter="04"
          toName="Capabilities & Stack"
          toId="architecture"
        />
        <ArchitectureBento />
        <ChapterTransitionSeam
          fromChapter="04"
          fromName="Capabilities & Stack"
          toChapter="05"
          toName="Engineering Journey"
          toId="journey"
        />
        <JourneyTimeline />
        <ChapterTransitionSeam
          fromChapter="05"
          fromName="Engineering Journey"
          toChapter="06"
          toName="Collaboration"
          toId="contact"
        />
      </main>
      <ContactFooter />
    </SiteShell>
  );
}
