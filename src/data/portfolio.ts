export type SimulatorKind =
  | "sentinel"
  | "gridpulse"
  | "edge-iiot"
  | "uniselection"
  | "taskflow"
  | "crm";

export interface ProjectScreenshot {
  label: string;
  caption: string;
  url: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
  fillPercent?: number;
}

export interface PipelineStep {
  step: string;
  title: string;
  tech: string;
}

export interface PortfolioProject {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  featured: boolean;
  simulator?: SimulatorKind;
  liveUrl?: string;
  repoUrl: string;
  paperUrl?: string;
  summary: string;
  problemStatement: string;
  architectureSummary: string;
  engineeringHighlights: string[];
  visualPipeline?: PipelineStep[];
  stack: string[];
  metrics: ProjectMetric[];
  screenshots: ProjectScreenshot[];
  accentTag: string;
}

export interface BenchmarkModelRow {
  model: string;
  isSelected?: boolean;
  accuracy: number;
  precisionWt: number;
  recallWt: number;
  f1Wt: number;
  macroF1: number;
  rocAuc: number;
  prAucMacro: number;
  overfitGap: string;
  trainTimeSec: number;
  inferenceMsPer1k: number;
}

export interface VisualToolItem {
  name: string;
  metric: string;
  level: number;
}

export interface CapabilityItem {
  name: string;
  domain: "fullstack" | "ai-products" | "data-devops";
  roleSummary: string;
  visualTools: VisualToolItem[];
  provenByProjectIds: string[];
}

export interface JourneyItem {
  period: string;
  tag: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  highlights: string[];
  linkUrl?: string;
  linkLabel?: string;
  internalRoute?: string;
  internalRouteLabel?: string;
}

export const PROFILE = {
  name: "Hamdan Ali",
  urduName: "ہمدان علی",
  monogram: "HA",
  role: "Full-Stack Developer · AI-Powered Products",
  shortBio:
    "Shipping production Next.js, Laravel, Python, and AI web platforms with live telemetry and automated tests.",
  extendedBio:
    "BS Software Engineering student at Air University, Islamabad and software engineering internship alumnus at HindukushSoft Technologies. Creator of Sentinel Chitral (8-valley GLOF & weather early-warning platform) and GridPulse (177+ MW renewable fleet control room).",
  email: "Hamdanaly651@gmail.com",
  github: "https://github.com/Hamdanali3",
  githubHandle: "@Hamdanali3",
  avatarUrl: "/images/hamdan.jpg",
  timezone: "Asia/Karachi",
  availability: "Available for Full-Stack & AI Product Roles",
};

export const HERO_TELEMETRY = [
  {
    numericValue: 2,
    decimals: 0,
    prefix: "",
    suffix: " Live",
    label: "Production Cloud Apps",
    detail: "Sentinel Chitral & GridPulse",
    barPercent: 100,
  },
  {
    numericValue: 177,
    decimals: 0,
    prefix: "",
    suffix: "+ MW",
    label: "Live Fleet Telemetry",
    detail: "5-second hydro, solar & wind grid",
    barPercent: 92,
  },
  {
    numericValue: 8,
    decimals: 0,
    prefix: "",
    suffix: " Valleys",
    label: "Geospatial Hazard Map",
    detail: "MapLibre GL + 500-token FCM push",
    barPercent: 95,
  },
  {
    numericValue: 30,
    decimals: 0,
    prefix: "",
    suffix: "+ Tests",
    label: "Automated CI & RBAC",
    detail: "API policies & HTTP 503 fail-safe",
    barPercent: 100,
  },
];

export const MARQUEE_CAPABILITIES = [
  "Next.js App Router",
  "TypeScript & React 19",
  "Laravel 12 REST APIs",
  "Groq & LLM Copilots",
  "Python & FastAPI",
  "PostgreSQL & Supabase",
  "Firebase Auth & FCM Push",
  "MapLibre GL Geospatial",
  "Recharts Telemetry",
  "Docker & GitHub Actions CI",
];

/**
 * ACTIVE FLAGSHIP PROJECTS (Recruiter-Curated: Sentinel Chitral & GridPulse)
 */
