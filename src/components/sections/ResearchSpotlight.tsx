"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, BookOpenCheck, CheckCircle, Cpu, FileSpreadsheet } from "lucide-react";
import { IEEE_RESEARCH } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { RevealText } from "@/components/ui/RevealText";
import { cn } from "@/lib/utils";

type MetricKey = "accuracy" | "macroF1" | "rocAuc" | "inferenceMsPer1k";

const METRIC_TABS: { key: MetricKey; label: string; unit: string }[] = [
  { key: "accuracy", label: "Test Accuracy", unit: "%" },
  { key: "macroF1", label: "15-Class Macro F1", unit: "" },
  { key: "rocAuc", label: "Weighted ROC-AUC", unit: "" },
  { key: "inferenceMsPer1k", label: "Latency (ms / 1k flows)", unit: " ms" },
];

export function ResearchSpotlight() {
  const [metric, setMetric] = useState<MetricKey>("accuracy");

  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="relative border-b border-hairline bg-surface-1/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1340px] px-4 sm:px-8 space-y-12">
        {/* Section Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-hairline pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-champagne">
              INDEX // 03 — {IEEE_RESEARCH.manuscriptTag}
            </div>
            <h2
              id="research-heading"
              className="text-[clamp(1.9rem,3.8vw,3.35rem)] font-extrabold tracking-[-0.035em] leading-[1.06] text-ink"
            >
              <RevealText text="Auditing dataset leakage &" as="span" />{" "}
              <span className="font-serif italic font-normal text-champagne">
                privacy-preserving
              </span>{" "}
              <RevealText text="intrusion detection." as="span" delay={0.1} />
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={IEEE_RESEARCH.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="READ PDF ↗"
              className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-xs font-semibold text-white"
            >
              <BookOpenCheck className="h-3.5 w-3.5" />
              <span>Read IEEE Manuscript (PDF)</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={IEEE_RESEARCH.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="CODE & DATA ↗"
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-1 px-4.5 py-2.5 text-xs font-semibold text-ink hover:border-strong"
            >
              <FileSpreadsheet className="h-3.5 w-3.5 text-champagne" />
              <span>Pipeline &amp; Ablation Logs</span>
            </a>
          </div>
        </div>

        {/* Main Research Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 5 Columns: Manuscript Citation & 4 Audit Discoveries */}
          <div className="lg:col-span-5 space-y-5">
            <SpotlightCard showFiducials className="p-6 sm:p-7 space-y-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-champagne">
                MANUSCRIPT ABSTRACT BRIEF
              </div>
              <h3 className="font-serif text-2xl leading-snug text-ink">
                &ldquo;{IEEE_RESEARCH.title}&rdquo;
              </h3>
              <p className="font-mono text-[11px] text-ink-muted">
                {IEEE_RESEARCH.author} — {IEEE_RESEARCH.affiliation}
              </p>
              <p className="text-sm leading-[1.7] text-ink-secondary">
                {IEEE_RESEARCH.abstractSummary}
              </p>
            </SpotlightCard>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {IEEE_RESEARCH.auditFindings.map((f) => (
                <div
                  key={f.code}
                  className="rounded-2xl border border-hairline bg-surface-1 p-4 space-y-1.5"
                >
                  <div className="font-mono text-[10px] font-semibold tracking-[0.12em] text-signal">
                    {f.code}
                  </div>
                  <div className="text-xs font-bold text-ink">{f.title}</div>
                  <p className="text-xs leading-relaxed text-ink-muted">{f.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right 7 Columns: Interactive 4-Model Benchmark Comparator */}
          <div className="lg:col-span-7">
            <SpotlightCard showFiducials className="p-6 sm:p-8 h-full flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-telemetry">
                      LEAKAGE-SANITIZED + PP-PSFE BENCHMARK (152,386 FLOWS)
                    </div>
                    <h3 className="mt-1 text-xl font-bold tracking-tight text-ink">
                      Four-Model Empirical Comparison
                    </h3>
                  </div>
                  <Cpu className="h-5 w-5 text-signal" />
                </div>

                {/* Metric Lens Tabs */}
                <div className="flex flex-wrap gap-1.5 rounded-xl border border-hairline bg-canvas p-1">
                  {METRIC_TABS.map((tab) => {
                    const active = metric === tab.key;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setMetric(tab.key)}
                        className={cn(
                          "relative rounded-lg px-3 py-1.5 font-mono text-[11px] transition-colors cursor-pointer",
                          active ? "text-white font-semibold" : "text-ink-secondary hover:text-ink"
                        )}
                      >
                        {active && (
                          <motion.span
                            layoutId="research-metric-pill"
                            className="absolute inset-0 rounded-lg bg-signal"
                            transition={{ type: "spring", stiffness: 420, damping: 32 }}
                          />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Animated Bars */}
                <div className="space-y-4 pt-2">
                  {IEEE_RESEARCH.benchmarkRows.map((row) => {
                    const rawVal = row[metric];
                    const pct =
                      metric === "accuracy"
                        ? rawVal
                        : metric === "inferenceMsPer1k"
                        ? Math.max(8, (1 - rawVal / 22) * 100)
                        : rawVal * 100;

                    const formatted =
                      metric === "accuracy"
                        ? `${rawVal.toFixed(2)}%`
                        : metric === "inferenceMsPer1k"
                        ? `${rawVal.toFixed(2)} ms / 1k`
                        : rawVal.toFixed(4);

                    return (
                      <div
                        key={row.model}
                        className={cn(
                          "rounded-xl border p-4 transition-colors",
                          row.isSelected
                            ? "border-signal/50 bg-signal/5"
                            : "border-hairline bg-canvas/65"
                        )}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            {row.isSelected && (
                              <CheckCircle className="h-4 w-4 text-signal shrink-0" />
                            )}
                            <span className="text-sm font-bold text-ink">
                              {row.model}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 font-mono text-xs tabular-nums">
                            <span className="text-ink-muted">
                              Gap: {row.overfitGap}
                            </span>
                            <span
                              className={cn(
                                "font-bold",
                                row.isSelected ? "text-signal" : "text-ink"
                              )}
                            >
                              {formatted}
                            </span>
                          </div>
                        </div>

                        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
                          <motion.div
                            initial={false}
                            animate={{ width: `${Math.min(100, Math.max(4, pct))}%` }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className={cn(
                              "h-full rounded-full",
                              row.isSelected ? "bg-signal" : "bg-ink-muted/65"
                            )}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-xl border border-hairline bg-canvas px-4 py-3 font-mono text-[11px] text-ink-secondary flex flex-wrap items-center justify-between gap-2">
                <span>
                  62 Features: 38 Core Protocol + 24 PP-PSFE Scalar Descriptors
                </span>
                <span className="text-telemetry font-semibold">
                  HTTP Web-Attack F1: 0.44 → 0.93
                </span>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
