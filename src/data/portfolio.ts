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
  paperUrl?: string;
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
  domain: "fullstack" | "ai-products" | "mobile" | "data-devops";
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
  role: "Full-Stack Developer · AI-Powered Products",
  shortBio:
    "Building AI-powered web platforms, Flutter mobile apps, and reliable backend APIs for real-world users.",
  extendedBio:
    "BS Software Engineering student at Air University, Islamabad (Department of Creative Technologies, Faculty of Computing & AI) and engineering internship alumnus of HindukushSoft Technologies. My work spans live hazard early-warning and renewable grid platforms for Chitral's mountain valleys, verified higher-education mobile software, and applied ML pipelines.",
  email: "Hamdanaly651@gmail.com",
  github: "https://github.com/Hamdanali3",
  githubHandle: "@Hamdanali3",
  avatarUrl: "/images/hamdan.jpg",
  primaryCoordinates: "33.7138° N, 73.0247° E // ISLAMABAD",
  secondaryCoordinates: "35.8518° N, 71.7864° E // CHITRAL",
  timezone: "Asia/Karachi",
  availability: "Available for Full-Stack & AI Product Roles",
};

export const HERO_TELEMETRY = [
  {
    numericValue: 2,
    decimals: 0,
    prefix: "",
    suffix: "",
    label: "Live Cloud Platforms",
    detail: "Sentinel Chitral & GridPulse deployed on Vercel",
  },
  {
    numericValue: 96,
    decimals: 0,
    prefix: "",
    suffix: "",
    label: "Automated Tests Passing",
    detail: "40 Flutter · 30 GridPulse · 16 TaskFlow · 10 Pytest",
  },
  {
    numericValue: 8,
    decimals: 0,
    prefix: "",
    suffix: "/8",
    label: "Release Gates Cleared",
    detail: "Zero static-analysis warnings & SHA-256 sync parity",
  },
  {
    numericValue: 284,
    decimals: 0,
    prefix: "",
    suffix: "",
    label: "Verified Data Records",
    detail: "266 HEC Pakistan + 18 Global universities indexed",
  },
];

export const MARQUEE_CAPABILITIES = [
  "Next.js App Router",
  "TypeScript & React 19",
  "Laravel 12 REST APIs",
  "Groq & LLM Copilots",
  "Flutter Cross-Platform",
  "Python & FastAPI",
  "PostgreSQL & Supabase",
  "Firebase Auth & FCM Push",
  "MapLibre GL Geospatial",
  "Deterministic SHA-256 Sync",
  "Docker & GitHub Actions CI",
  "Applied ML Pipelines",
];

