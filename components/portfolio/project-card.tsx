"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import type { Project } from "@/data/projects"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/project/${project.id}`} className="block">
      <article
        className={`group relative flex flex-col rounded-2xl bg-background border transition-all duration-300 ease-out cursor-pointer ${
          isHovered ? "border-[#22c55e] shadow-[0_8px_30px_rgba(34,197,94,0.15)] scale-[1.02]" : "border-border hover:border-muted-foreground/20"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
          <Image src={project.image} alt={project.titleRu} fill className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          <div className={`absolute inset-0 bg-black/50 flex items-end p-4 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
            <span className="text-white text-sm font-medium tracking-wide uppercase">Смотреть проект</span>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-5">
          <h3 className={`text-lg font-semibold leading-tight mb-2 transition-colors duration-300 ${isHovered ? "text-[#22c55e]" : "text-foreground"}`}>
            {project.titleRu}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{project.descriptionRu}</p>
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-medium tracking-wide">{project.locationRu}</span>
            </div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${isHovered ? "bg-[#22c55e] text-white" : "bg-transparent text-foreground"}`}>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
