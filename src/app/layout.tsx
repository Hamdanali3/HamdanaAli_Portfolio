import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Instrument_Serif,
  JetBrains_Mono,
  Noto_Nastaliq_Urdu,
} from "next/font/google";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  buildSiteGraphJsonLd,
} from "@/lib/site";
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

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  variable: "--font-noto-urdu",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Hamdan Ali | Full-Stack Developer · AI-Powered Products",
  description:
    "Portfolio of Hamdan Ali: Full-Stack Developer building AI-powered web applications, Flutter mobile apps, and reliable backend APIs (Sentinel Chitral, GridPulse, UniSelection v2.0). BS Software Engineering at Air University Islamabad.",
  keywords: [
    "Hamdan Ali",
    "Full-Stack Developer",
    "AI-Powered Products",
    "Software Engineer",
    "Next.js Developer",
    "TypeScript",
    "Laravel 12",
    "Flutter Developer",
    "Sentinel Chitral",
    "GridPulse",
    "UniSelection",
    "Air University Islamabad",
    "Pakistan Software Developer",
  ],
  authors: [{ name: "Hamdan Ali", url: "https://github.com/Hamdanali3" }],
  creator: "Hamdan Ali",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon",
  },
  openGraph: {
    title: "Hamdan Ali | Full-Stack Developer · AI-Powered Products",
    description:
      "Full-Stack Developer building AI-powered web platforms, Flutter mobile apps, and resilient cloud APIs, from Chitral hazard alerts to university admissions software.",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Hamdan Ali: Full-Stack Developer building AI-powered web and mobile products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamdan Ali | Full-Stack Developer · AI-Powered Products",
    description:
      "Full-Stack Developer building AI-powered web platforms, Flutter mobile apps, and resilient cloud APIs.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: "Hamdan Ali: Full-Stack Developer building AI-powered web and mobile products",
      },
    ],
  },
};

const initHeadScript = `try{var s=localStorage.getItem("color-scheme");if(s==="light"||s==="dark"){var m=document.querySelector('meta[name="color-scheme"]');if(m)m.content=s;}}catch(e){}`;

const siteGraphJsonLd = buildSiteGraphJsonLd();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${notoNastaliqUrdu.variable} h-full antialiased`}
    >
      <head>
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: initHeadScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraphJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col relative selection:bg-signal-fill selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2.5 focus:rounded-full focus:bg-signal-fill focus:text-white focus:font-mono focus:text-xs"
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