export const PROJECTS: PortfolioProject[] = [
  {
    id: "sentinel-chitral",
    index: "01",
    title: "Sentinel Chitral",
    subtitle: "Regional GLOF, Landslide & Weather Early-Warning Platform",
    category: "Full-Stack Web · AI Safety & Push Telemetry",
    year: "2026",
    featured: true,
    simulator: "sentinel",
    liveUrl: "https://sentinelchitral-app.vercel.app",
    repoUrl: "https://github.com/Hamdanali3/Sentinel_Chitral",
    accentTag: "LIVE PUBLIC PLATFORM · 8 VALLEYS",
    summary:
      "Real-time glacial flood and landslide early-warning platform monitoring 8 Chitral valleys with MapLibre GL, 500-token FCM push broadcasts, and Groq AI safety guidance.",
    problemStatement:
      "Mountain communities across 8 Hindu Kush valleys need instant, valley-specific hazard alerts with strict data integrity rather than delayed warnings or fabricated fallback numbers.",
    architectureSummary:
      "Next.js App Router + TypeScript client paired with a Python FastAPI risk-scoring service, HTTP-only session auth, Firestore RBAC, and batched 500-token Firebase Cloud Messaging multicast delivery.",
    visualPipeline: [
      {
        step: "01",
        title: "Risk Engine",
        tech: "Python FastAPI · 8 Valleys",
      },
      {
        step: "02",
        title: "Fail-Safe Store",
        tech: "Firestore · HTTP 503 Gate",
      },
      {
        step: "03",
        title: "Push Dispatch",
        tech: "FCM · 500 Tokens/Batch",
      },
      {
        step: "04",
        title: "Live Map & AI",
        tech: "Next.js · MapLibre · Groq",
      },
    ],
    engineeringHighlights: [
      "HTTP 503 fail-safe contract: refuses to render fake risk numbers if valley telemetry is missing.",
      "Dual-layer PDMA operator security: HTTP-only session cookies + Firestore `admins/{uid}` RBAC.",
      "500-token batched FCM multicast push engine with automatic stale-token pruning.",
      "Context-aware Groq AI safety copilot grounded in live valley risk levels.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Python (FastAPI)",
      "Firebase & FCM Push",
      "MapLibre GL",
      "Groq AI",
    ],
    metrics: [
      { value: "8 Valleys", label: "Live Geospatial Zones", fillPercent: 100 },
      { value: "500 / Batch", label: "FCM Push Multicast", fillPercent: 94 },
      { value: "HTTP 503", label: "Zero-Fake-Data Gate", fillPercent: 100 },
      { value: "Live PWA", label: "Vercel Edge Production", fillPercent: 100 },
    ],
    screenshots: [],
  },
  {
    id: "gridpulse",
    index: "02",
    title: "GridPulse",
    subtitle: "Chitral Renewable Fleet Control-Room & Work-Order Platform",
    category: "Full-Stack SPA · Laravel 12 API & AI Copilot",
    year: "2026",
    featured: true,
    simulator: "gridpulse",
    liveUrl: "https://grid-pulse-ruby.vercel.app",
    repoUrl: "https://github.com/Hamdanali3/GridPulse",
    accentTag: "177+ MW FLEET TELEMETRY · ROLE-SCOPED AI",
    summary:
      "Live renewable energy control room monitoring 177+ MW of hydro, solar, and wind plants with 5-second telemetry, automated alert-to-Kanban work orders, and PulseBot AI.",
    problemStatement:
      "Scattered hydro and solar stations across Chitral previously relied on paper logs and phone calls, leaving operators without a unified live view of MW output, threshold faults, or field repairs.",
    architectureSummary:
      "Decoupled Laravel 12 REST API with 3-tier RBAC (`Admin`, `Engineer`, `Viewer`), PostgreSQL/Supabase persistence, 5-second telemetry & alert rules, and a React 18 + TypeScript Recharts control room.",
    visualPipeline: [
      {
        step: "01",
        title: "5s Telemetry",
        tech: "108MW + 69MW Hydro & Solar",
      },
      {
        step: "02",
        title: "RBAC REST API",
        tech: "Laravel 12 · PostgreSQL",
      },
      {
        step: "03",
        title: "Alert ➔ Kanban",
        tech: "Auto Work-Order State",
      },
      {
        step: "04",
        title: "Control & AI",
        tech: "React 18 · Recharts · Groq",
      },
    ],
    engineeringHighlights: [
      "Physics-modeled 5-second telemetry across Golen Gol (108 MW), Lawi (69 MW), solar, and wind sites.",
      "Closed-loop lifecycle: converting a threshold alert spawns a Kanban work order that auto-resolves the alert on completion.",
      "Dual-boundary PulseBot AI: SQL-grounded Session Copilot for operators + zero-DB Public Guide.",
      "Verified by 30 automated API & RBAC feature tests, audit logs, and Docker CI.",
    ],
    stack: [
      "Laravel 12",
      "React 18",
      "TypeScript",
      "PostgreSQL / Supabase",
      "Recharts",
      "Groq AI (PulseBot)",
    ],
    metrics: [
      { value: "177+ MW", label: "Hydro, Solar & Wind Fleet", fillPercent: 95 },
      { value: "5s Cadence", label: "Real-Time Rule Engine", fillPercent: 100 },
      { value: "30 Tests", label: "Automated API & RBAC", fillPercent: 100 },
      { value: "3 Roles", label: "Audited Access Tiers", fillPercent: 90 },
    ],
    screenshots: [
      {
        label: "Live Fleet Control Room",
        caption: "Real-time MW output, capacity factor rings, 60-min curve, and Hindu Kush plant pins.",
        url: "https://raw.githubusercontent.com/Hamdanali3/GridPulse/main/docs/screenshots/02-overview.png",
      },
      {
        label: "Plant Telemetry & Health",
        caption: "Per-site 24h / 3d / 7d generation & efficiency charts with unit-level health scores.",
        url: "https://raw.githubusercontent.com/Hamdanali3/GridPulse/main/docs/screenshots/04-site-detail.png",
      },
      {
        label: "Automated Threshold Alerts",
        caption: "Deduplicated rule alerts across low efficiency, high temperature, and offline states.",
        url: "https://raw.githubusercontent.com/Hamdanali3/GridPulse/main/docs/screenshots/06-alerts.png",
      },
      {
        label: "Field-Crew Kanban Work Orders",
        caption: "Planned -> In Progress -> Blocked -> Done board linked directly to originating plant alerts.",
        url: "https://raw.githubusercontent.com/Hamdanali3/GridPulse/main/docs/screenshots/07-work-orders.png",
      },
    ],
  },
];

