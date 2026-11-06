"use client";

import React, { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { CustomCursor } from "@/components/chrome/CustomCursor";
import { ScrollProgressAndSpine } from "@/components/chrome/ScrollProgressAndSpine";
import { NavbarDock, type ThemeChoice } from "@/components/chrome/NavbarDock";
import { CommandPalette } from "@/components/chrome/CommandPalette";
import { HeroSection } from "@/components/hero/HeroSection";
import { VelocityMarquee } from "@/components/sections/VelocityMarquee";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { FieldNotesGallery } from "@/components/sections/FieldNotesGallery";
import { ResearchSpotlight } from "@/components/sections/ResearchSpotlight";
import { ArchitectureBento } from "@/components/sections/ArchitectureBento";
import { JourneyTimeline } from "@/components/sections/JourneyTimeline";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { CaseStudyDialog } from "@/components/sections/CaseStudyDialog";
import { EVENTS } from "@/content/events";
import type { PortfolioProject } from "@/data/portfolio";
import { runViewTransition } from "@/lib/utils";

/**
 * FEATURE FLAG — Preserved IEEE ML Security Section:
 * Currently demoted to a project card ("Edge-IIoTset & PP-PSFE: ML security study")
 * inside Selected Work. Flip `ENABLE_RESEARCH_SPOTLIGHT` to `true` in the future
 * when ready to restore a standalone multi-study research section.
 */
const ENABLE_RESEARCH_SPOTLIGHT = false;

const themeListeners = new Set<() => void>();

function subscribeTheme(listener: () => void) {
  themeListeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === "color-scheme") {
      const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
      if (meta) {
        meta.content =
          e.newValue === "dark" || e.newValue === "light" ? e.newValue : "light dark";
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

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [commandOpen, setCommandOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [transitionProjectId, setTransitionProjectId] = useState<string | null>(null);

  const hasEventsSection = EVENTS.length > 0;

  const themeChoice = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const handleSelectTheme = useCallback((choice: ThemeChoice) => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
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
      // Ensure theme still applies to page even if localStorage throws
    }
    themeListeners.forEach((l) => l());
  }, []);

  // Global Cmd+K / Ctrl+K shortcut for Command Palette
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleOpenProject = useCallback((project: PortfolioProject) => {
    setTransitionProjectId(project.id);
    requestAnimationFrame(() => {
      runViewTransition(() => {
        setSelectedProject(project);
      }, "#case-study-heading");
    });
  }, []);

  const handleCloseProject = useCallback(() => {
    setSelectedProject(null);
    setTransitionProjectId(null);
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollProgressAndSpine
        hasEventsSection={hasEventsSection}
        onSectionChange={setActiveSection}
      />

      <NavbarDock
        activeSection={activeSection}
        hasEventsSection={hasEventsSection}
        onOpenCommandPalette={() => setCommandOpen(true)}
        themeChoice={themeChoice}
        onSelectTheme={handleSelectTheme}
      />

      <main id="main-content" className="flex-1">
        <HeroSection
          onOpenCommandPalette={() => setCommandOpen(true)}
          hasEventsSection={hasEventsSection}
        />
        <VelocityMarquee />
        <WorkShowcase
          activeTransitionProjectId={transitionProjectId}
          onOpenProject={handleOpenProject}
        />
        <FieldNotesGallery events={EVENTS} />
        {ENABLE_RESEARCH_SPOTLIGHT && <ResearchSpotlight />}
        <ArchitectureBento onOpenProject={handleOpenProject} />
        <JourneyTimeline />
      </main>

      <ContactFooter />

      <CaseStudyDialog project={selectedProject} onClose={handleCloseProject} />

      <CommandPalette
        open={commandOpen}
        hasEventsSection={hasEventsSection}
        onClose={() => setCommandOpen(false)}
        onSelectProject={handleOpenProject}
        onSelectTheme={handleSelectTheme}
      />
    </>
  );
}
