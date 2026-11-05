"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  FolderGit2,
  Globe,
  Layers,
  Monitor,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import { IEEE_RESEARCH, PROFILE, PROJECTS, type PortfolioProject } from "@/data/portfolio";
import { bindDialogDismissHandlers, closeDialogSmoothly, cn } from "@/lib/utils";
import type { ThemeChoice } from "@/components/chrome/NavbarDock";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onSelectProject: (project: PortfolioProject) => void;
  onSelectTheme: (choice: ThemeChoice) => void;
}

type IconKey =
  | "layers"
  | "globe"
  | "copy"
  | "check"
  | "file"
  | "git"
  | "moon"
  | "sun"
  | "monitor";

type ActionKind =
  | { type: "project"; project: PortfolioProject }
  | { type: "url"; url: string }
  | { type: "copy-email" }
  | { type: "theme"; choice: ThemeChoice };

interface CommandAction {
  id: string;
  group: string;
  title: string;
  subtitle: string;
  iconKey: IconKey;
  kind: ActionKind;
}

function CommandIcon({ iconKey }: { iconKey: IconKey }) {
  switch (iconKey) {
    case "layers":
      return <Layers className="h-4 w-4" />;
    case "globe":
      return <Globe className="h-4 w-4" />;
    case "copy":
      return <Copy className="h-4 w-4" />;
    case "check":
      return <Check className="h-4 w-4" />;
    case "file":
      return <FileText className="h-4 w-4" />;
    case "git":
      return <FolderGit2 className="h-4 w-4" />;
    case "moon":
      return <Moon className="h-4 w-4" />;
    case "sun":
      return <Sun className="h-4 w-4" />;
    case "monitor":
      return <Monitor className="h-4 w-4" />;
  }
}

