import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Shield,
} from "lucide-react";
import { SiteShell } from "@/components/chrome/SiteShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { GitHubMark } from "@/components/ui/GitHubMark";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ProjectSimulator } from "@/components/simulators/ProjectSimulators";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { PROJECTS } from "@/data/portfolio";
import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.id,
  }));
}

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) {
    return {
      title: "Project Not Found | Hamdan Ali",
      robots: { index: false, follow: true },
    };
  }

  const pageTitle = `${project.title} - Case Study | Hamdan Ali`;
  const pageUrl = absoluteUrl(`/work/${project.id}`);
  const ogImageUrl = project.screenshots[0]?.url ?? DEFAULT_OG_IMAGE;
  const ogImageAlt = `${project.title}: ${project.subtitle}`;

  return {
    title: pageTitle,
    description: project.summary,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: project.summary,
      url: pageUrl,
      siteName: SITE_NAME,
      type: "article",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: project.summary,
      images: [
        {
          url: ogImageUrl,
          alt: ogImageAlt,
        },
      ],
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: CaseStudyPageProps) {
  const { slug } = await params;
  const projectIdx = PROJECTS.findIndex((p) => p.id === slug);

  if (projectIdx === -1) {
    notFound();
  }

  const project = PROJECTS[projectIdx];
  const prevProject =
    projectIdx > 0 ? PROJECTS[projectIdx - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject =
    projectIdx < PROJECTS.length - 1 ? PROJECTS[projectIdx + 1] : PROJECTS[0];

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.summary,
    codeRepository: project.repoUrl,
    url: absoluteUrl(`/work/${project.id}`),
    programmingLanguage: project.stack,
    author: {
      "@type": "Person",
      name: "Hamdan Ali",
      url: absoluteUrl("/"),
    },
  };

  return (
    <SiteShell activeRoute="/work">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <main id="main-content" className="flex-1">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Selected Work", path: "/work" },
            { name: project.title, path: `/work/${project.id}` },
          ]}
        />

        <article className="mx-auto max-w-[1340px] px-4 sm:px-8 py-10 sm:py-16 space-y-12 border-b border-hairline">
          {/* Top Back Link & Category Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-6">
            <Link
              href="/work"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-surface-1 px-4 py-2 font-mono text-xs text-ink-secondary hover:border-signal hover:text-ink transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-signal" />
              <span>All Case Studies (/work)</span>
            </Link>

            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
              <span className="rounded-md bg-signal-fill px-2.5 py-0.5 font-semibold text-white">
                CASE {project.index}
              </span>
              <span>·</span>
              <span>{project.category}</span>
            </div>
          </div>

          {/* Hero Title, Subtitle, Summary & Primary Action Links */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-block rounded-full border border-strong bg-surface-2 px-3.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal">
                {project.accentTag}
              </span>

              <h1 className="text-[clamp(2.25rem,4.8vw,4.25rem)] font-extrabold tracking-[-0.038em] leading-[1.03] text-ink">
                {project.title}
              </h1>

              <p className="font-serif italic text-xl sm:text-2xl text-ink-secondary">
                {project.subtitle}
              </p>

              <p className="text-base leading-[1.72] text-ink-secondary max-w-2xl">
                {project.summary}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-signal-fill px-6 py-3 text-xs font-semibold text-white hover:opacity-95"
                  >
                    <span>Launch Live Application</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-strong bg-surface-2 px-5 py-3 text-xs font-semibold text-ink hover:border-signal"
                >
                  <GitHubMark className="h-3.5 w-3.5" />
                  <span>Inspect GitHub Repository</span>
                </a>
                {project.paperUrl && (
                  <a
                    href={project.paperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-surface-1 px-4 py-3 text-xs font-medium text-ink-secondary hover:border-strong hover:text-ink"
                  >
                    <FileText className="h-3.5 w-3.5 text-champagne" />
                    <span>Study Manuscript (PDF)</span>
                  </a>
                )}
              </div>
            </div>

            {/* Metrics & Stack Card */}
            <div className="lg:col-span-5 space-y-5">
              <SpotlightCard showFiducials className="p-6 space-y-5">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                  VERIFIED METRICS &amp; TELEMETRY
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-hairline bg-canvas p-3.5"
                    >
                      <div className="font-mono text-lg sm:text-xl font-bold text-ink tabular-nums">
                        {m.value}
                      </div>
                      <div className="mt-1 text-xs text-ink-muted">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-hairline pt-4">
                  <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                    TECHNOLOGY STACK
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-hairline bg-surface-2 px-3 py-1 font-mono text-xs text-ink"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>

          {/* Interactive Simulator Stage (if available) */}
          {project.simulator && (
            <div className="rounded-2xl border border-hairline bg-surface-1 p-5 sm:p-7 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">
                <span>INTERACTIVE ARCHITECTURE PREVIEW · {project.title}</span>
                <span className="text-telemetry">● LIVE SIMULATOR</span>
              </div>
              <ProjectSimulator kind={project.simulator} />
            </div>
          )}

          {/* Problem Statement vs Implementation Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpotlightCard className="p-6 sm:p-8 space-y-3">
              <div className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-signal">
                01 · THE PROBLEM STATEMENT
              </div>
              <h2 className="text-xl font-bold text-ink">
                Operational Challenge &amp; Context
              </h2>
              <p className="text-sm sm:text-base leading-[1.72] text-ink-secondary">
                {project.problemStatement}
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-6 sm:p-8 space-y-3">
              <div className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-telemetry">
                02 · IMPLEMENTATION ARCHITECTURE
              </div>
              <h2 className="text-xl font-bold text-ink">
                System Boundaries &amp; Data Flow
              </h2>
              <p className="text-sm sm:text-base leading-[1.72] text-ink-secondary">
                {project.architectureSummary}
              </p>
            </SpotlightCard>
          </div>

          {/* Key Engineering Decisions & Verification */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ink">
              <Shield className="h-4 w-4 text-signal" />
              <span>03 · KEY ENGINEERING DECISIONS &amp; VERIFICATION</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.engineeringHighlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-2xl border border-hairline bg-surface-1 p-5 text-sm leading-relaxed text-ink-secondary"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-telemetry" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Repository Screenshots (when available) */}
          {project.screenshots.length > 0 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ink">
                <ImageIcon className="h-4 w-4 text-signal" />
                <span>04 · REPOSITORY SCREENS &amp; ARTIFACTS</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.screenshots.map((shot) => (
                  <figure
                    key={shot.label}
                    className="overflow-hidden rounded-2xl border border-hairline bg-surface-1 flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2">
                      <Image
                        src={shot.url}
                        alt={`${project.title}: ${shot.label}`}
                        width={1200}
                        height={750}
                        loading="lazy"
                        sizes="(max-width: 768px) 92vw, 620px"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <figcaption className="border-t border-hairline p-4 space-y-1">
                      <div className="font-mono text-xs font-bold text-ink">
                        {shot.label}
                      </div>
                      <p className="text-xs text-ink-secondary">{shot.caption}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}

          {/* Previous / Next Case Study Internal Links */}
          <nav
            aria-label="Adjacent case studies"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-hairline"
          >
            <Link
              href={`/work/${prevProject.id}`}
              className="group rounded-2xl border border-hairline bg-surface-1 p-5 transition-colors hover:border-signal"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                ← PREVIOUS CASE STUDY ({prevProject.index})
              </div>
              <div className="mt-1.5 text-lg font-bold text-ink group-hover:text-signal transition-colors">
                {prevProject.title}
              </div>
              <div className="mt-0.5 text-xs text-ink-secondary truncate">
                {prevProject.subtitle}
              </div>
            </Link>

            <Link
              href={`/work/${nextProject.id}`}
              className="group rounded-2xl border border-hairline bg-surface-1 p-5 text-left sm:text-right transition-colors hover:border-signal"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                NEXT CASE STUDY ({nextProject.index}) →
              </div>
              <div className="mt-1.5 text-lg font-bold text-ink group-hover:text-signal transition-colors inline-flex items-center gap-1.5">
                <span>{nextProject.title}</span>
                <ArrowUpRight className="h-4 w-4 text-signal" />
              </div>
              <div className="mt-0.5 text-xs text-ink-secondary truncate">
                {nextProject.subtitle}
              </div>
            </Link>
          </nav>
        </article>
      </main>
      <ContactFooter hideContactSection />
    </SiteShell>
  );
}
