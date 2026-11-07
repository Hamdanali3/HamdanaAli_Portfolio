"use client";

import React, { useCallback, useMemo } from "react";
import { ChevronDown, ChevronUp, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChapterTransitionHUDProps {
  activeSection: string;
  onSectionSelect?: (id: string) => void;
  className?: string;
}

interface ChapterMetadata {
  id: string;
  index: string;
  num: number;
  label: string;
  shortLabel: string;
}

const CHAPTERS: ChapterMetadata[] = [
  { id: "overview", index: "01", num: 1, label: "Overview", shortLabel: "Overview" },
  { id: "work", index: "02", num: 2, label: "Selected Work", shortLabel: "Work" },
  { id: "field-notes", index: "03", num: 3, label: "Tech Events & Hackathons", shortLabel: "Events" },
  { id: "architecture", index: "04", num: 4, label: "Capabilities & Stack", shortLabel: "Stack" },
  { id: "journey", index: "05", num: 5, label: "Engineering Journey", shortLabel: "Journey" },
  { id: "contact", index: "06", num: 6, label: "Collaboration", shortLabel: "Contact" },
];

export function ChapterTransitionHUD({
  activeSection,
  onSectionSelect,
  className,
}: ChapterTransitionHUDProps) {
  const currentIndex = useMemo(() => {
    const idx = CHAPTERS.findIndex((c) => c.id === activeSection);
    return idx >= 0 ? idx : 0;
  }, [activeSection]);

  const activeChapter = CHAPTERS[currentIndex] ?? CHAPTERS[0];
  const prevChapter = currentIndex > 0 ? CHAPTERS[currentIndex - 1] : null;
  const nextChapter = currentIndex < CHAPTERS.length - 1 ? CHAPTERS[currentIndex + 1] : null;

  const navigateToChapter = useCallback(
    (targetChapter: ChapterMetadata) => {
      const target = document.getElementById(targetChapter.id);
      if (!target) return;

      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Trigger visual arrival glow sweep on the target chapter
      target.classList.remove("animate-chapter-arrival");
      void target.offsetWidth;
      target.classList.add("animate-chapter-arrival");

      onSectionSelect?.(targetChapter.id);

      setTimeout(() => {
        target.classList.remove("animate-chapter-arrival");
      }, 1000);
    },
    [onSectionSelect]
  );

  return (
    <aside
      aria-label="Interactive Chapter Navigation HUD"
      className={cn(
        "fixed bottom-5 left-5 z-40 hidden md:flex flex-col gap-1.5 select-none",
        className
      )}
    >
      <div className="flex items-center gap-2.5 rounded-full border border-strong/80 bg-surface-1/90 px-3.5 py-2 backdrop-blur-xl shadow-xl transition-all duration-300 hover:border-signal/50">
        {/* Chapter Icon & Step Pill */}
        <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-signal">
          <Compass className="h-3.5 w-3.5 animate-spin-slow text-signal" />
          <span className="tabular-nums">CH {activeChapter.index}</span>
          <span className="text-ink-muted">/</span>
          <span className="tabular-nums text-ink-muted">06</span>
        </div>

        <div className="h-3.5 w-[1px] bg-hairline" />

        {/* Animated Active Chapter Title */}
        <div className="min-w-[120px] max-w-[170px] overflow-hidden">
          <div
            key={activeChapter.id}
            className="animate-chapter-text-flip truncate font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-ink"
          >
            {activeChapter.shortLabel}
          </div>
        </div>

        {/* Segmented 6-Dot Meter */}
        <div
          role="tablist"
          aria-label="Chapter progress indicator"
          className="flex items-center gap-1 px-1"
        >
          {CHAPTERS.map((chap, idx) => {
            const isActive = idx === currentIndex;
            const isPassed = idx < currentIndex;

            return (
              <button
                key={chap.id}
                type="button"
                onClick={() => navigateToChapter(chap)}
                aria-label={`Jump to Chapter ${chap.index}: ${chap.label}`}
                title={`Chapter ${chap.index} · ${chap.label}`}
                className={cn(
                  "group relative h-2 rounded-full transition-all duration-300 focus:outline-none cursor-pointer",
                  isActive
                    ? "w-4 bg-signal shadow-[0_0_8px_rgba(255,79,23,0.6)]"
                    : isPassed
                    ? "w-2 bg-ink-secondary/70 hover:w-3 hover:bg-signal/80"
                    : "w-2 bg-hairline hover:w-3 hover:bg-ink-muted"
                )}
              />
            );
          })}
        </div>

        <div className="h-3.5 w-[1px] bg-hairline" />

        {/* Prev / Next Chapter Glide Controls */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            disabled={!prevChapter}
            onClick={() => prevChapter && navigateToChapter(prevChapter)}
            aria-label={prevChapter ? `Previous: Chapter ${prevChapter.index} · ${prevChapter.label}` : "At first chapter"}
            title={prevChapter ? `Previous: Chapter ${prevChapter.index}` : undefined}
            className="flex h-6 w-6 items-center justify-center rounded-full text-ink-secondary transition-colors hover:bg-surface-2 hover:text-signal disabled:opacity-30 disabled:pointer-events-none cursor-pointer focus:outline-none"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            disabled={!nextChapter}
            onClick={() => nextChapter && navigateToChapter(nextChapter)}
            aria-label={nextChapter ? `Next: Chapter ${nextChapter.index} · ${nextChapter.label}` : "At last chapter"}
            title={nextChapter ? `Next: Chapter ${nextChapter.index}` : undefined}
            className="flex h-6 w-6 items-center justify-center rounded-full text-ink-secondary transition-colors hover:bg-surface-2 hover:text-signal disabled:opacity-30 disabled:pointer-events-none cursor-pointer focus:outline-none"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
