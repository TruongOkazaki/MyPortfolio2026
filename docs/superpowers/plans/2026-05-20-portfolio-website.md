# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready personal portfolio for Bùi Quang Trưởng — Cream + Ink editorial aesthetic, VI/EN i18n, Framer Motion animations, fully responsive from 375px to 1440px+.

**Architecture:** Next.js 14 App Router with `[locale]` dynamic segment for i18n via `next-intl`. All CV data lives in a single `src/lib/data.ts` file. Each page section is an isolated React component under `src/components/sections/`. Framer Motion handles scroll-triggered reveals and page-load animations; continuous CSS keyframes for decorative elements.

**Tech Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · next-intl · Google Fonts (via `next/font`)

**Spec:** `docs/superpowers/specs/2026-05-20-portfolio-design.md`

---

## File Map

| File | Responsibility |
|---|---|
| `src/app/[locale]/layout.tsx` | Root layout: locale provider, font injection, nav, metadata |
| `src/app/[locale]/page.tsx` | Page assembly — imports all 6 section components |
| `src/app/globals.css` | CSS variables, Tailwind base, custom utilities |
| `src/middleware.ts` | next-intl locale detection + routing |
| `src/i18n/routing.ts` | Locale list + default locale config |
| `src/i18n/request.ts` | next-intl server-side request config |
| `src/lib/data.ts` | All static CV content (typed) — skills, experience, projects |
| `src/messages/vi.json` | Vietnamese UI strings |
| `src/messages/en.json` | English UI strings |
| `src/components/layout/nav.tsx` | Top nav: logo, links, lang toggle, mobile hamburger |
| `src/components/layout/lang-toggle.tsx` | VI / EN switcher button |
| `src/components/ui/section-wrapper.tsx` | Framer Motion scroll-reveal wrapper |
| `src/components/ui/skill-tag.tsx` | Pill tag for skills (highlighted variant) |
| `src/components/ui/project-card.tsx` | Project card with hover lift animation |
| `src/components/sections/hero.tsx` | Hero: name, role, CTA, decorative circles |
| `src/components/sections/about.tsx` | About: bio text + rotating geometric shape |
| `src/components/sections/skills.tsx` | Skills grouped by category |
| `src/components/sections/experience.tsx` | Work history: 3-col desktop, timeline mobile |
| `src/components/sections/projects.tsx` | Featured projects grid |
| `src/components/sections/contact.tsx` | Contact: email + GitHub links |

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`, `.gitignore`

- [ ] **Step 1: Bootstrap Next.js project**

Run in `c:\MyProject\MyPrortfolio`:
```bash
npx create-next-app@14 . --typescript --tailwind --app --src-dir --import-alias "@/*" --no-eslint
```
When prompted, answer: Yes to all defaults.

- [ ] **Step 2: Install dependencies**

```bash
npm install framer-motion next-intl
npm install -D @types/node
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```
Expected: Server starts at `http://localhost:3000` with default Next.js page. Kill it (`Ctrl+C`).

- [ ] **Step 4: Clean default files**

Delete these files:
- `src/app/page.tsx` (will recreate)
- `src/app/globals.css` (will recreate)
- `public/vercel.svg`, `public/next.svg`

- [ ] **Step 5: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js 14 project with Tailwind and Framer Motion"
```

---

## Task 2: Global Styles & CSS Variables

**Files:**
- Create: `src/app/globals.css`

- [ ] **Step 1: Write globals.css**

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --cream: #f5f2ed;
  --ink: #1a1a1a;
  --ink-light: #444444;
  --muted: #888888;
  --border: #e0ddd8;
  --border-dark: #c8c4bc;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--cream);
  color: var(--ink);
  font-family: ui-sans-serif, system-ui, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

@layer utilities {
  .font-serif {
    font-family: Georgia, 'Times New Roman', serif;
  }
  .text-muted {
    color: var(--muted);
  }
  .border-cream {
    border-color: var(--border);
  }
}

/* Decorative geometric rotation */
@keyframes slow-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.geo-spin {
  animation: slow-spin 30s linear infinite;
}

/* Nav underline draw */
.nav-link {
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--ink);
  transition: width 0.2s ease;
}
.nav-link:hover::after {
  width: 100%;
}
```

