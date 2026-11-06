"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ExternalLink, FileText, Layers } from "lucide-react";
import { GitHubMark } from "@/components/ui/GitHubMark";
import { PROJECTS, type PortfolioProject } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { RevealText } from "@/components/ui/RevealText";
import { ProjectSimulator } from "@/components/simulators/ProjectSimulators";
import { cn } from "@/lib/utils";

interface WorkShowcaseProps {
  activeTransitionProjectId: string | null;
  onOpenProject: (project: PortfolioProject) => void;
}

export function WorkShowcase({
  activeTransitionProjectId,
  onOpenProject,
}: WorkShowcaseProps) {
  const featured = PROJECTS.filter((p) => p.featured);
  const archive = PROJECTS.filter((p) => !p.featured);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative border-b border-hairline py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1340px] px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-hairline pb-8 mb-14">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/10 px-3.5 py-1 text-xs font-mono font-medium text-signal shadow-sm backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
              <span>CHAPTER 02 · SHIPPED PRODUCTS &amp; ARCHITECTURES</span>
            </div>
            <h2
              id="work-heading"
              className="text-[clamp(2rem,4.2vw,3.75rem)] font-extrabold tracking-[-0.035em] leading-[1.03] text-ink"
            >
              <RevealText text="Shipped products &" as="span" />{" "}
              <span className="font-serif italic font-normal text-signal">
                interactive
              </span>{" "}
              <RevealText text="previews." as="span" delay={0.06} />
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink-secondary">
            Every featured card embeds a live interactive preview modeled on the real codebase.
            Open any project to inspect its architecture, test metrics, and repository links.
          </p>
        </div>

        {/* 4 Flagship Interactive Case Studies */}
        <div className="space-y-10">
          {featured.map((project, idx) => {
            const isEven = idx % 2 === 1;
            const isTransitioning = activeTransitionProjectId === project.id;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              >
                <SpotlightCard showFiducials className="p-6 sm:p-8 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                    {/* Narrative Column */}
                    <div
                      className={cn(
                        "lg:col-span-6 space-y-5",
                        isEven && "lg:order-2"
                      )}
                    >
                      <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px]">
                        <span className="rounded-md bg-signal-fill px-2 py-0.5 font-semibold text-white tabular-nums">
                          {project.index}
                        </span>
                        <span className="uppercase tracking-[0.12em] text-ink-muted">
                          {project.category}
                        </span>
                      </div>

                      <div>
                        <h3
                          style={
                            isTransitioning
                              ? { viewTransitionName: "case-study-active-title" }
                              : undefined
                          }
                          className="vt-fit-title text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] text-ink"
                        >
                          {project.title}
                        </h3>
                        <p className="mt-1 font-serif italic text-lg sm:text-xl text-ink-secondary">
                          {project.subtitle}
                        </p>
                      </div>

                      <p className="text-sm sm:text-[15px] leading-[1.7] text-ink-secondary">
                        {project.summary}
                      </p>

                      {/* Key Metrics Row */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                        {project.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="rounded-xl border border-hairline bg-canvas/70 px-3 py-2.5"
                          >
                            <div className="font-mono text-sm font-bold text-ink tabular-nums">
                              {m.value}
                            </div>
                            <div className="mt-0.5 text-[11px] leading-snug text-ink-muted">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Stack Badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-hairline bg-surface-2/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.04em] text-ink-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons (>= 44px tap targets) */}
                      <div className="flex flex-wrap items-center gap-2.5 pt-2">
                        <button
                          type="button"
                          onClick={() => onOpenProject(project)}
                          data-cursor-label="OPEN CASE ↗"
                          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-semibold text-canvas transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
                        >
                          <Layers className="h-3.5 w-3.5 text-signal" />
                          <span>View Case Study</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor-label="LIVE APP ↗"
                            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-strong bg-surface-2/80 px-4 py-2.5 text-xs font-semibold text-signal transition-colors duration-200 hover:bg-signal-fill hover:border-signal-fill hover:text-white"
                          >
                            <span>Live App</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}

                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor-label="GITHUB ↗"
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-hairline bg-surface-2/60 px-4 py-2.5 text-xs font-medium text-ink-secondary transition-colors duration-200 hover:border-strong hover:text-ink"
                        >
                          <GitHubMark className="h-3.5 w-3.5" />
                          <span>Source</span>
                        </a>

                        {project.paperUrl && (
                          <a
                            href={project.paperUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor-label="STUDY PDF ↗"
                            className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 py-2.5 font-mono text-[11px] font-medium text-ink-muted underline decoration-hairline underline-offset-4 transition-colors duration-200 hover:text-ink"
                          >
                            <FileText className="h-3.5 w-3.5 text-champagne" />
                            <span>Study PDF ↗</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Interactive Live Simulator Column */}
                    <div
                      className={cn(
                        "lg:col-span-6",
                        isEven && "lg:order-1"
                      )}
                    >
                      <div className="rounded-2xl border border-hairline bg-surface-2/45 p-2 sm:p-3">
                        <div className="mb-2 flex items-center justify-between px-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                          <span>{project.accentTag}</span>
                          <span className="text-telemetry">● INTERACTIVE PREVIEW</span>
                        </div>
                        {project.simulator && (
                          <ProjectSimulator kind={project.simulator} />
                        )}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.article>
            );
          })}
        </div>

        {/* Engineering Archive Sub-Grid (Projects 05 & 06) */}
        <div className="mt-14 pt-12 border-t border-hairline">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-ink-muted">
              INTERNSHIP &amp; FULL-STACK ARCHIVE (05 — 06)
            </h3>
            <span className="font-mono text-[11px] text-ink-muted">
              Click any card for implementation details
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {archive.map((proj) => {
              const isTransitioning = activeTransitionProjectId === proj.id;
              return (
                <SpotlightCard
                  key={proj.id}
                  enableTilt
                  cursorLabel="INSPECT ↗"
                  onClick={() => onOpenProject(proj)}
                  className="p-6 sm:p-7 cursor-pointer"
                >
                  <div className="flex flex-col justify-between h-full space-y-5">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between font-mono text-[11px]">
                        <span className="text-signal font-semibold">
                          {proj.index} {"//"} {proj.accentTag}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-ink-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" />
                      </div>
                      <h4
                        style={
                          isTransitioning
                            ? { viewTransitionName: "case-study-active-title" }
                            : undefined
                        }
                        className="vt-fit-title text-xl font-bold tracking-tight text-ink"
                      >
                        {proj.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-ink-secondary">
                        {proj.summary}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-4">
                      <div className="flex flex-wrap gap-1.5">
                        {proj.stack.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-hairline bg-canvas px-2.5 py-0.5 font-mono text-[10px] text-ink-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="font-mono text-[11px] font-semibold text-ink">
                        View Case →
                      </span>
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
