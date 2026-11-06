# Hamdan Ali — Portfolio

Personal portfolio of **Hamdan Ali** (`@Hamdanali3`) — **Full-Stack Developer · AI-Powered Products** (BS Software Engineering student at **Air University, Islamabad** · **HindukushSoft Technologies** internship alumnus).

Live site: [https://hamdana-ali-portfolio.vercel.app/](https://hamdana-ali-portfolio.vercel.app/)

---

## Key Features

- **Multilingual Urdu → English First-Load Greeting:** Displays `"ہمدان علی"` (`lang="ur"`, `dir="rtl"`, `Noto Nastaliq Urdu`) → `"میں ہمدان علی ہوں"` → `"I am Hamdan Ali"` before settling into the Hero with zero layout shift (`CLS = 0`). Skippable via click or `Esc`, shown once per session (`sessionStorage` in `try/catch`), and skipped automatically when `prefers-reduced-motion` is enabled.
- **Interactive Project Simulators & Case Studies:** Live interactive previews for **Sentinel Chitral**, **GridPulse**, **UniSelection v2.0**, and **Edge-IIoTset & PP-PSFE: ML security study**, plus **TaskFlow** and **Full-Stack Web & CRM Suite**.
- **Field Notes (Events & Gallery):** Data-driven **Top 5 Highlights** strip (`featured: true`) and filterable masonry photo archive with a keyboard- and swipe-accessible `<dialog>` lightbox.
- **Adaptive Obsidian Dark / Archival Paper Light Theme:** Zero-FOUC CSS `light-dark()` tokens calibrated for WCAG AA contrast (`>= 4.5:1`), native CSS `animation-timeline: scroll()` progress indicator, and `⌘K` / `Ctrl+K` Command Palette.

---

## Updating Your Portrait & Field Notes (Events & Gallery)

### 1. Replace Your Hero Portrait Photo
Drop a high-resolution portrait JPEG (recommended square `1000×1000` or `4:5` portrait) at:
```text
public/images/hamdan.jpg
```
Because `HeroSection.tsx` statically imports `public/images/hamdan.jpg` via `next/image`, Next.js automatically generates responsive WebP/AVIF sizes and a blur-up placeholder on the next build.

### 2. Add or Edit Events in `Field Notes`
All highlights and gallery photos come from **one typed file**:
```text
content/events.ts
```
1. Drop your event photos (`.jpg`, `.png`, or `.webp`) into:
   ```text
   public/events/
   ```
2. Open [`content/events.ts`](./content/events.ts), copy the ready-to-use template entry at the top of the file into `EVENTS`, and remove the `placeholder-*` entries:
   ```ts
   {
     id: "devfest-islamabad-2026",
     title: "GDG DevFest Islamabad",
     date: "Nov 2026",
     location: "Islamabad, Pakistan",
     role: "Full-Stack Builder",
     description: "Demoed Sentinel Chitral's 8-valley push alert workflow with fellow builders.",
     tags: ["Community", "AI Products"],
     featured: true, // true = shown in "Top 5 Highlights" strip (up to 5 items)
     images: [
       {
         src: "/events/devfest-1.jpg",
         alt: "Hamdan Ali presenting Sentinel Chitral on laptop at DevFest Islamabad",
         width: 1200,
         height: 800,
       },
     ],
   }
   ```
3. **Auto-hide behavior:** If `EVENTS` is set to an empty array (`[]`), the `Field Notes` section and its navigation links hide automatically.

### 3. Restoring the Standalone ML Research Section Later
The standalone `ResearchSpotlight` section is preserved in [`src/components/sections/ResearchSpotlight.tsx`](./src/components/sections/ResearchSpotlight.tsx). To re-enable it alongside future papers, flip `ENABLE_RESEARCH_SPOTLIGHT` to `true` at the top of [`src/app/page.tsx`](./src/app/page.tsx).

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
