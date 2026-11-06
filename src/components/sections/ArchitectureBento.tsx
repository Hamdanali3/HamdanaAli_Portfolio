"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Compass } from "lucide-react";
import {
  CAPABILITIES,
  ENGINEERING_PRINCIPLES,
  PROJECTS,
  type CapabilityItem,
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

export function ArchitectureBento({ hideHeader = false }: { hideHeader?: boolean }) {
  const [filter, setFilter] = useState<DomainFilter>("all");

  const visibleCapabilities =
    filter === "all"
      ? CAPABILITIES
      : CAPABILITIES.filter((c) => c.domain === filter);

  const projectMap = new Map(PROJECTS.map((p) => [p.id, p]));

  return (
    <section
      id="architecture"
      aria-labelledby={hideHeader ? undefined : "architecture-heading"}
      aria-label={hideHeader ? "Technical Capabilities and Engineering Principles" : undefined}
      className="relative border-b border-hairline py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1340px] px-4 sm:px-8 space-y-14">
        {/* Header + Filter Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-hairline pb-8">
          {!hideHeader ? (
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/10 px-3.5 py-1 text-xs font-mono font-medium text-signal shadow-sm backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                <span>CHAPTER 04 · PROOF-BACKED STACK &amp; DOMAINS</span>
              </div>
              <h2
                id="architecture-heading"
                className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-[-0.035em] leading-[1.04] text-ink"
              >
                <RevealText text="Zero arbitrary bars:" as="span" />{" "}
                <span className="font-serif italic font-normal text-signal">
                  every tool
                </span>{" "}
                <RevealText text="linked to shipped code." as="span" delay={0.06} />
              </h2>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">
                FILTER BY ENGINEERING DOMAIN
              </div>
              <p className="text-xs text-ink-secondary">
                Select a domain or open any repository proof badge to read the full case study.
              </p>
            </div>
          )}

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
                    active
                      ? "bg-signal-fill text-white font-semibold"
                      : "text-ink-secondary hover:text-ink"
                  )}
                >
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Capability Cards with Direct Internal Case Study Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleCapabilities.map((cap) => (
            <div key={cap.name} className="h-full">
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
                    PROVEN IN CASE STUDIES:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cap.provenByProjectIds.map((pid) => {
                      const proj = projectMap.get(pid);
                      if (!proj) return null;
                      return (
                        <Link
                          key={pid}
                          href={`/work/${pid}`}
                          data-cursor-label="OPEN CASE ↗"
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-hairline bg-canvas px-3.5 py-2 font-mono text-[11px] font-medium text-ink hover:border-signal hover:text-signal transition-colors"
                        >
                          <span>{proj.title}</span>
                          <ArrowUpRight className="h-3 w-3 shrink-0" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>

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
                <div className="border-t border-hairline pt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-champagne">
                  <Link
                    href={`/work/${p.projectId}`}
                    className="hover:text-signal transition-colors inline-flex items-center gap-1"
                  >
                    <span>REF · {p.source}</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
