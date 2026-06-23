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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { HeroContent } from "@/lib/sanity"
import { siteConfig } from "@/lib/site-config"

interface HeroSectionProps {
  content?: HeroContent
}

const benefits = [
  { label: "Более 10 лет опыта", icon: ShieldCheck },
  { label: "Работа по договору", icon: FileText },
  { label: "Фотоотчет каждого этапа", icon: Camera },
  { label: "Гарантия на выполненные работы", icon: BadgeCheck },
]

export function HeroSection({ content: _content }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-28 text-[#202020] sm:pt-32 lg:min-h-[880px] lg:pt-36">
      <div className="absolute inset-y-0 right-0 hidden w-[57%] lg:block">
        <Image
          src="/hero-house-design.jpg"
          alt="Покраска деревянного дома в Московской области"
          fill
          priority
          sizes="57vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0.97)_8%,rgba(255,255,255,0.42)_25%,rgba(255,255,255,0)_48%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/55 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl px-5 pb-14 sm:px-8 lg:grid-cols-[58%_42%] lg:px-10 lg:pb-20">
        <div className="max-w-[740px]">
          <div className="mb-5 flex h-[92px] w-[96px] items-center justify-center overflow-hidden rounded bg-[#141414] p-1.5 shadow-sm sm:h-[104px] sm:w-[108px]">
            <Image
              src="/wood-treabo-logo.png"
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
            Московская область · бесплатный выезд
          </div>

          <h1 className="max-w-[730px] text-[2.15rem] font-bold leading-[1.12] tracking-normal text-[#202020] sm:text-5xl lg:text-[3.25rem]">
            Покраска деревянных<span className="hidden lg:inline"><br /></span>{" "}
            и каркасных домов под ключ<span className="hidden lg:inline"><br /></span>{" "}
            в Московской области
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-[#565656] sm:text-lg sm:leading-8">
            Шлифовка, обработка и покраска фасадов.<br className="hidden sm:block" /> Работаем без посредников.<br className="hidden sm:block" /> Бесплатный выезд и расчет стоимости.
          </p>

          <div className="mt-8 grid max-w-[640px] gap-x-8 gap-y-4 sm:grid-cols-2 sm:gap-y-5">
            {benefits.map(({ label, icon: Icon }) => (
              <div key={label} className="flex min-h-10 items-center gap-3 text-sm font-medium text-[#303030] sm:text-base">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5faf6] text-[#27a65a]">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full bg-[#b85f11] px-7 text-base font-bold text-white shadow-[0_10px_30px_rgba(184,95,17,0.2)] hover:bg-[#9d4e0b]"
            >
              <Link href="#raschet">
                Отправить фото дома
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

        <div className="relative mt-10 aspect-[4/3] overflow-hidden lg:hidden">
          <Image
            src="/hero-house-design.jpg"
            alt="Дом во время фасадных работ"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>
    </section>
  )
}
