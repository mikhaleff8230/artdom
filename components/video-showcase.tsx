"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function VideoShowcase() {
  const { t } = useLanguage()

  const showcaseItems = [
    {
      id: 1,
      type: t.showcase.apartmentRenovation,
      location: "Vasile Lupu",
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop",
      size: "large",
    },
    {
      id: 2,
      type: t.showcase.individualHouse,
      location: "Sector Buiucani",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      size: "small",
    },
    {
      id: 3,
      type: t.showcase.modernPremium,
      location: "Московская область",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
      size: "small",
    },
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Large Card */}
          <div className="lg:col-span-2 relative h-80 lg:h-96 rounded-2xl overflow-hidden group">
            <Image
              src={showcaseItems[0].image}
              alt={showcaseItems[0].location}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-white/70 text-sm uppercase tracking-wide mb-1">
                {showcaseItems[0].type}
              </p>
              <h3 className="text-xl font-semibold">{showcaseItems[0].location}</h3>
            </div>
          </div>

          {/* Small Cards */}
          <div className="flex flex-col gap-4">
            {showcaseItems.slice(1).map((item) => (
              <div
                key={item.id}
                className="relative h-44 lg:h-[calc(50%-0.5rem)] rounded-2xl overflow-hidden group"
              >
                <Image
                  src={item.image}
                  alt={item.location}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-white/70 text-xs uppercase tracking-wide mb-0.5">
                    {item.type}
                  </p>
                  <h3 className="text-base font-semibold">{item.location}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
