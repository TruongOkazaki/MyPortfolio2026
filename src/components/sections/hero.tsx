'use client'
import { motion, type Variants } from 'framer-motion'
import { useTranslations } from 'next-intl'

const containerVariants: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1 } },
}

const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

type StatBoxProps = {
  value: string
  label: string
  delay: number
}

function StatBox({ value, label, delay }: StatBoxProps) {
  return (
    <motion.div
      className="border border-border p-4 md:p-5 flex flex-col gap-1"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
    >
      <span className="font-serif font-bold text-ink text-xl md:text-2xl leading-none tracking-tight">
        {value}
      </span>
      <span className="text-[9px] tracking-[2px] uppercase text-muted font-sans">{label}</span>
    </motion.div>
  )
}

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="min-h-[100dvh] flex flex-col justify-between pt-14 pb-8 px-6 md:px-10 max-w-content mx-auto">

      {/* Main content: text left, stats right */}
      <motion.div
        className="flex-1 flex flex-col md:grid md:grid-cols-[1fr_260px] md:gap-12 lg:gap-20 items-center mt-8 md:mt-0"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Left: identity */}
        <div className="flex flex-col">
          <motion.p
            variants={itemVariants}
            className="text-[10px] md:text-[11px] tracking-[4px] uppercase text-muted font-sans mb-4"
          >
            {t('role')}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-serif font-bold text-ink leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(48px, 10vw, 96px)' }}
          >
            Bùi
            <br />
            Quang
            <br />
            <span className="text-muted">Trưởng</span>
          </motion.h1>

          <motion.div variants={itemVariants} className="w-10 h-0.5 bg-ink mt-5 mb-4" />

          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base text-ink-light font-sans max-w-sm leading-relaxed"
          >
            {t('tagline')}
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-3 mt-8">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="bg-ink text-cream text-[10px] tracking-[2px] uppercase px-5 py-3 font-sans hover:bg-ink-light transition-colors"
            >
              {t('cta_work')}
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="border border-border text-ink text-[10px] tracking-[2px] uppercase px-5 py-3 font-sans hover:border-border-dark transition-colors"
            >
              {t('cta_contact')}
            </a>
          </motion.div>
        </div>

        {/* Right: stats grid — desktop only */}
        <div className="hidden md:grid grid-cols-2 gap-3 self-center">
          <StatBox value={t('stat_merchants_value')} label={t('stat_merchants_label')} delay={0.5} />
          <StatBox value={t('stat_reviews_value')} label={t('stat_reviews_label')} delay={0.6} />
          <StatBox value={t('stat_apps_value')} label={t('stat_apps_label')} delay={0.7} />
          <StatBox value={t('stat_exp_value')} label={t('stat_exp_label')} delay={0.8} />
        </div>
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
