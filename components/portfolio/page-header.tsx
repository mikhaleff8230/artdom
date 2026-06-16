'use client'

import { useLanguage } from '@/lib/language-context'

export function PageHeader() {
  const { t } = useLanguage()

  return (
    <div className="text-center mb-12 lg:mb-16">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-background mb-6">
        <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {t.nav.portfolio}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
        {t.portfolio.title}
      </h1>

      {/* Subtitle */}
      <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto text-pretty">
        {t.portfolio.subtitle}
      </p>
    </div>
  )
}
