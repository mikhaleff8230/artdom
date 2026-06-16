"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import type { LocalizedValue } from "@/data/projects"

interface ProjectGalleryProps {
  images: string[]
  title: LocalizedValue
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [api, setApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(1)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrentSlide(api.selectedScrollSnap() + 1)
    onSelect()
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  useEffect(() => {
    if (!api || !isOpen) return
    api.scrollTo(selectedIndex, true)
  }, [api, isOpen, selectedIndex])

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
    setIsOpen(true)
  }

  return (
    <>
      <section className="pb-16 lg:pb-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Галерея проекта</h2>
            <p className="text-sm text-muted-foreground">{images.length} изображений</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => openLightbox(index)}
                className="group relative block overflow-hidden rounded-2xl border border-border/70 bg-muted/20 text-left"
              >
                <div className="relative aspect-square">
                  <Image
                    src={image}
                    alt={`${title.ru} - фото ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent showCloseButton={false} className="h-screen w-screen max-w-none sm:max-w-none translate-x-[-50%] translate-y-[-50%] rounded-none border-0 bg-black p-0">
          <DialogTitle className="sr-only">{title.ru}</DialogTitle>

          <div className="relative h-full w-full">
            <Button type="button" size="icon" variant="secondary" className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-white/90 hover:bg-white" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Закрыть галерею</span>
            </Button>

            <Carousel setApi={setApi} opts={{ loop: true }} className="h-full w-full">
              <CarouselContent className="-ml-0 h-full">
                {images.map((image, index) => (
                  <CarouselItem key={`${image}-${index}`} className="pl-0">
                    <div className="relative h-screen w-full">
                      <Image src={image} alt={`${title.ru} - фото ${index + 1}`} fill className="object-contain" sizes="100vw" priority={index === selectedIndex} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <Button type="button" size="icon" variant="secondary" className="absolute top-1/2 left-4 z-20 h-12 w-12 -translate-y-1/2 rounded-full bg-black/45 text-white hover:bg-black/65" onClick={() => api?.scrollPrev()}>
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Предыдущее фото</span>
            </Button>

            <Button type="button" size="icon" variant="secondary" className="absolute top-1/2 right-4 z-20 h-12 w-12 -translate-y-1/2 rounded-full bg-black/45 text-white hover:bg-black/65" onClick={() => api?.scrollNext()}>
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Следующее фото</span>
            </Button>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
              <p className="text-center text-sm font-medium text-white">{currentSlide} / {images.length}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
