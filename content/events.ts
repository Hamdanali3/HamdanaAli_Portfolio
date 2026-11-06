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
 * 2. Copy the block below into `EVENTS` and fill in your event details.
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
    id: "sentinel-chitral-launch",
    title: "Sentinel Chitral Early-Warning Platform Launch",
    date: "2026",
    location: "Chitral & Islamabad, Pakistan",
    role: "Creator & Full-Stack Developer",
    description:
      "Shipped regional GLOF, landslide, and severe weather push alerts across eight Hindu Kush valleys with MapLibre GL, batched 500-token FCM multicast, and a Groq safety assistant.",
    tags: ["Shipped", "AI Products"],
    featured: true,
    images: [
      {
        src: "/events/placeholder-01.jpg",
        alt: "Sentinel Chitral early-warning platform telemetry card showing 8 valleys monitored and HTTP 503 fail-safe contract",
        width: 1200,
        height: 800,
      },
      {
        src: "/events/placeholder-06.jpg",
        alt: "TaskFlow dual-surface Laravel 12 and PHP 8.3 Sanctum REST API engineering summary card",
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    id: "uniselection-release-gates",
    title: "UniSelection v2.0 Release & SHA-256 Sync Verification",
    date: "2026",
    location: "Air University · Islamabad",
    role: "Lead Mobile & Python Developer",
    description:
      "Cleared 8/8 Phase 2 release gates with 40/40 passing Flutter widget/unit tests, 10/10 Pytest sync checks, and cryptographic SHA-256 dataset parity across 284 accredited institutions.",
    tags: ["Shipped", "University"],
    featured: true,
    images: [
      {
        src: "/events/placeholder-02.jpg",
        alt: "UniSelection v2.0 release verification summary showing 284 institutions and 40/40 passing Flutter tests",
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    id: "hindukushsoft-gridpulse-capstone",
    title: "GridPulse Week 8 Capstone Review: HindukushSoft",
    date: "2026",
    location: "Chitral / Remote, Pakistan",
    role: "Full-Stack Developer Intern",
    description:
      "Presented the browser-based renewable fleet control room modeling Chitral's 108 MW Golen Gol and 69 MW Lawi hydro plants, solar/wind sites, Kanban work orders, and PulseBot AI.",
    tags: ["Internship", "Shipped"],
    featured: true,
    images: [
      {
        src: "/events/placeholder-03.jpg",
        alt: "GridPulse renewable fleet control room capstone review card showing 177+ MW telemetry and 30 backend tests",
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    id: "edge-iiotset-pp-psfe-study",
    title: "Edge-IIoTset & PP-PSFE Full-Stack ML Security Study",
    date: "Oct 2026",
    location: "FCAI · Air University Islamabad",
    role: "Author & Full-Stack Builder",
    description:
      "Audited 157,800 IoT network flows, engineered 24 privacy-preserving protocol-header descriptors, and deployed the 96.49%-accurate XGBoost pipeline via Flask REST API and Angular 22.",
    tags: ["AI Products", "Demos & Talks"],
    featured: true,
    images: [
      {
        src: "/events/placeholder-04.jpg",
        alt: "Edge-IIoTset and PP-PSFE security study summary card showing 96.49% accuracy and 3.54 ms per 1,000 flows",
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    id: "air-university-crm-showcase",
    title: "BS Software Engineering Full-Stack & CRM Showcase",
    date: "2026",
    location: "Islamabad, Pakistan",
    role: "BSSE Undergraduate Builder",
    description:
      "Demonstrated the custom React & TypeScript Customer Relationship Management (CRM) term application and multi-view pipeline state architecture at Air University.",
    tags: ["University", "Demos & Talks"],
    featured: true,
    images: [
      {
        src: "/events/placeholder-05.jpg",
        alt: "Air University FCAI full-stack web and custom CRM showcase summary card",
        width: 1200,
        height: 800,
      },
    ],
  },
];
