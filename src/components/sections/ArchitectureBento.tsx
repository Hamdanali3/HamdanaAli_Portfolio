"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Database,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
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
  { id: "all", label: "All Layers (04)" },
  { id: "fullstack", label: "Frontend & Backend" },
  { id: "ai-products", label: "AI & LLM Copilots" },
  { id: "data-devops", label: "Cloud, Push & CI/CD" },
];

const ARCHITECTURE_FLOW = [
  {
    layer: "LAYER 01 · CLIENT",
    title: "Next.js & React 18",
    detail: "MapLibre GL · Recharts · PWA",
    icon: Layers,
  },
  {
    layer: "LAYER 02 · API & AUTH",
    title: "Laravel 12 & FastAPI",
    detail: "3-Role RBAC · HTTP-Only Cookies",
    icon: ShieldCheck,
  },
  {
    layer: "LAYER 03 · AI ENGINE",
    title: "Groq LLM Copilots",
    detail: "SQL PulseBot · Hazard Safety AI",
    icon: Sparkles,
  },
  {
    layer: "LAYER 04 · DATA & PUSH",
    title: "Postgres & Firestore",
    detail: "500-Token FCM · Docker CI",
    icon: Database,
  },
];

export function ArchitectureBento({
  hideHeader = false,
}: {
  hideHeader?: boolean;
}) {
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
      aria-label={
        hideHeader ? "Visual System Architecture and Stack" : undefined
      }
      className="relative border-b border-hairline py-14 sm:py-20"
    >
      <div className="mx-auto max-w-[1340px] px-4 sm:px-8 space-y-10">
        {/* Header + Filter Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-hairline pb-7">
          {!hideHeader ? (
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/10 px-3.5 py-1 text-xs font-mono font-medium text-signal shadow-sm backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                <span>CHAPTER 04 · VISUAL ARCHITECTURE &amp; TECH STACK</span>
              </div>
              <h2
                id="architecture-heading"
                className="text-[clamp(2rem,4vw,3.35rem)] font-extrabold tracking-[-0.035em] leading-[1.04] text-ink"
              >
                <RevealText text="Full-stack &" as="span" />{" "}
                <span className="font-serif italic font-normal text-signal">
                  AI architecture
                </span>{" "}
                <RevealText text="at a glance." as="span" delay={0.05} />
              </h2>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">
                SYSTEM ARCHITECTURE LAYERS
              </div>
              <p className="text-xs text-ink-secondary">
                Visual stack breakdown mapped directly to Sentinel Chitral and
                GridPulse.
              </p>
            </div>
          )}

          <div
            role="tablist"
            aria-label="Filter stack by architecture layer"
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
                    "relative min-h-10 rounded-xl px-3.5 py-2 font-mono text-[11px] transition-colors cursor-pointer",
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

        {/* Visual End-to-End System Topology Diagram */}
        <div className="rounded-2xl border border-hairline bg-surface-1/80 p-5 sm:p-6 backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
            <span className="flex items-center gap-2 text-signal font-semibold">
              <Cpu className="h-4 w-4" />
              <span>END-TO-END PRODUCTION REQUEST TOPOLOGY</span>
            </span>
            <span className="text-telemetry">VERIFIED IN SENTINEL &amp; GRIDPULSE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ARCHITECTURE_FLOW.map((node, idx) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.layer}
                  className="relative flex items-center justify-between rounded-xl border border-hairline bg-canvas/90 p-4"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-signal">
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <span>{node.layer}</span>
                    </div>
                    <div className="text-sm font-bold text-ink truncate">
                      {node.title}
                    </div>
                    <div className="font-mono text-[11px] text-ink-muted truncate">
                      {node.detail}
                    </div>
                  </div>
                  {idx < ARCHITECTURE_FLOW.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden lg:inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-hairline bg-surface-2 font-mono text-xs text-signal"
                    >
                      ➔
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Visual Stack Radar Cards with Signal Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {visibleCapabilities.map((cap) => (
            <SpotlightCard
              key={cap.name}
              className="p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-telemetry flex items-center gap-1.5 font-semibold">
                    <Activity className="h-3.5 w-3.5" />
                    PRODUCTION TELEMETRY
                  </span>
                  <span className="rounded-full border border-hairline bg-surface-2 px-2.5 py-0.5 font-mono text-[10px] uppercase text-ink-muted">
                    {cap.domain}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-ink">
                    {cap.name}
                  </h3>
                  <p className="mt-1 text-xs text-ink-secondary">
                    {cap.roleSummary}
                  </p>
                </div>

                {/* Visual Tool Signal Meters */}
                <div className="space-y-3 pt-1">
                  {cap.visualTools.map((tool) => (
                    <div key={tool.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-ink">
                          {tool.name}
                        </span>
                        <span className="font-mono text-[11px] text-ink-muted">
                          {tool.metric}
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-signal to-champagne"
                          style={{ width: `${tool.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-hairline pt-3.5 flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                  SHIPPED IN:
                </span>
                <div className="flex flex-wrap gap-2">
                  {cap.provenByProjectIds.map((pid) => {
                    const proj = projectMap.get(pid);
                    if (!proj) return null;
                    return (
                      <Link
                        key={pid}
                        href={`/work/${pid}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-canvas px-3 py-1 font-mono text-[11px] font-medium text-ink hover:border-signal hover:text-signal transition-colors"
                      >
                        <CheckCircle2 className="h-3 w-3 text-telemetry" />
                        <span>{proj.title}</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Compact 3-Column Engineering Standards Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ENGINEERING_PRINCIPLES.map((p) => (
            <div
              key={p.number}
              className="flex flex-col justify-between rounded-2xl border border-hairline bg-surface-1/75 p-5"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em]">
                  <span className="text-signal font-bold">
                    STANDARD {p.number}
                  </span>
                  <Link
                    href={`/work/${p.projectId}`}
                    className="text-champagne hover:text-signal inline-flex items-center gap-1"
                  >
                    <span>{p.source}</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
                <h3 className="text-sm font-bold text-ink">{p.title}</h3>
                <p className="text-xs leading-relaxed text-ink-secondary">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
