"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Expand,
  MapPin,
  Sparkles,
  UserCheck,
  X,
} from "lucide-react";
import { EVENTS, type PortfolioEvent } from "@/content/events";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { RevealText } from "@/components/ui/RevealText";
import { bindDialogDismissHandlers, closeDialogSmoothly, cn } from "@/lib/utils";

interface GallerySlide {
  key: string;
  eventId: string;
  eventTitle: string;
  date: string;
  location: string;
  role: string;
  description: string;
  tags: string[];
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function FieldNotesGallery({
  events = EVENTS,
  hideHeader = false,
}: {
  events?: PortfolioEvent[];
  hideHeader?: boolean;
}) {
  const [activeTag, setActiveTag] = useState<string>("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Strict Top 5 Highlights strip: ONLY featured items, capped at 5
  const topHighlights = useMemo(
    () => events.filter((item) => item.featured).slice(0, 5),
    [events]
  );

  // Unique tag list derived from data file
  const allTags = useMemo(() => {
    const set = new Set<string>();
    for (const ev of events) {
      for (const tag of ev.tags) {
        set.add(tag);
      }
    }
    return ["All", ...Array.from(set)];
  }, [events]);

  // Flatten all event images into filterable gallery slides
  const allSlides = useMemo<GallerySlide[]>(() => {
    const list: GallerySlide[] = [];
    for (const ev of events) {
      ev.images.forEach((img, idx) => {
        list.push({
          key: `${ev.id}-${idx}`,
          eventId: ev.id,
          eventTitle: ev.title,
          date: ev.date,
          location: ev.location,
          role: ev.role,
          description: ev.description,
          tags: ev.tags,
          src: img.src,
          alt: img.alt,
          width: img.width ?? 1200,
          height: img.height ?? 800,
        });
      });
    }
    return list;
  }, [events]);

  const filteredSlides = useMemo(() => {
    if (activeTag === "All") return allSlides;
    return allSlides.filter((slide) => slide.tags.includes(activeTag));
  }, [allSlides, activeTag]);

  const activeSlidesList = filteredSlides.length > 0 ? filteredSlides : allSlides;

  const openLightboxByEvent = useCallback(
    (eventId: string) => {
      const idxInFiltered = filteredSlides.findIndex((s) => s.eventId === eventId);
      if (idxInFiltered >= 0) {
        setLightboxIdx(idxInFiltered);
      } else {
        setActiveTag("All");
        const idxInAll = allSlides.findIndex((s) => s.eventId === eventId);
        if (idxInAll >= 0) setLightboxIdx(idxInAll);
      }
    },
    [allSlides, filteredSlides]
  );

  const closeLightbox = useCallback(() => {
    void closeDialogSmoothly(dialogRef.current, () => {
      setLightboxIdx(null);
    });
  }, []);

  const stepSlide = useCallback(
    (delta: number) => {
      setLightboxIdx((prev) => {
        if (prev === null || activeSlidesList.length === 0) return prev;
        return (prev + delta + activeSlidesList.length) % activeSlidesList.length;
      });
    },
    [activeSlidesList.length]
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (lightboxIdx !== null) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      void closeDialogSmoothly(dialog);
    }
  }, [lightboxIdx]);

  useEffect(() => {
    return bindDialogDismissHandlers(dialogRef.current, () => {
      setLightboxIdx(null);
    });
  }, []);

