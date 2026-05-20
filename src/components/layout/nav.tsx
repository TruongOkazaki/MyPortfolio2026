'use client'
import { useTranslations } from 'next-intl'
import LangToggle from './lang-toggle'
import { useState } from 'react'

const navIds = ['about', 'skills', 'experience', 'projects', 'contact'] as const

export default function Nav() {
  const t = useTranslations('nav')
  const [open, setOpen] = useState(false)

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-[#e0ddd8]">
      <div className="max-w-content mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <span className="text-[11px] tracking-[4px] uppercase text-muted font-sans select-none">
          BQT
        </span>

        <ul className="hidden md:flex items-center gap-6">
          {navIds.map((id) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className="nav-link text-[10px] tracking-[2px] uppercase text-muted hover:text-ink transition-colors duration-150 font-sans pb-0.5"
              >
                {t(id)}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LangToggle />
          <button
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span className={`block w-5 h-px bg-ink transition-all ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-5 h-px bg-ink transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-ink transition-all ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-cream border-t border-[#e0ddd8] px-6 py-4 flex flex-col gap-4">
          {navIds.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left text-[11px] tracking-[3px] uppercase text-muted hover:text-ink transition-colors"
            >
              {t(id)}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
