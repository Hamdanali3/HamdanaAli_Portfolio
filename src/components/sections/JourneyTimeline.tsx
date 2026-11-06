import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Layers, MapPin } from "lucide-react";
import { JOURNEY } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { RevealText } from "@/components/ui/RevealText";

export function JourneyTimeline({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section
      id="journey"
      aria-labelledby={hideHeader ? undefined : "journey-heading"}
      aria-label={hideHeader ? "Engineering Journey and Education Timeline" : undefined}
      className="relative border-b border-hairline bg-surface-1/25 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1340px] px-4 sm:px-8">
        {/* Header */}
        {!hideHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-hairline pb-8 mb-14">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/10 px-3.5 py-1 text-xs font-mono font-medium text-signal shadow-sm backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                <span>CHAPTER 05 · ENGINEERING JOURNEY &amp; MILESTONES</span>
              </div>
              <h2
                id="journey-heading"
                className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-[-0.035em] leading-[1.04] text-ink"
              >
                <RevealText text="Consistent" as="span" />{" "}
                <span className="font-serif italic font-normal text-signal">
                  shipping
                </span>{" "}
                <RevealText text="& steady growth." as="span" delay={0.05} />
              </h2>
            </div>
            <div className="max-w-md space-y-2">
              <p className="text-sm leading-relaxed text-ink-secondary">
                From undergraduate software engineering at Air University Islamabad to full-stack
                internship builds at HindukushSoft Technologies and live regional products.
              </p>
              <Link
                href="/journey"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-signal hover:underline underline-offset-4"
              >
                <span>Open Dedicated Journey Page (/journey)</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Timeline Spine + Cards */}
        <div className="relative pl-6 sm:pl-12">
          <div
            aria-hidden="true"
            className="absolute left-[9px] sm:left-[19px] top-2 bottom-2 w-[2px] bg-signal/60"
          />

          <div className="space-y-8">
            {JOURNEY.map((item) => (
              <div key={item.title} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[22px] sm:-left-[36px] top-6 flex h-4 w-4 items-center justify-center rounded-full border-2 border-signal bg-canvas"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                </span>

                <SpotlightCard showFiducials className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-4 space-y-2">
                      <span className="inline-block rounded-md bg-signal-fill px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                        {item.period}
                      </span>
                      <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted">
                        {item.tag}
                      </div>
                      <div className="text-sm font-bold text-ink">
                        {item.organization}
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-ink-muted">
                        <MapPin className="h-3 w-3 text-signal" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
                          {item.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2">
                          {item.internalRoute && (
                            <Link
                              href={item.internalRoute}
                              data-cursor-label="CASE STUDY ↗"
                              className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-surface-2 border border-strong px-4 py-2 font-mono text-[11px] font-semibold text-ink hover:border-signal hover:text-signal transition-colors duration-200"
                            >
                              <Layers className="h-3 w-3 text-signal" />
                              <span>{item.internalRouteLabel ?? "Case Study"}</span>
                            </Link>
                          )}
                          {item.linkUrl && (
                            <a
                              href={item.linkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-cursor-label="OPEN ↗"
                              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-hairline bg-canvas px-4 py-2 font-mono text-[11px] font-medium text-ink hover:border-signal hover:text-signal transition-colors duration-200"
                            >
                              <span>{item.linkLabel}</span>
                              <ArrowUpRight className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="text-sm leading-[1.7] text-ink-secondary">
                        {item.description}
                      </p>

                      <ul className="space-y-2 pt-1">
                        {item.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-secondary"
                          >
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-telemetry" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
