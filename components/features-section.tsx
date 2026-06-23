"use client"

import type { ProblemsContent } from "@/lib/sanity"

interface FeaturesSectionProps {
  content?: ProblemsContent
}

function BackgroundCard({ title, backgroundImage, className }: { title: string; backgroundImage: string; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-gray-100 bg-cover bg-center ${className ?? ""}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25" />
      <div className="relative z-10 flex h-full min-h-[148px] flex-col justify-end p-5">
        <h3 className="text-base font-semibold leading-snug text-white">{title}</h3>
      </div>
    </div>
  )
}

export function FeaturesSection({ content }: FeaturesSectionProps) {
  const badge = content?.badge ?? "Проблема"
  const title = content?.title ?? "Ваш дом потерял внешний вид?"
  const description =
    content?.description ?? "Своевременная покраска защищает дом на долгие годы и сохраняет его стоимость."
  const items = content?.items ?? []

  return (
    <section className="py-20 bg-[#f8fafc]">
      <div className="container mx-auto px-4">
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-4 border border-gray-100">
            <span className="w-2 h-2 bg-[#22c55e] rounded-full" />
            <span className="text-[#0f1629]/70 text-sm font-medium uppercase tracking-wide">{badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f1629] mb-3">{title}</h2>
          <p className="text-[#0f1629]/60 text-lg">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {items.map((problem) => (
            <BackgroundCard key={problem.title} title={problem.title} backgroundImage={problem.backgroundImage} />
          ))}
        </div>
      </div>
    </section>
  )
}
