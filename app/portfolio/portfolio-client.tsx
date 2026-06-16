'use client'

import { useMemo, useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/portfolio/page-header'
import { PortfolioFilters, type FilterCategory } from '@/components/portfolio/portfolio-filters'
import { PortfolioGrid } from '@/components/portfolio/portfolio-grid'
import type { Project } from '@/data/projects'

interface PortfolioClientPageProps {
  projects: Project[]
}

export default function PortfolioClientPage({ projects }: PortfolioClientPageProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return projects
    }
    return projects.filter((project) => project.category === activeFilter)
  }, [activeFilter, projects])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="h-24" />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <PageHeader />
          <div className="mb-12 lg:mb-16">
            <PortfolioFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          </div>
          <PortfolioGrid projects={filteredProjects} />
        </div>
      </section>

      <Footer />
    </main>
  )
}
