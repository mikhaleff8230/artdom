"use client"

import { AlertTriangle, Brush, ShieldAlert, Sparkles, TreePine } from "lucide-react"
import type { FeaturesContent } from "@/lib/sanity"

interface FeaturesSectionProps {
  content?: FeaturesContent
}

const problems = [
  { title: "Старая краска выгорает", icon: Brush },
  { title: "Дерево темнеет и сереет", icon: TreePine },
  { title: "Появляются трещины", icon: AlertTriangle },
  { title: "Фасад теряет привлекательность", icon: Sparkles },
  { title: "Повышается риск разрушения древесины", icon: ShieldAlert },
]

export function FeaturesSection({ content: _content }: FeaturesSectionProps) {
  return (
    <section className="py-20 bg-[#f8fafc]">
      <div className="container mx-auto px-4">
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-4 border border-gray-100">
            <span className="w-2 h-2 bg-[#22c55e] rounded-full" />
            <span className="text-[#0f1629]/70 text-sm font-medium uppercase tracking-wide">Проблема</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f1629] mb-3">Ваш дом потерял внешний вид?</h2>
          <p className="text-[#0f1629]/60 text-lg">
            Своевременная покраска защищает дом на долгие годы и сохраняет его стоимость.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {problems.map((problem) => {
            const Icon = problem.icon
            return (
              <div key={problem.title} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="font-semibold text-[#0f1629] text-base leading-snug">{problem.title}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
