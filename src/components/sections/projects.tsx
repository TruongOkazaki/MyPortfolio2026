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
            desc={t(project.descKey as 'optis_desc' | 'swatch_desc')}
            liveLabel={t('live')}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
