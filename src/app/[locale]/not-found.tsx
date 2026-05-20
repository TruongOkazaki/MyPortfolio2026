'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function NotFound() {
  const t = useTranslations('not_found')

  return (
    <div className="min-h-[100dvh] bg-cream flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Background geometric decoration */}
      <div className="absolute pointer-events-none select-none opacity-[0.06]" aria-hidden>
        <div className="relative w-[500px] h-[500px]">
          <div className="absolute inset-0 rounded-full border border-ink" />
          <div className="absolute rounded-full border border-ink" style={{ inset: '15%' }} />
          <div className="absolute rounded-full border border-ink" style={{ inset: '30%' }} />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-ink" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-ink" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <motion.p
          className="text-[10px] tracking-[4px] uppercase text-muted font-sans mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Error
        </motion.p>

        <motion.h1
          className="font-serif font-bold text-ink leading-[0.85] tracking-tight mb-8"
          style={{ fontSize: 'clamp(100px, 22vw, 200px)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          {t('code')}
        </motion.h1>

        <motion.div
          className="w-10 h-0.5 bg-ink mx-auto mb-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
        />

        <motion.p
          className="text-base font-serif text-ink mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {t('title')}
        </motion.p>

        <motion.p
          className="text-sm font-sans text-muted max-w-xs mx-auto leading-relaxed mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {t('desc')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            href="/"
            className="inline-block bg-ink text-cream text-[10px] tracking-[2px] uppercase px-7 py-3 font-sans hover:bg-ink-light transition-colors"
          >
            {t('cta')}
          </Link>
        </motion.div>
      </div>

      {/* Corner label */}
      <motion.div
        className="absolute bottom-8 left-6 md:left-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <span className="text-[9px] tracking-[3px] uppercase text-muted font-sans">BQT</span>
      </motion.div>
    </div>
  )
}