export const PROJECTS: PortfolioProject[] = [
  {
    id: "sentinel-chitral",
    index: "01",
    title: "Sentinel Chitral",
    subtitle: "Regional GLOF, Landslide & Severe Weather Early-Warning Platform",
    category: "Full-Stack Web · AI Safety & Push Telemetry",
    year: "2026",
    featured: true,
    simulator: "sentinel",
    liveUrl: "https://sentinelchitral-app.vercel.app",
    repoUrl: "https://github.com/Hamdanali3/Sentinel_Chitral",
    accentTag: "LIVE PUBLIC PLATFORM · 8 VALLEYS",
    summary:
      "Early-warning web application monitoring glacial lake outburst floods (GLOFs), landslides, and severe mountain weather across eight valleys in Chitral — uniting a MapLibre public risk map, Web Push alert subscriptions, an authenticated PDMA operator console, and a Groq-powered AI safety assistant.",
    problemStatement:
      "Communities across high-altitude Hindu Kush valleys face rapid-onset glacial lake outburst floods and seasonal landslides where delayed warnings carry real human cost, yet conventional alert channels lack valley-granular push subscriptions and strict data-integrity checks.",
    architectureSummary:
      "Next.js App Router TypeScript client + server route handlers paired with a FastAPI Python risk-scoring contract boundary, Firebase Authentication with HTTP-only `sentinel_session` cookies, Firestore `valleyRisks` & `admins/{uid}` authorization, and batched 500-token Firebase Cloud Messaging multicast delivery.",
    engineeringHighlights: [
      "Enforces a strict HTTP 503 fail-safe contract when a valley telemetry document (`Bumburet`, `Rumbur`, `Birir`, `Reshun`, `Mastuj`, `Yarkhun`, `Torkhow`, `Golain`) is missing — deliberately refusing to render fake or stale risk values in a public safety interface.",
      "Dual-layer operator security: client Firebase Auth for responsive console state backed by server-verified HTTP-only `sentinel_session` cookies and Firestore `admins/{uid}` RBAC checks before any broadcast executes.",
      "High-throughput FCM multicast dispatcher batching up to 500 push tokens per payload while automatically pruning unregistered/expired tokens from Firestore and logging partial delivery diagnostics to `alertLogs`.",
      "Integrated Groq AI safety assistant contextualized with live valley risk states to provide clear evacuation and preparedness guidance.",
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
    category: "Full-Stack SPA · Laravel 12 API & AI Copilot",
    year: "2026",
    featured: true,
    simulator: "gridpulse",
    liveUrl: "https://grid-pulse-ruby.vercel.app",
    repoUrl: "https://github.com/Hamdanali3/GridPulse",
    accentTag: "177+ MW FLEET TELEMETRY · ROLE-SCOPED AI",
    summary:
      "Browser-based control room for Chitral district's hydro, solar, and wind fleet — unifying 5-second live generation telemetry, satellite plant mapping, automated threshold alerts, Kanban field-crew work orders, and a dual-surface Groq AI operations copilot.",
    problemStatement:
      "Chitral's power comes from plants scattered across mountain valleys with winter road closures — the 108 MW Golen Gol hydro station, 69 MW Lawi hydro plant, village micro-hydro schemes, Booni/Mastuj solar fields, and Shandur wind pilot. Paper logbooks and phone-call fault reporting meant operators could not see total live output, failing units, or active repairs on a single screen.",
    architectureSummary:
      "Decoupled Laravel 12 REST API (PHP) with strict role-based policies (`Admin`, `Engineer`, `Viewer`), PostgreSQL/Supabase relational persistence, a physics-modeled 5-second telemetry & alert-rule engine, and a React 18 + TypeScript SPA featuring Recharts analytics, satellite map pins, and Dockerized CI.",
    engineeringHighlights: [
      "Physics-grounded 5-second telemetry engine modeling solar irradiance curves over Chitral, wind turbine power curves on Shandur, and steady base-load hydro — swappable with real IoT gateways without UI changes.",
      "Closed-loop Alert-to-Work-Order lifecycle: rule evaluation raises deduplicated alerts (`open -> acknowledged -> resolved`); converting an alert spawns a linked Kanban work order whose completion automatically resolves the originating alert.",
      "Built PulseBot AI across two security boundaries: an authenticated Session Copilot answering strictly from real SQL operational aggregates with deep-linked React Router filters, and a zero-DB-access Public Guide grounded solely in curated docs.",
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
    id: "uniselection",
    index: "03",
    title: "UniSelection v2.0",
    subtitle: "Accredited Higher-Education Admissions, Eligibility & Scholarship App",
    category: "Flutter Mobile · Python Deterministic Sync",
    year: "2026",
    featured: true,
    simulator: "uniselection",
    repoUrl: "https://github.com/Hamdanali3/Uni_Selection",
    accentTag: "284 INSTITUTIONS · SHA-256 SYNC PARITY",
    summary:
      "Android-first Flutter mobile application and Python deterministic data-synchronization engine helping students evaluate multi-criterion university eligibility, compare verified fee schedules, track admission milestones, and access statutory scholarships across 284 accredited institutions.",
    problemStatement:
      "Pakistani and international applicants face fragmented admission deadlines, unverified scholarship rumors, and multi-weight merit formulas across hundreds of universities — where a single stale fee or eligibility threshold misleads important academic choices.",
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
    id: "edge-iiotset-pp-psfe",
    index: "04",
    title: "Edge-IIoTset & PP-PSFE: ML security study",
    subtitle: "Leakage-Sanitized 15-Class IoT Intrusion-Detection App & Study",
    category: "Applied ML · Flask REST API & Angular 22",
    year: "2026",
    featured: true,
    simulator: "edge-iiot",
    repoUrl:
      "https://github.com/Hamdanali3/Edge-IIoTset_From-a-Trained-ML-Model-to-a-Full-Stack-Research-Application",
    paperUrl:
      "https://github.com/Hamdanali3/Edge-IIoTset_From-a-Trained-ML-Model-to-a-Full-Stack-Research-Application/blob/main/Hamdan_Ali_PP-PSFE_IEEE_Paper.pdf",
    accentTag: "ML SECURITY STUDY · 96.49% ACC · 3.54ms/1K",
    summary:
      "End-to-end 15-stage full-stack ML application and study auditing data leakage in the 157,800-row Edge-IIoTset benchmark, introducing Privacy-Preserving Protocol-Header Structural Feature Engineering (PP-PSFE), and serving real-time 15-class predictions via Flask REST API and Angular 22.",
    problemStatement:
      "Published intrusion-detection benchmarks routinely claim >99% accuracy on Edge-IIoTset, yet auditing the raw files uncovered dataset build artifacts (`\"0\"` vs `\"0.0\"` type serialization, a TShark CSV comma fault, 8 constant columns, 5,414 duplicates) plus 15 lab-identifying columns (IPs, timestamps, raw payloads). Stripping those leaky columns naively collapses HTTP web-attack detection.",
    architectureSummary:
      "Leakage-sanitized preprocessing + 24 scalar PP-PSFE descriptors (62 total features) -> stratified 152,386-flow benchmark across 4 model families + TreeSHAP explainability -> serialized `sklearn.pipeline.Pipeline` (`ColumnTransformer` + `StandardScaler` + `XGBClassifier`) served via Flask REST API to an Angular 22 Standalone dashboard with GitHub Actions CI/CD.",
    engineeringHighlights: [
      "Documented 4 structural dataset flaws and removed 15 network-identifying leakage columns across 157,800 IoT/IIoT flows (`Backdoor`, `DDoS_HTTP/ICMP/TCP/UDP`, `MITM`, `Ransomware`, `SQL_injection`, `XSS`, etc.).",
      "Engineered 24 privacy-preserving scalar descriptors (port role semantics, TCP option geometry, payload Shannon entropy, HTTP request structure) before dropping raw strings — lifting hardest HTTP attack F1 from 0.44–0.66 (linear baseline) to 0.86–0.93.",
      "Selected XGBoost achieved 96.49% test accuracy, 0.9618 macro-F1, 0.9991 weighted ROC-AUC, minimal +0.0057 train-test gap, and 3.54 ms inference per 1,000 flows.",
      "Packaged the trained pipeline behind a 15-stage Flask + Angular 22 web application alongside an accompanying IEEE-format study manuscript (`Hamdan_Ali_PP-PSFE_IEEE_Paper.pdf`).",
    ],
    stack: [
      "Python",
      "XGBoost",
      "Scikit-Learn",
      "LightGBM",
      "TreeSHAP",
      "Flask REST API",
      "Angular 22",
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
    id: "taskflow",
    index: "05",
    title: "TaskFlow",
    subtitle: "Dual-Surface Laravel 12 Kanban & Sanctum REST API Platform",
    category: "Backend & Full-Stack Web App",
    year: "2026",
    featured: false,
    repoUrl: "https://github.com/Hamdanali3/HindukushSoft-Technologies-Internship/tree/main/taskflow",
    accentTag: "LARAVEL 12 · PHP 8.3 · 16/16 PHPUNIT",
    summary:
      "Multi-user project and task management web app built during an 8-week software engineering internship — pairing session-authenticated Blade Kanban workflows with a token-authenticated Laravel Sanctum JSON REST API.",
    problemStatement:
      "Clean backend engineering requires unified authorization rules across both browser sessions and external API clients without duplicating business logic or leaking cross-tenant project resources.",
    architectureSummary:
      "Laravel 12 on PHP 8.3 utilizing dedicated FormRequest validators, `ProjectPolicy` / `TaskPolicy` / `CommentPolicy` RBAC gates, Eloquent API Resources, 5 normalized migrations, Postman collection, and a 16-test PHPUnit feature suite.",
    engineeringHighlights: [
      "Shared policy and validation boundary serving both interactive Blade Kanban views and stateless Sanctum Bearer-token REST endpoints.",
      "Explicit Day 36–40 scoping: documented ERD, request-by-request `CODE_FLOW.md` trace, and clear engineering trade-off notes.",
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
    title: "Full-Stack Web & CRM Suite",
    subtitle: "Custom CRM Term Project & Progressive React UI Archive",
    category: "Frontend State, Routing & Web Foundations",
    year: "2026",
    featured: false,
    repoUrl: "https://github.com/Hamdanali3/Full-stack-programmingg-lab",
    accentTag: "REACT ROUTING · CUSTOM CRM · TYPESCRIPT",
    summary:
      "Full-stack web development archive culminating in a custom Customer Relationship Management (CRM) web application alongside modular React state management, client-side routing, and modern ES6/TypeScript UI builds.",
    problemStatement:
      "Mastering modern web frameworks starts with building state lifecycles, event delegation, responsive layouts, and multi-view CRM workflows from clean DOM primitives up to component-driven React apps.",
    architectureSummary:
      "Progressive multi-module repository spanning semantic HTML5/CSS3 layouts, ES6+ asynchronous modules, React SPA state & routing, and a full-term CRM web application.",
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
    "Intrusion-detection models evaluated on Edge-IIoTset routinely report >99% accuracy by inadvertently exploiting dataset assembly artifacts and lab-identifying network addresses. After auditing all 157,800 rows and removing 15 leaky columns, naive sanitization collapses HTTP attack detection. PP-PSFE converts protocol headers and payloads into 24 privacy-preserving scalar descriptors before deletion — recovering 0.86–0.93 F1 on the five hardest web-attack classes while running at 3.54 ms per 1,000 flows.",
  auditFindings: [
    {
      code: "AUDIT // 01",
      title: "Mixed Zero Token Serialization",
      detail:
        "Placeholder zeros serialized inconsistently as string \"0\" vs \"0.0\" across capture files, letting tree splits fingerprint capture batches instead of attack behavior.",
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
    roleSummary: "SSR/SSG web products, real-time telemetry dashboards, HTTP-only session cookies, and SPA control rooms.",
    provenByProjectIds: ["sentinel-chitral", "gridpulse", "fullstack-crm-lab"],
  },
  {
    name: "TypeScript & Frontend Interfaces",
    domain: "fullstack",
    roleSummary: "Typed end-to-end API contracts, geospatial MapLibre layers, Recharts analytics, and Angular 22 clients.",
    provenByProjectIds: ["sentinel-chitral", "gridpulse", "edge-iiotset-pp-psfe", "fullstack-crm-lab"],
  },
  {
    name: "Laravel 12 & PHP 8.3 REST APIs",
    domain: "fullstack",
    roleSummary: "Normalized relational schemas, Sanctum auth, granular RBAC Policies, FormRequests, and PHPUnit feature suites.",
    provenByProjectIds: ["gridpulse", "taskflow"],
  },
  {
    name: "Role-Scoped LLM & Groq AI Copilots",
    domain: "ai-products",
    roleSummary: "Guardrailed SQL operations copilots (PulseBot) and live hazard preparedness assistants with strict data boundaries.",
    provenByProjectIds: ["sentinel-chitral", "gridpulse"],
  },
  {
    name: "Python (FastAPI, Flask & CLI Tooling)",
    domain: "ai-products",
    roleSummary: "Risk-scoring backend services, serialized ML model REST endpoints, and deterministic idempotent sync CLIs.",
    provenByProjectIds: ["sentinel-chitral", "edge-iiotset-pp-psfe", "uniselection"],
  },
  {
    name: "XGBoost, Scikit-Learn & TreeSHAP",
    domain: "ai-products",
    roleSummary: "Leakage-sanitized tabular ML pipelines, PP-PSFE structural feature engineering, and model explainability.",
    provenByProjectIds: ["edge-iiotset-pp-psfe"],
  },
  {
    name: "Flutter & Dart Mobile Apps",
    domain: "mobile",
    roleSummary: "Android-first layered architecture, multi-criterion eligibility calculators, and 40/40 passing widget/unit tests.",
    provenByProjectIds: ["uniselection"],
  },
  {
    name: "PostgreSQL, Supabase & Cloud Firestore",
    domain: "data-devops",
    roleSummary: "Relational telemetry storage, real-time document listeners, batched 500-token FCM push, and audit logs.",
    provenByProjectIds: ["sentinel-chitral", "gridpulse", "uniselection"],
  },
  {
    name: "Docker, GitHub Actions CI & Vercel",
    domain: "data-devops",
    roleSummary: "Containerized multi-service stacks, automated lint/test release gates, SHA-256 parity checks, and edge deploys.",
    provenByProjectIds: ["sentinel-chitral", "gridpulse", "edge-iiotset-pp-psfe", "uniselection"],
  },
];

export const ENGINEERING_PRINCIPLES = [
  {
    number: "P.01",
    title: "Fail-Safe Contracts Over Silent Fallbacks",
    description:
      "In public-facing alerts and operational tools, fabricating a default value is worse than failing clearly. Sentinel Chitral returns HTTP 503 with an explicit unavailable state rather than ever inventing valley risk numbers.",
    source: "Sentinel Chitral",
  },
  {
    number: "P.02",
    title: "Role-Scoped AI Guardrails",
    description:
      "AI features belong inside explicit trust boundaries. GridPulse's PulseBot separates an authenticated RBAC SQL copilot from a public guide that has zero database access by design.",
    source: "GridPulse Control Room",
  },
  {
    number: "P.03",
    title: "Deterministic Sync & Test Gates",
    description:
      "Data pipelines should run ten times and yield zero unintended diffs. UniSelection v2.0 enforces SHA-256 seed parity between Python validators and the Flutter mobile bundle before clearing release gates.",
    source: "UniSelection v2.0",
  },
  {
    number: "P.04",
    title: "Clean Data Over Inflated Scores",
    description:
      "A 99.9% accuracy score built on leaked IP addresses breaks in production. Auditing 157,800 Edge-IIoTset flows to remove 15 leaky columns traded artificial benchmark numbers for honest generalization.",
    source: "Edge-IIoTset & PP-PSFE",
  },
];

export const JOURNEY: JourneyItem[] = [
  {
    period: "2026 — PRESENT",
    tag: "SHIPPED WEB & MOBILE PRODUCTS",
    title: "Building AI-Enabled Civic & Education Platforms",
    organization: "Sentinel Chitral & UniSelection v2.0",
    location: "Islamabad & Chitral, Pakistan",
    description:
      "Designed, tested, and deployed live early-warning software for eight Hindu Kush valleys alongside v2.0 completion of a 284-institution university admissions mobile app.",
    highlights: [
      "Shipped Sentinel Chitral on Vercel with MapLibre GL, batched 500-token FCM push alerts, PDMA admin auth, and Groq AI.",
      "Cleared 8/8 Phase 2 release gates on UniSelection v2.0 (40/40 Flutter tests, 10/10 Pytest sync tests, 0 static analysis issues).",
    ],
    linkUrl: "https://sentinelchitral-app.vercel.app",
    linkLabel: "Open Sentinel Chitral Live",
  },
  {
    period: "SUMMER — AUTUMN 2026",
    tag: "SOFTWARE ENGINEERING INTERNSHIP",
    title: "Full-Stack Developer Intern (Laravel, React & AI)",
    organization: "HindukushSoft Technologies",
    location: "Pakistan",
    description:
      "Completed an intensive 8-week engineering track progressing from core PHP/OOP and relational schema design to Laravel 12 REST APIs, React TypeScript SPAs, automated test suites, and Dockerized deployments.",
    highlights: [
      "Built TaskFlow (Laravel 12 + PHP 8.3 + Sanctum dual-surface Kanban app with 16/16 passing PHPUnit feature tests).",
      "Shipped GridPulse as the Week 8 capstone — modeling Chitral's hydro, solar, and wind fleet with 30 automated tests and PulseBot AI.",
    ],
    linkUrl: "https://grid-pulse-ruby.vercel.app",
    linkLabel: "Open GridPulse Control Room",
  },
  {
    period: "OCTOBER 2026",
    tag: "APPLIED ML & FULL-STACK BUILD",
    title: "Edge-IIoTset & PP-PSFE — ML Security Study & Web App",
    organization: "Air University · Faculty of Computing & Artificial Intelligence",
    location: "Islamabad, Pakistan",
    description:
      "Audited data leakage in the Edge-IIoTset dataset, engineered 24 privacy-preserving protocol-header descriptors (PP-PSFE), and deployed the trained XGBoost pipeline behind a Flask + Angular 22 web app.",
    highlights: [
      "Recovered 0.86–0.93 F1 on HTTP web attacks after removing 15 lab-identifying columns across 152,386 deduplicated flows.",
      "Reached 96.49% test accuracy, 0.9618 macro-F1, and 3.54 ms / 1k flow inference with TreeSHAP explainability.",
    ],
    linkUrl:
      "https://github.com/Hamdanali3/Edge-IIoTset_From-a-Trained-ML-Model-to-a-Full-Stack-Research-Application",
    linkLabel: "View Project Repository",
  },
  {
    period: "UNDERGRADUATE TRACK",
    tag: "EDUCATION",
    title: "Bachelor of Science in Software Engineering",
    organization: "Air University, Islamabad",
    location: "Department of Creative Technologies · FCAI",
    description:
      "Undergraduate software engineering coursework focused on full-stack web development, mobile apps, database design, CI/CD automation, and practical AI integration.",
    highlights: [
      "Built custom CRM web apps, React state/routing projects, and end-to-end API + ML deployments.",
      "Focused capstones and side projects on practical tools for communities and students across Pakistan.",
    ],
    linkUrl: "https://github.com/Hamdanali3",
    linkLabel: "GitHub Profile (@Hamdanali3)",
  },
];
