"use client"

import { Camera } from "lucide-react"
import { LeadForm } from "@/components/lead-form"

export function CalculatorSection() {
  return (
    <section id="raschet" className="py-20 bg-[#0f1629]">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-5">
              <span className="w-2 h-2 bg-[#ef4444] rounded-full" />
              <span className="text-white/70 text-sm font-medium uppercase tracking-wide">Расчет стоимости</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5">
              Сделайте расчет покраски дома уже сейчас
            </h2>
            <p className="text-white/55 text-lg leading-relaxed">
              Предварительно считаем по фото в течение 15 минут. Точную смету фиксируем после бесплатного осмотра объекта.
            </p>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/15">
                  <Camera className="h-6 w-6 text-red-300" />
                </div>
                <p className="text-white/70">
                  После отправки откроется выбранный мессенджер. Прикрепите 2-4 фотографии фасада с разных сторон.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <LeadForm buttonLabel="Отправить фото дома" source="Нижняя форма расчета" />
          </div>
        </div>
      </div>
    </section>
  )
}
