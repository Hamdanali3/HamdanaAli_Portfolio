# Hamdan Ali · Portfolio

Personal portfolio of **Hamdan Ali** (`@Hamdanali3`), **Full-Stack Developer · AI-Powered Products** (BS Software Engineering student at **Air University, Islamabad** · **HindukushSoft Technologies** internship alumnus).

Live site: [https://hamdana-ali-portfolio.vercel.app/](https://hamdana-ali-portfolio.vercel.app/)

---

## Multi-Page URL & SEO Architecture

Every section and project case study is served at its own dedicated, server-rendered URL with a unique `<title>`, `<meta name="description">`, `<link rel="canonical">`, single `<h1>`, semantic breadcrumbs (`BreadcrumbList` JSON-LD), OpenGraph/Twitter shared image, and `ProfessionalService` + `Person` + `WebSite` structured data:

- `/` : Home Overview
- `/work` : Selected Work & Case Studies Index
- `/work/sentinel-chitral` : Sentinel Chitral Case Study
- `/work/gridpulse` : GridPulse Case Study
- `/work/uniselection` : UniSelection v2.0 Case Study
- `/work/edge-iiotset-pp-psfe` : Edge-IIoTset & PP-PSFE ML Security Case Study
- `/work/taskflow` : TaskFlow Case Study
- `/work/fullstack-crm-lab` : Full-Stack Web & CRM Suite Case Study
- `/field-notes` : Field Notes & Event Gallery
- `/stack` : Proof-Backed Technical Stack & Engineering Principles
- `/journey` : Engineering Journey & Education
- `/contact` : Direct Contact & Collaboration
- `/sitemap.xml` & `/robots.txt` : Programmatic XML Sitemap and Crawler Directives

---

## Connecting a Custom Domain on Vercel

All canonical URLs, OpenGraph links, `sitemap.xml`, `robots.txt`, and JSON-LD `@id` references are centrally generated from `src/lib/site.ts` via `NEXT_PUBLIC_SITE_URL`.

1. Connect your domain in Vercel Dashboard (**Project Settings -> Domains**) or via CLI:
   ```bash
   vercel domains add hamdanali.dev
   ```
2. Set `NEXT_PUBLIC_SITE_URL` in your Vercel Environment Variables:
   ```env
   NEXT_PUBLIC_SITE_URL=https://hamdanali.dev
   ```
3. Trigger a redeploy so `sitemap.xml`, `robots.txt`, and all `<link rel="canonical">` tags resolve to your custom domain.

---

## Updating Your Portrait & Field Notes (Events & Gallery)

### 1. Replace Your Hero Portrait Photo
Drop a high-resolution portrait JPEG at:
```text
public/images/hamdan.jpg
```
`HeroSection.tsx` statically imports `public/images/hamdan.jpg` via `next/image`, automatically generating responsive WebP/AVIF sizes and a blur-up placeholder on build.

### 2. Add or Edit Events in `Field Notes`
All highlights and gallery photos come from **one typed file**:
```text
content/events.ts
```
1. Drop your event photos (`.jpg`, `.png`, or `.webp`) into `public/events/`.
2. Open [`content/events.ts`](./content/events.ts) and add or edit entries in `EVENTS`.
3. If `EVENTS` is set to an empty array (`[]`), the `Field Notes` section hides automatically.

---

## Local Development & Verification

```bash
npm install
npm run dev
```

Run full verification before pushing:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

---

## Contact

- **GitHub:** [@Hamdanali3](https://github.com/Hamdanali3)
- **Email:** [Hamdanaly651@gmail.com](mailto:Hamdanaly651@gmail.com)
