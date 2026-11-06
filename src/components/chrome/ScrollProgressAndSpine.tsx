"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function ScrollProgressAndSpine({
  hasEventsSection = true,
  onSectionChange,
}: {
  hasEventsSection?: boolean;
  onSectionChange?: (id: string) => void;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState("overview");

  const sections = useMemo(() => {
    const raw = [
      { id: "overview", label: "Overview" },
      { id: "work", label: "Selected Work" },
      ...(hasEventsSection ? [{ id: "field-notes", label: "Field Notes" }] : []),
      { id: "architecture", label: "Capabilities" },
      { id: "journey", label: "Journey" },
      { id: "contact", label: "Contact" },
    ];
    return raw.map((item, idx) => ({
      ...item,
      index: String(idx + 1).padStart(2, "0"),
    }));
  }, [hasEventsSection]);

  // Fallback for browsers without native CSS scroll-driven animation-timeline
  useEffect(() => {
    if (typeof window === "undefined") return;
    const supportsNative = window.CSS?.supports?.("animation-timeline", "scroll()");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (supportsNative || reduced) return;

    let raf = 0;
    const updateProgress = () => {
      if (!barRef.current) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
      barRef.current.style.transform = `scaleX(${ratio})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Active section observer for spine + navbar
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          const id = visible[0].target.id;
          setActiveId(id);
          onSectionChange?.(id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.05, 0.25, 0.5],
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [onSectionChange, sections]);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 right-0 z-[100] h-[2px] bg-transparent"
      >
        <div
          ref={barRef}
          className="scroll-progress-native h-full w-full bg-signal origin-left"
        />
      </div>

      {/* Desktop Right-Edge Section Spine */}
      <aside
        aria-label="Page section index"
        className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 xl:flex flex-col items-end gap-1"
      >
        {sections.map((sec) => {
          const isActive = activeId === sec.id;
          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              aria-label={`${sec.index} ${sec.label}`}
              className="group flex min-h-11 min-w-11 items-center justify-end gap-2 px-1 text-right focus:outline-none"
            >
              <span
                className={cn(
                  "pointer-events-none rounded-md border border-hairline bg-elevated px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase backdrop-blur-md shadow-md transition-all duration-200 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0",
                  isActive ? "text-signal font-semibold" : "text-ink-secondary"
                )}
              >
                {sec.index} · {sec.label}
              </span>
              <span className="relative flex h-4 w-4 items-center justify-center">
                <span
                  className={cn(
                    "h-[1.5px] transition-all duration-200",
                    isActive
                      ? "w-4 bg-signal"
                      : "w-2 bg-ink-muted/55 group-hover:w-3.5 group-hover:bg-ink"
                  )}
                />
                {isActive && (
                  <motion.span
                    layoutId="spine-active-dot"
                    className="absolute -right-1 h-1.5 w-1.5 rounded-full bg-signal"
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </span>
            </a>
          );
        })}
      </aside>
    </>
  );
}
