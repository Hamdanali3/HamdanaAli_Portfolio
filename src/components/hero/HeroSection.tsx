"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  Languages,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import hamdanPortrait from "../../../public/images/hamdan.jpg";
import { GitHubMark } from "@/components/ui/GitHubMark";
import { Magnetic } from "@/components/ui/Magnetic";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { HERO_TELEMETRY, PROFILE, PROJECTS } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const TopographicCanvas = dynamic(
  () =>
    import("@/components/hero/TopographicCanvas").then(
      (mod) => mod.TopographicCanvas
    ),
  { ssr: false }
);

interface MultilingualIdentity {
  id: string;
  text: string;
  lang: string;
  dir: "ltr" | "rtl";
  languageName: string;
  flag: string;
}

const MULTILINGUAL_IDENTITIES: readonly MultilingualIdentity[] = [
  {
    id: "en",
    text: "I am Hamdan Ali",
    lang: "en",
    dir: "ltr",
    languageName: "English",
    flag: "🇬🇧",
  },
  {
    id: "ur",
    text: "میں ہمدان علی ہوں",
    lang: "ur",
    dir: "rtl",
    languageName: "اردو",
    flag: "🇵🇰",
  },
  {
    id: "ar",
    text: "أنا حمدان علي",
    lang: "ar",
    dir: "rtl",
    languageName: "العربية",
    flag: "🇸🇦",
  },
  {
    id: "es",
    text: "Soy Hamdan Ali",
    lang: "es",
    dir: "ltr",
    languageName: "Español",
    flag: "🇪🇸",
  },
  {
    id: "ja",
    text: "私はハムダン・アリです",
    lang: "ja",
    dir: "ltr",
    languageName: "日本語",
    flag: "🇯🇵",
  },
  {
    id: "fr",
    text: "Je suis Hamdan Ali",
    lang: "fr",
    dir: "ltr",
    languageName: "Français",
    flag: "🇫🇷",
  },
  {
    id: "de",
    text: "Ich bin Hamdan Ali",
    lang: "de",
    dir: "ltr",
    languageName: "Deutsch",
    flag: "🇩🇪",
  },
  {
    id: "zh",
    text: "我是哈姆丹·阿里",
    lang: "zh",
    dir: "ltr",
    languageName: "中文",
    flag: "🇨🇳",
  },
  {
    id: "tr",
    text: "Ben Hamdan Ali",
    lang: "tr",
    dir: "ltr",
    languageName: "Türkçe",
    flag: "🇹🇷",
  },
];

interface HeroSectionProps {
  onOpenCommandPalette?: () => void;
  hasEventsSection?: boolean;
}

