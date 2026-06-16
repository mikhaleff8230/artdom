"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import type { ProjectDetail } from "@/data/projects"

interface ProjectHeroProps {
  project: ProjectDetail
}

const categoryLabels = {
  apartment: "Каркасный дом",
  house: "Дом из бруса",
  commercial: "Постройки участка",
} as const

export function ProjectHero({ project }: ProjectHeroProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(1)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrentSlide(api.selectedScrollSnap() + 1)
    onSelect()
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <section className="pt-28 pb-10 lg:pt-36 lg:pb-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/portfolio"
          className="mb-8 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Назад к работам
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(420px,540px)] lg:items-center">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {categoryLabels[project.category]} / {project.year}
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              {project.title.ru}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">{project.location.ru}</p>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-border/70 bg-muted/20 shadow-[0_20px_80px_rgba(0,0,0,0.18)]">
            <Carousel setApi={setApi} opts={{ loop: true }}>
              <CarouselContent className="-ml-0">
                {project.images.map((image, index) => (
                  <CarouselItem key={`${image}-${index}`} className="pl-0">
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={image}
                        alt={`${project.title.ru} - фото ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/55 to-transparent p-4">
              <div className="pointer-events-auto flex items-center gap-2">
                <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full bg-white/85 text-foreground hover:bg-white" onClick={() => api?.scrollPrev()}>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Предыдущее фото</span>
                </Button>
                <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full bg-white/85 text-foreground hover:bg-white" onClick={() => api?.scrollNext()}>
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Следующее фото</span>
                </Button>
              </div>

              <p className="text-sm font-medium text-white">
                {currentSlide} / {project.images.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
