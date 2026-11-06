"use client";

import React, { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDownRight,
  Camera,
  Check,
  Code2,
  Copy,
  SkipForward,
  Terminal,
} from "lucide-react";
import hamdanPortrait from "../../../public/images/hamdan.jpg";
import { GitHubMark } from "@/components/ui/GitHubMark";
import { TopographicCanvas } from "@/components/hero/TopographicCanvas";
import { Magnetic } from "@/components/ui/Magnetic";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { HERO_TELEMETRY, PROFILE } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const GREETING_STORAGE_KEY = "ha_greeting_seen_v2";

interface GreetingStep {
  id: string;
  text: string;
  lang: "ur" | "en";
  dir: "rtl" | "ltr";
  caption: string;
}

const GREETING_STEPS: readonly GreetingStep[] = [
  {
    id: "ur-name",
    text: "ہمدان علی",
    lang: "ur",
    dir: "rtl",
    caption: "01 / 03 · اردو",
  },
  {
    id: "ur-intro",
    text: "میں ہمدان علی ہوں",
    lang: "ur",
    dir: "rtl",
    caption: "02 / 03 · پاکستان",
  },
  {
    id: "en-intro",
    text: "I am Hamdan Ali",
    lang: "en",
    dir: "ltr",
    caption: "03 / 03 · ENGLISH",
  },
];

const greetingListeners = new Set<() => void>();

function subscribeGreeting(listener: () => void) {
  greetingListeners.add(listener);
  return () => {
    greetingListeners.delete(listener);
  };
}

