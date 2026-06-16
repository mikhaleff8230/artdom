"use client"

import Image from "next/image"
import { MapPin, MessageSquareQuote } from "lucide-react"

const reviews = [
  {
    name: "Ирина, Истра",
    text: "Дом заметно посветлел уже после шлифовки, а после покраски выглядит как новый. Все этапы присылали фото.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Сергей, Новая Рига",
    text: "Понравилось, что Александр сам приехал, объяснил по материалам и дал понятную смету без скрытых доплат.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Ольга, Волоколамск",
    text: "Красили фасад и террасу. Сроки выдержали, участок после работ оставили чистым.",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800&auto=format&fit=crop",
  },
]

const locations = ["Шаховская", "Волоколамск", "Новопетровское", "Руза", "Можайск", "Истра", "Новая Рига"]

export function TestimonialsGeoSection() {
  return (
    <>
      <section className="py-20 bg-[#f8fafc]">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-4 border border-gray-100">
              <span className="w-2 h-2 bg-[#22c55e] rounded-full" />
              <span className="text-[#0f1629]/70 text-sm font-medium uppercase tracking-wide">Отзывы</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f1629]">Что говорят клиенты</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.name} className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
                <div className="relative h-44">
                  <Image src={review.image} alt={review.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <MessageSquareQuote className="mb-4 h-6 w-6 text-[#22c55e]" />
                  <p className="text-[#0f1629]/70 leading-relaxed mb-4">{review.text}</p>
                  <p className="font-semibold text-[#0f1629]">{review.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#f0f4f8] rounded-full px-4 py-2 mb-4">
                <span className="w-2 h-2 bg-[#22c55e] rounded-full" />
                <span className="text-[#0f1629]/70 text-sm font-medium uppercase tracking-wide">География</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0f1629] mb-4">Работаем по западным направлениям Московской области</h2>
              <p className="text-[#0f1629]/60 text-lg">Выезжаем на осмотр, оцениваем состояние фасада и подбираем систему окраски под ваш дом.</p>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-[#f8fafc] p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {locations.map((location) => (
                  <div key={location} className="flex items-center gap-3 rounded-2xl bg-white p-4">
                    <MapPin className="h-5 w-5 text-[#22c55e]" />
                    <span className="font-medium text-[#0f1629]">{location}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
