"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

function computeNearStart(target: number, decimals: number): number {
  if (target <= 0) return 0;
  if (decimals > 0) {
    return Number((target * 0.92).toFixed(decimals));
  }
  if (target <= 10) {
    return Math.max(1, target - 2);
  }
  return Math.max(1, Math.round(target * 0.86));
}

export function AnimatedCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  durationMs = 360,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-16px" });
  const prefersReduced = useReducedMotion();
  // Always render the real target value on SSR / no-JS / pre-animation so "00" or "0.00%" never flashes
  const [displayValue, setDisplayValue] = useState<number>(value);

  useEffect(() => {
    if (!isInView || prefersReduced) return;

    const startVal = computeNearStart(value, decimals);
    if (startVal === value) return;

    let rafId = 0;
    const clampedDuration = Math.min(durationMs, 380);
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / clampedDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (value - startVal) * eased;
      setDisplayValue(progress < 1 ? current : value);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, value, decimals, durationMs, prefersReduced]);

  const shown = prefersReduced ? value : displayValue;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}
