export interface EventImage {
  src: string;
  alt: string;
  /** Optional intrinsic dimensions (defaults to 1200x800 when omitted) */
  width?: number;
  height?: number;
}

export interface PortfolioEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  role: string;
  description: string;
  tags: string[];
  featured: boolean;
  images: EventImage[];
}

/* ============================================================================
 * CHAPTER 03: TECH EVENTS, WEBINARS & HACKATHONS
 *
 * This section is reserved exclusively for tech-related events, technical
 * webinars, developer hackathons, and conference appearances.
 *
 * READY-TO-COPY TEMPLATE:
 * When you participate in or speak at a tech event/hackathon:
 * 1. Drop your event photo(s) into `/public/events/` (e.g., `/public/events/hackathon-2026.jpg`).
 * 2. Copy the template block below into `EVENTS` and fill in your details.
 * 3. Set `featured: true` on up to 5 events to feature them in the "Top 5 Highlights" strip.
 *
 * Example:
 * {
 *   id: "national-ai-hackathon-2026",
 *   title: "National AI & Cloud Hackathon 2026",
 *   date: "Nov 2026",
 *   location: "Islamabad, Pakistan",
 *   role: "Full-Stack & AI Builder / Finalist",
 *   description: "Built and demonstrated an offline-first disaster early warning dispatch pipeline in 36 hours.",
 *   tags: ["Hackathons", "AI & Web"],
 *   featured: true,
 *   images: [
 *     {
 *       src: "/events/hackathon-2026.jpg",
 *       alt: "Hamdan Ali presenting at the National AI & Cloud Hackathon demo day",
 *       width: 1200,
 *       height: 800,
 *     },
 *   ],
 * },
 * ============================================================================ */

export const EVENTS: PortfolioEvent[] = [];
