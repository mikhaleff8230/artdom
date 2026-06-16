"use client"

import type { ProjectDetail } from "@/data/projects"

interface ProjectInfoProps {
  project: ProjectDetail
}

export function ProjectInfo({ project }: ProjectInfoProps) {
  const detailLabels: Record<keyof ProjectDetail["details"], string> = {
    type: "Тип",
    size: "Площадь",
    scope: "Объем работ",
    status: "Статус",
  }

  return (
    <section className="pb-14 lg:pb-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-y border-border py-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Обзор проекта</p>
            <p className="max-w-3xl text-base leading-8 text-foreground/90 sm:text-lg">{project.description.ru}</p>
          </div>

          <aside className="space-y-5 rounded-3xl border border-border/60 bg-background p-6">
            <div className="flex items-center justify-between border-b border-border/60 pb-3 text-sm">
              <span className="text-muted-foreground">Год</span>
              <span className="font-medium text-foreground">{project.year}</span>
            </div>
            <div className="flex items-center justify-between border-b border-border/60 pb-3 text-sm">
              <span className="text-muted-foreground">Локация</span>
              <span className="font-medium text-foreground">{project.location.ru}</span>
            </div>
            {Object.entries(project.details).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between border-b border-border/60 pb-3 text-sm last:border-b-0 last:pb-0">
                <span className="text-muted-foreground">{detailLabels[key as keyof ProjectDetail["details"]]}</span>
                <span className="font-medium text-foreground">{typeof value === "string" ? value : value.ru}</span>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  )
}
