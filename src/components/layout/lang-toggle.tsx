'use client'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

export default function LangToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function toggle() {
    const next = locale === 'vi' ? 'en' : 'vi'
    const newPath = '/' + next + pathname.slice(`/${locale}`.length)
    router.push(newPath)
  }

  return (
    <button
      onClick={toggle}
      className="text-[10px] tracking-[3px] uppercase border border-[#e0ddd8] px-2 py-1 text-muted hover:border-[#c8c4bc] hover:text-ink transition-colors duration-150"
      aria-label="Toggle language"
    >
      {locale === 'vi' ? 'EN' : 'VI'}
    </button>
  )
}