export function HeroSection({}: HeroSectionProps) {
  const [copied, setCopied] = useState(false);
  const [langIndex, setLangIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setLangIndex((prev) => (prev + 1) % MULTILINGUAL_IDENTITIES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeIdentity =
    MULTILINGUAL_IDENTITIES[langIndex] ?? MULTILINGUAL_IDENTITIES[0];

  const handleNextLanguage = () => {
    setLangIndex((prev) => (prev + 1) % MULTILINGUAL_IDENTITIES.length);
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      id="overview"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-hairline pt-6 pb-14 sm:pt-8 sm:pb-20"
    >
      <TopographicCanvas />

      <div className="relative z-10 mx-auto max-w-[1340px] px-4 sm:px-8">
        {/* Top Recruiter Status Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4 mb-8 sm:mb-10 font-mono text-[11px] tracking-[0.12em] uppercase">
          <div className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/10 px-3.5 py-1 text-xs font-mono font-medium text-signal shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
            <span>CHAPTER 01 · FULL-STACK &amp; AI PRODUCT ENGINEER</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-telemetry/30 bg-telemetry/10 px-3.5 py-1 text-telemetry font-semibold">
            <span className="h-2 w-2 rounded-full bg-telemetry animate-ping" />
            <span>OPEN FOR IMMEDIATE PLACEMENT &amp; FULL-STACK ROLES</span>
          </div>
        </div>

        {/* Main 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left 7 Columns: Streamlined Greeting + Headline + Visual Signal Pills */}
          <div className="lg:col-span-7 space-y-6">
            {/* Compact Single-Bar Living Multilingual Greeting */}
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onClick={handleNextLanguage}
              role="region"
              aria-label="Continuous Multilingual Name Rotation"
              className="group relative overflow-hidden rounded-2xl border border-strong bg-surface-1/90 px-4 py-3.5 sm:px-5 sm:py-4 backdrop-blur-md shadow-md transition-all duration-300 hover:border-signal/50 cursor-pointer select-none"
            >
              <div className="flex items-center justify-between gap-3 mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                <span className="inline-flex items-center gap-2 text-signal font-semibold">
                  <Sparkles className="h-3 w-3" />
                  <span>{PROFILE.role}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface-2 px-2.5 py-0.5 text-ink font-medium">
                  <span>{activeIdentity.flag}</span>
                  <span>{activeIdentity.languageName}</span>
                  <Languages className="h-3 w-3 text-signal ml-0.5" />
                </span>
              </div>

              <div
                className={cn(
                  "flex min-h-[48px] sm:min-h-[54px] items-center",
                  activeIdentity.dir === "rtl"
                    ? "justify-end text-right"
                    : "justify-start text-left"
                )}
              >
                <div
                  key={activeIdentity.id}
                  lang={activeIdentity.lang}
                  dir={activeIdentity.dir}
                  className={cn(
                    "inline-block w-fit animate-identity-enter",
                    activeIdentity.lang === "ur"
                      ? "urdu-nastaliq text-2xl sm:text-3xl font-bold leading-[2.0] text-ink"
                      : "font-sans text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] leading-tight text-ink"
                  )}
                >
                  <span className="name-kinetic-continuous">
                    {activeIdentity.text}
                  </span>
                </div>
              </div>
            </div>

            {/* Single Razor-Sharp H1 */}
            <h1
              id="hero-heading"
              className="text-[clamp(2.35rem,5vw,4.75rem)] font-extrabold tracking-[-0.04em] leading-[1.02] text-ink"
            >
              Shipping{" "}
              <span className="font-serif italic font-normal text-signal tracking-[-0.01em]">
                production
              </span>{" "}
              full-stack &amp;{" "}
              <span className="font-serif italic font-normal text-champagne tracking-[-0.01em]">
                AI systems
              </span>
              .
            </h1>

            {/* Crisp 1-Sentence Recruiter Value Pitch (Zero Fluff) */}
            <p className="max-w-[56ch] text-base sm:text-lg leading-relaxed text-ink-secondary">
              BS Software Engineering at{" "}
              <strong className="font-semibold text-ink">Air University</strong>{" "}
              &amp;{" "}
              <strong className="font-semibold text-ink">HindukushSoft</strong>{" "}
              alumnus building live cloud platforms with{" "}
              <strong className="font-semibold text-ink">
                Next.js, Laravel 12, Python, and Groq AI
              </strong>
              .
            </p>

            {/* Visual Recruiter At-a-Glance Proof Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="flex items-center gap-2.5 rounded-xl border border-hairline bg-surface-1/90 px-3.5 py-2.5">
                <Zap className="h-4 w-4 shrink-0 text-signal" />
                <div>
                  <div className="text-xs font-bold text-ink">2 Live Systems</div>
                  <div className="font-mono text-[10px] text-ink-muted">
                    Vercel + Cloud APIs
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-hairline bg-surface-1/90 px-3.5 py-2.5">
                <ShieldCheck className="h-4 w-4 shrink-0 text-telemetry" />
                <div>
                  <div className="text-xs font-bold text-ink">30+ Automated Tests</div>
                  <div className="font-mono text-[10px] text-ink-muted">
                    RBAC &amp; HTTP 503 Gates
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-hairline bg-surface-1/90 px-3.5 py-2.5">
                <Sparkles className="h-4 w-4 shrink-0 text-champagne" />
                <div>
                  <div className="text-xs font-bold text-ink">Role-Scoped AI</div>
                  <div className="font-mono text-[10px] text-ink-muted">
                    Groq &amp; SQL Copilots
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Recruiter CTA Row */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Magnetic strength={0.2}>
                <Link
                  href="#work"
                  data-cursor-label="LIVE WORK"
                  className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-signal-fill px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_26px_-10px_rgba(194,46,6,0.75)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]"
                >
                  <span>Inspect 2 Flagship Systems</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Magnetic>

              <Magnetic strength={0.16}>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label="GITHUB ↗"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-strong bg-surface-1/90 px-5 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:border-signal hover:text-signal"
                >
                  <GitHubMark className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              </Magnetic>

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

          {/* Right 5 Columns: Uncluttered Portrait + Live Flagship Quick-Launch */}
          <div className="lg:col-span-5">
            <SpotlightCard enableTilt showFiducials className="p-4 sm:p-5 backdrop-blur-md">
              {/* Hero Portrait */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-hairline bg-surface-2 shadow-inner">
                <Image
                  src={hamdanPortrait}
                  alt="Portrait of Hamdan Ali, Full-Stack Developer"
                  priority
                  placeholder="blur"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 520px, 460px"
                  className="h-full w-full object-cover object-[center_20%] transition-transform duration-500 hover:scale-[1.02]"
                />
                <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3 py-1 font-mono text-[10px] font-semibold text-white backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>READY TO HIRE</span>
                </div>
              </div>

              {/* Clean Identity Bar */}
              <div className="mt-3.5 flex items-center justify-between gap-3 rounded-xl border border-hairline bg-surface-2/90 p-3.5">
                <div>
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-signal">
                    Full-Stack · AI Engineer
                  </div>
                  <div className="text-xl font-bold tracking-tight text-ink mt-0.5">
                    <span className="name-kinetic-continuous">{PROFILE.name}</span>
                  </div>
                  <div className="font-mono text-[11px] text-ink-secondary mt-0.5">
                    BSSE · Air University Islamabad
                  </div>
                </div>

                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hamdan Ali GitHub profile"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-hairline bg-surface-1 text-ink transition-colors duration-200 hover:border-signal hover:text-signal"
                >
                  <GitHubMark className="h-4 w-4" />
                </a>
              </div>

              {/* Direct 1-Click Live Production Links Inside Dossier */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                {PROJECTS.map((proj) => (
                  <a
                    key={proj.id}
                    href={proj.liveUrl ?? proj.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-hairline bg-canvas/85 px-3 py-2.5 transition-all duration-200 hover:border-signal"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-telemetry">
                        <span className="h-1.5 w-1.5 rounded-full bg-telemetry" />
                        <span>LIVE APP</span>
                      </div>
                      <div className="truncate text-xs font-bold text-ink group-hover:text-signal transition-colors">
                        {proj.title}
                      </div>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-ink-muted group-hover:text-signal transition-colors" />
                  </a>
                ))}
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* Bottom 4-Column Visual Telemetry Bar with Signal Meters */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-hairline rounded-2xl bg-surface-1/85 backdrop-blur-md divide-y sm:divide-y-0 sm:divide-x divide-hairline overflow-hidden">
          {HERO_TELEMETRY.map((stat) => (
            <div
              key={stat.label}
              className="p-5 sm:p-6 transition-colors duration-200 hover:bg-surface-2/50"
            >
              <div className="flex items-baseline justify-between gap-2">
                <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-ink tabular-nums">
                  <AnimatedCounter
                    value={stat.numericValue}
                    decimals={stat.decimals ?? 0}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-telemetry">
                  VERIFIED
                </span>
              </div>

              {/* Visual Progress / Signal Bar */}
              <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-signal to-champagne"
                  style={{ width: `${stat.barPercent}%` }}
                />
              </div>

              <div className="mt-2.5 text-xs font-bold uppercase tracking-[0.06em] text-ink">
                {stat.label}
              </div>
              <div className="mt-0.5 font-mono text-[11px] text-ink-muted">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
