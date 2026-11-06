"use client";

import React, { useState } from "react";
import { Pause, Play } from "lucide-react";
import { MARQUEE_CAPABILITIES } from "@/data/portfolio";
import { cn } from "@/lib/utils";

function MarqueeTrack({
  items,
  direction,
  paused,
}: {
  items: string[];
  direction: "left" | "right";
  paused: boolean;
}) {
  const repeated = [...items, ...items];

  return (
    <div className="overflow-hidden py-2">
      <div
        className={cn(
          "flex w-max items-center gap-4 will-change-transform",
          direction === "left" ? "marquee-track-left" : "marquee-track-right",
          paused && "marquee-paused"
        )}
      >
        {repeated.map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="flex items-center gap-4 whitespace-nowrap"
          >
            <span className="rounded-full border border-hairline bg-surface-1 px-4 py-1.5 font-mono text-xs tracking-[0.06em] uppercase text-ink-secondary">
              {item}
            </span>
            <span aria-hidden="true" className="font-mono text-xs text-signal">
              ·
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VelocityMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      aria-label="Core engineering stack ticker"
      className="relative border-b border-hairline bg-surface-1/45 py-5"
    >
      <div className="mx-auto max-w-[1340px] px-4 sm:px-8 mb-2 flex items-center justify-between gap-4">
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink-muted">
          FULL-STACK &amp; AI PRODUCT TOOLKIT
        </span>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={
            paused
              ? "Paused: resume capability ticker"
              : "Live: pause capability ticker"
          }
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-hairline bg-surface-1 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted hover:text-ink transition-colors cursor-pointer"
        >
          {paused ? (
            <Play className="h-3 w-3 text-signal" />
          ) : (
            <Pause className="h-3 w-3 text-signal" />
          )}
          <span>{paused ? "Paused" : "Live"}</span>
        </button>
      </div>

      <MarqueeTrack items={MARQUEE_CAPABILITIES} direction="left" paused={paused} />
      <MarqueeTrack
        items={[...MARQUEE_CAPABILITIES].reverse()}
        direction="right"
        paused={paused}
      />
    </section>
  );
}
