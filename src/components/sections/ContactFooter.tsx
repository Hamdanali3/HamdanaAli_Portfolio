"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  Send,
} from "lucide-react";
import { GitHubMark } from "@/components/ui/GitHubMark";
import { PROFILE } from "@/data/portfolio";
import { Magnetic } from "@/components/ui/Magnetic";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { RevealText } from "@/components/ui/RevealText";
import { cn } from "@/lib/utils";

const INQUIRY_TOPICS = [
  "Full-Stack Developer Role",
  "AI-Powered Web App",
  "Flutter Mobile App",
  "API & Backend Build",
] as const;

export function ContactFooter({
  hideContactSection = false,
  headingAs: HeadingTag = "h2",
}: {
  hideContactSection?: boolean;
  headingAs?: "h1" | "h2";
}) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [topic, setTopic] = useState<string>(INQUIRY_TOPICS[0]);
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");

  const copyDirectEmail = () => {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const formattedSubject = `[Portfolio Inquiry] ${topic}${senderName ? ` - ${senderName}` : ""}`;
  const formattedBody = `Hi Hamdan,\n\nTopic: ${topic}\nFrom: ${senderName || "Prospective Collaborator"}\n\n${
    message || "I reviewed your portfolio and would love to connect."
  }\n`;

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      formattedSubject
    )}&body=${encodeURIComponent(formattedBody)}`;
    window.location.href = mailto;
  };

  const copyStructuredBrief = () => {
    navigator.clipboard?.writeText(
      `To: ${PROFILE.email}\nSubject: ${formattedSubject}\n\n${formattedBody}`
    );
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      aria-labelledby={hideContactSection ? undefined : "contact-heading"}
      className={cn(
        "relative pb-12",
        hideContactSection ? "pt-6" : "pt-16 sm:pt-24"
      )}
    >
      <div className="mx-auto max-w-[1340px] px-4 sm:px-8 space-y-16">
        {/* Main Contact Grid (Shown on Home and /contact) */}
        {!hideContactSection && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 6 Columns: CTA & Direct Channels */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/10 px-3.5 py-1 text-xs font-mono font-medium text-signal shadow-sm backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                <span>CHAPTER 06 · INITIATE COLLABORATION</span>
              </div>

              <HeadingTag
                id="contact-heading"
                className="text-[clamp(2.1rem,4.5vw,4rem)] font-extrabold tracking-[-0.038em] leading-[1.01] text-ink"
              >
                <RevealText text="Let's build products" as="span" />{" "}
                <span className="font-serif italic font-normal text-signal">
                  people
                </span>{" "}
                <RevealText text="rely on." as="span" delay={0.06} />
              </HeadingTag>

              <p className="max-w-lg text-sm sm:text-base leading-[1.7] text-ink-secondary">
                Hiring for a{" "}
                <strong className="font-semibold text-ink">Full-Stack</strong> or{" "}
                <strong className="font-semibold text-ink">AI product</strong>{" "}
                role, or looking to collaborate on a web or mobile build? Reach out
                directly by email.
              </p>

              {/* Tactile Direct Email Card */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={copyDirectEmail}
                  data-cursor-label="COPY EMAIL"
                  className="group flex w-full sm:w-auto items-center justify-between gap-6 rounded-2xl border border-strong bg-surface-1 px-5 py-4 text-left transition-colors duration-200 hover:border-signal cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-signal-fill text-white">
                      <Mail className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                        DIRECT EMAIL
                      </div>
                      <div className="font-mono text-sm sm:text-base font-semibold text-ink">
                        {PROFILE.email}
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-hairline bg-surface-2 px-3 py-1.5 font-mono text-[10px] uppercase text-ink-secondary group-hover:text-signal">
                    {copiedEmail ? (
                      <>
                        <Check className="h-3 w-3 text-telemetry" />
                        <span className="text-telemetry">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </span>
                </button>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-label="GITHUB ↗"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-surface-1 px-4 py-2.5 font-mono text-xs text-ink-secondary hover:border-strong hover:text-ink transition-colors duration-200"
                  >
                    <GitHubMark className="h-3.5 w-3.5 text-signal" />
                    <span>github.com/Hamdanali3</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>

                  <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-surface-1/60 px-4 py-2.5 font-mono text-xs text-telemetry">
                    <span
                      className="h-2 w-2 rounded-full bg-telemetry"
                      aria-hidden="true"
                    />
                    Islamabad, PK (UTC+5)
                  </span>
                </div>
              </div>
            </div>

            {/* Right 6 Columns: Direct Mailto Composer */}
            <div className="lg:col-span-6">
              <SpotlightCard showFiducials className="p-6 sm:p-8">
                <form onSubmit={handleDispatch} className="space-y-5">
                  <div className="border-b border-hairline pb-3.5 flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
                      DIRECT MESSAGE COMPOSER
                    </span>
                    <span className="font-mono text-[10px] text-ink-muted">
                      DIRECT MAILTO · ZERO TRACKERS
                    </span>
                  </div>

                  {/* Scope Selector */}
                  <fieldset className="space-y-2">
                    <legend className="block font-mono text-[11px] uppercase tracking-[0.12em] text-signal font-semibold">
                      STEP 01 · CHOOSE ENGAGEMENT FOCUS
                    </legend>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {INQUIRY_TOPICS.map((item) => (
                        <button
                          key={item}
                          type="button"
                          aria-pressed={topic === item}
                          onClick={() => setTopic(item)}
                          className={cn(
                            "min-h-11 rounded-full border px-3.5 py-2 font-mono text-[11px] transition-colors duration-200 cursor-pointer",
                            topic === item
                              ? "border-signal-fill bg-signal-fill text-white font-semibold"
                              : "border-hairline bg-canvas text-ink-secondary hover:text-ink"
                          )}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="sender-name"
                      className="block font-mono text-[11px] uppercase tracking-[0.12em] text-signal font-semibold"
                    >
                      STEP 02 · YOUR NAME OR TEAM
                    </label>
                    <input
                      id="sender-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g., Sarah Khan, Product Team"
                      className="min-h-11 w-full rounded-xl border border-hairline bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-signal focus:outline-none"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="inquiry-brief"
                      className="block font-mono text-[11px] uppercase tracking-[0.12em] text-signal font-semibold"
                    >
                      STEP 03 · PROJECT SCOPE OR INQUIRY
                    </label>
                    <textarea
                      id="inquiry-brief"
                      name="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about the product, role, or timeline..."
                      className="w-full rounded-xl border border-hairline bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-signal focus:outline-none resize-y"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <Magnetic strength={0.16}>
                      <button
                        type="submit"
                        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-signal-fill px-6 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-white shadow-lg cursor-pointer"
                      >
                        <Send className="h-3.5 w-3.5" />
                        <span>Open in Mail Client</span>
                      </button>
                    </Magnetic>

                    <button
                      type="button"
                      onClick={copyStructuredBrief}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-hairline bg-canvas px-4 py-2.5 font-mono text-[11px] text-ink-secondary hover:text-ink cursor-pointer"
                    >
                      {copiedBrief ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-telemetry" />
                          <span className="text-telemetry">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Message Text</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </SpotlightCard>
            </div>
          </div>
        )}

        {/* Comprehensive Architectural Multi-Page Footer */}
        <div className="border-t border-hairline pt-14">
          {/* Top Multi-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-hairline">
            {/* Col 1 (5 cols): Identity & Bio */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-hairline bg-surface-2 font-mono text-base font-bold text-ink hover:border-signal transition-colors"
                >
                  HA
                </Link>
                <div>
                  <div className="name-kinetic-continuous text-xl font-bold tracking-tight text-ink">
                    {PROFILE.name}
                  </div>
                  <p className="text-xs font-mono text-ink-muted">
                    Full-Stack Developer · AI-Powered Products
                  </p>
                </div>
              </div>

              <p className="max-w-sm text-xs leading-relaxed text-ink-secondary">
                Crafting resilient web applications, AI-integrated workflows, and
                responsive cross-platform software. BS Software Engineering at Air
                University Islamabad.
              </p>

              {/* Live Status Beacon */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-telemetry">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Full-Time Roles &amp; AI Builds</span>
              </div>
            </div>

            {/* Col 2 (2 cols): Pages Sitemap */}
            <div className="lg:col-span-2 space-y-3">
              <div className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                Pages
              </div>
              <ul className="space-y-2 text-xs font-mono text-ink-secondary">
                <li>
                  <Link href="/" className="hover:text-signal transition-colors">
                    01 · Overview
                  </Link>
                </li>
                <li>
                  <Link href="/work" className="hover:text-signal transition-colors">
                    02 · Selected Work
                  </Link>
                </li>
                <li>
                  <Link
                    href="/field-notes"
                    className="hover:text-signal transition-colors"
                  >
                    03 · Events &amp; Hackathons
                  </Link>
                </li>
                <li>
                  <Link href="/stack" className="hover:text-signal transition-colors">
                    04 · Capabilities
                  </Link>
                </li>
                <li>
                  <Link href="/journey" className="hover:text-signal transition-colors">
                    05 · Journey
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-signal transition-colors">
                    06 · Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3 (3 cols): Dedicated Case Study Pages */}
            <div className="lg:col-span-3 space-y-3">
              <div className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                Case Studies
              </div>
              <ul className="space-y-2 text-xs font-mono text-ink-secondary">
                <li>
                  <Link
                    href="/work/sentinel-chitral"
                    className="hover:text-signal transition-colors flex items-center justify-between"
                  >
                    <span>Sentinel Chitral</span>
                    <span className="text-[10px] text-ink-muted">AI Hazard Alerts →</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work/gridpulse"
                    className="hover:text-signal transition-colors flex items-center justify-between"
                  >
                    <span>GridPulse</span>
                    <span className="text-[10px] text-ink-muted">Energy Control →</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work/uniselection"
                    className="hover:text-signal transition-colors flex items-center justify-between"
                  >
                    <span>UniSelection v2.0</span>
                    <span className="text-[10px] text-ink-muted">Flutter &amp; Sync →</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work/edge-iiotset-pp-psfe"
                    className="hover:text-signal transition-colors flex items-center justify-between"
                  >
                    <span>Edge-IIoTset PP-PSFE</span>
                    <span className="text-[10px] text-ink-muted">ML Security →</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work/taskflow"
                    className="hover:text-signal transition-colors flex items-center justify-between"
                  >
                    <span>TaskFlow</span>
                    <span className="text-[10px] text-ink-muted">Laravel 12 API →</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work/fullstack-crm-lab"
                    className="hover:text-signal transition-colors flex items-center justify-between"
                  >
                    <span>CRM &amp; Web Suite</span>
                    <span className="text-[10px] text-ink-muted">React &amp; TS →</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4 (2 cols): Direct Channels */}
            <div className="lg:col-span-2 space-y-3">
              <div className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                Channels
              </div>
              <ul className="space-y-2 text-xs font-mono text-ink-secondary">
                <li>
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-signal transition-colors flex items-center gap-1.5"
                  >
                    <GitHubMark className="h-3.5 w-3.5 text-signal" />
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="hover:text-signal transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="h-3.5 w-3.5 text-signal" />
                    <span>Direct Mail</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/sitemap.xml"
                    className="hover:text-signal transition-colors block pt-1 text-[11px] text-ink-muted"
                  >
                    XML Sitemap
                  </a>
                </li>
                <li>
                  <span className="text-ink-muted text-[11px] block pt-1">
                    Air University, Islamabad
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Sub-Colophon */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 font-mono text-[11px] text-ink-muted">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-ink font-medium">© 2026 Hamdan Ali</span>
              <span>·</span>
              <span>Full-Stack Developer &amp; AI Product Builder</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-[10px] text-ink-muted">
                Ctrl + K / ⌘K Command Menu
              </span>
              <Magnetic strength={0.2}>
                <button
                  type="button"
                  onClick={scrollToTop}
                  aria-label="Back to top"
                  className="inline-flex min-h-9 items-center gap-2 rounded-full border border-hairline bg-surface-1 px-4 py-1.5 text-ink-secondary transition-colors duration-200 hover:border-signal hover:text-ink cursor-pointer"
                >
                  <span>BACK TO TOP</span>
                  <ArrowUp className="h-3.5 w-3.5 text-signal" />
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