- [ ] **Step 2: Update tailwind.config.ts**

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f5f2ed',
        ink: '#1a1a1a',
        'ink-light': '#444444',
        muted: '#888888',
        border: '#e0ddd8',
        'border-dark': '#c8c4bc',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['ui-sans-serif', 'system-ui', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css tailwind.config.ts
git commit -m "style: add global CSS variables and Tailwind config"
```

---

## Task 3: i18n Setup (next-intl)

**Files:**
- Create: `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/middleware.ts`
- Modify: `next.config.ts`

- [ ] **Step 1: Create routing config**

```typescript
// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
})
```

- [ ] **Step 2: Create request config**

```typescript
// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as 'vi' | 'en')) {
    locale = routing.defaultLocale
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
```

- [ ] **Step 3: Create middleware**

```typescript
// src/middleware.ts
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
}
```

- [ ] **Step 4: Update next.config.ts**

```typescript
// next.config.ts
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {}

export default withNextIntl(nextConfig)
```

- [ ] **Step 5: Create app router structure**

Create the directory `src/app/[locale]/` and move or create these empty placeholder files:
- `src/app/[locale]/layout.tsx` (placeholder — will fill in Task 5)
- `src/app/[locale]/page.tsx` (placeholder — will fill in Task 12)

Placeholder content for both:
```typescript
export default function Placeholder() {
  return <div>placeholder</div>
}
```

- [ ] **Step 6: Verify build compiles**

```bash
npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 7: Commit**

```bash
git add src/i18n/ src/middleware.ts next.config.ts src/app/
git commit -m "feat: add next-intl i18n routing with VI/EN locales"
```

---

## Task 4: Message Files (VI + EN)

**Files:**
- Create: `src/messages/vi.json`, `src/messages/en.json`

- [ ] **Step 1: Create Vietnamese messages**

```json
// src/messages/vi.json
{
  "nav": {
    "about": "Giới thiệu",
    "skills": "Kỹ năng",
    "experience": "Kinh nghiệm",
    "projects": "Dự án",
    "contact": "Liên hệ"
  },
  "hero": {
    "role": "Full-stack Developer · Shopify",
    "tagline": "Xây dựng Shopify app phục vụ 5,500+ merchants.",
    "cta_work": "Xem dự án",
    "cta_contact": "Liên hệ",
    "scroll": "Cuộn xuống"
  },
  "about": {
    "title": "Giới thiệu",
    "bio": "Tôi là Trưởng — full-stack developer với gần 2 năm kinh nghiệm xây dựng Shopify app, internal tooling và hệ thống microservices. Hiện tại đang phát triển các app phục vụ hơn 5,500 merchant tại BSS Commerce với hơn 1,550 đánh giá 5 sao.",
    "bio2": "Chuyên sâu về React, Remix, TypeScript và Node.js với kiến thức vững về hệ sinh thái Shopify. Hướng đến vai trò Software Architect trong tương lai."
  },
  "skills": {
    "title": "Kỹ năng",
    "shopify": "Shopify",
    "frontend": "Frontend",
    "backend": "Backend",
    "database": "Database & DevOps"
  },
  "experience": {
    "title": "Kinh nghiệm",
    "present": "Hiện tại",
    "bss_role": "Full-stack Developer",
    "bss_desc1": "Phát triển 2 Shopify app production phục vụ 5,500+ merchants với 1,550+ đánh giá 5 sao.",
    "bss_desc2": "Xây dựng tính năng end-to-end: column width, translation import/export, live preview, conditional logic.",
    "bss_desc3": "Hỗ trợ kỹ thuật và tích hợp tùy chỉnh cho 50+ enterprise merchants.",
    "vcc_role": "Front-end Intern",
    "vcc_desc1": "Xây dựng tính năng UI với Vue.js và PrimeVue trong dự án production thực tế.",
    "dra_role": "Full-stack Developer Intern",
    "dra_desc1": "Xây dựng tính năng full-stack với SvelteKit và Node.js microservices.",
    "dra_desc2": "Tích hợp Apache Kafka cho event-driven messaging giữa các services."
  },
  "projects": {
    "title": "Dự án",
    "merchants": "merchants",
    "rating": "đánh giá",
    "live": "Xem live",
    "optis_desc": "Hệ thống quản lý variant nâng cao với unlimited options, custom fields và conditional logic.",
    "swatch_desc": "Hệ thống hiển thị variant bằng color swatches — ghi đè hoàn toàn selector mặc định của Shopify."
  },
  "contact": {
    "title": "Liên hệ",
    "subtitle": "Hãy cùng làm việc",
    "email_label": "Email",
    "github_label": "GitHub",
    "cta": "Gửi email"
  }
}
```

