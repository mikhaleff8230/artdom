"use client"

import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { HomepagePortfolioProject, PortfolioSectionContent } from "@/lib/sanity"

interface PortfolioSectionProps {
  content?: PortfolioSectionContent
  projects?: HomepagePortfolioProject[]
}

export function PortfolioSection({ content, projects = [] }: PortfolioSectionProps) {
  const badge = content?.badge ?? "Результаты наших работ"
  const title = content?.title ?? "До и после покраски"
  const description =
    content?.description ?? "В карточках проекта указаны площадь, срок выполнения и использованная система окраски."
  const buttonText = content?.buttonText ?? "Смотреть все проекты"
  const areaLabel = content?.areaLabel ?? "Площадь"
  const durationLabel = content?.durationLabel ?? "Срок"
  const paintLabel = content?.paintLabel ?? "Краска"
  const viewDetailsText = content?.viewDetailsText ?? "Подробнее"

  return (
    <section id="raboty" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#f0f4f8] rounded-full px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-[#22c55e] rounded-full" />
            <span className="text-[#0f1629]/70 text-sm font-medium">{badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f1629]">{title}</h2>
          <p className="text-[#0f1629]/60 text-lg mt-3 max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/project/${project.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="grid grid-cols-2 h-56 overflow-hidden">
                <div className="relative">
                  <Image
                    src={project.imageBefore}
                    alt={`${project.title} до`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">До</span>
                </div>
                <div className="relative">
                  <Image
                    src={project.imageAfter}
                    alt={`${project.title} после`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-[#22c55e] px-3 py-1 text-xs font-medium text-white">После</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-[#0f1629] text-lg mb-2">{project.title}</h3>
                <div className="flex items-center gap-1 text-[#0f1629]/50 text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{project.location}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-[#0f1629]/60 mb-4">
                  <span>
                    {areaLabel}: {project.area}
                  </span>
                  <span>
                    {durationLabel}: {project.duration}
                  </span>
                  <span className="col-span-2">
                    {paintLabel}: {project.paintSystem}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-[#22c55e] text-sm font-medium">
                  {viewDetailsText}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/portfolio">
            <Button size="lg" className="bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-full px-8 py-6 text-base font-medium group">
              {buttonText}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
