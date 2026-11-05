"use client";

import React, { useState } from "react";
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
  "Software Engineering Role",
  "Full-Stack Web Platform",
  "Applied AI / ML Security",
  "Flutter Mobile System",
] as const;

export function ContactFooter() {
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

  const formattedSubject = `[Portfolio Inquiry] ${topic}${senderName ? ` — ${senderName}` : ""}`;
  const formattedBody = `Hi Hamdan,\n\nTopic: ${topic}\nFrom: ${senderName || "Prospective Collaborator"}\n\n${
    message || "I reviewed your engineering portfolio and would love to connect."
  }\n`;

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      formattedSubject
    )}&body=${encodeURIComponent(formattedBody)}`;
    window.location.href = mailto;
  };

  const copyStructuredBrief = () => {
    navigator.clipboard?.writeText(`To: ${PROFILE.email}\nSubject: ${formattedSubject}\n\n${formattedBody}`);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2200);
  };

  return (
    <footer id="contact" aria-labelledby="contact-heading" className="relative pt-20 sm:pt-28 pb-12">
      <div className="mx-auto max-w-[1340px] px-4 sm:px-8 space-y-16">
        {/* Main Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 6 Columns: Monumental CTA & Direct Channels */}
          <div className="lg:col-span-6 space-y-6">
            <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-signal">
              INDEX // 06 — INITIATE TRANSMISSION
            </div>

            <h2
              id="contact-heading"
              className="text-[clamp(2.1rem,4.5vw,4rem)] font-extrabold tracking-[-0.038em] leading-[1.01] text-ink"
            >
              <RevealText text="Let's build systems" as="span" />{" "}
              <span className="font-serif italic font-normal text-signal">
                worthy
              </span>{" "}
              <RevealText text="of real stakes." as="span" delay={0.1} />
            </h2>

            <p className="max-w-lg text-sm sm:text-base leading-[1.7] text-ink-secondary">
              Whether you&apos;re hiring for a high-ownership Software Engineering role, building
              operational telemetry, or collaborating on applied AI &amp; cybersecurity systems — my
              inbox is open.
            </p>

            {/* Tactile Direct Email Card */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={copyDirectEmail}
                data-cursor-label="COPY EMAIL"
                className="group flex w-full sm:w-auto items-center justify-between gap-6 rounded-2xl border border-strong bg-surface-1 px-5 py-4 text-left transition-all hover:border-signal cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal/15 text-signal">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                      DIRECT ELECTRONIC MAIL
                    </div>
                    <div className="font-mono text-sm sm:text-base font-semibold text-ink">
                      {PROFILE.email}
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface-2 px-3 py-1 font-mono text-[10px] uppercase text-ink-secondary group-hover:text-signal">
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
                  className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-1 px-4 py-2.5 font-mono text-xs text-ink-secondary hover:border-strong hover:text-ink"
                >
                  <GitHubMark className="h-3.5 w-3.5 text-signal" />
                  <span>github.com/Hamdanali3</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>

                <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-1/60 px-4 py-2.5 font-mono text-xs text-telemetry">
                  <span className="h-2 w-2 rounded-full bg-telemetry" />
                  Islamabad, PK (UTC+5)
                </span>
              </div>
            </div>
          </div>

          {/* Right 6 Columns: Structured Dispatch Composer */}
          <div className="lg:col-span-6">
            <SpotlightCard showFiducials className="p-6 sm:p-8">
              <form onSubmit={handleDispatch} className="space-y-5">
                <div className="border-b border-hairline pb-3.5 flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
                    STRUCTURED DISPATCH COMPOSER
                  </span>
                  <span className="font-mono text-[10px] text-ink-muted">
                    ZERO TRACKING · DIRECT MAILTO
                  </span>
                </div>

                {/* Scope Selector */}
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                    01 // INQUIRY SCOPE
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {INQUIRY_TOPICS.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTopic(item)}
                        className={cn(
                          "rounded-full border px-3 py-1.5 font-mono text-[11px] transition-colors cursor-pointer",
                          topic === item
                            ? "border-signal bg-signal text-white font-semibold"
                            : "border-hairline bg-canvas text-ink-secondary hover:text-ink"
                        )}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name Input */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="sender-name"
                    className="block font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted"
                  >
                    02 // YOUR NAME OR ORGANIZATION
                  </label>
                  <input
                    id="sender-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g., Sarah Khan — Engineering Lead"
                    className="w-full rounded-xl border border-hairline bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-signal focus:outline-none"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="inquiry-brief"
                    className="block font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted"
                  >
                    03 // ARCHITECTURAL BRIEF OR ROLE DETAILS
                  </label>
                  <textarea
                    id="inquiry-brief"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about the team, problem space, or timeline..."
                    className="w-full rounded-xl border border-hairline bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-signal focus:outline-none resize-y"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <Magnetic strength={0.18}>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-white shadow-lg cursor-pointer"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Open in Mail Client</span>
                    </button>
                  </Magnetic>

                  <button
                    type="button"
                    onClick={copyStructuredBrief}
                    className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-canvas px-4 py-2.5 font-mono text-[11px] text-ink-secondary hover:text-ink cursor-pointer"
                  >
                    {copiedBrief ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-telemetry" />
                        <span className="text-telemetry">Brief Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Formatted Brief</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </SpotlightCard>
          </div>
        </div>

        {/* Architectural Colophon Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-hairline pt-8 font-mono text-[11px] text-ink-muted">
          <div className="space-y-1">
            <div className="text-ink font-semibold">
              © 2026 HAMDAN ALI · ALL SYSTEMS VERIFIED
            </div>
            <div>
              CRAFTED IN NEXT.JS, TYPESCRIPT, TAILWIND V4 &amp; MOTION ·{" "}
              {PROFILE.primaryCoordinates}
            </div>
          </div>

          <Magnetic strength={0.22}>
            <a
              href="#overview"
              aria-label="Scroll back to top"
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-1 px-4 py-2 text-ink-secondary transition-colors hover:border-signal hover:text-ink"
            >
              <span>TOP</span>
              <ArrowUp className="h-3.5 w-3.5 text-signal" />
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
