"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Activity,
  AlertTriangle,
  BellRing,
  CheckCircle2,
  Cpu,
  GraduationCap,
  Radio,
  ShieldAlert,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SimulatorKind } from "@/data/portfolio";

/* ============================================================================
 * 1. SENTINEL CHITRAL — 8-VALLEY GLOF RISK & FCM MULTICAST SIMULATOR
 * ============================================================================ */
const CHITRAL_VALLEYS = [
  { name: "Reshun", risk: "Watch", confidence: 0.84, note: "Glacial meltwater index elevated (+14%)." },
  { name: "Golain", risk: "Watch", confidence: 0.79, note: "Moraine lake sensor reporting high inflow." },
  { name: "Bumburet", risk: "Normal", confidence: 0.92, note: "Channel discharge within seasonal baseline." },
  { name: "Rumbur", risk: "Normal", confidence: 0.90, note: "All stream gauges nominal; clear weather." },
  { name: "Birir", risk: "Normal", confidence: 0.88, note: "Slope moisture stable; zero rockfall alerts." },
  { name: "Mastuj", risk: "Advisory", confidence: 0.81, note: "Afternoon snowmelt surge forecast." },
  { name: "Yarkhun", risk: "Normal", confidence: 0.86, note: "Upper basin temperature below threshold." },
  { name: "Torkhow", risk: "503 Fail-Safe", confidence: 0, note: "Telemetry doc missing -> strict HTTP 503 returned (never faked)." },
] as const;

