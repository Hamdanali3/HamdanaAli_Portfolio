"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { Pause, Play } from "lucide-react";
import { MARQUEE_CAPABILITIES } from "@/data/portfolio";

function MarqueeTrack({
  items,
  baseVelocity,
  paused,
}: {
  items: string[];
  baseVelocity: number;
  paused: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 360 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 3.2], {
    clamp: false,
  });

  const directionRef = useRef<number>(1);
  const hoveredRef = useRef<boolean>(false);

  useAnimationFrame((_, delta) => {
    if (prefersReduced || paused || hoveredRef.current) return;

    let moveBy = directionRef.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) directionRef.current = -1;
    else if (vf > 0) directionRef.current = 1;

    moveBy += directionRef.current * moveBy * Math.min(Math.abs(vf), 4);

    let next = baseX.get() + moveBy;
    if (next <= -50) next += 50;
    if (next > 0) next -= 50;
    baseX.set(next);
  });

  const xTransform = useTransform(baseX, (v) => `${v}%`);
  const repeated = [...items, ...items];

  return (
    <div
      onMouseEnter={() => {
        hoveredRef.current = true;
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
      }}
      className="overflow-hidden py-2"
    >
      <motion.div
        style={{ x: prefersReduced ? "0%" : xTransform }}
        className="flex w-max items-center gap-4 will-change-transform"
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
              ✦
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function VelocityMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      aria-label="Core engineering capabilities ticker"
      className="relative border-b border-hairline bg-surface-1/45 py-5"
    >
      <div className="mx-auto max-w-[1340px] px-4 sm:px-8 mb-2 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink-muted">
          PRODUCTION STACK &amp; RESEARCH TELEMETRY
        </span>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? "Resume capability ticker" : "Pause capability ticker"}
          className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface-1 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted hover:text-ink cursor-pointer"
        >
          {paused ? <Play className="h-2.5 w-2.5 text-signal" /> : <Pause className="h-2.5 w-2.5 text-signal" />}
          <span>{paused ? "Paused" : "Live"}</span>
        </button>
      </div>

      <MarqueeTrack items={MARQUEE_CAPABILITIES} baseVelocity={-2.4} paused={paused} />
      <MarqueeTrack
        items={[...MARQUEE_CAPABILITIES].reverse()}
        baseVelocity={2.1}
        paused={paused}
      />
    </section>
  );
}
