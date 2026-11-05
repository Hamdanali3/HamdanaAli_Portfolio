"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { Command, Monitor, Moon, Sun, SlidersHorizontal } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/utils";
import { PROFILE } from "@/data/portfolio";

export type ThemeChoice = "system" | "dark" | "light";

interface NavbarDockProps {
  activeSection: string;
  onOpenCommandPalette: () => void;
  themeChoice: ThemeChoice;
  onSelectTheme: (choice: ThemeChoice) => void;
}

const NAV_ITEMS = [
  { id: "work", label: "Work", count: "06" },
  { id: "research", label: "Research" },
  { id: "architecture", label: "Architecture" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

function subscribeDarkScheme(cb: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getDarkSchemeSnapshot() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getDarkSchemeServerSnapshot() {
  return true;
}

export function NavbarDock({
  activeSection,
  onOpenCommandPalette,
  themeChoice,
  onSelectTheme,
}: NavbarDockProps) {
  const [scrolled, setScrolled] = useState(false);
  const [pktTime, setPktTime] = useState<string>("");
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const systemIsDark = useSyncExternalStore(
    subscribeDarkScheme,
    getDarkSchemeSnapshot,
    getDarkSchemeServerSnapshot
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const formatPkt = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-GB", {
          timeZone: PROFILE.timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date());
        setPktTime(`${formatted} PKT`);
      } catch {
        setPktTime("UTC+5");
      }
    };
    const initTimer = setTimeout(formatPkt, 0);
    const id = setInterval(formatPkt, 1000);
    return () => {
      clearTimeout(initTimer);
      clearInterval(id);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-3 sm:px-8">
      <div
        className={cn(
          "mx-auto flex max-w-[1340px] items-center justify-between rounded-2xl border transition-all duration-300 px-3.5 sm:px-5",
          scrolled
            ? "py-2.5 border-hairline bg-elevated backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.16)]"
            : "py-3.5 border-transparent bg-transparent"
        )}
      >
        {/* Brand Identity + Live Telemetry Status */}
        <div className="flex items-center gap-3.5">
          <Magnetic strength={0.2}>
            <a
              href="#overview"
              className="group flex items-center gap-2.5 focus:outline-none"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-hairline bg-surface-2 font-mono text-xs font-bold tracking-tight text-ink transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-white">
                {PROFILE.monogram}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-[-0.02em] text-ink leading-none">
                  HAMDAN ALI
                </span>
                <span className="mt-1 font-mono text-[10px] tracking-[0.12em] uppercase text-ink-muted leading-none">
                  SYSTEMS ARCHITECT
                </span>
              </div>
            </a>
          </Magnetic>

          <div className="hidden lg:flex items-center gap-2 rounded-full border border-hairline bg-surface-1/80 px-3 py-1 ml-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-telemetry opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-telemetry" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-secondary tabular-nums">
              ISB · {pktTime || "UTC+5"}
            </span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-xs font-medium tracking-[-0.01em] transition-colors",
                  isActive ? "text-ink" : "text-ink-secondary hover:text-ink"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 rounded-full border border-hairline bg-surface-2"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {item.label}
                  {item.count && (
                    <span className="font-mono text-[10px] text-signal tabular-nums">
                      {item.count}
                    </span>
                  )}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Right Controls: Command Palette + Progressive-Disclosure Tri-State Theme */}
        <div className="flex items-center gap-2 relative">
          <Magnetic strength={0.18}>
            <button
              type="button"
              onClick={onOpenCommandPalette}
              aria-label="Open command menu (Ctrl+K or Command+K)"
              className="flex items-center gap-2 rounded-xl border border-hairline bg-surface-1 px-3 py-1.5 text-xs font-medium text-ink-secondary transition-colors hover:border-strong hover:text-ink cursor-pointer"
            >
              <Command className="h-3.5 w-3.5 text-signal" />
              <span className="hidden sm:inline">Command</span>
              <kbd className="rounded border border-hairline bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-ink-muted">
                ⌘K
              </kbd>
            </button>
          </Magnetic>

          {/* Progressive-disclosure appearance surface exposing System / Light / Dark */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setThemeMenuOpen((prev) => !prev)}
              aria-expanded={themeMenuOpen}
              aria-haspopup="dialog"
              aria-label="Appearance settings"
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-hairline bg-surface-1 text-ink-secondary transition-colors hover:border-strong hover:text-ink cursor-pointer"
            >
              {themeChoice === "dark" ? (
                <Moon className="h-3.5 w-3.5" />
              ) : themeChoice === "light" ? (
                <Sun className="h-3.5 w-3.5" />
              ) : (
                <SlidersHorizontal className="h-3.5 w-3.5" />
              )}
            </button>

            {themeMenuOpen && (
              <>
                <div
                  aria-hidden="true"
                  className="fixed inset-0 z-40"
                  onClick={() => setThemeMenuOpen(false)}
                />
                <div
                  role="dialog"
                  aria-label="Color scheme preference"
                  className="absolute right-0 mt-2 z-50 w-56 rounded-2xl border border-hairline bg-surface-1 p-2 shadow-2xl"
                >
                  <p className="px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                    Appearance Scheme
                  </p>
                  {(
                    [
                      {
                        id: "system",
                        label: `System (${systemIsDark ? "Dark" : "Light"})`,
                        icon: Monitor,
                      },
                      { id: "dark", label: "Obsidian Dark", icon: Moon },
                      { id: "light", label: "Archival Paper", icon: Sun },
                    ] as const
                  ).map((opt) => {
                    const Icon = opt.icon;
                    const active = themeChoice === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          onSelectTheme(opt.id);
                          setThemeMenuOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium transition-colors cursor-pointer",
                          active
                            ? "bg-surface-2 text-ink"
                            : "text-ink-secondary hover:bg-surface-2/60 hover:text-ink"
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="h-3.5 w-3.5 text-signal" />
                          {opt.label}
                        </span>
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
