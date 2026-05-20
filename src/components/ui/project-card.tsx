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