/*
 * PRESERVED ARCHIVED PROJECTS (UniSelection v2.0, Edge-IIoTset PP-PSFE, TaskFlow, CRM Suite)
 * Kept intact for future restoration when expanding beyond the 2 flagship deployments.
 */
export const ARCHIVED_PROJECTS: PortfolioProject[] = [];

/* Preserved for future restoration via ENABLE_RESEARCH_SPOTLIGHT in src/app/page.tsx */
export const IEEE_RESEARCH = {
  manuscriptTag: "APPLIED ML SECURITY STUDY · OCTOBER 2026",
  title:
    "Auditing Edge-IIoTset and Recovering Web-Attack Separability with Privacy-Preserving Protocol-Header Structural Features",
  author: "Hamdan Ali",
  affiliation:
    "Department of Creative Technologies (Software Engineering), Faculty of Computing and Artificial Intelligence, Air University, Islamabad, Pakistan",
  repoUrl:
    "https://github.com/Hamdanali3/Edge-IIoTset_From-a-Trained-ML-Model-to-a-Full-Stack-Research-Application",
  pdfUrl:
    "https://github.com/Hamdanali3/Edge-IIoTset_From-a-Trained-ML-Model-to-a-Full-Stack-Research-Application/blob/main/Hamdan_Ali_PP-PSFE_IEEE_Paper.pdf",
  abstractSummary:
    "Leakage-sanitized 15-class IoT intrusion-detection pipeline using 24 privacy-preserving structural features.",
  auditFindings: [] as { code: string; title: string; detail: string }[],
  benchmarkRows: [] as BenchmarkModelRow[],
};

export const CAPABILITIES: CapabilityItem[] = [
  {
    name: "Frontend & Real-Time Visualization",
    domain: "fullstack",
    roleSummary: "Interactive geospatial risk maps, 5-second live telemetry charts, and responsive PWA interfaces.",
    visualTools: [
      { name: "Next.js (App Router) & React", metric: "SSR + Live Control Rooms", level: 96 },
      { name: "TypeScript", metric: "Strict End-to-End Contracts", level: 94 },
      { name: "MapLibre GL & Recharts", metric: "8-Valley GIS & 60m Telemetry", level: 92 },
    ],
    provenByProjectIds: ["sentinel-chitral", "gridpulse"],
  },
  {
    name: "Backend APIs & Security Boundaries",
    domain: "fullstack",
    roleSummary: "Role-scoped REST APIs, HTTP-only session auth, audit logging, and strict fail-safe contracts.",
    visualTools: [
      { name: "Laravel 12 & PHP 8.3", metric: "3-Role RBAC + 30 API Tests", level: 94 },
      { name: "Python & FastAPI", metric: "Hazard Risk Scoring API", level: 90 },
      { name: "HTTP 503 Fail-Safe & Auth", metric: "Zero-Fake-Data Guarantee", level: 96 },
    ],
    provenByProjectIds: ["sentinel-chitral", "gridpulse"],
  },
  {
    name: "AI Copilots & Guardrailed LLMs",
    domain: "ai-products",
    roleSummary: "Context-grounded Groq AI assistants operating inside strict role and database security boundaries.",
    visualTools: [
      { name: "Groq LLM Integration", metric: "Sub-Second Streaming Guidance", level: 95 },
      { name: "PulseBot SQL Copilot", metric: "Role-Scoped Fleet Analytics", level: 92 },
      { name: "Hazard Safety Assistant", metric: "Live Valley Risk Context", level: 94 },
    ],
    provenByProjectIds: ["sentinel-chitral", "gridpulse"],
  },
  {
    name: "Cloud Persistence, Push & CI/CD",
    domain: "data-devops",
    roleSummary: "Relational and real-time document stores, high-throughput web push, and automated test pipelines.",
    visualTools: [
      { name: "PostgreSQL, Supabase & Firestore", metric: "Real-Time Sync & Audit Trails", level: 93 },
      { name: "FCM Multicast Web Push", metric: "500 Tokens / Batch + Pruning", level: 95 },
      { name: "Docker, GitHub Actions & Vercel", metric: "Automated CI Release Gates", level: 92 },
    ],
    provenByProjectIds: ["sentinel-chitral", "gridpulse"],
  },
];

