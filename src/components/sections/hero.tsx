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

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="min-h-[100dvh] flex flex-col justify-between pt-14 pb-8 px-6 md:px-10 max-w-content mx-auto">

      {/* Main content */}
      <div className="flex-1 flex flex-col md:grid md:grid-cols-[1fr_320px] md:gap-8 items-center mt-8 md:mt-0">

        {/* Left: identity */}
        <motion.div
          className="flex flex-col"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
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
        </motion.div>

        {/* Right: geometric decoration — desktop only */}
        <div className="hidden md:flex items-center justify-center pointer-events-none select-none">
          <div className="relative w-64 h-64 lg:w-80 lg:h-80">
            {/* Outer circle */}
            <motion.div
              className="absolute inset-0 rounded-full border border-border"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            />
            {/* Middle circle */}
            <motion.div
              className="absolute rounded-full border border-border"
              style={{ inset: '15%' }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65, duration: 0.8, ease: 'easeOut' }}
            />
            {/* Inner rotating square */}
            <motion.div
              className="absolute border border-border-dark geo-spin"
              style={{ inset: '38%' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.6 }}
            />
            {/* Cross lines */}
            <motion.div
              className="absolute top-1/2 left-0 right-0 h-px bg-border"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute left-1/2 top-0 bottom-0 w-px bg-border"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.0, duration: 0.6, ease: 'easeOut' }}
            />
            {/* Corner dots */}
            {[
              'top-[15%] left-1/2 -translate-x-1/2',
              'bottom-[15%] left-1/2 -translate-x-1/2',
              'left-[15%] top-1/2 -translate-y-1/2',
              'right-[15%] top-1/2 -translate-y-1/2',
            ].map((pos, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full bg-border-dark ${pos}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 + i * 0.05, duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="flex items-center gap-2 self-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
      >
        <span className="text-[9px] tracking-[3px] uppercase text-muted font-sans">{t('scroll')}</span>
        <span className="text-muted text-sm">↓</span>
      </motion.div>
    </section>
  )
}