- [ ] **Step 2: Create English messages**

```json
// src/messages/en.json
{
  "nav": {
    "about": "About",
    "skills": "Skills",
    "experience": "Experience",
    "projects": "Projects",
    "contact": "Contact"
  },
  "hero": {
    "role": "Full-stack Developer · Shopify",
    "tagline": "Building Shopify apps used by 5,500+ merchants.",
    "cta_work": "View Work",
    "cta_contact": "Contact",
    "scroll": "Scroll"
  },
  "about": {
    "title": "About",
    "bio": "I'm Trưởng — a full-stack developer with nearly 2 years of experience across Shopify app development, internal tooling, and microservices-based systems. Currently building apps serving 5,500+ merchants at BSS Commerce with 1,550+ five-star reviews.",
    "bio2": "Specialized in React, Remix, TypeScript, and Node.js with deep familiarity in the Shopify ecosystem. Growing toward a software architect role."
  },
  "skills": {
    "title": "Skills",
    "shopify": "Shopify",
    "frontend": "Frontend",
    "backend": "Backend",
    "database": "Database & DevOps"
  },
  "experience": {
    "title": "Experience",
    "present": "Present",
    "bss_role": "Full-stack Developer",
    "bss_desc1": "Develop and maintain 2 production Shopify apps serving 5,500+ merchants with 1,550+ five-star reviews.",
    "bss_desc2": "Build end-to-end features: column width customization, translation import/export, live preview, conditional logic.",
    "bss_desc3": "Technical support and custom integration for 50+ enterprise merchants.",
    "vcc_role": "Front-end Intern",
    "vcc_desc1": "Built UI features using Vue.js and PrimeVue in real production projects.",
    "dra_role": "Full-stack Developer Intern",
    "dra_desc1": "Built full-stack features with SvelteKit and Node.js microservices.",
    "dra_desc2": "Integrated Apache Kafka for event-driven messaging between services."
  },
  "projects": {
    "title": "Projects",
    "merchants": "merchants",
    "rating": "rating",
    "live": "View live",
    "optis_desc": "Advanced variant management system with unlimited options, custom fields, and conditional logic.",
    "swatch_desc": "Variant visualization system using color swatches — fully overrides Shopify's default selectors."
  },
  "contact": {
    "title": "Contact",
    "subtitle": "Let's work together",
    "email_label": "Email",
    "github_label": "GitHub",
    "cta": "Send Email"
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/messages/
git commit -m "feat: add VI and EN message files for i18n"
```

---

## Task 5: Static CV Data

**Files:**
- Create: `src/lib/data.ts`

- [ ] **Step 1: Write data.ts**

