"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const SESSION_KEY = "ha_portfolio_calibrated_v1";

export function CalibrationPreloader() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        return;
      }
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Proceed gracefully if storage is restricted
    }

    let raf = 0;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    const start = performance.now();
    const duration = 680;

    const tick = (now: number) => {
      const pct = Math.min(((now - start) / duration) * 100, 100);
      setVisible(true);
      setProgress(Math.round(pct));
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        hideTimer = setTimeout(() => setVisible(false), 120);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [prefersReduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            transition: { duration: 0.58, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[150] flex flex-col justify-between bg-[#08090b] text-[#f3f2ee] px-6 py-8 sm:px-12 pointer-events-none"
        >
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.16em] uppercase text-[#9ca3af]">
            <span>SYS.CALIBRATE // HAMDAN ALI</span>
            <span>33.7138° N · 73.0247° E</span>
          </div>

          <div className="mx-auto w-full max-w-md space-y-3">
            <div className="flex items-baseline justify-between font-mono">
              <span className="text-xs tracking-[0.14em] uppercase text-[#9ca3af]">
                INITIALIZING TELEMETRY &amp; CASE ARCHIVE
              </span>
              <span className="text-2xl font-semibold tabular-nums text-[#ff4f1f]">
                {String(progress).padStart(3, "0")}%
              </span>
            </div>
            <div className="h-[2px] w-full overflow-hidden bg-white/10">
              <div
                className="h-full bg-[#ff4f1f] transition-[width] duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.14em] uppercase text-[#68707e]">
            <span>EDITION 2026 // SWISS INSTRUMENT</span>
            <span>STATUS: NOMINAL</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
