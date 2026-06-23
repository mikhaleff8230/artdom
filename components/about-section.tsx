"use client"

import Image from "next/image"
import type { AboutContent } from "@/lib/sanity"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface AboutSectionProps {
  content?: AboutContent
}

export function AboutSection({ content }: AboutSectionProps) {
  const label = content?.label ?? "Наша компания в лицах"
  const heading = content?.heading ?? "Здравствуйте. Меня зовут Александр."
  const paragraphs = content?.paragraphs ?? [
    "Я занимаюсь покраской деревянных домов более 10 лет.",
    "Лично участвую в каждом объекте и отвечаю за результат.",
    "Для меня важно не просто покрасить дом, а сделать работу так, чтобы она служила долгие годы.",
  ]
  const images =
    content?.images?.length
      ? content.images
      : [
          "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop",
        ]
  const legalText =
    content?.legalText ?? 'работаем по договору, Наши реквизиты: ООО "САНКЭН" ОГРН 1220100001263'

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 items-center lg:grid-cols-2">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f1629]">{heading}</h2>
            <div className="space-y-4 text-[#0f1629]/70 leading-8 text-base sm:text-lg">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="relative">
            <Carousel className="w-full" opts={{ loop: true }}>
              <CarouselContent>
                {images.map((imageUrl, index) => (
                  <CarouselItem key={`${imageUrl}-${index}`}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/70">
                      <Image
                        src={imageUrl}
                        alt={`${heading} — фото ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {images.length > 1 && (
                <>
                  <CarouselPrevious className="left-4 border-white/30 bg-white/90 text-[#0f1629] hover:bg-white" />
                  <CarouselNext className="right-4 border-white/30 bg-white/90 text-[#0f1629] hover:bg-white" />
                </>
              )}
            </Carousel>
          </div>
        </div>

        {legalText ? (
          <p className="mt-10 text-center text-sm text-[#0f1629]/60 sm:text-base">{legalText}</p>
        ) : null}
      </div>
    </section>
  )
}
