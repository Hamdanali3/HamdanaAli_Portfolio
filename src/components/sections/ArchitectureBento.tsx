"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CheckCircle2, Compass } from "lucide-react";
import {
  CAPABILITIES,
  ENGINEERING_PRINCIPLES,
  PROJECTS,
  type CapabilityItem,
  type PortfolioProject,
} from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { RevealText } from "@/components/ui/RevealText";
import { cn } from "@/lib/utils";

type DomainFilter = "all" | CapabilityItem["domain"];

const DOMAIN_FILTERS: { id: DomainFilter; label: string }[] = [
  { id: "all", label: "All Stack (09)" },
  { id: "fullstack", label: "Full-Stack Web" },
  { id: "ai-products", label: "AI & ML Pipelines" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "data-devops", label: "Data, Cloud & CI/CD" },
];

interface ArchitectureBentoProps {
  onOpenProject: (project: PortfolioProject) => void;
}

export function ArchitectureBento({ onOpenProject }: ArchitectureBentoProps) {
  const [filter, setFilter] = useState<DomainFilter>("all");

  const visibleCapabilities =
    filter === "all"
      ? CAPABILITIES
      : CAPABILITIES.filter((c) => c.domain === filter);

  const projectMap = new Map(PROJECTS.map((p) => [p.id, p]));

  return (
    <section
      id="architecture"
      aria-labelledby="architecture-heading"
      className="relative border-b border-hairline py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1340px] px-4 sm:px-8 space-y-16">
        {/* Header + Filter Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-hairline pb-8">
          <div className="space-y-3">
            <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-signal">
              INDEX // 04 — PROOF-BACKED STACK
            </div>
            <h2
              id="architecture-heading"
              className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-[-0.035em] leading-[1.04] text-ink"
            >
              <RevealText text="Zero arbitrary bars —" as="span" />{" "}
              <span className="font-serif italic font-normal text-signal">
                every tool
              </span>{" "}
              <RevealText text="linked to shipped code." as="span" delay={0.06} />
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter capabilities by domain"
            className="flex flex-wrap gap-1.5 rounded-2xl border border-hairline bg-surface-1 p-1.5"
          >
            {DOMAIN_FILTERS.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={cn(
                    "relative min-h-11 rounded-xl px-3.5 py-2 font-mono text-[11px] transition-colors cursor-pointer",
                    active ? "text-white font-semibold" : "text-ink-secondary hover:text-ink"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="capability-domain-pill"
                      className="absolute inset-0 rounded-xl bg-signal-fill"
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FLIP Capability Cards with Direct Repository Proof Chips */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visibleCapabilities.map((cap) => (
              <motion.div
                key={cap.name}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              >
                <SpotlightCard className="p-6 h-full flex flex-col justify-between space-y-5">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-telemetry flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        SHIPPED IN CODE
                      </span>
                      <span className="font-mono text-[10px] uppercase text-ink-muted">
                        {cap.domain}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-ink">
                      {cap.name}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-ink-secondary">
                      {cap.roleSummary}
                    </p>
                  </div>

                  <div className="border-t border-hairline pt-3.5 space-y-2">
                    <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                      USED IN REPOSITORIES:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cap.provenByProjectIds.map((pid) => {
                        const proj = projectMap.get(pid);
                        if (!proj) return null;
                        return (
                          <button
                            key={pid}
                            type="button"
                            onClick={() => onOpenProject(proj)}
                            data-cursor-label="OPEN CASE ↗"
                            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-hairline bg-canvas px-3.5 py-2 font-mono text-[11px] font-medium text-ink hover:border-signal hover:text-signal transition-colors cursor-pointer"
                          >
                            <span>{proj.title}</span>
                            <ArrowUpRight className="h-3 w-3 shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 4 Core Engineering Principles */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-muted">
            <Compass className="h-4 w-4 text-signal" />
            <span>HOW I BUILD &amp; SHIP SOFTWARE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ENGINEERING_PRINCIPLES.map((p) => (
              <SpotlightCard
                key={p.number}
                showFiducials
                className="p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <span className="font-mono text-xs font-bold text-signal">
                    {p.number}
                  </span>
                  <h3 className="text-base font-bold tracking-tight text-ink">
                    {p.title}
                  </h3>
                  <p className="text-xs leading-[1.68] text-ink-secondary">
                    {p.description}
                  </p>
                </div>
                <div className="border-t border-hairline pt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-champagne">
                  REF // {p.source}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
