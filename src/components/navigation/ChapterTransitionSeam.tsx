"use client";

import React, { useCallback, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/utils";

interface ChapterTransitionSeamProps {
  fromChapter: string;
  fromName?: string;
  toChapter: string;
  toName: string;
  toId: string;
  className?: string;
}

export function ChapterTransitionSeam({
  fromChapter,
  toChapter,
  toName,
  toId,
  className,
}: ChapterTransitionSeamProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleGlideToNextChapter = useCallback(() => {
    const target = document.getElementById(toId);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });

    // Trigger visual arrival glow sweep on the target chapter
    target.classList.remove("animate-chapter-arrival");
    // Force browser reflow to restart CSS animation
    void target.offsetWidth;
    target.classList.add("animate-chapter-arrival");

    setTimeout(() => {
      target.classList.remove("animate-chapter-arrival");
    }, 1000);
  }, [toId]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={`Transition from Chapter ${fromChapter} to Chapter ${toChapter}: ${toName}`}
      className={cn(
        "group relative flex w-full flex-col items-center justify-center py-6 sm:py-8 overflow-hidden select-none",
        className
      )}
    >
      {/* Background Animated Kinetic Laser Beam Sweep */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 h-[1px] -translate-y-1/2 bg-hairline/80 overflow-hidden"
      >
        <div className="animate-chapter-beam h-full w-1/3 bg-gradient-to-r from-transparent via-signal to-transparent opacity-85" />
      </div>

      {/* Interactive Magnetic Chapter Waypoint Capsule */}
      <Magnetic strength={0.2}>
        <button
          type="button"
          onClick={handleGlideToNextChapter}
          data-cursor-label={`CH ${toChapter}`}
          className="relative z-10 inline-flex items-center gap-2.5 sm:gap-3.5 rounded-full border border-hairline bg-surface-1/95 px-3.5 py-1.5 sm:px-4 sm:py-2 backdrop-blur-md shadow-md transition-all duration-300 hover:border-signal/55 hover:bg-surface-2 hover:shadow-[0_8px_24px_-6px_rgba(255,79,23,0.3)] active:scale-[0.98] cursor-pointer focus:outline-none"
        >
          {/* Chapter Indices Pill */}
          <span className="flex items-center gap-1.5 rounded-full bg-signal/10 px-2 py-0.5 font-mono text-[10px] sm:text-[11px] font-bold text-signal tracking-[0.08em]">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
            <span>{fromChapter}</span>
            <span className="text-signal/60">→</span>
            <span>{toChapter}</span>
          </span>

          {/* Transition Label & Destination */}
          <span className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] font-medium tracking-[0.1em] uppercase text-ink-secondary group-hover:text-ink transition-colors">
            <span className="text-ink-muted hidden sm:inline">Chapter {toChapter} ·</span>
            <span className="font-semibold text-ink">{toName}</span>
          </span>

          {/* Animated Down Arrow Jump Hint */}
          <span className="flex h-5 w-5 sm:h-5.5 sm:w-5.5 items-center justify-center rounded-full bg-surface-2 group-hover:bg-signal group-hover:text-white transition-all duration-300 text-ink-muted">
            <ArrowDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </span>
        </button>
      </Magnetic>
    </div>
  );
}