function SentinelSimulator() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [broadcasting, setBroadcasting] = useState(false);
  const [deliveredCount, setDeliveredCount] = useState<number | null>(null);
  const active = CHITRAL_VALLEYS[selectedIdx];

  const triggerBroadcast = () => {
    if (broadcasting) return;
    setBroadcasting(true);
    setDeliveredCount(null);
    setTimeout(() => {
      setBroadcasting(false);
      setDeliveredCount(492);
    }, 650);
  };

  return (
    <div
      data-cursor-label="INTERACT"
      className="rounded-xl border border-hairline bg-canvas/90 p-4 sm:p-5 font-sans"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3">
        <div className="flex items-center gap-2">
          <Radio className="h-4 w-4 text-signal" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
            SENTINEL // 8-VALLEY GLOF TELEMETRY
          </span>
        </div>
        <span className="rounded-full border border-hairline bg-surface-2 px-2.5 py-0.5 font-mono text-[10px] text-ink-secondary">
          firestore/valleyRisks
        </span>
      </div>

      {/* 8 Valley Selector Grid */}
      <div className="mt-3.5 grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        {CHITRAL_VALLEYS.map((v, i) => {
          const isCurrent = i === selectedIdx;
          const statusDot =
            v.risk === "Watch"
              ? "bg-signal"
              : v.risk === "Advisory"
              ? "bg-amber-500"
              : v.risk === "503 Fail-Safe"
              ? "bg-rose-500"
              : "bg-telemetry";
          return (
            <button
              key={v.name}
              type="button"
              onClick={() => {
                setSelectedIdx(i);
                setDeliveredCount(null);
              }}
              className={cn(
                "flex items-center justify-between rounded-lg border px-2.5 py-1.5 text-left text-xs transition-all cursor-pointer",
                isCurrent
                  ? "border-signal bg-surface-2 text-ink font-semibold"
                  : "border-hairline bg-surface-1/60 text-ink-secondary hover:text-ink"
              )}
            >
              <span className="truncate">{v.name}</span>
              <span className={cn("h-2 w-2 shrink-0 rounded-full", statusDot)} />
            </button>
          );
        })}
      </div>

      {/* Selected Valley Live Readout */}
      <div className="mt-3.5 rounded-xl border border-hairline bg-surface-1 p-3.5 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
              VALLEY NODE: {active.name.toUpperCase()}
            </span>
            <p className="text-xs text-ink mt-0.5">{active.note}</p>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase",
              active.risk === "Watch"
                ? "bg-signal/15 text-signal border border-signal/30"
                : active.risk === "503 Fail-Safe"
                ? "bg-rose-500/15 text-rose-500 border border-rose-500/30"
                : active.risk === "Advisory"
                ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                : "bg-telemetry/15 text-telemetry border border-telemetry/30"
            )}
          >
            {active.risk}
          </span>
        </div>

        {/* Confidence Meter */}
        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[10px] text-ink-muted tabular-nums">
            <span>RISK ENGINE CONFIDENCE</span>
            <span>{active.confidence > 0 ? `${Math.round(active.confidence * 100)}%` : "HTTP 503 UNAVAILABLE"}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <motion.div
              className="h-full bg-signal"
              initial={false}
              animate={{ width: `${active.confidence * 100}%` }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* FCM Multicast Simulator Trigger */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <button
            type="button"
            onClick={triggerBroadcast}
            disabled={active.risk === "503 Fail-Safe"}
            className="inline-flex items-center gap-1.5 rounded-lg bg-signal px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-white disabled:opacity-40 cursor-pointer"
          >
            <BellRing className="h-3 w-3" />
            <span>{broadcasting ? "Dispatching Batch..." : "Test 500-Token FCM Alert"}</span>
          </button>
          {deliveredCount !== null && (
            <span className="font-mono text-[10px] text-telemetry tabular-nums">
              ✓ {deliveredCount}/500 delivered · 8 stale pruned
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 2. GRICPULSE — 177+ MW FLEET TELEMETRY & ALERT -> WORK ORDER STATE MACHINE
 * ============================================================================ */
type AlertStage = "open" | "acknowledged" | "work_order" | "resolved";

function GridPulseSimulator() {
  const [fleetMw, setFleetMw] = useState(164.8);
  const [stage, setStage] = useState<AlertStage>("open");

  useEffect(() => {
    const id = setInterval(() => {
      setFleetMw((prev) => {
        const delta = (Math.random() - 0.48) * 1.4;
        return Number(Math.min(182, Math.max(158, prev + delta)).toFixed(1));
      });
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const advanceStage = () => {
    setStage((prev) =>
      prev === "open"
        ? "acknowledged"
        : prev === "acknowledged"
        ? "work_order"
        : prev === "work_order"
        ? "resolved"
        : "open"
    );
  };

  return (
    <div
      data-cursor-label="INTERACT"
      className="rounded-xl border border-hairline bg-canvas/90 p-4 sm:p-5 space-y-3.5"
    >
      <div className="flex items-center justify-between border-b border-hairline pb-3">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-telemetry" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
            GRIDPULSE // CHITRAL FLEET CONTROL
          </span>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-telemetry">
          <span className="h-1.5 w-1.5 rounded-full bg-telemetry" />
          5s TELEMETRY
        </span>
      </div>

      {/* Live Fleet Output + Plant Breakdown */}
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-1 rounded-xl border border-hairline bg-surface-1 p-3">
          <div className="font-mono text-[10px] uppercase text-ink-muted">LIVE OUTPUT</div>
          <div className="mt-1 font-mono text-xl sm:text-2xl font-bold text-ink tabular-nums">
            {fleetMw} <span className="text-xs font-normal text-ink-muted">MW</span>
          </div>
          <div className="mt-1 font-mono text-[10px] text-telemetry tabular-nums">
            91.4% Cap. Factor
          </div>
        </div>

        <div className="col-span-2 rounded-xl border border-hairline bg-surface-1 p-3 space-y-1.5 font-mono text-[11px]">
          <div className="flex justify-between">
            <span className="text-ink-secondary">Golen Gol Hydro</span>
            <span className="text-ink font-semibold tabular-nums">104.2 / 108 MW</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-secondary">Lawi Hydro Station</span>
            <span className="text-ink font-semibold tabular-nums">52.6 / 69 MW</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-secondary">Mastuj Solar + Shandur Wind</span>
            <span className="text-telemetry font-semibold tabular-nums">8.0 MW Online</span>
          </div>
        </div>
      </div>

      {/* Closed-Loop Alert -> Kanban Work Order Interactive Lifecycle */}
      <div className="rounded-xl border border-hairline bg-surface-1 p-3.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {stage === "resolved" ? (
              <CheckCircle2 className="h-4 w-4 text-telemetry shrink-0" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-signal shrink-0" />
            )}
            <span className="font-mono text-[11px] font-semibold text-ink">
              {stage === "open" && "ALERT #A-109: Reshun Micro-Hydro Bearing 78°C"}
              {stage === "acknowledged" && "ACK BY SHIFT ENGINEER · Evaluating Unit #2"}
              {stage === "work_order" && "WORK ORDER #WO-412 · In Progress (Kanban)"}
              {stage === "resolved" && "WORK DONE -> Alert #A-109 Auto-Resolved!"}
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 font-mono text-[10px]">
            {(["open", "acknowledged", "work_order", "resolved"] as const).map((s) => (
              <span
                key={s}
                className={cn(
                  "h-1.5 w-6 rounded-full transition-colors",
                  stage === s ? "bg-signal" : "bg-surface-2"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={advanceStage}
            className="rounded-lg border border-strong bg-surface-2 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-ink hover:border-signal hover:text-signal transition-colors cursor-pointer"
          >
            {stage === "open" && "1. Acknowledge Alert →"}
            {stage === "acknowledged" && "2. Convert to Work Order →"}
            {stage === "work_order" && "3. Complete Work Order →"}
            {stage === "resolved" && "Reset Lifecycle ↺"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 3. EDGE-IIOTSET PP-PSFE — LEAKAGE AUDIT & 15-CLASS BENCHMARK SIMULATOR
 * ============================================================================ */
function EdgeIIoTSimulator() {
  const [mode, setMode] = useState<"sanitized" | "leaky">("sanitized");

  const bars =
    mode === "sanitized"
      ? [
          { name: "XGBoost + PP-PSFE (Best)", val: 96.49, highlight: true, note: "3.54 ms/1k" },
          { name: "LightGBM + PP-PSFE", val: 96.33, highlight: false, note: "18.35 ms/1k" },
          { name: "Random Forest", val: 94.38, highlight: false, note: "10.35 ms/1k" },
          { name: "Logistic Regression", val: 84.87, highlight: false, note: "Web F1: 0.44" },
        ]
      : [
          { name: "Un-audited Leaky Model", val: 99.82, highlight: false, note: "Memorizes Lab IPs!" },
          { name: "Naive Drop (No PP-PSFE)", val: 78.4, highlight: false, note: "Web Attacks Collapse" },
        ];

  return (
    <div
      data-cursor-label="INTERACT"
      className="rounded-xl border border-hairline bg-canvas/90 p-4 sm:p-5 space-y-3.5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-champagne" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
            PP-PSFE // 15-CLASS INTRUSION BENCHMARK
          </span>
        </div>

        <div className="inline-flex rounded-lg border border-hairline bg-surface-1 p-0.5 font-mono text-[10px]">
          <button
            type="button"
            onClick={() => setMode("sanitized")}
            className={cn(
              "rounded-md px-2.5 py-1 transition-colors cursor-pointer",
              mode === "sanitized" ? "bg-signal text-white font-semibold" : "text-ink-muted hover:text-ink"
            )}
          >
            PP-PSFE (62 Feat)
          </button>
          <button
            type="button"
            onClick={() => setMode("leaky")}
            className={cn(
              "rounded-md px-2.5 py-1 transition-colors cursor-pointer",
              mode === "leaky" ? "bg-signal text-white font-semibold" : "text-ink-muted hover:text-ink"
            )}
          >
            Why Audit Matters
          </button>
        </div>
      </div>

      <div className="space-y-2.5">
        {bars.map((b) => (
          <div key={b.name} className="space-y-1">
            <div className="flex items-center justify-between font-mono text-[11px] tabular-nums">
              <span className={b.highlight ? "font-semibold text-ink" : "text-ink-secondary"}>
                {b.name}
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[10px] text-ink-muted">{b.note}</span>
                <span className={b.highlight ? "text-signal font-bold" : "text-ink"}>
                  {b.val.toFixed(2)}%
                </span>
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
              <motion.div
                initial={false}
                animate={{ width: `${b.val}%` }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "h-full rounded-full",
                  b.highlight
                    ? "bg-signal"
                    : mode === "leaky"
                    ? "bg-amber-500/80"
                    : "bg-ink-muted/60"
                )}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-lg border border-hairline bg-surface-1 px-3 py-2 font-mono text-[10px] text-ink-secondary">
        <span className="flex items-center gap-1.5">
          <Cpu className="h-3.5 w-3.5 text-telemetry" />
          Flask API + Angular 22 · ROC-AUC 0.9991
        </span>
        <span className="text-champagne">152,386 Clean Flows</span>
      </div>
    </div>
  );
}

/* ============================================================================
 * 4. UNISELECTION v2.0 — ELIGIBILITY & DETERMINISTIC SYNC SIMULATOR
 * ============================================================================ */
const MERIT_PROFILES = [
  { label: "92% Aggregate", matchedUnis: 248, scholarships: 11, topTrack: "CS & Software Eng (NUST, Air, FAST, Global)" },
  { label: "81% Aggregate", matchedUnis: 194, scholarships: 8, topTrack: "Accredited Engineering & Computing (HEC Tier-1)" },
  { label: "72% Aggregate", matchedUnis: 136, scholarships: 5, topTrack: "BS Computing, Business & International Pathways" },
] as const;

function UniSelectionSimulator() {
  const [profileIdx, setProfileIdx] = useState(0);
  const current = MERIT_PROFILES[profileIdx];

  return (
    <div
      data-cursor-label="INTERACT"
      className="rounded-xl border border-hairline bg-canvas/90 p-4 sm:p-5 space-y-3.5"
    >
      <div className="flex items-center justify-between border-b border-hairline pb-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-signal" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
            UNISELECTION v2.0 // ELIGIBILITY ENGINE
          </span>
        </div>
        <span className="font-mono text-[10px] text-telemetry">SHA-256 VERIFIED</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {MERIT_PROFILES.map((p, idx) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setProfileIdx(idx)}
            className={cn(
              "rounded-lg border px-2.5 py-1 font-mono text-[10px] transition-colors cursor-pointer",
              profileIdx === idx
                ? "border-signal bg-signal text-white font-semibold"
                : "border-hairline bg-surface-1 text-ink-secondary hover:text-ink"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-hairline bg-surface-1 p-3">
          <div className="font-mono text-[10px] text-ink-muted">ELIGIBLE INSTITUTIONS</div>
          <div className="mt-1 font-mono text-2xl font-bold text-ink tabular-nums">
            {current.matchedUnis} <span className="text-xs font-normal text-ink-muted">/ 284</span>
          </div>
          <div className="mt-0.5 font-mono text-[10px] text-ink-secondary">
            266 HEC + 18 Global
          </div>
        </div>
        <div className="rounded-xl border border-hairline bg-surface-1 p-3">
          <div className="font-mono text-[10px] text-ink-muted">VERIFIED AID SCHEMES</div>
          <div className="mt-1 font-mono text-2xl font-bold text-telemetry tabular-nums">
            {current.scholarships} <span className="text-xs font-normal text-ink-muted">/ 12</span>
          </div>
          <div className="mt-0.5 font-mono text-[10px] text-ink-secondary">
            13 Gov Visa Portals
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-hairline bg-surface-1 px-3 py-2 text-xs text-ink-secondary">
        <span className="flex items-center gap-1.5 truncate">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-signal" />
          <span className="truncate">{current.topTrack}</span>
        </span>
        <span className="shrink-0 font-mono text-[10px] text-telemetry ml-2">40/40 Tests</span>
      </div>
    </div>
  );
}

export function ProjectSimulator({ kind }: { kind: SimulatorKind }) {
  switch (kind) {
    case "sentinel":
      return <SentinelSimulator />;
    case "gridpulse":
      return <GridPulseSimulator />;
    case "edge-iiot":
      return <EdgeIIoTSimulator />;
    case "uniselection":
      return <UniSelectionSimulator />;
    default:
      return (
        <div className="p-4 flex items-center gap-2 font-mono text-xs text-ink-muted">
          <Activity className="h-4 w-4 text-signal" />
          <span>Interactive Telemetry Ready</span>
        </div>
      );
  }
}
