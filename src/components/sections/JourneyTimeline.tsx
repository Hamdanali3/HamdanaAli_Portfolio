"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, CheckCircle2, MapPin } from "lucide-react";
import { JOURNEY } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { RevealText } from "@/components/ui/RevealText";

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 75%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 34,
    restDelta: 0.001,
  });

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="relative border-b border-hairline bg-surface-1/25 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1340px] px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-hairline pb-8 mb-14">
          <div className="space-y-3">
            <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-signal">
              INDEX // 05 — EXPERIENCE &amp; EDUCATION
            </div>
            <h2
              id="journey-heading"
              className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-[-0.035em] leading-[1.04] text-ink"
            >
              <RevealText text="Consistent" as="span" />{" "}
              <span className="font-serif italic font-normal text-signal">
                shipping
              </span>{" "}
              <RevealText text="& steady growth." as="span" delay={0.05} />
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink-secondary">
            From undergraduate software engineering at Air University Islamabad to full-stack
            internship builds at HindukushSoft Technologies and live regional products.
          </p>
        </div>

        {/* Timeline Spine + Cards */}
        <div ref={containerRef} className="relative pl-6 sm:pl-12">
          <div
            aria-hidden="true"
            className="absolute left-[9px] sm:left-[19px] top-2 bottom-2 w-[2px] bg-hairline"
          />

          <motion.div
            aria-hidden="true"
            style={{ scaleY: prefersReduced ? 1 : scaleY }}
            className="absolute left-[9px] sm:left-[19px] top-2 bottom-2 w-[2px] origin-top bg-signal"
          />

          <div className="space-y-8">
            {JOURNEY.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.34,
                  delay: Math.min(0.12, idx * 0.04),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[22px] sm:-left-[36px] top-6 flex h-4 w-4 items-center justify-center rounded-full border-2 border-signal bg-canvas"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                </span>

                <SpotlightCard showFiducials className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-4 space-y-2">
                      <span className="inline-block rounded-md bg-signal-fill px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                        {item.period}
                      </span>
                      <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted">
                        {item.tag}
                      </div>
                      <div className="text-sm font-bold text-ink">
                        {item.organization}
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-ink-muted">
                        <MapPin className="h-3 w-3 text-signal" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
                          {item.title}
                        </h3>
                        {item.linkUrl && (
                          <a
                            href={item.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor-label="OPEN ↗"
                            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-hairline bg-canvas px-4 py-2 font-mono text-[11px] font-medium text-ink hover:border-signal hover:text-signal transition-colors duration-200"
                          >
                            <span>{item.linkLabel}</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        )}
                      </div>

                      <p className="text-sm leading-[1.7] text-ink-secondary">
                        {item.description}
                      </p>

                      <ul className="space-y-2 pt-1">
                        {item.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-secondary"
                          >
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-telemetry" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
