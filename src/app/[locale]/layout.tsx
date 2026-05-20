import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Nav from '@/components/layout/nav'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Bùi Quang Trưởng — Full-stack Developer',
  description:
    'Full-stack developer specializing in Shopify app development, React, TypeScript, and Node.js. Building apps used by 5,500+ merchants.',
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as 'vi' | 'en')) notFound()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className="bg-cream text-ink antialiased">
        <NextIntlClientProvider messages={messages}>
          <Nav />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
