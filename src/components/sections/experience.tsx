import { useTranslations } from 'next-intl'
import SectionWrapper from '@/components/ui/section-wrapper'
import { experiences, type ExperienceItem } from '@/lib/data'

type TFunc = ReturnType<typeof useTranslations<'experience'>>

function ExperienceCard({ exp, t }: { exp: ExperienceItem; t: TFunc }) {
  return (
    <div>
      <p className="font-serif text-lg font-bold text-ink tracking-tight">{exp.company}</p>
      <p className="text-[10px] tracking-[1px] uppercase text-muted font-sans mt-1">
        {t(exp.roleKey as Parameters<TFunc>[0])}
      </p>
      <p className="text-[9px] tracking-[2px] text-muted font-sans mt-1">
        {exp.period} – {exp.periodEnd === 'present' ? t('present') : exp.periodEnd}
      </p>
      <ul className="mt-3 flex flex-col gap-1.5">
        {exp.descKeys.map((key) => (
          <li key={key} className="text-sm text-ink-light font-sans leading-relaxed flex gap-2">
            <span className="text-muted shrink-0 mt-0.5">—</span>
            <span>{t(key as Parameters<TFunc>[0])}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

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
