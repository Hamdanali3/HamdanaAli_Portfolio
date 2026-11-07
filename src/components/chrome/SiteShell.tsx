"use client";

import React, { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import {
  NavbarDock,
  type ActiveRouteId,
  type ThemeChoice,
} from "@/components/chrome/NavbarDock";
import { ScrollProgressAndSpine } from "@/components/chrome/ScrollProgressAndSpine";
import { CustomCursor } from "@/components/chrome/CustomCursor";

const CommandPalette = dynamic(
  () =>
    import("@/components/chrome/CommandPalette").then(
      (mod) => mod.CommandPalette
    ),
  { ssr: false }
);

const themeListeners = new Set<() => void>();

function subscribeTheme(listener: () => void) {
  themeListeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === "color-scheme") {
      const meta = document.querySelector<HTMLMetaElement>(
        'meta[name="color-scheme"]'
      );
      if (meta) {
        meta.content =
          e.newValue === "dark" || e.newValue === "light"
            ? e.newValue
            : "light dark";
      }
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    themeListeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getThemeSnapshot(): ThemeChoice {
  try {
    const val = localStorage.getItem("color-scheme");
    if (val === "dark" || val === "light") return val;
  } catch {
    // Ignore restricted storage
  }
  return "system";
}

function getThemeServerSnapshot(): ThemeChoice {
  return "system";
}

export function SiteShell({
  activeRoute = "/",
  showSpine = false,
  children,
}: {
  activeRoute?: ActiveRouteId;
  showSpine?: boolean;
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState("overview");
  const [commandOpen, setCommandOpen] = useState(false);

  const hasEventsSection = true;

  const themeChoice = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const handleSelectTheme = useCallback((choice: ThemeChoice) => {
    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="color-scheme"]'
    );
    if (meta) {
      meta.content = choice === "system" ? "light dark" : choice;
    }
    try {
      if (choice === "system") {
        localStorage.removeItem("color-scheme");
      } else {
        localStorage.setItem("color-scheme", choice);
      }
    } catch {
      // Ensure theme still applies even if localStorage throws
    }
    themeListeners.forEach((l) => l());
  }, []);

  // Global Cmd+K / Ctrl+K + custom event trigger (`portfolio:open-command`)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    const onCustomOpen = () => setCommandOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("portfolio:open-command", onCustomOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("portfolio:open-command", onCustomOpen);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollProgressAndSpine
        hasEventsSection={hasEventsSection}
        showSpine={showSpine}
        onSectionChange={setActiveSection}
      />

      <NavbarDock
        activeSection={activeSection}
        activeRoute={activeRoute}
        hasEventsSection={hasEventsSection}
        onOpenCommandPalette={() => setCommandOpen(true)}
        themeChoice={themeChoice}
        onSelectTheme={handleSelectTheme}
      />

      {children}

      {commandOpen && (
        <CommandPalette
          open={commandOpen}
          hasEventsSection={hasEventsSection}
          onClose={() => setCommandOpen(false)}
          onSelectTheme={handleSelectTheme}
        />
      )}
    </>
  );
}