  const handleDialogKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      stepSlide(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      stepSlide(-1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (!t) return;
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartRef.current;
    const end = e.changedTouches[0];
    touchStartRef.current = null;
    if (!start || !end) return;

    const dx = end.clientX - start.x;
    const dy = end.clientY - start.y;
    if (Math.abs(dx) >= 44 && Math.abs(dx) > Math.abs(dy)) {
      stepSlide(dx < 0 ? 1 : -1);
    }
  };

  // Graceful empty state when /content/events.ts is empty
  if (events.length === 0) {
    return (
      <section
        id="field-notes"
        aria-labelledby={hideHeader ? undefined : "field-notes-heading"}
        aria-label={hideHeader ? "Tech Events, Webinars & Hackathons" : undefined}
        className="relative border-b border-hairline bg-surface-1/25 py-16 sm:py-24"
      >
        <div className="mx-auto max-w-[1340px] px-4 sm:px-8 space-y-10">
          {!hideHeader && (
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-hairline pb-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/10 px-3.5 py-1 text-xs font-mono font-medium text-signal shadow-sm backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                  <span>CHAPTER 03 · TECH EVENTS, WEBINARS &amp; HACKATHONS</span>
                </div>
                <h2
                  id="field-notes-heading"
                  className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-[-0.035em] leading-[1.04] text-ink"
                >
                  <RevealText text="Tech events, webinars &" as="span" />{" "}
                  <span className="font-serif italic font-normal text-signal">
                    hackathons
                  </span>
                  .
                </h2>
              </div>

              <div className="max-w-md space-y-2">
                <p className="text-sm leading-relaxed text-ink-secondary">
                  Key milestones, presentation takeaways, and photography from developer
                  hackathons, technical webinars, and tech conferences. Driven from{" "}
                  <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-ink">
                    /content/events.ts
                  </code>
                  .
                </p>
                <Link
                  href="/field-notes"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-signal hover:underline underline-offset-4"
                >
                  <span>Open Dedicated Events Page (/field-notes)</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-dashed border-hairline bg-surface-1/40 p-10 sm:p-14 text-center backdrop-blur-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-signal/30 bg-signal/10 text-signal mb-4">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-ink">
              Events Archive in Curation
            </h3>
            <p className="mt-2.5 max-w-lg mx-auto text-xs sm:text-sm text-ink-secondary leading-relaxed">
              No tech events, webinars, or hackathons have been uploaded yet. Once Hamdan
              publishes photos and details from tech events, webinars, and hackathons, they will
              be showcased here with full interactive lightboxes.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full bg-signal-fill px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.02]"
              >
                <span>Browse Shipped Work (/work)</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-2 px-5 py-2.5 text-xs font-semibold text-ink transition-colors duration-200 hover:border-strong"
              >
                <span>Get in Touch (/contact)</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentSlide =
    lightboxIdx !== null ? activeSlidesList[lightboxIdx] ?? null : null;

  return (
    <section
      id="field-notes"
      aria-labelledby={hideHeader ? undefined : "field-notes-heading"}
      aria-label={hideHeader ? "Tech Events, Webinars & Hackathons" : undefined}
      className="relative border-b border-hairline bg-surface-1/25 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1340px] px-4 sm:px-8 space-y-14">
        {/* Section Editorial Header */}
        {!hideHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-hairline pb-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/10 px-3.5 py-1 text-xs font-mono font-medium text-signal shadow-sm backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                <span>CHAPTER 03 · TECH EVENTS, WEBINARS &amp; HACKATHONS</span>
              </div>
              <h2
                id="field-notes-heading"
                className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-[-0.035em] leading-[1.04] text-ink"
              >
                <RevealText text="Tech events, webinars &" as="span" />{" "}
                <span className="font-serif italic font-normal text-signal">
                  hackathons
                </span>
                .
              </h2>
            </div>

            <div className="max-w-md space-y-2">
              <p className="text-sm leading-relaxed text-ink-secondary">
                Key milestones, presentation takeaways, and photography from developer
                hackathons, technical webinars, and tech conferences. Driven from{" "}
                <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-ink">
                  /content/events.ts
                </code>
                .
              </p>
              <Link
                href="/field-notes"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-signal hover:underline underline-offset-4"
              >
                <span>Open Dedicated Events Page (/field-notes)</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* PART 1: Top 5 Highlights Strip (Shows ONLY featured: true events) */}
        {topHighlights.length > 0 && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ink">
                <Sparkles className="h-4 w-4 text-signal" />
                <span>TOP {topHighlights.length} HIGHLIGHTS · FEATURED EVENTS</span>
              </div>
              <span className="font-mono text-[11px] text-ink-muted">
                Click any highlight to inspect in lightbox
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
              {topHighlights.map((ev, index) => {
                const cover = ev.images[0];
                const isWide = index < 2;

                return (
                  <SpotlightCard
                    key={ev.id}
                    className={cn(
                      "overflow-hidden flex flex-col justify-between p-0",
                      isWide ? "lg:col-span-3" : "lg:col-span-2"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => openLightboxByEvent(ev.id)}
                      data-cursor-label="VIEW PHOTO"
                      className="group flex h-full w-full flex-col text-left cursor-pointer focus:outline-none"
                    >
                      {cover && (
                        <div
                          className={cn(
                            "relative w-full overflow-hidden border-b border-hairline bg-surface-2",
                            isWide ? "aspect-[16/10]" : "aspect-[16/11]"
                          )}
                        >
                          <Image
                            src={cover.src}
                            alt={cover.alt}
                            width={cover.width ?? 1200}
                            height={cover.height ?? 800}
                            loading={index < 2 ? "eager" : "lazy"}
                            sizes={
                              isWide
                                ? "(max-width: 768px) 92vw, (max-width: 1200px) 48vw, 630px"
                                : "(max-width: 768px) 92vw, (max-width: 1200px) 48vw, 415px"
                            }
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                          <div className="absolute top-3 left-3 flex items-center gap-2">
                            <span className="rounded-full bg-black/70 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                              0{index + 1} · HIGHLIGHT
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 space-y-4">
                        <div className="space-y-2.5">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-ink-muted">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-signal" />
                              {ev.date}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1 text-ink">
                              <UserCheck className="h-3 w-3 text-telemetry" />
                              {ev.role}
                            </span>
                          </div>

                          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-ink group-hover:text-signal transition-colors duration-200">
                            {ev.title}
                          </h3>

                          <p className="text-xs sm:text-sm leading-relaxed text-ink-secondary line-clamp-2">
                            {ev.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-2 border-t border-hairline pt-3 font-mono text-[11px] text-ink-muted">
                          <span className="inline-flex items-center gap-1 truncate">
                            <MapPin className="h-3 w-3 shrink-0 text-signal" />
                            <span className="truncate">{ev.location}</span>
                          </span>
                          <span className="inline-flex items-center gap-1 font-semibold text-ink shrink-0">
                            <span>Inspect</span>
                            <Expand className="h-3 w-3 text-signal" />
                          </span>
                        </div>
                      </div>
                    </button>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        )}

        {/* PART 2: Filterable Masonry Gallery + Lightbox */}
        <div className="space-y-6 pt-4 border-t border-hairline">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold tracking-tight text-ink">
                Event Photo Archive
              </h3>
              <p className="text-xs text-ink-muted mt-0.5">
                Filter by event tag or open any frame in the keyboard &amp; swipe lightbox.
              </p>
            </div>

            <div
              role="group"
              aria-label="Filter event gallery by tag"
              className="flex flex-wrap gap-1.5 rounded-2xl border border-hairline bg-surface-1 p-1.5"
            >
              {allTags.map((tag) => {
                const active = activeTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveTag(tag)}
                    className={cn(
                      "relative min-h-11 rounded-xl px-3.5 py-2 font-mono text-[11px] transition-colors duration-200 cursor-pointer",
                      active
                        ? "bg-signal-fill text-white font-semibold"
                        : "text-ink-secondary hover:text-ink"
                    )}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Responsive Masonry Columns */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {filteredSlides.map((slide, idx) => (
              <figure
                key={slide.key}
                className="break-inside-avoid overflow-hidden rounded-2xl border border-hairline bg-surface-1"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIdx(idx)}
                  aria-label={`Open ${slide.eventTitle} photo in lightbox`}
                  data-cursor-label="LIGHTBOX"
                  className="group relative block w-full text-left cursor-pointer focus:outline-none"
                >
                  <div className="relative w-full overflow-hidden bg-surface-2">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      width={slide.width}
                      height={slide.height}
                      loading="lazy"
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 415px"
                      className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.025]"
                    />
                  </div>
                  <figcaption className="p-4 space-y-1.5 border-t border-hairline">
                    <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                      <span>{slide.role}</span>
                      <span>{slide.date}</span>
                    </div>
                    <div className="text-sm font-bold text-ink group-hover:text-signal transition-colors duration-200">
                      {slide.eventTitle}
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {slide.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-hairline bg-canvas px-2 py-0.5 font-mono text-[10px] text-ink-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </figcaption>
                </button>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* Native Top-Layer Accessible & Touch-Swipe Lightbox */}
      <dialog
        ref={dialogRef}
        {...({ closedby: "any" } as Record<string, string>)}
        aria-labelledby="field-notes-lightbox-title"
        onKeyDown={handleDialogKeyDown}
        className="portfolio-dialog m-auto w-[min(95vw,1040px)] max-h-[90vh] rounded-3xl border border-strong bg-surface-1 p-0 text-ink shadow-2xl overflow-hidden"
      >
        {currentSlide && (
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex flex-col max-h-[90vh] touch-pan-y"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-3 border-b border-hairline bg-surface-1/95 px-4 sm:px-6 py-3.5">
              <div className="min-w-0">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal tabular-nums">
                  FRAME {String((lightboxIdx ?? 0) + 1).padStart(2, "0")} /{" "}
                  {String(activeSlidesList.length).padStart(2, "0")} · {currentSlide.role}
                </div>
                <h3
                  id="field-notes-lightbox-title"
                  className="truncate text-sm sm:text-base font-bold text-ink"
                >
                  {currentSlide.eventTitle}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => stepSlide(-1)}
                  aria-label="Previous photo"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-hairline bg-surface-2 text-ink hover:border-signal hover:text-signal transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => stepSlide(1)}
                  aria-label="Next photo"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-hairline bg-surface-2 text-ink hover:border-signal hover:text-signal transition-colors cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close lightbox"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-hairline bg-surface-2 text-ink hover:border-signal hover:text-signal transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Image Stage */}
            <div className="relative flex-1 overflow-y-auto bg-canvas p-4 sm:p-6 flex items-center justify-center">
              <Image
                src={currentSlide.src}
                alt={currentSlide.alt}
                width={currentSlide.width}
                height={currentSlide.height}
                sizes="(max-width: 1080px) 92vw, 960px"
                className="max-h-[60vh] w-auto rounded-xl object-contain border border-hairline"
              />
            </div>

            {/* Caption Footer */}
            <div className="border-t border-hairline bg-surface-1 px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm text-ink-secondary">
                  {currentSlide.description}
                </p>
                <div className="font-mono text-[11px] text-ink-muted">
                  {currentSlide.date} · {currentSlide.location}
                </div>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted shrink-0">
                ← → KEYS OR SWIPE · ESC CLOSE
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
