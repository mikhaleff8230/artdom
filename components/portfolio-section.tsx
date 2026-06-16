"use client"

import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { projects } from "@/data/projects"

export function PortfolioSection() {
  return (
    <section id="raboty" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#f0f4f8] rounded-full px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-[#22c55e] rounded-full" />
            <span className="text-[#0f1629]/70 text-sm font-medium">Результаты наших работ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f1629]">До и после покраски</h2>
          <p className="text-[#0f1629]/60 text-lg mt-3 max-w-2xl mx-auto">
            В карточках проекта указаны площадь, срок выполнения и использованная система окраски.
          </p>
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
                  <Image src={project.gallery[0]} alt={`${project.titleRu} до`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">До</span>
                </div>
                <div className="relative">
                  <Image src={project.image} alt={`${project.titleRu} после`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute left-3 top-3 rounded-full bg-[#22c55e] px-3 py-1 text-xs font-medium text-white">После</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-[#0f1629] text-lg mb-2">{project.titleRu}</h3>
                <div className="flex items-center gap-1 text-[#0f1629]/50 text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{project.locationRu}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-[#0f1629]/60 mb-4">
                  <span>Площадь: {project.id === "4" ? "240 м²" : "160 м²"}</span>
                  <span>Срок: 6-9 дней</span>
                  <span className="col-span-2">Краска: профессиональная фасадная система</span>
                </div>
                <span className="flex items-center gap-1 text-[#22c55e] text-sm font-medium">
                  Подробнее
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/portfolio">
            <Button size="lg" className="bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-full px-8 py-6 text-base font-medium group">
              Смотреть все проекты
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
