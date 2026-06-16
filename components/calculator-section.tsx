"use client"

import { useState } from "react"
import { Camera, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CalculatorSection() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [area, setArea] = useState("")
  const [location, setLocation] = useState("")
  const [comment, setComment] = useState("")
  const [error, setError] = useState("")

  const openWhatsapp = () => {
    if (!name.trim() || !phone.trim()) {
      setError("Укажите имя и телефон, чтобы мы могли связаться с вами.")
      return
    }

    setError("")
    const message = [
      "Здравствуйте! Хочу получить расчет покраски дома.",
      "",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Площадь: ${area || "уточнить"}`,
      `Район/поселок: ${location || "уточнить"}`,
      `Комментарий: ${comment || "нет"}`,
      "",
      "Прикреплю фото дома в WhatsApp.",
    ].join("\n")

    window.open(`https://wa.me/79990000000?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer")
  }

  return (
    <section id="raschet" className="py-20 bg-[#0f1629]">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-5">
              <span className="w-2 h-2 bg-[#22c55e] rounded-full" />
              <span className="text-white/70 text-sm font-medium uppercase tracking-wide">Расчет стоимости</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5">
              Отправьте фото дома и получите расчет уже сегодня
            </h2>
            <p className="text-white/55 text-lg leading-relaxed">
              Предварительно считаем по фото в течение 15 минут. Точную смету фиксируем после бесплатного осмотра объекта.
            </p>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#22c55e]/15">
                  <Camera className="h-6 w-6 text-[#86efac]" />
                </div>
                <p className="text-white/70">
                  После отправки формы откроется WhatsApp. В диалоге прикрепите 2-4 фотографии фасада с разных сторон.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Имя" className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-white/45 outline-none focus:border-[#22c55e]" />
              <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Телефон" className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-white/45 outline-none focus:border-[#22c55e]" />
              <input value={area} onChange={(event) => setArea(event.target.value)} placeholder="Площадь фасада, м²" className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-white/45 outline-none focus:border-[#22c55e]" />
              <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Район или поселок" className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-white/45 outline-none focus:border-[#22c55e]" />
              <textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Что нужно покрасить" className="sm:col-span-2 min-h-32 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-white/45 outline-none focus:border-[#22c55e]" />
            </div>

            {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

            <Button onClick={openWhatsapp} size="lg" className="mt-6 w-full bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-2xl px-8 py-6 text-base font-semibold">
              <Send className="w-5 h-5 mr-2" />
              Отправить фото дома
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
