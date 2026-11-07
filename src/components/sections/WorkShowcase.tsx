"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  FileText,
  Layers,
  Sparkles,
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

  // Synchronize active project card and progress bar on horizontal scroll
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? Math.min(Math.max(scrollLeft / maxScroll, 0), 1) : 0;
    setScrollProgress(progress);

    // Calculate which card is closest to the center of the track
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
      aria-label={hideHeader ? "Selected Work and Case Studies" : undefined}
      className="relative border-b border-hairline py-16 sm:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-[1340px] px-4 sm:px-8 space-y-10 sm:space-y-12">
        {/* Section Header */}
        {!hideHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-hairline pb-8">
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

            <div className="max-w-md space-y-2">
              <p className="text-sm leading-relaxed text-ink-secondary">
                Explore all 6 real-world platforms, engineering studies, and interactive code
                simulators. Glide horizontally through the exhibition deck or tap any project tab.
              </p>
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-signal hover:underline underline-offset-4"
              >
                <span>Browse All 6 Dedicated Case Study Pages (/work)</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Quick-Jump Project Tabs Scrubber */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-ink-muted">
            <span className="flex items-center gap-2 uppercase tracking-[0.14em]">
              <Sparkles className="h-3.5 w-3.5 text-signal" />
              <span>HORIZONTAL EXHIBITION DECK · SELECT ANY ARCHITECTURE</span>
            </span>
            <span className="hidden sm:inline">Use trackpad or swipe horizontally ⇄</span>
          </div>

          <div
            role="tablist"
            aria-label="Quick-jump project tabs"
            className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar"
          >
            {PROJECTS.map((proj, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={proj.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => scrollToProject(idx)}
                  data-cursor-label={`0${idx + 1}`}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all duration-200 cursor-pointer focus:outline-none select-none",
                    isSelected
                      ? "border-signal-fill bg-signal-fill text-white font-semibold shadow-[0_4px_16px_rgba(255,79,23,0.35)]"
                      : "border-hairline bg-surface-1/90 text-ink-secondary hover:border-strong hover:text-ink hover:bg-surface-2"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold",
                      isSelected ? "bg-white/20 text-white" : "text-signal"
                    )}
                  >
                    {proj.index}
                  </span>
                  <span className="truncate">{proj.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Snap-Scroll Exhibition Track */}
        <div
          ref={trackRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          role="region"
          aria-label="Horizontal Shipped Projects Carousel. Use left and right arrow keys to navigate."
          className="flex w-full gap-6 sm:gap-8 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory no-scrollbar focus:outline-none focus-visible:ring-1 focus-visible:ring-signal rounded-3xl"
        >
          {PROJECTS.map((project, idx) => {
            const isSelected = activeIndex === idx;

            return (
              <article
                key={project.id}
                data-project-card
                data-project-id={project.id}
                className="w-[88vw] max-w-[1100px] shrink-0 snap-center transition-opacity duration-300"
              >
                <SpotlightCard
                  showFiducials
                  className={cn(
                    "p-6 sm:p-8 lg:p-10 transition-all duration-300 h-full",
                    isSelected
                      ? "border-strong/90 shadow-2xl"
                      : "border-hairline/80 opacity-90 hover:opacity-100"
                  )}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                    {/* Narrative & Telemetry Column */}
                    <div className="lg:col-span-6 space-y-5">
                      <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px]">
                        <span className="rounded-md bg-signal-fill px-2 py-0.5 font-semibold text-white tabular-nums">
                          {project.index} / 06
                        </span>
                        <span className="uppercase tracking-[0.12em] text-ink-muted">
                          {project.category}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] text-ink">
                          <Link
                            href={`/work/${project.id}`}
                            className="hover:text-signal transition-colors"
                          >
                            {project.title}
                          </Link>
                        </h3>
                        <p className="mt-1 font-serif italic text-lg sm:text-xl text-ink-secondary">
                          {project.subtitle}
                        </p>
                      </div>

                      <p className="text-sm sm:text-[15px] leading-[1.7] text-ink-secondary line-clamp-3 sm:line-clamp-none">
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
                            <div className="mt-0.5 text-[11px] leading-snug text-ink-muted truncate">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Stack Badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 6).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-hairline bg-surface-2/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.04em] text-ink-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.stack.length > 6 && (
                          <span className="rounded-full border border-hairline bg-surface-2/40 px-2 py-1 font-mono text-[10px] text-ink-muted">
                            +{project.stack.length - 6} more
                          </span>
                        )}
                      </div>

                      {/* Action Buttons (>= 44px tap targets) */}
                      <div className="flex flex-wrap items-center gap-2.5 pt-2">
                        <Link
                          href={`/work/${project.id}`}
                          data-cursor-label="READ CASE ↗"
                          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-semibold text-canvas transition-transform duration-200 hover:scale-[1.02]"
                        >
                          <Layers className="h-3.5 w-3.5 text-signal" />
                          <span>Read Case Study</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>

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
                    <div className="lg:col-span-6">
                      <div className="rounded-2xl border border-hairline bg-surface-2/45 p-2 sm:p-3 shadow-inner">
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
              </article>
            );
          })}
        </div>

        {/* Bottom Interactive Navigation Controller & Continuous Progress Scrubber */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-hairline pt-6">
          {/* Active Card Indicator */}
          <div className="flex items-center gap-2.5 font-mono text-xs">
            <span className="text-signal font-bold tabular-nums">
              PROJECT 0{activeIndex + 1} / 06
            </span>
            <span className="text-ink-muted">·</span>
            <span className="truncate font-semibold uppercase tracking-[0.06em] text-ink">
              {activeProject.title}
            </span>
          </div>

          {/* Continuous Progress Scrubber Bar */}
          <div className="flex items-center gap-3">
            <div
              role="progressbar"
              aria-label="Horizontal carousel scroll progress"
              aria-valuenow={Math.round(scrollProgress * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              className="h-1.5 w-32 sm:w-56 rounded-full bg-surface-2 overflow-hidden"
            >
              <div
                style={{ width: `${Math.max(scrollProgress * 100, 16)}%` }}
                className="h-full rounded-full bg-signal transition-all duration-150 ease-out"
              />
            </div>
            <span className="font-mono text-[10px] text-ink-muted tabular-nums">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>

          {/* Prev / Next Controls & Deep Link */}
          <div className="flex items-center gap-2.5">
            <Magnetic strength={0.2}>
              <button
                type="button"
                onClick={() => stepProject(-1)}
                disabled={activeIndex === 0}
                aria-label="Previous project card"
                data-cursor-label="PREV"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface-1 text-ink transition-all duration-200 hover:border-strong hover:bg-surface-2 disabled:opacity-30 disabled:pointer-events-none cursor-pointer focus:outline-none"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            </Magnetic>

            <Magnetic strength={0.2}>
              <button
                type="button"
                onClick={() => stepProject(1)}
                disabled={activeIndex === PROJECTS.length - 1}
                aria-label="Next project card"
                data-cursor-label="NEXT"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface-1 text-ink transition-all duration-200 hover:border-strong hover:bg-surface-2 disabled:opacity-30 disabled:pointer-events-none cursor-pointer focus:outline-none"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </Magnetic>

            <Link
              href="/work"
              className="ml-2 inline-flex items-center gap-1 font-mono text-xs font-semibold text-signal hover:underline underline-offset-4"
            >
              <span>View All 6 Cases</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
