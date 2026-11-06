"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDownRight,
  Camera,
  Check,
  Code2,
  Copy,
  Languages,
  Sparkles,
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

interface MultilingualIdentity {
  id: string;
  text: string;
  lang: string;
  dir: "ltr" | "rtl";
  languageName: string;
  flag: string;
  phonetic?: string;
}

const MULTILINGUAL_IDENTITIES: readonly MultilingualIdentity[] = [
  {
    id: "en",
    text: "I am Hamdan Ali",
    lang: "en",
    dir: "ltr",
    languageName: "English",
    flag: "🇬🇧",
    phonetic: "Full-Stack & AI Builder",
  },
  {
    id: "ur",
    text: "میں ہمدان علی ہوں",
    lang: "ur",
    dir: "rtl",
    languageName: "اردو (Urdu)",
    flag: "🇵🇰",
    phonetic: "Main Hamdan Ali hoon",
  },
  {
    id: "ar",
    text: "أنا حمدان علي",
    lang: "ar",
    dir: "rtl",
    languageName: "العربية (Arabic)",
    flag: "🇸🇦",
    phonetic: "Ana Hamdan Ali",
  },
  {
    id: "es",
    text: "Soy Hamdan Ali",
    lang: "es",
    dir: "ltr",
    languageName: "Español (Spanish)",
    flag: "🇪🇸",
    phonetic: "Soy Hamdan Ali",
  },
  {
    id: "ja",
    text: "私はハムダン・アリです",
    lang: "ja",
    dir: "ltr",
    languageName: "日本語 (Japanese)",
    flag: "🇯🇵",
    phonetic: "Watashi wa Hamudan Ali desu",
  },
  {
    id: "fr",
    text: "Je suis Hamdan Ali",
    lang: "fr",
    dir: "ltr",
    languageName: "Français (French)",
    flag: "🇫🇷",
    phonetic: "Je suis Hamdan Ali",
  },
  {
    id: "de",
    text: "Ich bin Hamdan Ali",
    lang: "de",
    dir: "ltr",
    languageName: "Deutsch (German)",
    flag: "🇩🇪",
    phonetic: "Ich bin Hamdan Ali",
  },
  {
    id: "zh",
    text: "我是哈姆丹·阿里",
    lang: "zh",
    dir: "ltr",
    languageName: "中文 (Mandarin)",
    flag: "🇨🇳",
    phonetic: "Wǒ shì Hāmǔdān·Ālǐ",
  },
  {
    id: "tr",
    text: "Ben Hamdan Ali",
    lang: "tr",
    dir: "ltr",
    languageName: "Türkçe (Turkish)",
    flag: "🇹🇷",
    phonetic: "Ben Hamdan Ali",
  },
];

interface HeroSectionProps {
  onOpenCommandPalette: () => void;
  hasEventsSection?: boolean;
}