function getGreetingSnapshot(): boolean {
  if (typeof document === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return document.documentElement.dataset.greeting === "active";
}

function getGreetingServerSnapshot(): boolean {
  return false;
}

function dismissGreetingSession() {
  if (typeof document !== "undefined") {
    delete document.documentElement.dataset.greeting;
  }
  try {
    sessionStorage.setItem(GREETING_STORAGE_KEY, "1");
  } catch {
    // Proceed cleanly when sessionStorage is unavailable
  }
  greetingListeners.forEach((listener) => listener());
}

interface HeroSectionProps {
  onOpenCommandPalette: () => void;
  hasEventsSection?: boolean;
}

export function HeroSection({
  onOpenCommandPalette,
  hasEventsSection = true,
}: HeroSectionProps) {
  const [copied, setCopied] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);

  const greetingActive = useSyncExternalStore(
    subscribeGreeting,
    getGreetingSnapshot,
    getGreetingServerSnapshot
  );

  const skipGreeting = useCallback(() => {
    dismissGreetingSession();
  }, []);

  useEffect(() => {
    if (!greetingActive) return;

    // Total sequence ~2.95s across 3 steps, each transition <= 280ms
    const t1 = setTimeout(() => setStepIdx(1), 980);
    const t2 = setTimeout(() => setStepIdx(2), 1980);
    const t3 = setTimeout(() => {
      dismissGreetingSession();
    }, 2950);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismissGreetingSession();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [greetingActive]);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const activeGreeting = GREETING_STEPS[stepIdx] ?? GREETING_STEPS[0];

  return (
    <section
      id="overview"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-hairline pt-6 pb-16 sm:pt-10 sm:pb-24"
    >
      <TopographicCanvas />

      <div className="relative z-10 mx-auto max-w-[1340px] px-4 sm:px-8">
        {/* Top Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4 mb-8 sm:mb-12 font-mono text-[11px] tracking-[0.13em] uppercase text-ink-muted">
          <div className="flex items-center gap-2.5">
            <span className="inline-block h-2 w-2 rounded-full bg-signal" />
            <span className="text-ink font-medium">INDEX // 01 — OVERVIEW</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span>{PROFILE.primaryCoordinates}</span>
            <span aria-hidden="true" className="text-hairline">
              |
            </span>
            <span>{PROFILE.secondaryCoordinates}</span>
          </div>
          <div className="text-telemetry font-medium">AVAILABLE FOR FULL-STACK ROLES</div>
        </div>

        {/* Main 12-Column Swiss Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          {/* Left 7 Columns: Zero-CLS Greeting Stage + Hero Headline */}
          <div className="lg:col-span-7 space-y-6">
            {/* Fixed-Height Stacked Slot: Multilingual Greeting (First Load) <-> Identity Header */}
            <div className="grid grid-cols-1 min-h-[112px] sm:min-h-[120px] items-center">
              {/* Layer A: Urdu -> English Greeting Stage (plays once per session, skippable) */}
              <div
                onClick={greetingActive ? skipGreeting : undefined}
                aria-hidden={!greetingActive}
                className={cn(
                  "hero-greeting-stage col-start-1 row-start-1 flex items-center justify-between gap-4 rounded-2xl border border-strong bg-surface-1/95 px-4 py-3 sm:px-6 sm:py-4 backdrop-blur-md transition-opacity duration-300",
                  greetingActive
                    ? "opacity-100 visible cursor-pointer z-20"
                    : "opacity-0 invisible pointer-events-none"
                )}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted mb-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                    <span>{activeGreeting.caption}</span>
                  </div>

                  <div
                    className={cn(
                      "flex min-h-[54px] sm:min-h-[62px] items-center",
                      activeGreeting.dir === "rtl" ? "justify-end" : "justify-start"
                    )}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={activeGreeting.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        lang={activeGreeting.lang}
                        dir={activeGreeting.dir}
                        className={cn(
                          "inline-block w-fit text-ink",
                          activeGreeting.lang === "ur"
                            ? "urdu-nastaliq text-2xl sm:text-3xl font-bold"
                            : "font-sans text-2xl sm:text-3xl font-extrabold tracking-[-0.03em]"
                        )}
                      >
                        {activeGreeting.text}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>

                <button
                  type="button"
                  tabIndex={greetingActive ? 0 : -1}
                  onClick={(e) => {
                    e.stopPropagation();
                    skipGreeting();
                  }}
                  className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-hairline bg-canvas px-3.5 py-2 font-mono text-[11px] font-medium text-ink-secondary hover:border-strong hover:text-ink transition-colors cursor-pointer"
                >
                  <span>Skip</span>
                  <SkipForward className="h-3.5 w-3.5 text-signal" />
                  <kbd
                    aria-hidden="true"
                    className="hidden sm:inline rounded border border-hairline bg-surface-2 px-1.5 py-0.5 text-[10px] text-ink-muted"
                  >
                    Esc
                  </kbd>
                </button>
              </div>

              {/* Layer B: Settled Identity Header */}
              <div
                className={cn(
                  "hero-settled-badge col-start-1 row-start-1 flex flex-wrap items-center gap-3 transition-opacity duration-300",
                  greetingActive ? "opacity-0 invisible pointer-events-none" : "opacity-100 visible"
                )}
              >
                <div className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface-1/90 px-4 py-2 backdrop-blur-sm">
                  <Code2 className="h-3.5 w-3.5 text-signal" />
                  <span className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-ink">
                    {PROFILE.role}
                  </span>
                </div>
                <span
                  lang="ur"
                  dir="rtl"
                  className="urdu-nastaliq rounded-full border border-hairline bg-surface-1/70 px-3.5 py-0.5 text-sm font-bold text-ink-secondary"
                >
                  ہمدان علی
                </span>
              </div>
            </div>

            {/* Monumental Hero Headline (Painted Immediately on Frame 0 for Instant LCP) */}
            <h1
              id="hero-heading"
              className="text-[clamp(2.45rem,5.4vw,5.15rem)] font-extrabold tracking-[-0.04em] leading-[1.01] text-ink"
            >
              Shipping{" "}
              <span className="font-serif italic font-normal text-signal tracking-[-0.01em]">
                full-stack
              </span>{" "}
              products with{" "}
              <span className="font-serif italic font-normal text-champagne tracking-[-0.01em]">
                AI
              </span>{" "}
              — built for real users.
            </h1>

            <p className="max-w-[60ch] text-base sm:text-lg leading-[1.68] text-ink-secondary">
              I&apos;m <strong className="font-semibold text-ink">Hamdan Ali</strong>, a BS
              Software Engineering student at Air University Islamabad and HindukushSoft alumnus.
              I build <strong className="font-semibold text-ink">AI-powered</strong> web apps,
              Flutter mobile tools, and clean REST APIs — from mountain hazard alerts in Chitral
              to student admissions software.
            </p>

            {/* Primary Action Row (All >= 44px tap targets) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Magnetic strength={0.2}>
                <a
                  href="#work"
                  data-cursor-label="EXPLORE"
                  className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-signal-fill px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_26px_-10px_rgba(194,46,6,0.75)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]"
                >
                  <span>Explore Selected Work</span>
                  <ArrowDownRight className="h-4 w-4" />
                </a>
              </Magnetic>

              {hasEventsSection && (
                <Magnetic strength={0.16}>
                  <a
                    href="#field-notes"
                    data-cursor-label="GALLERY"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-strong bg-surface-1/90 px-5 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-surface-2"
                  >
                    <Camera className="h-4 w-4 text-signal" />
                    <span>Field Notes &amp; Gallery</span>
                  </a>
                </Magnetic>
              )}

              <Magnetic strength={0.16}>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  data-cursor-label="COPY EMAIL"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-surface-1/80 px-4.5 py-3 font-mono text-xs font-medium text-ink-secondary transition-colors duration-200 hover:border-strong hover:text-ink cursor-pointer"
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
            </div>
          </div>

          {/* Right 5 Columns: Large Editorial Portrait + Clean Profile Card */}
          <div className="lg:col-span-5">
            <SpotlightCard enableTilt showFiducials className="p-4 sm:p-5 backdrop-blur-md">
              {/* Large, well-cropped Hero Photo filling the card canvas */}
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-hairline bg-surface-2">
                <Image
                  src={hamdanPortrait}
                  alt="Portrait of Hamdan Ali, Full-Stack Developer"
                  priority
                  placeholder="blur"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 520px, 460px"
                  className="h-full w-full object-cover object-top"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-4 sm:p-5">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ff8b66]">
                        DEVELOPER PROFILE
                      </div>
                      <div className="text-lg sm:text-xl font-bold tracking-tight text-white">
                        {PROFILE.name}
                      </div>
                      <div className="font-mono text-xs text-white/80">
                        {PROFILE.githubHandle}
                      </div>
                    </div>

                    <a
                      href={PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Hamdan Ali GitHub profile"
                      data-cursor-label="GITHUB ↗"
                      className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-black/55 text-white backdrop-blur-md transition-colors duration-200 hover:border-[#ff8b66] hover:text-[#ff8b66]"
                    >
                      <GitHubMark className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Concise Factual Profile Rows */}
              <dl className="mt-4 space-y-2.5 text-xs px-1">
                <div className="flex items-start justify-between gap-4">
                  <dt className="font-mono uppercase tracking-[0.1em] text-ink-muted">
                    EDUCATION
                  </dt>
                  <dd className="text-right font-medium text-ink">
                    BS Software Engineering · Air University
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="font-mono uppercase tracking-[0.1em] text-ink-muted">
                    EXPERIENCE
                  </dt>
                  <dd className="text-right font-medium text-ink">
                    HindukushSoft Technologies (Alumnus)
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="font-mono uppercase tracking-[0.1em] text-ink-muted">
                    LOCATION
                  </dt>
                  <dd className="text-right font-medium text-ink">
                    Islamabad &amp; Chitral, Pakistan
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="mt-4 flex min-h-11 w-full items-center justify-between rounded-xl border border-hairline bg-canvas/85 px-3.5 py-2.5 font-mono text-[11px] text-ink-secondary transition-colors duration-200 hover:border-strong hover:text-ink cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-signal" />
                  <span>Quick-Jump Any Project</span>
                </span>
                <span
                  aria-hidden="true"
                  className="rounded border border-hairline bg-surface-2 px-1.5 py-0.5 text-[10px] text-ink"
                >
                  Ctrl + K
                </span>
              </button>
            </SpotlightCard>
          </div>
        </div>

        {/* Bottom 4-Column Shipped Product & Quality Strip */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-hairline rounded-2xl bg-surface-1/85 backdrop-blur-md divide-y sm:divide-y-0 sm:divide-x divide-hairline overflow-hidden">
          {HERO_TELEMETRY.map((stat) => (
            <div key={stat.label} className="p-6 transition-colors duration-200 hover:bg-surface-2/50">
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
        </div>
      </div>
    </section>
  );
}
