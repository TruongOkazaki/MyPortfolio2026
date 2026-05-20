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
  statSuffixKey: 'merchants' | 'rating'
  descKey: string
  liveUrl: string
}

export const projects: Project[] = [
  {
    name: 'OPTIS Product Options',
    techStack: 'React.js · Node.js · Koa.js · GraphQL · MySQL · Sequelize',
    statValue: '5,000+',
    statSuffixKey: 'merchants' as const,
    descKey: 'optis_desc',
    liveUrl: 'https://apps.shopify.com/product-options-by-bss',
  },
  {
    name: 'OP Color Swatch',
    techStack: 'Remix · Lit · TypeScript · NestJS · MySQL · TypeORM',
    statValue: '5.0 ★',
    statSuffixKey: 'rating' as const,
    descKey: 'swatch_desc',
    liveUrl: 'https://apps.shopify.com/optis-color-swatch-variants',
  },
]

export const contactInfo = {
  email: 'buiquangtruong1105@gmail.com',
  phone: '0961815355',
  github: 'github.com/OkazakiTruong',
  githubUrl: 'https://github.com/OkazakiTruong',
}
