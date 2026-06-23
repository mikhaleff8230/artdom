"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  FileText,
  MapPin,
  Phone,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { HeroContent } from "@/lib/sanity"
import { siteConfig } from "@/lib/site-config"

interface HeroSectionProps {
  content?: HeroContent
}

const iconMap: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  file: FileText,
  camera: Camera,
  badge: BadgeCheck,
}

export function HeroSection({ content }: HeroSectionProps) {
  const title = content?.title ?? "Покраска деревянных и каркасных домов под ключ в Московской области"
  const subtitle =
    content?.subtitle ??
    "Шлифовка, обработка и покраска фасадов. Работаем без посредников. Бесплатный выезд и расчет стоимости."
  const locationText = content?.locationText ?? "Московская область · бесплатный выезд"
  const benefits = content?.benefits ?? [
    { label: "Более 10 лет опыта", icon: "shield" },
    { label: "Работа по договору", icon: "file" },
    { label: "Фотоотчет каждого этапа", icon: "camera" },
    { label: "Гарантия на выполненные работы", icon: "badge" },
  ]
  const buttonText =
    !content?.buttonText || content.buttonText === "Отправить фото дома" ? "Оставить заявку" : content.buttonText
  const buttonLink = content?.buttonLink ?? "#raschet"
  const imageUrl = content?.imageUrl ?? "/hero-house-design.jpg"
  const logoUrl = content?.logoUrl ?? "/wood-treabo-logo.png"

  return (
    <section className="relative overflow-hidden bg-white pt-28 text-[#202020] sm:pt-32 lg:min-h-[880px] lg:pt-36">
      <div className="absolute inset-0 lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[57%]">
        <Image
          src={imageUrl}
          alt="Покраска деревянного дома в Московской области"
          fill
          priority
          sizes="(min-width: 1024px) 57vw, 100vw"
          className="object-cover object-[62%_center] lg:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.82)_42%,rgba(255,255,255,0.72)_100%)] lg:hidden" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0.97)_8%,rgba(255,255,255,0.42)_25%,rgba(255,255,255,0)_48%)] lg:block" />
        <div className="absolute inset-x-0 bottom-0 hidden h-28 bg-gradient-to-t from-white/55 to-transparent lg:block" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl px-5 pb-14 sm:px-8 lg:grid-cols-[58%_42%] lg:px-10 lg:pb-20">
        <div className="max-w-[740px]">
          <div className="mb-5 flex h-[92px] w-[96px] items-center justify-center overflow-hidden rounded bg-[#141414] p-1.5 shadow-sm sm:h-[104px] sm:w-[108px]">
            <Image
              src={logoUrl}
              alt="WOOD TREABO"
              width={250}
              height={242}
              priority
              className="h-full w-full object-contain"
            />
          </div>

          <div className="mb-7 inline-flex items-center gap-2.5 text-sm font-medium text-[#383838] sm:text-base">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7f3ee] text-[#b85f11]">
              <MapPin className="h-4 w-4" />
            </span>
            {locationText}
          </div>

          <h1 className="max-w-[730px] text-[2.15rem] font-bold leading-[1.12] tracking-normal text-[#202020] sm:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-[#565656] sm:text-lg sm:leading-8">{subtitle}</p>

          <div className="mt-8 grid max-w-[640px] gap-x-8 gap-y-4 sm:grid-cols-2 sm:gap-y-5">
            {benefits.map(({ label, icon }) => {
              const Icon = iconMap[icon || "shield"] || ShieldCheck
              return (
                <div key={label} className="flex min-h-10 items-center gap-3 text-sm font-medium text-[#303030] sm:text-base">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5faf6] text-[#27a65a]">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span>{label}</span>
                </div>
              )
            })}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="h-14 cursor-pointer rounded-full bg-[#ef4444] px-7 text-base font-bold text-white shadow-[0_10px_30px_rgba(239,68,68,0.22)] transition-[background-color,transform,box-shadow] hover:-translate-y-0.5 hover:bg-[#dc2626] hover:shadow-[0_14px_34px_rgba(220,38,38,0.3)]"
            >
              <Link href={buttonLink}>
                {buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 rounded-full border-[#d4d4d4] bg-white px-7 text-base font-medium text-[#303030] hover:bg-[#f7f7f7]"
            >
              <a href={`tel:${siteConfig.phone}`}>
                <Phone className="mr-2 h-4 w-4" />
                Позвонить
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
