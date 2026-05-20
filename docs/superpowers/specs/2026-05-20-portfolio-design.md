# Portfolio Design Spec — Bùi Quang Trưởng

**Date:** 2026-05-20  
**Status:** Approved

---

## Overview

A personal developer portfolio website showcasing full-stack & Shopify expertise. Editorial, typographic aesthetic — no photo, no gimmicks. Clean and memorable.

---

## Aesthetic Direction

| Property | Decision |
|---|---|
| Theme | **Cream + Ink** — light, editorial magazine |
| Background | `#f5f2ed` (warm cream) |
| Text primary | `#1a1a1a` (ink black) |
| Text secondary | `#888888` |
| Border / dividers | `#e0ddd8` |
| Accent | `#1a1a1a` (no color accent — pure B&W) |
| Font headings | Georgia, serif — large, tight letter-spacing |
| Font body/labels | System sans-serif (Arial / ui-sans-serif) |
| Photo | None — geometric decorative shapes as visual substitute |

---

## Layout

**Hero:** Left-aligned editorial. Name in large serif, stacked vertically. Role label above in small caps. Decorative geometric circles (border-only) float right side. Horizontal rule animates in. No centered layout.

**Responsive strategy — mobile-first:**
- Mobile (< 640px): single column, nav collapses to hamburger, hero name scales down to ~38px
- Tablet (640–1024px): 2-col grids where applicable
- Desktop (> 1024px): full asymmetric layout, experience 3-col

---

## Sections

### 01 — Hero
- Logo: `BQT` monogram, small caps left
- Nav: About · Skills · Work · Contact + VI/EN toggle right
- Name: `Bùi / Quang / Trưởng` stacked, 60–80px desktop
- Subtitle: role + key tech in small caps
- Short tagline: "Building Shopify apps used by 5,500+ merchants."
- CTA buttons: `View Work` (filled) + `Contact` (outline)
- Scroll hint bottom-right
- Decorative: 2 concentric border circles, top-right quadrant

### 02 — About
- 2-col: bio text left, rotating geometric shape right (CSS transform animation)
- 3–4 sentences max from CV summary
- No photo

### 03 — Skills
- Grouped by category: Shopify Ecosystem · Frontend · Backend · Database & DevOps
- Each skill is a pill/tag — highlighted pills for core skills (React, TypeScript, Node.js, Liquid, Polaris)
- Categories fade in staggered on scroll

### 04 — Experience
- Desktop: 3-column horizontal (BSS · VCCorp · Draphony)
- Mobile: vertical stacked timeline with left border line + dots
- Each item: company, role, date, 2–3 bullet points (hidden on mobile, expand on tap)
- Slide in from left on scroll

### 05 — Projects
- 2-col grid desktop, 1-col mobile
- Each card: project name, tech stack tags, merchant stat badge, live link
- Cards: border `#e0ddd8`, hover → lift 4px + border darkens
- Projects: OPTIS Product Options · OP Color Swatch

### 06 — Contact
- Horizontal 3-zone desktop: big title left · links center · CTA right
- Mobile: stacked, centered
- Links: email + GitHub
- No contact form (keep simple)

---

## Animations

| Trigger | Effect |
|---|---|
| Page load | Hero name lines stagger up (opacity 0→1, y 20→0), 80ms delay each |
| Page load | Decorative circles scale in (0.8→1, opacity 0→1) after 400ms |
| Scroll into view | Each section fades + slides up 24px, duration 0.5s |
| Hover card | translateY(-4px), border-color darkens, transition 200ms |
| Hover nav link | Underline draws left→right, 200ms |
| Lang toggle (VI↔EN) | Cross-fade opacity, 150ms |
| Geometric shape | Slow continuous rotation (30s, CSS keyframe) |

**Library:** Framer Motion for scroll-triggered reveals + page load. CSS keyframes for continuous shape rotation.

---

## Internationalisation

- **Default language:** Vietnamese
- **Second language:** English
- **Implementation:** `next-intl` — file-based messages in `/messages/vi.json` + `/messages/en.json`
- Toggle in navbar, persisted to `localStorage`
- Designed to extend to additional locales with no structural changes

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR/SSG for SEO, React dev can showcase own stack |
| Styling | Tailwind CSS | Utility-first, responsive breakpoints clean |
| Animation | Framer Motion | Scroll reveals, spring physics, simple API |
| i18n | next-intl | Best Next.js i18n solution, type-safe |
| Language | TypeScript | Type safety, professionalism |
| Deployment | Vercel | Zero-config Next.js deploy |

---

## Responsive Breakpoints

```
sm:  640px  — 2-col grids unlock
md:  768px  — nav expands from hamburger
lg:  1024px — full desktop layout (3-col experience, hero full size)
xl:  1280px — max content width cap at 1200px
```

---

## File Structure

```
src/
  app/
    [locale]/
      layout.tsx
      page.tsx          ← assembles all sections
  components/
    sections/
      hero.tsx
      about.tsx
      skills.tsx
      experience.tsx
      projects.tsx
      contact.tsx
    ui/
      nav.tsx
      lang-toggle.tsx
      skill-tag.tsx
      project-card.tsx
  messages/
    vi.json
    en.json
  styles/
    globals.css
```

---

## Success Criteria

- Loads in < 2s on 4G mobile
- All 6 sections present, VI/EN toggles correctly
- Animations run at 60fps (no jank on mid-range devices)
- Fully responsive from 375px (iPhone SE) to 1440px+
- Passes Lighthouse performance > 90, accessibility > 85
