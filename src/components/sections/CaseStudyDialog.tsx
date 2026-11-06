"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Shield,
  X,
} from "lucide-react";
import { GitHubMark } from "@/components/ui/GitHubMark";
import type { PortfolioProject } from "@/data/portfolio";
import {
  bindDialogDismissHandlers,
  closeDialogSmoothly,
  cn,
  runViewTransition,
} from "@/lib/utils";

interface CaseStudyDialogProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export function CaseStudyDialog({ project, onClose }: CaseStudyDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [shotSelection, setShotSelection] = useState<{ projectId: string; idx: number }>({
    projectId: "",
    idx: 0,
  });

  const activeShotIdx =
    project && shotSelection.projectId === project.id ? shotSelection.idx : 0;

  const requestClose = useCallback(() => {
    void closeDialogSmoothly(dialogRef.current, () => {
      runViewTransition(() => {
        onClose();
      }, "#work-heading");
    });
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      if (!dialog.open) {
        dialog.showModal();
      }
      requestAnimationFrame(() => {
        const heading = document.getElementById("case-study-heading");
        heading?.focus({ preventScroll: true });
      });
    } else if (dialog.open) {
      void closeDialogSmoothly(dialog);
    }
  }, [project]);

  useEffect(() => {
    return bindDialogDismissHandlers(dialogRef.current, requestClose);
  }, [requestClose]);

  return (
    <dialog
      ref={dialogRef}
      {...({ closedby: "any" } as Record<string, string>)}
      aria-labelledby="case-study-heading"
      className="portfolio-dialog m-auto w-[min(94vw,980px)] max-h-[88vh] rounded-3xl border border-strong bg-surface-1 p-0 text-ink shadow-2xl overflow-hidden"
    >
      {project && (
        <div className="flex flex-col max-h-[88vh]">
          {/* Sticky Top Bar */}
          <div className="flex items-center justify-between gap-4 border-b border-hairline bg-surface-1/95 px-6 py-3.5 backdrop-blur-md">
            <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted min-w-0">
              <span className="text-signal font-semibold shrink-0">
                CASE {"//"} {project.index}
              </span>
              <span aria-hidden="true">·</span>
              <span className="truncate">{project.category}</span>
            </div>
            <button
              type="button"
              onClick={requestClose}
              aria-label="Close case study dialog"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-hairline bg-surface-2 px-4 py-2 font-mono text-[11px] text-ink-secondary hover:border-strong hover:text-ink cursor-pointer shrink-0"
            >
              <span aria-hidden="true">ESC</span>
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Scrollable Case Study Content */}
          <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
            {/* Hero Title & Links */}
            <div className="space-y-4">
              <span className="inline-block rounded-full border border-strong bg-surface-2 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-signal">
                {project.accentTag}
              </span>

              <h2
                id="case-study-heading"
                tabIndex={-1}
                style={{ viewTransitionName: "case-study-active-title" }}
                className="vt-fit-title text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-ink focus:outline-none"
              >
                {project.title}
              </h2>

              <p className="font-serif italic text-xl text-ink-secondary">
                {project.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-signal-fill px-5 py-2.5 text-xs font-semibold text-white hover:opacity-95"
                  >
                    <span>Launch Live Application</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-strong bg-surface-2 px-5 py-2.5 text-xs font-semibold text-ink hover:border-signal"
                >
                  <GitHubMark className="h-3.5 w-3.5" />
                  <span>Inspect GitHub Repository</span>
                </a>
                {project.paperUrl && (
                  <a
                    href={project.paperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-canvas px-4 py-2.5 text-xs font-medium text-ink-secondary hover:border-strong hover:text-ink"
                  >
                    <FileText className="h-3.5 w-3.5 text-champagne" />
                    <span>Study Manuscript (PDF)</span>
                  </a>
                )}
              </div>
            </div>

            {/* Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-hairline bg-canvas p-4"
                >
                  <div className="font-mono text-xl font-bold text-ink tabular-nums">
                    {m.value}
                  </div>
                  <div className="mt-1 text-xs text-ink-muted">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Problem vs Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-hairline bg-canvas/70 p-6 space-y-2.5">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal">
                  01 {"//"} THE PROBLEM
                </div>
                <p className="text-sm leading-[1.7] text-ink-secondary">
                  {project.problemStatement}
                </p>
              </div>
              <div className="rounded-2xl border border-hairline bg-canvas/70 p-6 space-y-2.5">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-telemetry">
                  02 {"//"} IMPLEMENTATION ARCHITECTURE
                </div>
                <p className="text-sm leading-[1.7] text-ink-secondary">
                  {project.architectureSummary}
                </p>
              </div>
            </div>

            {/* Authentic Repository Screenshots Gallery (when available) */}
            {project.screenshots.length > 0 && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
                    <ImageIcon className="h-3.5 w-3.5 text-signal" />
                    <span>REPOSITORY ARTIFACTS &amp; UI SCREENS</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.screenshots.map((shot, idx) => (
                      <button
                        key={shot.label}
                        type="button"
                        onClick={() =>
                          setShotSelection({ projectId: project.id, idx })
                        }
                        className={cn(
                          "min-h-11 rounded-full border px-3.5 py-2 font-mono text-[10px] transition-colors cursor-pointer",
                          activeShotIdx === idx
                            ? "border-signal-fill bg-signal-fill text-white font-semibold"
                            : "border-hairline bg-canvas text-ink-secondary hover:text-ink"
                        )}
                      >
                        {shot.label}
                      </button>
                    ))}
                  </div>
                </div>

                <figure className="overflow-hidden rounded-2xl border border-hairline bg-canvas">
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.screenshots[activeShotIdx].url}
                      alt={`${project.title} — ${project.screenshots[activeShotIdx].label}`}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <figcaption className="border-t border-hairline px-4 py-3 font-mono text-xs text-ink-secondary">
                    {project.screenshots[activeShotIdx].caption}
                  </figcaption>
                </figure>
              </div>
            )}

            {/* Engineering Decisions & Verification */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
                <Shield className="h-3.5 w-3.5 text-signal" />
                <span>KEY ENGINEERING DECISIONS &amp; VERIFICATION</span>
              </div>
              <ul className="space-y-3">
                {project.engineeringHighlights.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-hairline bg-canvas/55 p-4 text-sm leading-relaxed text-ink-secondary"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-telemetry" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Full Technology Stack */}
            <div className="border-t border-hairline pt-6">
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                TECHNOLOGY STACK
              </div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-hairline bg-surface-2 px-3 py-1 font-mono text-xs text-ink"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
