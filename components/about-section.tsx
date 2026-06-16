"use client"

import Image from "next/image"
import type { AboutContent } from "@/lib/sanity"

interface AboutSectionProps {
  content?: AboutContent
}

export function AboutSection({ content }: AboutSectionProps) {
  const imageUrl =
    content?.imageUrl || "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop"

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 items-center lg:grid-cols-2">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Обо мне</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f1629]">Здравствуйте. Меня зовут Александр.</h2>
            <div className="space-y-4 text-[#0f1629]/70 leading-8 text-base sm:text-lg">
              <p>Я занимаюсь покраской деревянных домов более 10 лет.</p>
              <p>Лично участвую в каждом объекте и отвечаю за результат.</p>
              <p>Для меня важно не просто покрасить дом, а сделать работу так, чтобы она служила долгие годы.</p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/70">
            <Image src={imageUrl} alt="Мастер Александр" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </div>
    </section>
  )
}
