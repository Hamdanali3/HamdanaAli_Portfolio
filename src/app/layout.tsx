import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Hamdan Ali — Software Engineer, Systems Architect & ML Security Researcher",
  description:
    "Portfolio of Hamdan Ali — Full-Stack Software Engineer, Mobile Architect, and Applied ML Security Researcher building mission-critical telemetry systems (Sentinel Chitral, GridPulse), accredited higher-ed platforms (UniSelection v2.0), and IEEE intrusion-detection frameworks (PP-PSFE).",
  keywords: [
    "Hamdan Ali",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js",
    "Laravel",
    "Flutter",
    "Machine Learning Security",
    "Sentinel Chitral",
    "GridPulse",
    "Edge-IIoTset",
    "PP-PSFE",
    "Air University Islamabad",
  ],
  authors: [{ name: "Hamdan Ali", url: "https://github.com/Hamdanali3" }],
  openGraph: {
    title: "Hamdan Ali — Full-Stack Systems Architect & ML Researcher",
    description:
      "Engineering mission-critical regional telemetry, scalable full-stack platforms, and leakage-sanitized cybersecurity ML systems.",
    type: "website",
    locale: "en_US",
  },
};

const themeInitScript = `try{var s=localStorage.getItem("color-scheme");if(s==="light"||s==="dark"){var m=document.querySelector('meta[name="color-scheme"]');if(m)m.content=s;}}catch(e){}`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hamdan Ali",
  url: "https://github.com/Hamdanali3",
  email: "mailto:Hamdanaly651@gmail.com",
  jobTitle: "Software Engineer & Applied ML Security Researcher",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Air University, Islamabad",
  },
  sameAs: ["https://github.com/Hamdanali3"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col relative selection:bg-signal selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-full focus:bg-signal focus:text-white focus:font-mono focus:text-xs"
        >
          Skip to main content
        </a>
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[60] film-grain"
        />
        {children}
      </body>
    </html>
  );
}
