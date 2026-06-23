"use client"

import type { ServicesSectionContent } from "@/lib/sanity"

interface ServicesSectionProps {
  content?: ServicesSectionContent
}

function ServiceCard({ title, backgroundImage }: { title: string; backgroundImage: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-gray-100 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
      <div className="relative z-10 flex min-h-[180px] flex-col justify-end p-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
    </div>
  )
}

export function ServicesSection({ content }: ServicesSectionProps) {
  const badge = content?.badge ?? "Услуги"
  const title = content?.title ?? "Что мы красим"
  const description = content?.description ?? "Деревянные фасады, элементы участка и малые постройки под ключ."
  const items = content?.items ?? []
  const processBadge = content?.processBadge ?? "Процесс"
  const processTitle = content?.processTitle ?? "Простой и понятный процесс"
  const processSteps = content?.processSteps ?? []
  const pricesBadge = content?.pricesBadge ?? "Цены"
  const pricesTitle = content?.pricesTitle ?? "Ориентировочная стоимость"
  const pricesDescription =
    content?.pricesDescription ?? "Точная стоимость зависит от состояния поверхности и рассчитывается после осмотра."
  const prices = content?.prices ?? []

  return (
    <>
      <section id="uslugi" className="py-20 bg-[#f8fafc]">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-4 border border-gray-100">
              <span className="w-2 h-2 bg-[#22c55e] rounded-full" />
              <span className="text-[#0f1629]/70 text-sm font-medium uppercase tracking-wide">{badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f1629] mb-3">{title}</h2>
            <p className="text-[#0f1629]/60 text-lg">{description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((service) => (
              <ServiceCard key={service.title} title={service.title} backgroundImage={service.backgroundImage} />
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-[#f0f4f8] rounded-full px-4 py-2 mb-4">
              <span className="w-2 h-2 bg-[#22c55e] rounded-full" />
              <span className="text-[#0f1629]/70 text-sm font-medium uppercase tracking-wide">{processBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f1629]">{processTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-gray-100 bg-[#f8fafc] p-6">
                <div className="text-[#22c55e] font-bold mb-3">Шаг {index + 1}</div>
                <h3 className="text-xl font-semibold text-[#0f1629]">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0f1629]">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-4">
              <span className="w-2 h-2 bg-[#22c55e] rounded-full" />
              <span className="text-white/70 text-sm font-medium uppercase tracking-wide">{pricesBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{pricesTitle}</h2>
            <p className="text-white/55 text-lg">{pricesDescription}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {prices.map((priceItem) => (
              <div key={priceItem.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-white/75 text-base mb-4">{priceItem.title}</h3>
                <p className="text-3xl font-bold text-white">{priceItem.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