```typescript
// src/lib/data.ts

export type SkillGroup = {
  key: string
  skills: { name: string; highlight?: boolean }[]
}

export const skillGroups: SkillGroup[] = [
  {
    key: 'shopify',
    skills: [
      { name: 'Liquid', highlight: true },
      { name: 'Polaris', highlight: true },
      { name: 'Admin GraphQL API', highlight: true },
      { name: 'Storefront API' },
      { name: 'Theme App Extensions' },
      { name: 'Metafields / Metaobjects' },
      { name: 'App Bridge' },
      { name: 'Webhooks' },
    ],
  },
  {
    key: 'frontend',
    skills: [
      { name: 'React', highlight: true },
      { name: 'TypeScript', highlight: true },
      { name: 'Next.js', highlight: true },
      { name: 'Remix' },
      { name: 'Vue.js' },
      { name: 'Svelte / SvelteKit' },
      { name: 'Tailwind CSS' },
      { name: 'Framer Motion' },
      { name: 'React Query' },
      { name: 'Zustand' },
    ],
  },
  {
    key: 'backend',
    skills: [
      { name: 'Node.js', highlight: true },
      { name: 'NestJS' },
      { name: 'Koa.js' },
      { name: 'Express.js' },
      { name: 'Spring Boot' },
      { name: 'GraphQL' },
      { name: 'REST' },
    ],
  },
  {
    key: 'database',
    skills: [
      { name: 'PostgreSQL', highlight: true },
      { name: 'MySQL' },
      { name: 'MongoDB' },
      { name: 'Prisma' },
      { name: 'TypeORM' },
      { name: 'Sequelize' },
      { name: 'Docker' },
      { name: 'Redis' },
      { name: 'GitHub Actions' },
    ],
  },
]

export type ExperienceItem = {
  company: string
  role: string
  roleKey: string
  period: string
  periodEnd: string
  descKeys: string[]
}

export const experiences: ExperienceItem[] = [
  {
    company: 'BSS Group',
    role: 'Full-stack Developer',
    roleKey: 'bss_role',
    period: '03/2025',
    periodEnd: 'present',
    descKeys: ['bss_desc1', 'bss_desc2', 'bss_desc3'],
  },
  {
    company: 'VCCorp',
    role: 'Front-end Intern',
    roleKey: 'vcc_role',
    period: '10/2024',
    periodEnd: '02/2025',
    descKeys: ['vcc_desc1'],
  },
  {
    company: 'Draphony',
    role: 'Full-stack Developer Intern',
    roleKey: 'dra_role',
    period: '07/2024',
    periodEnd: '09/2024',
    descKeys: ['dra_desc1', 'dra_desc2'],
  },
]

export type Project = {
  name: string
  techStack: string
  statValue: string
  statSuffix: string
  descKey: string
  liveUrl: string
}

export const projects: Project[] = [
  {
    name: 'OPTIS Product Options',
    techStack: 'React.js · Node.js · Koa.js · GraphQL · MySQL · Sequelize',
    statValue: '5,000+',
    statSuffix: 'merchants',
    descKey: 'optis_desc',
    liveUrl: 'https://apps.shopify.com/product-options-by-bss',
  },
  {
    name: 'OP Color Swatch',
    techStack: 'Remix · Lit · TypeScript · NestJS · MySQL · TypeORM',
    statValue: '5.0 ★',
    statSuffix: 'rating',
    descKey: 'swatch_desc',
    liveUrl: 'https://apps.shopify.com/optis-color-swatch-variants',
  },
]

export const contactInfo = {
  email: 'buiquangtruong1105@gmail.com',
  github: 'github.com/OkazakiTruong',
  githubUrl: 'https://github.com/OkazakiTruong',
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/data.ts
git commit -m "feat: add static CV data types and content"
```

---

## Task 6: Root Layout & Nav

**Files:**
- Create: `src/app/[locale]/layout.tsx`, `src/components/layout/nav.tsx`, `src/components/layout/lang-toggle.tsx`

- [ ] **Step 1: Create LangToggle component**

```typescript
// src/components/layout/lang-toggle.tsx
'use client'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { routing } from '@/i18n/routing'

export default function LangToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function toggle() {
    const next = locale === 'vi' ? 'en' : 'vi'
    // Replace the locale prefix in the current path
    const newPath = pathname.replace(`/${locale}`, `/${next}`)
    router.push(newPath)
  }

  return (
    <button
      onClick={toggle}
      className="text-[10px] tracking-[3px] uppercase border border-[#e0ddd8] px-2 py-1 text-muted hover:border-[#c8c4bc] hover:text-ink transition-colors duration-150"
      aria-label="Toggle language"
    >
      {locale === 'vi' ? 'EN' : 'VI'}
    </button>
  )
}
```

- [ ] **Step 2: Create Nav component**

