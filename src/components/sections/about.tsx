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
