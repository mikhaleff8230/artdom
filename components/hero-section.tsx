"use client"

import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { HeroContent } from "@/lib/sanity"
import { siteConfig } from "@/lib/site-config"

interface HeroSectionProps {
  content?: HeroContent
}

const fallbackImage =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop"

export function HeroSection({ content }: HeroSectionProps) {
  const imageUrl = content?.imageUrl || fallbackImage
  const benefits = ["Более 10 лет опыта", "Работа по договору", "Фотоотчет каждого этапа", "Гарантия на выполненные работы"]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f1629]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      >
        <div className="absolute inset-0 bg-[#0f1629]/75" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-28 pb-24">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
            <span className="text-white/80 text-sm">Московская область · бесплатный выезд</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-balance">
            Покраска деревянных и каркасных домов под ключ в Московской области
          </h1>

          <p className="text-white/70 text-base sm:text-xl max-w-2xl mb-8 leading-relaxed">
            Шлифовка, обработка и покраска фасадов. Работаем без посредников. Бесплатный выезд и расчет стоимости.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mb-10">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-white/85">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#22c55e]/20 text-[#86efac] text-sm">✓</span>
                <span className="text-sm sm:text-base">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-[#0f1629] hover:bg-white/90 rounded-full px-8 py-6 text-base font-medium group"
            >
              <Link href="#raschet">
                Отправить фото дома
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-medium bg-transparent"
            >
              <a href={`tel:${siteConfig.phone}`}>
                <Phone className="w-5 h-5 mr-2" />
                Позвонить
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-2xl">
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">120+</div>
              <div className="text-white/50 text-xs sm:text-sm mt-1 uppercase tracking-wide">объектов</div>
            </div>
            <div className="border-x border-white/10 px-4">
              <div className="text-3xl sm:text-4xl font-bold text-white">10+</div>
              <div className="text-white/50 text-xs sm:text-sm mt-1 uppercase tracking-wide">лет опыта</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">2 года</div>
              <div className="text-white/50 text-xs sm:text-sm mt-1 uppercase tracking-wide">гарантия</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