export function CommandPalette({
  open,
  onClose,
  onSelectProject,
  onSelectTheme,
}: CommandPaletteProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const requestClose = useCallback(() => {
    setQuery("");
    setSelectedIndex(0);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (!open && dialog.open) {
      void closeDialogSmoothly(dialog);
    }
  }, [open]);

  useEffect(() => {
    return bindDialogDismissHandlers(dialogRef.current, requestClose);
  }, [requestClose]);

  const actions = useMemo<CommandAction[]>(() => {
    const projectActions: CommandAction[] = PROJECTS.map((p) => ({
      id: `case-${p.id}`,
      group: "Engineering Case Studies",
      title: `${p.index}. ${p.title}`,
      subtitle: p.subtitle,
      iconKey: "layers",
      kind: { type: "project", project: p },
    }));

    const liveDeployments: CommandAction[] = PROJECTS.filter((p) => p.liveUrl).map((p) => ({
      id: `live-${p.id}`,
      group: "Live Cloud Deployments",
      title: `Launch ${p.title} (Live App)`,
      subtitle: p.liveUrl!,
      iconKey: "globe",
      kind: { type: "url", url: p.liveUrl! },
    }));

    const quickNav: CommandAction[] = [
      {
        id: "copy-email",
        group: "Direct Actions",
        title: copiedEmail ? "Copied Hamdanaly651@gmail.com!" : `Copy Email (${PROFILE.email})`,
        subtitle: "Direct inbox for engineering roles & collaborations",
        iconKey: copiedEmail ? "check" : "copy",
        kind: { type: "copy-email" },
      },
      {
        id: "open-ieee-paper",
        group: "Direct Actions",
        title: "Read IEEE PP-PSFE Manuscript (PDF)",
        subtitle: IEEE_RESEARCH.title,
        iconKey: "file",
        kind: { type: "url", url: IEEE_RESEARCH.pdfUrl },
      },
      {
        id: "open-github",
        group: "Direct Actions",
        title: "Open GitHub Profile (@Hamdanali3)",
        subtitle: "Inspect all 8 public repositories & commit history",
        iconKey: "git",
        kind: { type: "url", url: PROFILE.github },
      },
      {
        id: "theme-dark",
        group: "Appearance",
        title: "Switch to Obsidian Dark Mode",
        subtitle: "High-contrast control-room palette",
        iconKey: "moon",
        kind: { type: "theme", choice: "dark" },
      },
      {
        id: "theme-light",
        group: "Appearance",
        title: "Switch to Archival Paper Light Mode",
        subtitle: "Warm Swiss editorial paper palette",
        iconKey: "sun",
        kind: { type: "theme", choice: "light" },
      },
      {
        id: "theme-system",
        group: "Appearance",
        title: "Follow System Color Scheme",
        subtitle: "Sync automatically with OS setting",
        iconKey: "monitor",
        kind: { type: "theme", choice: "system" },
      },
    ];

    return [...quickNav, ...liveDeployments, ...projectActions];
  }, [copiedEmail]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.group.toLowerCase().includes(q)
    );
  }, [actions, query]);

  const executeAction = useCallback(
    (kind: ActionKind) => {
      if (kind.type === "copy-email") {
        navigator.clipboard?.writeText(PROFILE.email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
        return;
      }
      if (kind.type === "url") {
        window.open(kind.url, "_blank", "noopener,noreferrer");
        requestClose();
        return;
      }
      if (kind.type === "theme") {
        onSelectTheme(kind.choice);
        requestClose();
        return;
      }
      if (kind.type === "project") {
        const proj = kind.project;
        requestClose();
        setTimeout(() => onSelectProject(proj), 160);
      }
    },
    [onSelectProject, onSelectTheme, requestClose]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0
      );
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      executeAction(filtered[selectedIndex].kind);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      {...({ closedby: "any" } as Record<string, string>)}
      aria-labelledby="cmd-palette-title"
      onKeyDown={handleKeyDown}
      className="portfolio-dialog m-auto w-[min(92vw,640px)] rounded-2xl border border-strong bg-surface-1 p-0 text-ink shadow-2xl"
    >
      <div className="flex flex-col max-h-[78vh]">
        <h2 id="cmd-palette-title" className="sr-only">
          Command Palette Navigation
        </h2>

        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-hairline px-4 py-3.5">
          <Search className="h-4 w-4 shrink-0 text-signal" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Jump to project, launch live app, read IEEE paper, or switch theme..."
            className="w-full bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={requestClose}
            aria-label="Close command palette"
            className="rounded-lg border border-hairline p-1 text-ink-muted hover:text-ink cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <p className="py-10 text-center font-mono text-xs text-ink-muted">
              No matching commands or repositories for &ldquo;{query}&rdquo;.
            </p>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const prevGroup = idx > 0 ? filtered[idx - 1].group : null;
              return (
                <React.Fragment key={item.id}>
                  {item.group !== prevGroup && (
                    <div className="px-3 pt-2.5 pb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                      {item.group}
                    </div>
                  )}
                  <button
                    type="button"
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => executeAction(item.kind)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors cursor-pointer",
                      isSelected ? "bg-surface-2 text-ink" : "text-ink-secondary hover:bg-surface-2/60"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-hairline",
                          isSelected ? "bg-signal text-white border-signal" : "bg-canvas text-ink-secondary"
                        )}
                      >
                        <CommandIcon iconKey={item.iconKey} />
                      </span>
                      <div className="min-w-0">
                        <div className="truncate text-xs font-semibold text-ink">
                          {item.title}
                        </div>
                        <div className="truncate text-[11px] text-ink-muted">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight
                      className={cn(
                        "h-3.5 w-3.5 shrink-0 transition-transform",
                        isSelected ? "text-signal translate-x-0.5 -translate-y-0.5" : "text-ink-muted/50"
                      )}
                    />
                  </button>
                </React.Fragment>
              );
            })
          )}
        </div>

        {/* Keyboard Legend Footer */}
        <div className="flex items-center justify-between border-t border-hairline bg-canvas/50 px-4 py-2.5 font-mono text-[10px] text-ink-muted">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Execute</span>
            <span>ESC Dismiss</span>
          </div>
          <span>HAMDAN ALI {"//"} CMD</span>
        </div>
      </div>
    </dialog>
  );
}
