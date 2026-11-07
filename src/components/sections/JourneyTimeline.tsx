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
      aria-label={hideHeader ? "Engineering Experience and Education" : undefined}
      className="relative border-b border-hairline bg-surface-1/25 py-14 sm:py-20"
    >
      <div className="mx-auto max-w-[1340px] px-4 sm:px-8 space-y-10">
        {/* Header */}
        {!hideHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-hairline pb-7">
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/10 px-3.5 py-1 text-xs font-mono font-medium text-signal shadow-sm backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                <span>CHAPTER 05 · EXPERIENCE &amp; ACADEMIC CREDENTIALS</span>
              </div>
              <h2
                id="journey-heading"
                className="text-[clamp(2rem,4vw,3.35rem)] font-extrabold tracking-[-0.035em] leading-[1.04] text-ink"
              >
                <RevealText text="Proven" as="span" />{" "}
                <span className="font-serif italic font-normal text-signal">
                  internship
                </span>{" "}
                <RevealText text="& production track." as="span" delay={0.05} />
              </h2>
            </div>
            <div className="max-w-sm">
              <p className="text-xs sm:text-sm leading-relaxed text-ink-secondary">
                BS Software Engineering at Air University Islamabad paired with
                hands-on full-stack internship execution at HindukushSoft.
              </p>
            </div>
          </div>
        )}

        {/* 3-Column Visual Career & Credential Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {JOURNEY.map((item, idx) => (
            <SpotlightCard
              key={item.title}
              showFiducials
              className="p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block rounded-md bg-signal-fill px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                    {item.period}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-ink-muted">
                    STEP 0{idx + 1}
                  </span>
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-signal font-semibold">
                    {item.tag}
                  </div>
                  <h3 className="mt-1 text-lg sm:text-xl font-bold tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <div className="mt-0.5 text-xs font-semibold text-ink-secondary">
                    {item.organization}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 font-mono text-[11px] text-ink-muted">
                    <MapPin className="h-3 w-3 text-signal" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-ink-secondary">
                  {item.description}
                </p>

                <ul className="space-y-2 pt-1">
                  {item.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 rounded-xl border border-hairline bg-canvas/75 p-2.5 text-xs text-ink-secondary"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-telemetry" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-2 border-t border-hairline pt-3.5">
                {item.internalRoute && (
                  <Link
                    href={item.internalRoute}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-surface-2 border border-strong px-3.5 py-1.5 font-mono text-[11px] font-semibold text-ink hover:border-signal hover:text-signal transition-colors duration-200"
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
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-hairline bg-canvas px-3.5 py-1.5 font-mono text-[11px] font-medium text-ink hover:border-signal hover:text-signal transition-colors duration-200"
                  >
                    <span>{item.linkLabel}</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