```typescript
// src/components/layout/nav.tsx
'use client'
import { useTranslations } from 'next-intl'
import LangToggle from './lang-toggle'
import { useState } from 'react'

const navIds = ['about', 'skills', 'experience', 'projects', 'contact'] as const

export default function Nav() {
  const t = useTranslations('nav')
  const [open, setOpen] = useState(false)

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-[#e0ddd8]">
      <div className="max-w-content mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        {/* Logo */}
        <span className="text-[11px] tracking-[4px] uppercase text-muted font-sans select-none">
          BQT
        </span>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {navIds.map((id) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className="nav-link text-[10px] tracking-[2px] uppercase text-muted hover:text-ink transition-colors duration-150 font-sans pb-0.5"
              >
                {t(id)}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LangToggle />
          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span className={`block w-5 h-px bg-ink transition-all ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-5 h-px bg-ink transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-ink transition-all ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-cream border-t border-[#e0ddd8] px-6 py-4 flex flex-col gap-4">
          {navIds.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left text-[11px] tracking-[3px] uppercase text-muted hover:text-ink transition-colors"
            >
              {t(id)}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 3: Create root layout**

```typescript
// src/app/[locale]/layout.tsx
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Nav from '@/components/layout/nav'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Bùi Quang Trưởng — Full-stack Developer',
  description:
    'Full-stack developer specializing in Shopify app development, React, TypeScript, and Node.js. Building apps used by 5,500+ merchants.',
}

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as 'vi' | 'en')) notFound()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className="bg-cream text-ink antialiased">
        <NextIntlClientProvider messages={messages}>
          <Nav />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Verify build**

```bash
npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/[locale]/layout.tsx src/components/layout/
git commit -m "feat: add root layout, nav, and lang toggle components"
```

---

## Task 7: SectionWrapper Animation Component

**Files:**
- Create: `src/components/ui/section-wrapper.tsx`

- [ ] **Step 1: Create SectionWrapper**

```typescript
// src/components/ui/section-wrapper.tsx
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  id?: string
  delay?: number
}

export default function SectionWrapper({ children, className = '', id, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/section-wrapper.tsx
git commit -m "feat: add scroll-triggered SectionWrapper with Framer Motion"
```

---

## Task 8: UI Primitives — SkillTag & ProjectCard

**Files:**
- Create: `src/components/ui/skill-tag.tsx`, `src/components/ui/project-card.tsx`

- [ ] **Step 1: Create SkillTag**

```typescript
// src/components/ui/skill-tag.tsx
type Props = {
  name: string
  highlight?: boolean
}

export default function SkillTag({ name, highlight }: Props) {
  return (
    <span
      className={`inline-block text-[10px] tracking-[1px] uppercase px-2.5 py-1 border font-sans transition-colors ${
        highlight
          ? 'bg-ink text-cream border-ink'
          : 'bg-transparent text-ink-light border-[#e0ddd8] hover:border-[#c8c4bc]'
      }`}
    >
      {name}
    </span>
  )
}
```

- [ ] **Step 2: Create ProjectCard**

```typescript
// src/components/ui/project-card.tsx
'use client'
import { motion } from 'framer-motion'
import type { Project } from '@/lib/data'

type Props = {
  project: Project
  desc: string
  liveLabel: string
}

export default function ProjectCard({ project, desc, liveLabel }: Props) {
  return (
    <motion.article
      className="border border-[#e0ddd8] p-6 flex flex-col gap-4 cursor-default"
      whileHover={{ y: -4, borderColor: '#c8c4bc' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div>
        <h3 className="font-serif text-lg font-bold text-ink tracking-tight leading-tight">
          {project.name}
        </h3>
        <p className="text-[10px] tracking-[1px] uppercase text-muted font-sans mt-1">
          {project.techStack}
        </p>
      </div>

      <p className="text-sm text-ink-light font-sans leading-relaxed">{desc}</p>

      <div className="flex items-end justify-between mt-auto">
        <span className="text-[11px] font-sans text-muted">
          <span className="text-ink font-bold">{project.statValue}</span>{' '}
          {project.statSuffix}
        </span>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-[2px] uppercase font-sans border-b border-ink pb-px hover:text-muted hover:border-muted transition-colors"
        >
          {liveLabel} →
        </a>
      </div>
    </motion.article>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/skill-tag.tsx src/components/ui/project-card.tsx
git commit -m "feat: add SkillTag and ProjectCard UI components"
```

---

## Task 9: Hero Section

**Files:**
- Create: `src/components/sections/hero.tsx`

- [ ] **Step 1: Create Hero**

```typescript
// src/components/sections/hero.tsx
'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.1 } } },
  item: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  },
}

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="min-h-[100dvh] flex flex-col justify-between pt-14 pb-8 px-6 md:px-10 max-w-content mx-auto relative overflow-hidden">
      {/* Decorative circles — top right */}
      <div className="absolute top-20 right-6 md:right-16 flex flex-col items-center gap-4 pointer-events-none select-none">
        <motion.div
          className="w-24 h-24 md:w-36 md:h-36 rounded-full border border-[#e0ddd8]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        />
        <div className="w-px h-8 bg-[#e0ddd8]" />
        <motion.div
          className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#e0ddd8]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.65, duration: 0.6 }}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="flex-1 flex flex-col justify-center mt-8 md:mt-0"
        variants={stagger.container}
        initial="initial"
        animate="animate"
      >
        <motion.p
          variants={stagger.item}
          className="text-[10px] md:text-[11px] tracking-[4px] uppercase text-muted font-sans mb-4"
        >
          {t('role')}
        </motion.p>

        <motion.h1
          variants={stagger.item}
          className="font-serif font-bold text-ink leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(48px, 10vw, 96px)' }}
        >
          Bùi
          <br />
          Quang
          <br />
          <span className="text-muted">Trưởng</span>
        </motion.h1>

        <motion.div
          variants={stagger.item}
          className="w-10 h-0.5 bg-ink mt-5 mb-4"
        />

        <motion.p
          variants={stagger.item}
          className="text-sm md:text-base text-ink-light font-sans max-w-xs leading-relaxed"
        >
          {t('tagline')}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={stagger.item} className="flex gap-3 mt-8">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-ink text-cream text-[10px] tracking-[2px] uppercase px-5 py-3 font-sans hover:bg-ink-light transition-colors"
          >
            {t('cta_work')}
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-[#e0ddd8] text-ink text-[10px] tracking-[2px] uppercase px-5 py-3 font-sans hover:border-[#c8c4bc] transition-colors"
          >
            {t('cta_contact')}
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="flex items-center gap-2 self-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <span className="text-[9px] tracking-[3px] uppercase text-muted font-sans">{t('scroll')}</span>
        <span className="text-muted text-sm">↓</span>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify no TS errors**

```bash
npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/hero.tsx
git commit -m "feat: add Hero section with stagger animation and decorative circles"
```

---

## Task 10: About Section

**Files:**
- Create: `src/components/sections/about.tsx`

- [ ] **Step 1: Create About**

```typescript
// src/components/sections/about.tsx
import { useTranslations } from 'next-intl'
import SectionWrapper from '@/components/ui/section-wrapper'

export default function About() {
  const t = useTranslations('about')

  return (
    <SectionWrapper
      id="about"
      className="py-20 md:py-32 px-6 md:px-10 max-w-content mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_120px] gap-10 md:gap-16 items-start">
        <div>
          <p className="text-[10px] tracking-[4px] uppercase text-muted font-sans mb-4">
            {t('title')}
          </p>
          <p className="font-serif text-xl md:text-2xl text-ink leading-relaxed mb-4">
            {t('bio')}
          </p>
          <p className="font-sans text-base text-ink-light leading-relaxed">
            {t('bio2')}
          </p>
        </div>

        {/* Geometric decorative — replaces photo */}
        <div className="flex flex-col items-center gap-3 md:mt-8">
          <div className="w-16 h-16 border border-[#e0ddd8] geo-spin" />
          <div className="w-2 h-2 rounded-full bg-[#e0ddd8]" />
          <div className="w-2 h-2 rounded-full bg-[#e0ddd8] opacity-50" />
        </div>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/about.tsx
git commit -m "feat: add About section with rotating geometric decoration"
```

---

## Task 11: Skills Section

**Files:**
- Create: `src/components/sections/skills.tsx`

- [ ] **Step 1: Create Skills**

```typescript
// src/components/sections/skills.tsx
'use client'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionWrapper from '@/components/ui/section-wrapper'
import SkillTag from '@/components/ui/skill-tag'
import { skillGroups } from '@/lib/data'

export default function Skills() {
  const t = useTranslations('skills')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <SectionWrapper
      id="skills"
      className="py-20 md:py-32 px-6 md:px-10 max-w-content mx-auto border-t border-[#e0ddd8]"
    >
      <p className="text-[10px] tracking-[4px] uppercase text-muted font-sans mb-10">
        {t('title')}
      </p>

      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-14">
        {skillGroups.map((group, groupIndex) => (
          <motion.div
            key={group.key}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.45, delay: groupIndex * 0.1 }}
          >
            <p className="text-[9px] tracking-[3px] uppercase text-muted font-sans mb-3">
              {t(group.key as 'shopify' | 'frontend' | 'backend' | 'database')}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <SkillTag key={skill.name} name={skill.name} highlight={skill.highlight} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/skills.tsx
git commit -m "feat: add Skills section with staggered category reveals"
```

---

## Task 12: Experience Section

**Files:**
- Create: `src/components/sections/experience.tsx`

- [ ] **Step 1: Create Experience**

```typescript
// src/components/sections/experience.tsx
import { useTranslations } from 'next-intl'
import SectionWrapper from '@/components/ui/section-wrapper'
import { experiences } from '@/lib/data'

export default function Experience() {
  const t = useTranslations('experience')

  return (
    <SectionWrapper
      id="experience"
      className="py-20 md:py-32 px-6 md:px-10 max-w-content mx-auto border-t border-[#e0ddd8]"
    >
      <p className="text-[10px] tracking-[4px] uppercase text-muted font-sans mb-10">
        {t('title')}
      </p>

      {/* Desktop: 3 columns */}
      <div className="hidden md:grid grid-cols-3 gap-8">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.company} exp={exp} t={t} />
        ))}
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden flex flex-col gap-0">
        {experiences.map((exp, i) => (
          <div key={exp.company} className="grid grid-cols-[16px_1fr] gap-4">
            {/* Timeline line + dot */}
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full bg-ink mt-1 shrink-0" />
              {i < experiences.length - 1 && (
                <div className="w-px flex-1 bg-[#e0ddd8] my-2" />
              )}
            </div>
            <div className="pb-8">
              <ExperienceCard exp={exp} t={t} />
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}

function ExperienceCard({
  exp,
  t,
}: {
  exp: (typeof experiences)[0]
  t: ReturnType<typeof useTranslations<'experience'>>
}) {
  return (
    <div>
      <p className="font-serif text-lg font-bold text-ink tracking-tight">{exp.company}</p>
      <p className="text-[10px] tracking-[1px] uppercase text-muted font-sans mt-1">
        {t(exp.roleKey as Parameters<typeof t>[0])}
      </p>
      <p className="text-[9px] tracking-[2px] text-muted font-sans mt-1">
        {exp.period} – {exp.periodEnd === 'present' ? t('present') : exp.periodEnd}
      </p>
      <ul className="mt-3 flex flex-col gap-1.5">
        {exp.descKeys.map((key) => (
          <li key={key} className="text-sm text-ink-light font-sans leading-relaxed flex gap-2">
            <span className="text-muted shrink-0 mt-0.5">—</span>
            <span>{t(key as Parameters<typeof t>[0])}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/experience.tsx
git commit -m "feat: add Experience section with 3-col desktop and timeline mobile"
```

---

## Task 13: Projects Section

**Files:**
- Create: `src/components/sections/projects.tsx`

- [ ] **Step 1: Create Projects**

```typescript
// src/components/sections/projects.tsx
import { useTranslations } from 'next-intl'
import SectionWrapper from '@/components/ui/section-wrapper'
import ProjectCard from '@/components/ui/project-card'
import { projects } from '@/lib/data'

export default function Projects() {
  const t = useTranslations('projects')

  return (
    <SectionWrapper
      id="projects"
      className="py-20 md:py-32 px-6 md:px-10 max-w-content mx-auto border-t border-[#e0ddd8]"
    >
      <p className="text-[10px] tracking-[4px] uppercase text-muted font-sans mb-10">
        {t('title')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.name}
            project={project}
            desc={t(project.descKey as Parameters<typeof t>[0])}
            liveLabel={t('live')}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/projects.tsx
git commit -m "feat: add Projects section with hover-lift cards"
```

---

## Task 14: Contact Section

**Files:**
- Create: `src/components/sections/contact.tsx`

- [ ] **Step 1: Create Contact**

```typescript
// src/components/sections/contact.tsx
import { useTranslations } from 'next-intl'
import SectionWrapper from '@/components/ui/section-wrapper'
import { contactInfo } from '@/lib/data'

export default function Contact() {
  const t = useTranslations('contact')

  return (
    <SectionWrapper
      id="contact"
      className="py-20 md:py-32 px-6 md:px-10 max-w-content mx-auto border-t border-[#e0ddd8]"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
        {/* Title */}
        <div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink tracking-tight leading-none">
            {t('title')}
          </h2>
          <p className="text-[10px] tracking-[4px] uppercase text-muted font-sans mt-2">
            {t('subtitle')}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-[9px] tracking-[3px] uppercase text-muted font-sans w-14">
              {t('email_label')}
            </span>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-sm font-sans text-ink-light hover:text-ink border-b border-transparent hover:border-ink transition-all pb-px"
            >
              {contactInfo.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[9px] tracking-[3px] uppercase text-muted font-sans w-14">
              {t('github_label')}
            </span>
            <a
              href={contactInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-sans text-ink-light hover:text-ink border-b border-transparent hover:border-ink transition-all pb-px"
            >
              {contactInfo.github}
            </a>
          </div>
        </div>

        {/* CTA */}
        <a
          href={`mailto:${contactInfo.email}`}
          className="self-start md:self-auto bg-ink text-cream text-[10px] tracking-[2px] uppercase px-6 py-3 font-sans hover:bg-ink-light transition-colors"
        >
          {t('cta')}
        </a>
      </div>

      {/* Footer */}
      <div className="mt-16 pt-6 border-t border-[#e0ddd8] flex justify-between items-center">
        <span className="text-[9px] tracking-[3px] uppercase text-muted font-sans">BQT</span>
        <span className="text-[9px] tracking-[2px] text-muted font-sans">
          © {new Date().getFullYear()} Bùi Quang Trưởng
        </span>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/contact.tsx
git commit -m "feat: add Contact section with email and GitHub links"
```

---

## Task 15: Assemble Page

**Files:**
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Write page.tsx**

```typescript
// src/app/[locale]/page.tsx
import Hero from '@/components/sections/hero'
import About from '@/components/sections/about'
import Skills from '@/components/sections/skills'
import Experience from '@/components/sections/experience'
import Projects from '@/components/sections/projects'
import Contact from '@/components/sections/contact'

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </>
  )
}
```

- [ ] **Step 2: Run dev server and visually verify all sections**

```bash
npm run dev
```
Open `http://localhost:3000` (redirects to `/vi` via middleware). Check:
- [ ] Hero name + stagger animation plays
- [ ] Nav links scroll to correct sections
- [ ] Lang toggle switches VI ↔ EN
- [ ] About section visible with rotating square
- [ ] Skills grouped + highlighted tags visible
- [ ] Experience shows 3-col on desktop
- [ ] Projects show 2 cards with hover lift
- [ ] Contact shows email + GitHub links
- [ ] Mobile: hamburger nav works, experience shows timeline

- [ ] **Step 3: Verify production build**

```bash
npm run build
```
Expected: Build completes with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/page.tsx
git commit -m "feat: assemble all sections into portfolio page"
```

---

## Task 16: Responsive Polish

**Files:**
- Modify: `src/components/sections/hero.tsx`, `src/app/globals.css`

- [ ] **Step 1: Test at 375px (iPhone SE)**

In Chrome DevTools, set device to iPhone SE (375×667). Check:
- Hero name does not overflow — `clamp(48px, 10vw, 96px)` should handle it
- Nav hamburger visible, desktop links hidden
- Decorative circles don't overlap text — reduce size on mobile if needed

If decorative circles overlap text on small screens, add `hidden sm:flex` to their container in `hero.tsx`:
```typescript
// Change: className="absolute top-20 right-6 ..."
// To:
className="absolute top-20 right-6 md:right-16 hidden sm:flex flex-col items-center gap-4 pointer-events-none select-none"
```

- [ ] **Step 2: Test at 768px (tablet)**

Skills section should show 2-col grid. Experience shows vertical timeline (mobile layout). Projects show 1-col. Verify.

- [ ] **Step 3: Test at 1280px (desktop)**

Experience shows 3-col. Projects show 2-col. Nav shows full links.

- [ ] **Step 4: Add scroll padding for fixed nav**

In `globals.css`, add:
```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 56px; /* height of fixed nav */
}
```

- [ ] **Step 5: Final build check**

```bash
npm run build
```
Expected: No errors, no warnings about missing keys.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "fix: responsive polish and scroll padding for fixed nav"
```

---

## Self-Review Results

**Spec coverage check:**
- ✅ Hero: left-aligned, stagger animation, decorative circles, CTAs, scroll hint
- ✅ About: bio text, rotating geometric shape (replaces photo)
- ✅ Skills: grouped, highlighted core skills, scroll-triggered stagger
- ✅ Experience: 3-col desktop, timeline mobile, bullet points
- ✅ Projects: 2 cards, hover lift, live links, tech tags
- ✅ Contact: email + GitHub, 3-zone horizontal desktop, stacked mobile
- ✅ i18n: VI default, EN toggle, next-intl, localStorage via router
- ✅ Responsive: mobile-first, 375px → 1440px
- ✅ Animations: Framer Motion stagger, scroll reveals, hover, CSS geo-spin
- ✅ No photo → geometric decorative

**Type consistency check:**
- `ExperienceItem.roleKey` and `descKeys` passed as `Parameters<typeof t>[0]` — consistent across Tasks 5 and 12
- `Project.descKey` used as `Parameters<typeof t>[0]` — consistent across Tasks 5 and 13
- `SkillGroup.key` matched to `t()` call keys — consistent across Tasks 5 and 11

**No placeholders:** All code blocks are complete. No TBD/TODO in any step.
