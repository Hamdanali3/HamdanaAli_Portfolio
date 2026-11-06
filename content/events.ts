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
 * READY-TO-COPY TEMPLATE ENTRY
 * 1. Drop your event photo(s) into `/public/events/` (e.g., `/public/events/devfest-isb-1.jpg`).
 * 2. Copy the block below into `EVENTS`, fill in the fields, and remove placeholder entries.
 * 3. Set `featured: true` on up to 5 events to feature them in the "Top 5 Highlights" strip.
 *    If `EVENTS` is `[]`, the entire Field Notes section hides automatically.
 * ============================================================================
  {
    id: "your-event-slug-2026",
    title: "Event or Hackathon Name",
    date: "Nov 2026",
    location: "Islamabad, Pakistan",
    role: "Builder / Speaker / Finalist",
    description: "One-line note about what you built, presented, or learned at this event.",
    tags: ["Hackathons", "AI & Web"],
    featured: true,
    images: [
      {
        src: "/events/your-photo-1.jpg",
        alt: "Descriptive alt text explaining who and what is shown in the photo",
        width: 1200,
        height: 800,
      },
    ],
  },
 * ============================================================================ */

export const EVENTS: PortfolioEvent[] = [
  {
    id: "placeholder-ai-demo-day",
    title: "[Placeholder] AI & Full-Stack Product Demo Day",
    date: "2026 · Replace Date",
    location: "Air University · Islamabad",
    role: "Lead Full-Stack Builder",
    description:
      "Placeholder highlight — swap with your real hackathon or product demo note and photo in /public/events/.",
    tags: ["Demos & Talks", "AI Products"],
    featured: true,
    images: [
      {
        src: "/events/placeholder-01.jpg",
        alt: "Placeholder frame for AI and full-stack product demo day presentation",
        width: 1200,
        height: 800,
      },
      {
        src: "/events/placeholder-06.jpg",
        alt: "Placeholder frame for team whiteboard and API sprint session",
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    id: "placeholder-uni-expo",
    title: "[Placeholder] Software Engineering Project Showcase",
    date: "2026 · Replace Date",
    location: "FCAI · Air University Islamabad",
    role: "Presenter · BSSE Track",
    description:
      "Placeholder highlight — add photos from semester exhibitions, poster sessions, or live app walkthroughs.",
    tags: ["University", "Demos & Talks"],
    featured: true,
    images: [
      {
        src: "/events/placeholder-02.jpg",
        alt: "Placeholder vertical frame for Air University software engineering showcase",
        width: 960,
        height: 1120,
      },
    ],
  },
  {
    id: "placeholder-hindukushsoft-capstone",
    title: "[Placeholder] GridPulse Capstone Review — HindukushSoft",
    date: "2026 · Replace Date",
    location: "Chitral / Remote, Pakistan",
    role: "Full-Stack Intern",
    description:
      "Placeholder highlight — replace with moments from your 8-week HindukushSoft internship and Week 8 GridPulse review.",
    tags: ["Internship", "Shipped"],
    featured: true,
    images: [
      {
        src: "/events/placeholder-03.jpg",
        alt: "Placeholder frame for GridPulse renewable fleet capstone engineering review",
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    id: "placeholder-sentinel-briefing",
    title: "[Placeholder] Sentinel Chitral Early-Warning Walkthrough",
    date: "2026 · Replace Date",
    location: "Chitral & Islamabad",
    role: "Creator & Full-Stack Developer",
    description:
      "Placeholder highlight — replace with field photos, valley telemetry testing, or community feedback sessions.",
    tags: ["Shipped", "AI Products"],
    featured: true,
    images: [
      {
        src: "/events/placeholder-04.jpg",
        alt: "Placeholder frame for Sentinel Chitral regional hazard alert briefing",
        width: 1200,
        height: 900,
      },
    ],
  },
  {
    id: "placeholder-dev-community",
    title: "[Placeholder] Islamabad Builders & Tech Meetup",
    date: "2026 · Replace Date",
    location: "Islamabad, Pakistan",
    role: "Attendee & Builder",
    description:
      "Placeholder highlight — replace with developer meetups, GDG/AWS/AI community events, or workshops.",
    tags: ["Community", "University"],
    featured: true,
    images: [
      {
        src: "/events/placeholder-05.jpg",
        alt: "Placeholder vertical frame for Islamabad developer community meetup",
        width: 960,
        height: 1080,
      },
    ],
  },
];
