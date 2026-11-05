"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { GitHubMark } from "@/components/ui/GitHubMark";
import { TopographicCanvas } from "@/components/hero/TopographicCanvas";
import { Magnetic } from "@/components/ui/Magnetic";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { HERO_TELEMETRY, IEEE_RESEARCH, PROFILE } from "@/data/portfolio";

interface HeroSectionProps {
  onOpenCommandPalette: () => void;
}

export function HeroSection({ onOpenCommandPalette }: HeroSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      id="overview"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-hairline pt-6 pb-16 sm:pt-10 sm:pb-24"
    >
      {/* Interactive Topographic Contour Canvas */}
      <TopographicCanvas />

      <div className="relative z-10 mx-auto max-w-[1340px] px-4 sm:px-8">
        {/* Top Architectural Metadata Strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4 mb-10 sm:mb-14 font-mono text-[11px] tracking-[0.13em] uppercase text-ink-muted"
        >
          <div className="flex items-center gap-2.5">
            <span className="inline-block h-2 w-2 rounded-full bg-signal" />
            <span className="text-ink font-medium">INDEX // 01 — OVERVIEW</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span>{PROFILE.primaryCoordinates}</span>
            <span className="text-hairline">|</span>
            <span>{PROFILE.secondaryCoordinates}</span>
          </div>
          <div className="text-telemetry font-medium">STATUS: OPEN FOR IMPACT</div>
        </motion.div>

        {/* Main 12-Column Swiss Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          {/* Left 8 Columns: Monumental Display Typography */}
          <div className="lg:col-span-8 space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface-1/90 px-3.5 py-1.5 backdrop-blur-sm"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-signal" />
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-secondary">
                {PROFILE.role}
              </span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.78, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.55rem,5.8vw,5.65rem)] font-extrabold tracking-[-0.04em] leading-[0.97] text-ink"
            >
              Engineering{" "}
              <span className="font-serif italic font-normal text-signal tracking-[-0.01em]">
                mission-critical
              </span>{" "}
              software — from mountain{" "}
              <span className="font-serif italic font-normal text-champagne tracking-[-0.01em]">
                telemetry
              </span>{" "}
              to ML{" "}
              <span className="font-serif italic font-normal text-ink tracking-[-0.01em]">
                security.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[62ch] text-base sm:text-lg leading-[1.68] text-ink-secondary"
            >
              I&apos;m <strong className="font-semibold text-ink">Hamdan Ali</strong> — a Software
              Engineer &amp; Researcher at{" "}
              <span className="text-ink font-medium">Air University, Islamabad</span> and{" "}
              <span className="text-ink font-medium">HindukushSoft Technologies</span> internship
              alumnus. I design and ship full-stack web platforms, deterministic Flutter mobile
              apps, and leakage-sanitized cybersecurity ML pipelines built for real-world stakes.
            </motion.p>

            {/* Primary Magnetic Action Row */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <Magnetic strength={0.22}>
                <a
                  href="#work"
                  data-cursor-label="EXPLORE"
                  className="inline-flex items-center gap-2.5 rounded-full bg-signal px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-8px_rgba(255,79,31,0.65)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
                >
                  <span>Explore Selected Work</span>
                  <ArrowDownRight className="h-4 w-4" />
                </a>
              </Magnetic>

              <Magnetic strength={0.18}>
                <a
                  href={IEEE_RESEARCH.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label="IEEE PDF ↗"
                  className="inline-flex items-center gap-2 rounded-full border border-strong bg-surface-1/90 px-5 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-surface-2"
                >
                  <FileText className="h-4 w-4 text-champagne" />
                  <span>IEEE PP-PSFE Paper</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted" />
                </a>
              </Magnetic>

              <Magnetic strength={0.18}>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  data-cursor-label="COPY EMAIL"
                  className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-1/75 px-4.5 py-3.5 font-mono text-xs font-medium text-ink-secondary transition-colors hover:border-strong hover:text-ink cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-telemetry" />
                      <span className="text-telemetry">Copied {PROFILE.email}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-signal" />
                      <span>{PROFILE.email}</span>
                    </>
                  )}
                </button>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right 4 Columns: Precision Dossier Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4"
          >
            <SpotlightCard enableTilt showFiducials className="p-6 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-hairline pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-strong bg-surface-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={PROFILE.avatarUrl}
                      alt="Hamdan Ali"
                      width={56}
                      height={56}
                      fetchPriority="high"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal">
                      ENGINEER DOSSIER
                    </div>
                    <div className="text-base font-bold tracking-tight text-ink">
                      {PROFILE.name}
                    </div>
                    <div className="font-mono text-xs text-ink-muted">
                      {PROFILE.githubHandle}
                    </div>
                  </div>
                </div>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hamdan Ali GitHub Profile"
                  data-cursor-label="GITHUB ↗"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-hairline bg-canvas text-ink transition-colors hover:border-signal hover:text-signal"
                >
                  <GitHubMark className="h-4 w-4" />
                </a>
              </div>

              <dl className="mt-4 space-y-3 text-xs">
                <div className="flex items-start justify-between gap-4">
                  <dt className="font-mono uppercase tracking-[0.1em] text-ink-muted">
                    ACADEMIA
                  </dt>
                  <dd className="text-right font-medium text-ink">
                    BS Software Engineering · Air University
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="font-mono uppercase tracking-[0.1em] text-ink-muted">
                    INDUSTRY
                  </dt>
                  <dd className="text-right font-medium text-ink">
                    HindukushSoft Technologies (Alumni)
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="font-mono uppercase tracking-[0.1em] text-ink-muted">
                    CORE DOMAINS
                  </dt>
                  <dd className="text-right font-medium text-ink">
                    Next.js · Laravel 12 · Flutter · XGBoost
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="font-mono uppercase tracking-[0.1em] text-ink-muted">
                    RESEARCH
                  </dt>
                  <dd className="text-right font-medium text-champagne">
                    IEEE Intrusion Detection (PP-PSFE)
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="mt-5 flex w-full items-center justify-between rounded-xl border border-hairline bg-canvas/80 px-3.5 py-2.5 font-mono text-[11px] text-ink-secondary transition-colors hover:border-strong hover:text-ink cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-signal" />
                  <span>Quick-Jump Any System</span>
                </span>
                <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] text-ink">
                  Ctrl + K
                </span>
              </button>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* Bottom 4-Column Tabular Telemetry Strip */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-hairline rounded-2xl bg-surface-1/85 backdrop-blur-md divide-y sm:divide-y-0 sm:divide-x divide-hairline overflow-hidden"
        >
          {HERO_TELEMETRY.map((stat) => (
            <div key={stat.label} className="p-6 transition-colors hover:bg-surface-2/50">
              <div className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-ink tabular-nums">
                <AnimatedCounter
                  value={stat.numericValue}
                  decimals={stat.decimals ?? 0}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-[0.08em] text-ink">
                {stat.label}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                {stat.detail}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
