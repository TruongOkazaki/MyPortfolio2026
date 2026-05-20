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
        <div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink tracking-tight leading-none">
            {t('title')}
          </h2>
          <p className="text-[10px] tracking-[4px] uppercase text-muted font-sans mt-2">
            {t('subtitle')}
          </p>
        </div>

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
              {t('phone_label')}
            </span>
            <a
              href={`tel:${contactInfo.phone}`}
              className="text-sm font-sans text-ink-light hover:text-ink border-b border-transparent hover:border-ink transition-all pb-px"
            >
              {contactInfo.phone}
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