export const ENGINEERING_PRINCIPLES = [
  {
    number: "01",
    title: "HTTP 503 Fail-Safe Over Fake Data",
    description:
      "Never render fabricated fallback numbers in safety systems. Missing telemetry returns an explicit HTTP 503 state.",
    source: "Sentinel Chitral",
    projectId: "sentinel-chitral",
  },
  {
    number: "02",
    title: "Role-Scoped AI Guardrails",
    description:
      "Separate authenticated SQL operator copilots from zero-database public guides by strict architectural design.",
    source: "GridPulse",
    projectId: "gridpulse",
  },
  {
    number: "03",
    title: "Closed-Loop Automation & CI",
    description:
      "Threshold alerts convert directly into tracked Kanban work orders backed by 30+ automated API & RBAC tests.",
    source: "GridPulse",
    projectId: "gridpulse",
  },
];

export const JOURNEY: JourneyItem[] = [
  {
    period: "2026 - PRESENT",
    tag: "PRODUCTION AI & FULL-STACK PLATFORMS",
    title: "Creator & Full-Stack Engineer",
    organization: "Sentinel Chitral & GridPulse",
    location: "Islamabad & Chitral, Pakistan",
    description:
      "Architected and deployed two live cloud platforms serving regional hazard early-warning and 177+ MW renewable grid operations.",
    highlights: [
      "Sentinel Chitral: 8-valley MapLibre GL risk map, 500-token FCM multicast push, HTTP 503 fail-safe, and Groq AI.",
      "GridPulse: 5-second hydro/solar telemetry, Alert-to-Kanban work order automation, and role-scoped PulseBot AI.",
    ],
    internalRoute: "/work/sentinel-chitral",
    internalRouteLabel: "Sentinel Case Study",
    linkUrl: "https://sentinelchitral-app.vercel.app",
    linkLabel: "Sentinel Live App",
  },
  {
    period: "SUMMER - AUTUMN 2026",
    tag: "INDUSTRY EXPERIENCE",
    title: "Software Engineering Intern (Full-Stack & AI)",
    organization: "HindukushSoft Technologies",
    location: "Pakistan",
    description:
      "Completed an intensive 8-week production engineering track building Laravel 12 REST APIs, React TypeScript SPAs, RBAC policies, and automated test suites.",
    highlights: [
      "Shipped GridPulse as the Week 8 capstone with 30 automated API/RBAC tests, normalized ERD, and Docker CI.",
      "Built multi-tenant token & session authentication pipelines with 100% passing PHPUnit feature verification.",
    ],
    internalRoute: "/work/gridpulse",
    internalRouteLabel: "GridPulse Case Study",
    linkUrl: "https://grid-pulse-ruby.vercel.app",
    linkLabel: "GridPulse Live App",
  },
  {
    period: "UNDERGRADUATE TRACK",
    tag: "ACADEMIC FOUNDATION",
    title: "BS Software Engineering",
    organization: "Air University, Islamabad",
    location: "Faculty of Computing & Artificial Intelligence",
    description:
      "Focused on full-stack system architecture, relational databases, software verification, and applied AI product engineering.",
    highlights: [
      "Department of Creative Technologies · Building production web & AI software for real regional challenges.",
    ],
    linkUrl: "https://github.com/Hamdanali3",
    linkLabel: "GitHub (@Hamdanali3)",
  },
];
