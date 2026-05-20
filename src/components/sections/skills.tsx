'use client'
import { useTranslations } from 'next-intl'
import SectionWrapper from '@/components/ui/section-wrapper'
import SkillTag from '@/components/ui/skill-tag'
import { skillGroups } from '@/lib/data'

export default function Skills() {
  const t = useTranslations('skills')

  return (
    <SectionWrapper
      id="skills"
      className="py-20 md:py-32 px-6 md:px-10 max-w-content mx-auto border-t border-[#e0ddd8]"
    >
      <p className="text-[10px] tracking-[4px] uppercase text-muted font-sans mb-10">
        {t('title')}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-14">
        {skillGroups.map((group) => (
          <div key={group.key}>
            <p className="text-[9px] tracking-[3px] uppercase text-muted font-sans mb-3">
              {t(group.key as 'shopify' | 'frontend' | 'backend' | 'database')}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <SkillTag key={skill.name} name={skill.name} highlight={skill.highlight} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
