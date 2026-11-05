export type SimulatorKind = "sentinel" | "gridpulse" | "edge-iiot" | "uniselection";

export interface ProjectScreenshot {
  label: string;
  caption: string;
  url: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
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
  summary: string;
  problemStatement: string;
  architectureSummary: string;
  engineeringHighlights: string[];
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

export interface CapabilityItem {
  name: string;
  domain: "fullstack" | "ai-security" | "mobile" | "data-devops";
  roleSummary: string;
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
}

export const PROFILE = {
  name: "Hamdan Ali",
  monogram: "HA",
  role: "Software Engineer · Full-Stack Systems Architect · ML Security Researcher",
  shortBio:
    "Architecting resilient full-stack platforms, high-altitude telemetry systems, accredited mobile software, and leakage-sanitized machine learning pipelines.",
  extendedBio:
    "Software Engineering researcher and builder at Air University, Islamabad (Department of Creative Technologies, Faculty of Computing & AI) and alumnus of HindukushSoft Technologies' intensive engineering track. My work spans live disaster early-warning and renewable grid operations for Chitral's mountain valleys, deterministic multi-platform student guidance systems, and IEEE cybersecurity research.",
  email: "Hamdanaly651@gmail.com",
  github: "https://github.com/Hamdanali3",
  githubHandle: "@Hamdanali3",
  avatarUrl: "https://avatars.githubusercontent.com/u/171372554?v=4",
  primaryCoordinates: "33.7138° N, 73.0247° E // ISLAMABAD",
  secondaryCoordinates: "35.8518° N, 71.7864° E // CHITRAL",
  timezone: "Asia/Karachi",
  availability: "Available for Software Engineering Roles & High-Impact Systems",
};

export const HERO_TELEMETRY = [
  {
    numericValue: 2,
    prefix: "0",
    suffix: "",
    label: "Live Cloud Platforms",
    detail: "Sentinel Chitral & GridPulse on Vercel",
  },
  {
    numericValue: 96.49,
    decimals: 2,
    prefix: "",
    suffix: "%",
    label: "Sanitized ML Accuracy",
    detail: "PP-PSFE 15-Class XGBoost (3.54 ms / 1k flows)",
  },
  {
    numericValue: 284,
    prefix: "",
    suffix: "",
    label: "Verified Universities",
    detail: "266 HEC Pakistan + 18 Global in UniSelection v2.0",
  },
  {
    numericValue: 100,
    prefix: "",
    suffix: "%",
    label: "Release Gate Pass Rate",
    detail: "96+ Automated Tests Across Flutter, Pytest & PHPUnit",
  },
];

export const MARQUEE_CAPABILITIES = [
  "Next.js App Router",
  "TypeScript Systems",
  "Laravel 12 REST Architecture",
  "React 19 & State Choreography",
  "Flutter Cross-Platform",
  "FastAPI & Flask ML Serving",
  "XGBoost & TreeSHAP Explainability",
  "Firebase FCM Multicast",
  "PostgreSQL & Supabase",
  "Role-Scoped Groq AI Copilots",
  "Deterministic SHA-256 Data Sync",
  "Docker & GitHub Actions CI/CD",
];

export const PROJECTS: PortfolioProject[] = [
  {
    id: "sentinel-chitral",
    index: "01",
    title: "Sentinel Chitral",
    subtitle: "Regional GLOF, Landslide & Severe Weather Early-Warning Platform",
    category: "Civic Telemetry · Cloud & AI Safety",
    year: "2026",
    featured: true,
    simulator: "sentinel",
    liveUrl: "https://sentinelchitral-app.vercel.app",
    repoUrl: "https://github.com/Hamdanali3/Sentinel_Chitral",
    accentTag: "LIVE CIVIC INFRASTRUCTURE · 8 VALLEYS",
    summary:
      "Life-safety early-warning web application monitoring glacial lake outburst floods (GLOFs), landslides, and severe mountain weather across eight valleys in Chitral — uniting a MapLibre public risk map, Web Push alert subscriptions, an authenticated PDMA operator console, and a Groq-powered AI safety assistant.",
    problemStatement:
      "Communities across high-altitude Hindu Kush valleys face rapid-onset glacial lake outburst floods and seasonal landslides where delayed warnings cost lives, yet traditional alert channels lack valley-granular push subscriptions and strict data-integrity guarantees.",
    architectureSummary:
      "Next.js App Router TypeScript client + server route handlers paired with a FastAPI Python risk-scoring contract boundary, Firebase Authentication with HTTP-only `sentinel_session` cookies, Firestore `valleyRisks` & `admins/{uid}` authorization, and batched 500-token Firebase Cloud Messaging multicast delivery.",
    engineeringHighlights: [
      "Enforces a strict HTTP 503 fail-safe contract when a valley telemetry document (`Bumburet`, `Rumbur`, `Birir`, `Reshun`, `Mastuj`, `Yarkhun`, `Torkhow`, `Golain`) is missing — deliberately refusing to render fake or stale risk values in a life-safety interface.",
      "Dual-layer operator security: client Firebase Auth for responsive console state backed by server-verified HTTP-only `sentinel_session` cookies and Firestore `admins/{uid}` RBAC checks before any broadcast executes.",
      "High-throughput FCM multicast dispatcher batching up to 500 push tokens per payload while automatically pruning unregistered/expired tokens from Firestore and logging partial delivery diagnostics to `alertLogs`.",
      "Integrated Groq AI safety assistant contextualized with live valley risk states to provide actionable evacuation and preparedness guidance.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Python (FastAPI)",
      "Firebase Auth & Firestore",
      "FCM Web Push",
      "MapLibre GL",
      "Groq AI",
      "PWA",
    ],
    metrics: [
      { value: "8 Valleys", label: "Granular Hindu Kush Risk Zones" },
      { value: "500 / Batch", label: "FCM Multicast Token Dispatch" },
      { value: "HTTP 503", label: "Zero-Fake-Data Fail-Safe Contract" },
      { value: "Live PWA", label: "Deployed on Vercel Edge" },
    ],
    screenshots: [],
  },
  {
    id: "gridpulse",
    index: "02",
    title: "GridPulse",
    subtitle: "Chitral Renewable Fleet Control-Room & Work-Order Platform",
    category: "Energy Operations · Full-Stack SPA & REST API",
    year: "2026",
    featured: true,
    simulator: "gridpulse",
    liveUrl: "https://grid-pulse-ruby.vercel.app",
    repoUrl: "https://github.com/Hamdanali3/GridPulse",
    accentTag: "177+ MW FLEET TELEMETRY · ROLE-SCOPED AI",
    summary:
      "Browser-based industrial control room for Chitral district's isolated hydro, solar, and wind fleet — unifying 5-second live generation telemetry, satellite plant mapping, automated threshold alerts, Kanban field-crew work orders, and a dual-surface Groq AI operations copilot.",
    problemStatement:
      "Chitral's power comes from plants scattered across mountain valleys with winter road closures — the 108 MW Golen Gol hydro station, 69 MW Lawi hydro plant, village micro-hydro schemes, Booni/Mastuj solar fields, and Shandur wind pilot. Paper logbooks and phone-call fault reporting meant operators could not see total live output, failing units, or active repairs on a single screen.",
    architectureSummary:
      "Decoupled Laravel 12 REST API (PHP) with strict role-based policies (`Admin`, `Engineer`, `Viewer`), PostgreSQL/Supabase relational persistence, a physics-modeled 5-second telemetry & alert-rule engine, and a React 18 + TypeScript SPA featuring Recharts analytics, satellite map pins, and Dockerized CI.",
    engineeringHighlights: [
      "Physics-grounded 5-second telemetry engine modeling solar irradiance curves over Chitral, wind turbine power curves on Shandur, and steady base-load hydro — swappable with real IoT gateways without UI changes.",
      "Closed-loop Alert-to-Work-Order lifecycle: rule evaluation raises deduplicated alerts (`open -> acknowledged -> resolved`); converting an alert spawns a linked Kanban work order whose completion automatically resolves the originating alert.",
      "Architected PulseBot AI across two security boundaries: an authenticated Session Copilot answering strictly from real SQL operational aggregates with deep-linked React Router filters, and a zero-DB-access Public Guide grounded solely in curated docs.",
      "Backed by PRD, normalized ERD, API contract, 30 automated backend/feature tests, audit logging on every mutation, and CSV energy reporting.",
    ],
    stack: [
      "Laravel 12",
      "React 18",
      "TypeScript",
      "PostgreSQL / Supabase",
      "Recharts",
      "Groq AI (PulseBot)",
      "Docker",
      "GitHub Actions CI",
    ],
    metrics: [
      { value: "108 + 69 MW", label: "Hydro, Solar & Wind Fleet Modeled" },
      { value: "5s Cadence", label: "Live Telemetry & Rule Evaluation" },
      { value: "30 Tests", label: "Automated API & RBAC Verification" },
      { value: "3 Roles", label: "Admin, Engineer & Viewer Audit Trail" },
    ],
    screenshots: [
      {
        label: "Live Fleet Control Room",
        caption: "Real-time MW output, capacity factor & availability rings, 60-min curve, and Hindu Kush plant pins.",
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
  {
    id: "edge-iiotset-pp-psfe",
    index: "03",
    title: "Edge-IIoTset & PP-PSFE",
    subtitle: "IEEE Cybersecurity Audit & 15-Class IoT Intrusion-Detection Platform",
    category: "Applied ML Security · IEEE Research & Full-Stack Serving",
    year: "2026",
    featured: true,
    simulator: "edge-iiot",
    repoUrl:
      "https://github.com/Hamdanali3/Edge-IIoTset_From-a-Trained-ML-Model-to-a-Full-Stack-Research-Application",
    accentTag: "IEEE MANUSCRIPT · 96.49% ACC · 3.54ms/1K",
    summary:
      "End-to-end research and 15-stage full-stack ML system auditing data leakage in the 157,800-row Edge-IIoTset benchmark, introducing Privacy-Preserving Protocol-Header Structural Feature Engineering (PP-PSFE), and serving real-time 15-class cyberattack predictions via Flask REST API and Angular 22.",
    problemStatement:
      "Published intrusion-detection papers routinely claim >99% accuracy on Edge-IIoTset, yet our forensic audit uncovered severe dataset build artifacts (`\"0\"` vs `\"0.0\"` type serialization, a TShark CSV comma fault, 8 constant columns, 5,414 duplicates) plus 15 lab-identifying columns (IPs, timestamps, raw payloads). Stripping those leaky columns naively destroys HTTP web-attack separability.",
    architectureSummary:
      "Leakage-sanitized preprocessing + 24 scalar PP-PSFE descriptors (62 total features) -> stratified 152,386-flow benchmark across 4 model families + TreeSHAP explainability -> serialized `sklearn.pipeline.Pipeline` (`ColumnTransformer` + `StandardScaler` + `XGBClassifier`) served via Flask REST API to an Angular 22 Standalone dashboard with GitHub Actions CI/CD.",
    engineeringHighlights: [
      "Documented 4 structural dataset flaws and removed 15 network-identifying leakage columns across 157,800 IoT/IIoT flows (`Backdoor`, `DDoS_HTTP/ICMP/TCP/UDP`, `MITM`, `Ransomware`, `SQL_injection`, `XSS`, etc.).",
      "Engineered 24 privacy-preserving scalar descriptors (port role semantics, TCP option geometry, payload Shannon entropy, HTTP request structure) before dropping raw strings — lifting hardest HTTP attack F1 from 0.44–0.66 (linear baseline) to 0.86–0.93.",
      "Selected XGBoost achieved 96.49% test accuracy, 0.9618 macro-F1, 0.9991 weighted ROC-AUC, minimal +0.0057 train-test gap, and 3.54 ms inference per 1,000 flows.",
      "Authored full IEEEtran manuscript (`paper.tex` / `Hamdan_Ali_PP-PSFE_IEEE_Paper.pdf`) alongside a 15-stage productionized Flask + Angular 22 inference web app.",
    ],
    stack: [
      "Python",
      "XGBoost",
      "Scikit-Learn",
      "LightGBM",
      "TreeSHAP",
      "Flask REST API",
      "Angular 22",
      "LaTeX (IEEEtran)",
      "GitHub Actions",
    ],
    metrics: [
      { value: "96.49%", label: "Leakage-Sanitized Test Accuracy" },
      { value: "0.9618", label: "15-Class Macro F1-Score" },
      { value: "3.54 ms", label: "Latency per 1,000 Network Flows" },
      { value: "152,386", label: "Deduplicated Stratified Flows" },
    ],
    screenshots: [
      {
        label: "Full-Stack Inference Dashboard",
        caption: "Angular 22 + Flask operational UI classifying 62-feature IoT network flows across 15 attack classes.",
        url: "https://raw.githubusercontent.com/Hamdanali3/Edge-IIoTset_From-a-Trained-ML-Model-to-a-Full-Stack-Research-Application/main/output/dashboard_highres_screenshot.png",
      },
      {
        label: "End-to-End PP-PSFE Architecture",
        caption: "Pipeline from raw Edge-IIoTset sanitization and 24 structural descriptors to REST inference.",
        url: "https://raw.githubusercontent.com/Hamdanali3/Edge-IIoTset_From-a-Trained-ML-Model-to-a-Full-Stack-Research-Application/main/output/architecture_diagram.png",
      },
      {
        label: "TreeSHAP Global Attribution",
        caption: "Explainable AI verification confirming protocol-header structural features drive separability.",
        url: "https://raw.githubusercontent.com/Hamdanali3/Edge-IIoTset_From-a-Trained-ML-Model-to-a-Full-Stack-Research-Application/main/output/shap_feature_importance.png",
      },
      {
        label: "4-Model Benchmark & Confusion Matrices",
        caption: "Comparative evaluation across Logistic Regression, Random Forest, LightGBM, and XGBoost.",
        url: "https://raw.githubusercontent.com/Hamdanali3/Edge-IIoTset_From-a-Trained-ML-Model-to-a-Full-Stack-Research-Application/main/output/model_comparison.png",
      },
    ],
  },
  {
    id: "uniselection",
    index: "04",
    title: "UniSelection v2.0",
    subtitle: "Accredited Higher-Education Admissions, Eligibility & Scholarship Platform",
    category: "Mobile Systems · Deterministic Data Engineering",
    year: "2026",
    featured: true,
    simulator: "uniselection",
    repoUrl: "https://github.com/Hamdanali3/Uni_Selection",
    accentTag: "284 INSTITUTIONS · SHA-256 SYNC PARITY",
    summary:
      "Android-first Flutter mobile application and Python deterministic data-synchronization engine empowering students to evaluate multi-criterion university eligibility, compare verified fee schedules, track admission milestones, and access statutory scholarships across 284 accredited institutions.",
    problemStatement:
      "Pakistani and international applicants face fragmented admission deadlines, unverified scholarship rumors, and complex multi-weight merit formulas across hundreds of universities — where a single stale fee or eligibility threshold misleads critical academic decisions.",
    architectureSummary:
      "Clean-layered Flutter/Dart mobile client paired with an idempotent Python sync & validation CLI (`data.sync.cli`), PostgreSQL backend schema, statutory provenance validators, and cryptographic SHA-256 seed parity verification between backend and mobile bundles.",
    engineeringHighlights: [
      "Indexes 284 verified institutions (266 HEC-accredited Pakistani universities + 18 global destinations), 12 statutory scholarship schemes, and 13 official government immigration/visa portals.",
      "Zero-drift data engineering: `python -m data.sync.cli test-idempotency` guarantees 0 mutations/diffs on re-sync with exact SHA-256 dataset hash parity (`c032fe8d725c...`) across backend and mobile.",
      "Passed all 8/8 Phase 2 release gates: `0` `flutter analyze` warnings, `40/40` Flutter unit & widget tests (100%), and `10/10` Python `pytest` sync engine suites.",
      "Multi-criterion eligibility rule calculator computing program compatibility against academic background, test scores, and regional quotas.",
    ],
    stack: [
      "Flutter",
      "Dart",
      "Python Sync CLI",
      "PostgreSQL",
      "Pytest",
      "Flutter Widget Testing",
      "SHA-256 Provenance",
    ],
    metrics: [
      { value: "284", label: "Verified HEC & Global Universities" },
      { value: "40 / 40", label: "Flutter Unit & Widget Tests Passed" },
      { value: "10 / 10", label: "Python Sync Engine Pytest Suite" },
      { value: "8 / 8", label: "Phase 2 Release Gates Cleared" },
    ],
    screenshots: [],
  },
  {
    id: "taskflow",
    index: "05",
    title: "TaskFlow",
    subtitle: "Dual-Surface Laravel 12 Kanban & Sanctum REST API Platform",
    category: "Backend & Full-Stack Architecture",
    year: "2026",
    featured: false,
    repoUrl: "https://github.com/Hamdanali3/HindukushSoft-Technologies-Internship/tree/main/taskflow",
    accentTag: "LARAVEL 12 · PHP 8.3 · 16/16 PHPUNIT",
    summary:
      "Production-structured multi-user project and task management platform built during an 8-week software engineering internship — pairing session-authenticated Blade Kanban workflows with a token-authenticated Laravel Sanctum JSON REST API.",
    problemStatement:
      "Demonstrating true production backend discipline requires unified authorization rules across both browser sessions and external API clients without duplicating business logic or leaking cross-tenant project resources.",
    architectureSummary:
      "Laravel 12 on PHP 8.3 utilizing dedicated FormRequest validators, `ProjectPolicy` / `TaskPolicy` / `CommentPolicy` RBAC gates, Eloquent API Resources, 5 normalized migrations, Postman collection, and a 16-test PHPUnit feature suite.",
    engineeringHighlights: [
      "Shared policy and validation boundary serving both interactive Blade Kanban views and stateless Sanctum Bearer-token REST endpoints.",
      "Explicit Day 36–40 architectural scoping: documented ERD, request-by-request `CODE_FLOW.md` trace, and honest engineering trade-off roadmap.",
      "16/16 passing PHPUnit feature tests validating authentication, authorization boundaries, and CRUD invariants.",
    ],
    stack: ["Laravel 12", "PHP 8.3", "Laravel Sanctum", "Blade", "MySQL / SQLite", "PHPUnit", "REST API"],
    metrics: [
      { value: "16 / 16", label: "Passing PHPUnit Feature Tests" },
      { value: "3 Policies", label: "Granular RBAC Resource Gates" },
    ],
    screenshots: [],
  },
  {
    id: "fullstack-crm-lab",
    index: "06",
    title: "Full-Stack Systems & CRM Suite",
    subtitle: "Enterprise CRM Term Project & Progressive React Architecture Archive",
    category: "Frontend State, Routing & Web Foundations",
    year: "2026",
    featured: false,
    repoUrl: "https://github.com/Hamdanali3/Full-stack-programmingg-lab",
    accentTag: "REACT ROUTING · CUSTOM CRM · TYPESCRIPT",
    summary:
      "Comprehensive full-stack engineering archive culminating in a custom Customer Relationship Management (CRM) web application alongside modular React state management, client-side routing, and modern ES6/TypeScript UI laboratories.",
    problemStatement:
      "Mastering modern frameworks requires building state lifecycles, event delegation, responsive layouts, and multi-view CRM workflows from foundational DOM primitives up to component-driven React architectures.",
    architectureSummary:
      "Progressive multi-module repository spanning semantic HTML5/CSS3 systems, ES6+ asynchronous architectures, React SPA state & routing modules, and a full-term CRM application.",
    engineeringHighlights: [
      "Custom CRM term project structuring customer pipelines, interactive dashboards, and multi-view workflows.",
      "Hands-on progression across React component state, declarative routing, TypeScript interfaces, and responsive interface craft.",
    ],
    stack: ["React", "TypeScript", "JavaScript (ES6+)", "React Router", "HTML5 & CSS3"],
    metrics: [
      { value: "CRM App", label: "Full-Term Capstone Build" },
      { value: "7+ Labs", label: "Progressive UI & State Modules" },
    ],
    screenshots: [],
  },
];

export const IEEE_RESEARCH = {
  manuscriptTag: "IEEE JOURNAL MANUSCRIPT · OCTOBER 2026",
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
    "Intrusion-detection models evaluated on Edge-IIoTset routinely report >99% accuracy by inadvertently exploiting dataset assembly artifacts and lab-identifying network addresses. After auditing all 157,800 rows and removing 15 leaky columns, naive sanitization collapses HTTP attack detection. PP-PSFE converts protocol headers and payloads into 24 privacy-preserving scalar descriptors before deletion — recovering 0.86–0.93 F1 on the five hardest web-attack classes while running at 3.54 ms per 1,000 flows.",
  auditFindings: [
    {
      code: "AUDIT // 01",
      title: "Mixed Zero Token Serialization",
      detail:
        "Placeholder zeros serialized inconsistently as string \"0\" vs \"0.0\" across capture files, letting tree splits Finger-print capture batches instead of attack behavior.",
    },
    {
      code: "AUDIT // 02",
      title: "TShark CSV Comma Fault",
      detail:
        "Unescaped commas in TShark exports shifted textual protocol strings into adjacent numeric columns, corrupting downstream feature parsers.",
    },
    {
      code: "AUDIT // 03",
      title: "5,414 Duplicates & 8 Constant Fields",
      detail:
        "Removed 8 zero-variance attributes and 5,414 duplicate flow records across splits to prevent train-to-test memorization.",
    },
    {
      code: "AUDIT // 04",
      title: "24 PP-PSFE Structural Descriptors",
      detail:
        "Replaced 15 deleted lab-identifying columns (IPs, timestamps, raw payloads) with scalar port-role, TCP option, payload entropy, and URI structure features.",
    },
  ],
  benchmarkRows: [
    {
      model: "XGBoost (PP-PSFE Selected)",
      isSelected: true,
      accuracy: 96.49,
      precisionWt: 0.9663,
      recallWt: 0.9649,
      f1Wt: 0.9649,
      macroF1: 0.9618,
      rocAuc: 0.9991,
      prAucMacro: 0.9874,
      overfitGap: "+0.0057",
      trainTimeSec: 13.93,
      inferenceMsPer1k: 3.54,
    },
    {
      model: "LightGBM",
      accuracy: 96.33,
      precisionWt: 0.964,
      recallWt: 0.9633,
      f1Wt: 0.9632,
      macroF1: 0.9596,
      rocAuc: 0.9991,
      prAucMacro: 0.9888,
      overfitGap: "+0.0210",
      trainTimeSec: 7.61,
      inferenceMsPer1k: 18.35,
    },
    {
      model: "Random Forest",
      accuracy: 94.38,
      precisionWt: 0.9455,
      recallWt: 0.9438,
      f1Wt: 0.9438,
      macroF1: 0.9414,
      rocAuc: 0.9978,
      prAucMacro: 0.9768,
      overfitGap: "+0.0020",
      trainTimeSec: 3.46,
      inferenceMsPer1k: 10.35,
    },
    {
      model: "Logistic Regression (Baseline)",
      accuracy: 84.87,
      precisionWt: 0.8736,
      recallWt: 0.8487,
      f1Wt: 0.8479,
      macroF1: 0.8419,
      rocAuc: 0.9829,
      prAucMacro: 0.8656,
      overfitGap: "+0.0016",
      trainTimeSec: 23.18,
      inferenceMsPer1k: 0.43,
    },
  ] satisfies BenchmarkModelRow[],
};

export const CAPABILITIES: CapabilityItem[] = [
  {
    name: "Next.js (App Router) & React 19",
    domain: "fullstack",
    roleSummary: "SSR/SSG web platforms, real-time telemetry dashboards, HTTP-only session boundaries, and SPA control rooms.",
    provenByProjectIds: ["sentinel-chitral", "gridpulse", "fullstack-crm-lab"],
  },
  {
    name: "TypeScript & Modern Frontend Systems",
    domain: "fullstack",
    roleSummary: "Strict end-to-end API contracts, geospatial MapLibre layers, Recharts analytics, and Angular 22 standalone clients.",
    provenByProjectIds: ["sentinel-chitral", "gridpulse", "edge-iiotset-pp-psfe", "fullstack-crm-lab"],
  },
  {
    name: "Laravel 12 & PHP 8.3 REST APIs",
    domain: "fullstack",
    roleSummary: "Normalized relational schemas, Sanctum auth, granular RBAC Policies, FormRequests, and automated PHPUnit suites.",
    provenByProjectIds: ["gridpulse", "taskflow"],
  },
  {
    name: "Python (FastAPI, Flask & CLI Tooling)",
    domain: "ai-security",
    roleSummary: "Risk-scoring microservice contracts, serialized ML model REST serving, and deterministic idempotent sync CLIs.",
    provenByProjectIds: ["sentinel-chitral", "edge-iiotset-pp-psfe", "uniselection"],
  },
  {
    name: "XGBoost, Scikit-Learn & TreeSHAP",
    domain: "ai-security",
    roleSummary: "Leakage-sanitized tabular pipelines, PP-PSFE structural feature engineering, 15-class intrusion detection, and XAI.",
    provenByProjectIds: ["edge-iiotset-pp-psfe"],
  },
  {
    name: "Role-Scoped LLM & Groq AI Copilots",
    domain: "ai-security",
    roleSummary: "Guardrailed operational SQL copilots (PulseBot) and emergency GLOF preparedness assistants with strict data boundaries.",
    provenByProjectIds: ["sentinel-chitral", "gridpulse"],
  },
  {
    name: "Flutter & Dart Mobile Engineering",
    domain: "mobile",
    roleSummary: "Android-first layered architecture, multi-criterion eligibility calculators, and 100% passing widget/unit test suites.",
    provenByProjectIds: ["uniselection"],
  },
  {
    name: "PostgreSQL, Supabase & Cloud Firestore",
    domain: "data-devops",
    roleSummary: "Relational telemetry time-series, real-time document subscriptions, batched 500-token FCM push, and audit trails.",
    provenByProjectIds: ["sentinel-chitral", "gridpulse", "uniselection"],
  },
  {
    name: "Docker, GitHub Actions CI & Vercel",
    domain: "data-devops",
    roleSummary: "Containerized multi-service stacks, automated lint/test release gates, SHA-256 parity checks, and cloud deployments.",
    provenByProjectIds: ["sentinel-chitral", "gridpulse", "edge-iiotset-pp-psfe", "uniselection"],
  },
];

export const ENGINEERING_PRINCIPLES = [
  {
    number: "P.01",
    title: "Fail-Safe Contracts Over Silent Fallbacks",
    description:
      "In life-safety and operational software, fabricating a default value is worse than failing loudly. Sentinel Chitral explicitly returns HTTP 503 with an honest unavailable state rather than ever inventing valley risk telemetry.",
    source: "Sentinel Chitral",
  },
  {
    number: "P.02",
    title: "Honest Evaluation Over Inflated Benchmarks",
    description:
      "A 99.9% score built on leaked IP addresses fails in production. Auditing 157,800 Edge-IIoTset flows to strip 15 leaky columns and engineer 24 PP-PSFE structural features traded artificial perfection for real generalizable security.",
    source: "IEEE PP-PSFE Manuscript",
  },
  {
    number: "P.03",
    title: "Deterministic Provenance & Idempotency",
    description:
      "Data pipelines should run ten times and yield zero unintended diffs. UniSelection v2.0 enforces cryptographic SHA-256 seed parity between Python backend validators and the offline-capable Flutter mobile bundle.",
    source: "UniSelection v2.0",
  },
  {
    number: "P.04",
    title: "Role-Scoped AI Guardrails",
    description:
      "AI assistants belong inside explicit trust boundaries. GridPulse's PulseBot separates an authenticated RBAC SQL copilot from a public documentation guide that structurally has zero database access.",
    source: "GridPulse Control Room",
  },
];

export const JOURNEY: JourneyItem[] = [
  {
    period: "2026 — PRESENT",
    tag: "CIVIC & MOBILE PLATFORMS",
    title: "Architecting Regional Early-Warning & Higher-Ed Systems",
    organization: "Sentinel Chitral & UniSelection v2.0",
    location: "Islamabad & Chitral, Pakistan",
    description:
      "Designed, tested, and shipped cloud-deployed early-warning infrastructure for eight Hindu Kush valleys alongside v2.0 closure of an accredited 284-institution university admissions mobile platform.",
    highlights: [
      "Launched Sentinel Chitral on Vercel with MapLibre GL, batched 500-token FCM push alerts, PDMA admin auth, and Groq AI.",
      "Cleared 8/8 Phase 2 release gates on UniSelection v2.0 (40/40 Flutter tests, 10/10 Pytest sync tests, 0 static analysis issues).",
    ],
    linkUrl: "https://sentinelchitral-app.vercel.app",
    linkLabel: "Inspect Sentinel Chitral Live",
  },
  {
    period: "OCTOBER 2026",
    tag: "APPLIED ML SECURITY RESEARCH",
    title: "Author — PP-PSFE Intrusion Detection Manuscript & 15-Stage ML App",
    organization: "Air University · Faculty of Computing & Artificial Intelligence",
    location: "Islamabad, Pakistan",
    description:
      "Conducted a forensic audit of the Edge-IIoTset cybersecurity dataset, formulated Privacy-Preserving Protocol-Header Structural Feature Engineering (PP-PSFE), and deployed the winning XGBoost pipeline behind a Flask + Angular 22 web platform.",
    highlights: [
      "Recovered 0.86–0.93 F1 on HTTP web attacks after removing 15 lab-identifying columns across 152,386 deduplicated flows.",
      "Achieved 96.49% accuracy, 0.9618 macro-F1, and 3.54 ms / 1k flow inference with TreeSHAP explainability.",
    ],
    linkUrl:
      "https://github.com/Hamdanali3/Edge-IIoTset_From-a-Trained-ML-Model-to-a-Full-Stack-Research-Application",
    linkLabel: "View Research Repository",
  },
  {
    period: "SUMMER — AUTUMN 2026",
    tag: "INDUSTRY ENGINEERING INTERNSHIP",
    title: "Software Engineering Intern (Full-Stack & Backend Systems)",
    organization: "HindukushSoft Technologies",
    location: "Pakistan",
    description:
      "Completed an intensive 8-week progressive engineering program advancing from core PHP/OOP and relational schema design to production Laravel 12 REST APIs, React TypeScript SPAs, automated testing, and Dockerized deployments.",
    highlights: [
      "Shipped TaskFlow (Laravel 12 + PHP 8.3 + Sanctum dual-surface Kanban platform with 16/16 passing PHPUnit feature tests).",
      "Engineered GridPulse as the flagship Week 8 capstone — modeling Chitral's hydro, solar, and wind grid with 30 automated tests and PulseBot AI.",
    ],
    linkUrl: "https://grid-pulse-ruby.vercel.app",
    linkLabel: "Open GridPulse Control Room",
  },
  {
    period: "UNDERGRADUATE TRACK",
    tag: "ACADEMIC FOUNDATION",
    title: "Bachelor of Science in Software Engineering",
    organization: "Air University, Islamabad",
    location: "Department of Creative Technologies · FCAI",
    description:
      "Rigorous software engineering curriculum spanning distributed full-stack development, mobile computing, DevOps CI/CD automation, database architecture, and explainable machine learning.",
    highlights: [
      "Built foundational CRM systems, React state/routing architectures, and end-to-end ML-to-DevOps pipelines.",
      "Focused research and capstones on high-impact infrastructure solving real regional challenges in Pakistan.",
    ],
    linkUrl: "https://github.com/Hamdanali3",
    linkLabel: "GitHub Profile (@Hamdanali3)",
  },
];