export function HeroSection({
  onOpenCommandPalette,
  hasEventsSection = true,
}: HeroSectionProps) {
  const [copied, setCopied] = useState(false);
  const [langIndex, setLangIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Continuous animation loop cycling all the time through different languages
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setLangIndex((prev) => (prev + 1) % MULTILINGUAL_IDENTITIES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeIdentity = MULTILINGUAL_IDENTITIES[langIndex] ?? MULTILINGUAL_IDENTITIES[0];

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
      className="relative overflow-hidden border-b border-hairline pt-6 pb-16 sm:pt-10 sm:pb-24"
    >
      <TopographicCanvas />

      <div className="relative z-10 mx-auto max-w-[1340px] px-4 sm:px-8">
        {/* Top Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4 mb-8 sm:mb-12 font-mono text-[11px] tracking-[0.13em] uppercase text-ink-muted">
          <div className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/10 px-3.5 py-1 text-xs font-mono font-medium text-signal shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
            <span>CHAPTER 01 · SYSTEM OVERVIEW &amp; PHILOSOPHY</span>
          </div>
          <div className="hidden md:flex items-center gap-3 font-mono text-[11px] text-ink-muted">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface-2/60 px-2.5 py-1 text-ink-secondary">
              <span className="text-signal">📍</span> {PROFILE.primaryCoordinates}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface-2/60 px-2.5 py-1 text-ink-secondary">
              <span>🏔️</span> {PROFILE.secondaryCoordinates}
            </span>
          </div>
          <div className="text-telemetry font-medium">AVAILABLE FOR FULL-STACK ROLES</div>
        </div>

        {/* Main 12-Column Swiss Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          {/* Left 7 Columns: Zero-CLS Greeting Stage + Hero Headline */}
          <div className="lg:col-span-7 space-y-6">
            {/* Living Multilingual Identity Banner — In Animation Mode All The Time */}
            <div className="space-y-3.5">
              <div
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onClick={handleNextLanguage}
                role="region"
                aria-label="Continuous Multilingual Name Rotation"
                className="group relative overflow-hidden rounded-2xl border border-strong bg-surface-1/95 p-4 sm:p-5 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-signal/50 cursor-pointer select-none"
              >
                {/* Top Telemetry & Language Chip Bar */}
                <div className="flex items-center justify-between gap-3 border-b border-hairline/70 pb-3 font-mono text-[10px] uppercase tracking-[0.14em]">
                  <div className="flex items-center gap-2 text-signal">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75 motion-reduce:hidden" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                    </span>
                    <span className="font-semibold">LIVING MULTILINGUAL IDENTITY</span>
                  </div>

                  <div className="flex items-center gap-2 text-ink-muted">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface-2 px-2.5 py-0.5 text-ink font-medium">
                      <span>{activeIdentity.flag}</span>
                      <span>{activeIdentity.languageName}</span>
                    </span>
                    <span className="tabular-nums font-semibold text-ink-secondary">
                      {String(langIndex + 1).padStart(2, "0")} / {String(MULTILINGUAL_IDENTITIES.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Main Continuously Animated Living Text Display */}
                <div
                  className={cn(
                    "flex min-h-[60px] sm:min-h-[68px] items-center pt-2.5",
                    activeIdentity.dir === "rtl" ? "justify-end text-right" : "justify-start text-left"
                  )}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIdentity.id}
                      initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      lang={activeIdentity.lang}
                      dir={activeIdentity.dir}
                      className={cn(
                        "inline-block w-fit",
                        activeIdentity.lang === "ur"
                          ? "urdu-nastaliq text-3xl sm:text-4xl font-bold leading-[2.1] text-ink"
                          : "font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.035em] leading-tight text-ink"
                      )}
                    >
                      <span className="name-kinetic-continuous">
                        {activeIdentity.text}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom Micro-Bar: Role Tag + Clickable Hint */}
                <div className="flex items-center justify-between pt-2.5 border-t border-hairline/50 text-[10px] font-mono text-ink-muted">
                  <div className="flex items-center gap-2 text-ink-secondary">
                    <Sparkles className="h-3 w-3 text-signal" />
                    <span>{activeIdentity.phonetic ?? "Continuous Living Name Animation"}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-ink-muted group-hover:text-signal transition-colors">
                    <span>Click or tap to advance</span>
                    <Languages className="h-3 w-3" />
                  </span>
                </div>
              </div>

              {/* Permanent Secondary Role & Quick Switcher Pill Row */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface-1/90 px-4 py-2 backdrop-blur-sm">
                  <Code2 className="h-3.5 w-3.5 text-signal" />
                  <span className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-ink">
                    {PROFILE.role}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleNextLanguage}
                  className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-surface-1/80 px-3.5 py-1.5 font-mono text-[10px] text-ink-secondary hover:border-signal hover:text-signal transition-colors cursor-pointer"
                >
                  <Languages className="h-3.5 w-3.5 text-signal" />
                  <span>Next Language ({langIndex + 1}/10) ↻</span>
                </button>
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
              I&apos;m <strong className="font-semibold text-ink"><span className="name-kinetic-continuous">Hamdan Ali</span></strong>, a BS
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
              {/* Clean, unobstructed Hero Photo frame — zero text covering face, hands or clothing */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-hairline bg-surface-2 shadow-inner">
                <Image
                  src={hamdanPortrait}
                  alt="Portrait of Hamdan Ali, Full-Stack Developer"
                  priority
                  placeholder="blur"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 520px, 460px"
                  className="h-full w-full object-cover object-[center_20%] transition-transform duration-500 hover:scale-[1.02]"
                />
                {/* Clean status chip in top corner */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-3 py-1 font-mono text-[10px] font-semibold text-white backdrop-blur-md shadow-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ACTIVE BUILDER</span>
                </div>
              </div>

              {/* Dedicated High-Contrast Identity Dock Below Photo */}
              <div className="mt-3.5 flex items-center justify-between gap-3 rounded-xl border border-hairline bg-surface-2/90 p-3.5 backdrop-blur-sm">
                <div>
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-signal">
                    Full-Stack Developer · AI
                  </div>
                  <div className="text-xl font-bold tracking-tight text-ink mt-0.5">
                    <span className="name-kinetic-continuous">{PROFILE.name}</span>
                  </div>
                  <div className="font-mono text-xs text-ink-secondary mt-0.5 flex items-center gap-1.5 flex-wrap">
                    <span>{PROFILE.githubHandle}</span>
                    <span className="text-ink-muted">·</span>
                    <span className="text-signal font-medium">{activeIdentity.text}</span>
                  </div>
                </div>

                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hamdan Ali GitHub profile"
                  data-cursor-label="GITHUB ↗"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-hairline bg-surface-1 text-ink shadow-sm transition-colors duration-200 hover:border-signal hover:text-signal"
                >
                  <GitHubMark className="h-4 w-4" />
                </a>
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
