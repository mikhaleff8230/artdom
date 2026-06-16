"use client"

import Link from "next/link"
import Image from "next/image"
import type { ProjectDetail } from "@/data/projects"

interface RelatedProjectsProps {
  projects: ProjectDetail[]
}

const categoryLabels = {
  apartment: "Каркасный дом",
  house: "Дом из бруса",
  commercial: "Постройки участка",
} as const

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (!projects.length) return null

  return (
    <section className="pb-20 lg:pb-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Другие проекты</h2>
          <Link href="/portfolio" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Смотреть все
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.id} href={`/project/${project.id}`} className="group overflow-hidden rounded-2xl border border-border/70 bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image src={project.images[0]} alt={project.title.ru} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </div>
              <div className="space-y-2 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {categoryLabels[project.category]} / {project.year}
                </p>
                <h3 className="text-lg font-medium leading-tight text-foreground">{project.title.ru}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
