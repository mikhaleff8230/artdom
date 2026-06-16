'use client'

import { useLanguage } from '@/lib/language-context'

export type FilterCategory = 'all' | 'apartment' | 'house' | 'commercial'

interface PortfolioFiltersProps {
  activeFilter: FilterCategory
  onFilterChange: (filter: FilterCategory) => void
}

export function PortfolioFilters({ activeFilter, onFilterChange }: PortfolioFiltersProps) {
  const { t } = useLanguage()

  const filters: { key: FilterCategory; label: string }[] = [
    { key: 'all', label: t.portfolio.filters.all },
    { key: 'apartment', label: t.portfolio.filters.apartment },
    { key: 'house', label: t.portfolio.filters.house },
    { key: 'commercial', label: t.portfolio.filters.commercial },
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            activeFilter === filter.key
              ? 'bg-[#22c55e] text-white shadow-lg shadow-[#22c55e]/25'
              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
