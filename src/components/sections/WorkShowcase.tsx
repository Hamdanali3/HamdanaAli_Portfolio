"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Cpu,
  ExternalLink,
  Layers,
} from "lucide-react";
import { GitHubMark } from "@/components/ui/GitHubMark";
import { PROJECTS, type PortfolioProject } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { RevealText } from "@/components/ui/RevealText";
import { ProjectSimulator } from "@/components/simulators/ProjectSimulators";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/utils";

interface WorkShowcaseProps {
  hideHeader?: boolean;
}

export function WorkShowcase({ hideHeader = false }: WorkShowcaseProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    const maxScroll = scrollWidth - clientWidth;
    const progress =
      maxScroll > 0 ? Math.min(Math.max(scrollLeft / maxScroll, 0), 1) : 0;
    setScrollProgress(progress);

    const cards = track.querySelectorAll<HTMLElement>("[data-project-card]");
    if (cards.length === 0) return;

    const trackCenter = scrollLeft + clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(trackCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      track.removeEventListener("scroll", onScroll);
    };
  }, [handleScroll]);

  const scrollToProject = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const cards = track.querySelectorAll<HTMLElement>("[data-project-card]");
    const targetCard = cards[index];
    if (!targetCard) return;

    const targetOffset =
      targetCard.offsetLeft - (track.clientWidth - targetCard.clientWidth) / 2;

    track.scrollTo({
      left: Math.max(targetOffset, 0),
      behavior: "smooth",
    });
  }, []);

  const stepProject = useCallback(
    (direction: -1 | 1) => {
      const nextIndex = Math.min(
        Math.max(activeIndex + direction, 0),
        PROJECTS.length - 1
      );
      scrollToProject(nextIndex);
    },
    [activeIndex, scrollToProject]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      stepProject(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      stepProject(-1);
    }
  };

  const activeProject: PortfolioProject = PROJECTS[activeIndex] ?? PROJECTS[0];

  return (
    <section
      id="work"
      aria-labelledby={hideHeader ? undefined : "work-heading"}
      aria-label={hideHeader ? "Flagship Production Systems" : undefined}
      className="relative border-b border-hairline py-14 sm:py-20 overflow-hidden"
    >
      {/* Top Section Header */}
      <div className="mx-auto max-w-[1340px] px-4 sm:px-8">
        {!hideHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-hairline pb-7 mb-8">
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/10 px-3.5 py-1 text-xs font-mono font-medium text-signal shadow-sm backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                <span>CHAPTER 02 · FLAGSHIP PRODUCTION SYSTEMS</span>
              </div>
              <h2
                id="work-heading"
                className="text-[clamp(2rem,4vw,3.35rem)] font-extrabold tracking-[-0.035em] leading-[1.04] text-ink"
              >
                <RevealText text="2 Live cloud platforms &" as="span" />{" "}
                <span className="font-serif italic font-normal text-signal">
                  interactive
                </span>{" "}
                <RevealText text="simulators." as="span" delay={0.05} />
              </h2>
            </div>

            <div className="max-w-sm space-y-1.5">
              <p className="text-xs sm:text-sm leading-relaxed text-ink-secondary">
                Curated for engineering depth: test the live interactive simulators
                below or launch the deployed production apps.
              </p>
            </div>
          </div>
        )}

        {/* Flagship Switcher + Navigation Controls */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Select flagship production system"
            className="flex flex-wrap items-center gap-2.5"
          >
            {PROJECTS.map((proj, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={proj.id}
                  role="tab"
                  type="button"
                  aria-selected={isCurrent}
                  onClick={() => scrollToProject(idx)}
                  className={cn(
                    "group relative inline-flex min-h-11 items-center gap-2.5 rounded-full border px-5 py-2.5 font-mono text-xs transition-all duration-200 cursor-pointer",
                    isCurrent
                      ? "border-signal bg-signal-fill text-white font-semibold shadow-[0_0_24px_rgba(255,79,23,0.35)]"
                      : "border-hairline bg-surface-1/85 text-ink-secondary hover:border-strong hover:text-ink"
                  )}
                >
                  <span
                    className={cn(
                      "tabular-nums text-[10px] font-bold px-1.5 py-0.5 rounded",
                      isCurrent
                        ? "bg-white/20 text-white"
                        : "bg-surface-2 text-signal"
                    )}
                  >
                    {proj.index}
                  </span>
                  <span className="font-sans font-bold tracking-tight">
                    {proj.title}
                  </span>
                  <span
                    className={cn(
                      "hidden sm:inline text-[10px]",
                      isCurrent ? "text-white/85" : "text-ink-muted"
                    )}
                  >
                    · {idx === 0 ? "8-Valley Hazard AI" : "177+ MW Fleet Control"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline font-mono text-[11px] text-ink-muted mr-1">
              Swipe or switch system ⇄
            </span>
            <Magnetic strength={0.18}>
              <button
                type="button"
                onClick={() => stepProject(-1)}
                disabled={activeIndex === 0}
                aria-label="Previous flagship project"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 cursor-pointer",
                  activeIndex === 0
                    ? "border-hairline bg-surface-1/40 text-ink-muted/40 cursor-not-allowed"
                    : "border-strong bg-surface-1 text-ink hover:border-signal hover:text-signal"
                )}
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            </Magnetic>
            <Magnetic strength={0.18}>
              <button
                type="button"
                onClick={() => stepProject(1)}
                disabled={activeIndex === PROJECTS.length - 1}
                aria-label="Next flagship project"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 cursor-pointer",
                  activeIndex === PROJECTS.length - 1
                    ? "border-hairline bg-surface-1/40 text-ink-muted/40 cursor-not-allowed"
                    : "border-strong bg-surface-1 text-ink hover:border-signal hover:text-signal"
                )}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Horizontal Scrollable Snap Track */}
      <div className="relative w-full">
        <div
          ref={trackRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          role="region"
          aria-label="Horizontal Flagship Systems Deck"
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar px-4 sm:px-8 md:px-[max(2rem,calc((100vw-1340px)/2+2rem))] pb-4 pt-1 focus:outline-none"
        >
          {PROJECTS.map((project, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <article
                key={project.id}
                data-project-card
                aria-label={`${project.index} ${project.title}`}
                className={cn(
                  "snap-center shrink-0 w-[90vw] sm:w-[86vw] lg:w-[1160px] max-w-[1160px] transition-all duration-300",
                  isCurrent ? "opacity-100 scale-100" : "opacity-80 scale-[0.985]"
                )}
              >
                <SpotlightCard
                  showFiducials
                  className={cn(
                    "h-full p-5 sm:p-7 lg:p-8 transition-colors duration-300",
                    isCurrent
                      ? "border-strong shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)]"
                      : "border-hairline"
                  )}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-center">
                    {/* Left 5 Columns: Crisp Pitch + Visual Architecture Flow + Gauges */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                      <div className="space-y-3.5">
                        {/* Project Badge Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2 font-mono text-xs">
                            <span className="inline-flex shrink-0 whitespace-nowrap items-center justify-center rounded-md bg-signal-fill px-2.5 py-0.5 text-white font-bold">
                              {project.index} /{" "}
                              {String(PROJECTS.length).padStart(2, "0")}
                            </span>
                            <span className="uppercase tracking-[0.12em] text-ink-muted">
                              {project.category}
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-telemetry/30 bg-telemetry/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-telemetry">
                            <span className="h-1.5 w-1.5 rounded-full bg-telemetry animate-pulse" />
                            <span>LIVE PRODUCTION</span>
                          </span>
                        </div>

                        {/* Title & 1-Line Pitch */}
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] text-ink">
                            <Link
                              href={`/work/${project.id}`}
                              className="hover:text-signal transition-colors"
                            >
                              {project.title}
                            </Link>
                          </h3>
                          <p className="mt-1 text-xs sm:text-sm text-ink-secondary leading-relaxed">
                            {project.summary}
                          </p>
                        </div>

                        {/* VISUAL ARCHITECTURE PIPELINE (Replaces Long Prose Paragraphs) */}
                        {project.visualPipeline && (
                          <div className="rounded-xl border border-hairline bg-canvas/85 p-3.5 space-y-2.5">
                            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                              <span className="flex items-center gap-1.5 text-signal font-semibold">
                                <Cpu className="h-3.5 w-3.5" />
                                <span>SYSTEM ARCHITECTURE PIPELINE</span>
                              </span>
                              <span>END-TO-END FLOW</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2">
                              {project.visualPipeline.map((node, nodeIdx) => (
                                <div
                                  key={node.step}
                                  className="relative rounded-lg border border-hairline bg-surface-1 p-2.5"
                                >
                                  <div className="flex items-center justify-between font-mono text-[9px] text-signal font-bold">
                                    <span>STAGE {node.step}</span>
                                    {nodeIdx < project.visualPipeline!.length - 1 && (
                                      <span className="text-ink-muted">➔</span>
                                    )}
                                  </div>
                                  <div className="mt-0.5 text-xs font-bold text-ink truncate">
                                    {node.title}
                                  </div>
                                  <div className="font-mono text-[10px] text-ink-muted truncate">
                                    {node.tech}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 4 Visual Metric Gauges with Progress Bars */}
                        <div className="grid grid-cols-2 gap-2">
                          {project.metrics.slice(0, 4).map((m) => (
                            <div
                              key={m.label}
                              className="rounded-xl border border-hairline bg-surface-2/60 p-2.5"
                            >
                              <div className="font-mono text-sm sm:text-base font-bold text-ink tabular-nums">
                                {m.value}
                              </div>
                              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-surface-1">
                                <div
                                  className="h-full rounded-full bg-signal"
                                  style={{ width: `${m.fillPercent ?? 95}%` }}
                                />
                              </div>
                              <div className="mt-1 text-[10px] font-mono text-ink-secondary truncate">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Stack Pills + Direct Recruiter Proof Actions */}
                      <div className="space-y-3.5 pt-2 border-t border-hairline">
                        <div className="flex flex-wrap gap-1.5">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md border border-hairline bg-canvas px-2.5 py-1 font-mono text-[10px] text-ink-secondary"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-signal-fill px-5 py-2 text-xs font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.02]"
                            >
                              <span>Launch Live App</span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}

                          <Link
                            href={`/work/${project.id}`}
                            className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-strong bg-surface-2 px-4 py-2 text-xs font-semibold text-ink transition-colors duration-200 hover:border-signal hover:text-signal"
                          >
                            <Layers className="h-3.5 w-3.5 text-signal" />
                            <span>Architecture &amp; Proof</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>

                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-hairline bg-canvas px-3.5 py-2 text-xs font-medium text-ink-secondary transition-colors duration-200 hover:border-strong hover:text-ink"
                          >
                            <GitHubMark className="h-3.5 w-3.5" />
                            <span>Code</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Right 7 Columns: Prominent Live Interactive Simulator Visualization */}
                    <div className="lg:col-span-7">
                      <div className="rounded-2xl border border-hairline bg-surface-2/85 p-3 sm:p-5">
                        <div className="flex items-center justify-between gap-2 pb-3 px-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                          <span>{project.accentTag}</span>
                          <span className="flex items-center gap-1.5 text-telemetry font-semibold">
                            <span className="h-1.5 w-1.5 rounded-full bg-telemetry animate-pulse" />
                            INTERACTIVE LIVE SIMULATOR
                          </span>
                        </div>
                        {project.simulator && (
                          <ProjectSimulator kind={project.simulator} />
                        )}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </article>
            );
          })}
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="mx-auto max-w-[1340px] px-4 sm:px-8 mt-4">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-hairline bg-surface-1/80 px-4 py-2.5 backdrop-blur-md">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-xs font-bold text-signal tabular-nums">
              SYSTEM {activeProject.index} /{" "}
              {String(PROJECTS.length).padStart(2, "0")}
            </span>
            <span className="truncate text-xs font-semibold text-ink">
              {activeProject.title}
            </span>
          </div>

          <div className="hidden sm:block flex-1 max-w-xs h-1.5 rounded-full bg-surface-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-signal to-champagne transition-all duration-200"
              style={{
                width: `${Math.max(
                  ((activeIndex + 1) / PROJECTS.length) * 100,
                  scrollProgress * 100
                )}%`,
              }}
            />
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-signal hover:underline underline-offset-4"
          >
            <span>Open Dedicated Case Studies (/work)</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
