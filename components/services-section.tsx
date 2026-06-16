"use client"

import { Fence, Home, Paintbrush, PanelsTopLeft, Trees, Warehouse } from "lucide-react"

const services = [
  { title: "Каркасные дома", icon: Home },
  { title: "Дома из бруса", icon: Home },
  { title: "Имитацию бруса", icon: PanelsTopLeft },
  { title: "Планкен", icon: PanelsTopLeft },
  { title: "Бани", icon: Warehouse },
  { title: "Террасы", icon: Trees },
  { title: "Беседки", icon: Trees },
  { title: "Заборы", icon: Fence },
  { title: "Хозяйственные постройки", icon: Paintbrush },
]

const process = [
  "Вы отправляете фото дома",
  "Получаете предварительную оценку",
  "Выезд на объект",
  "Подготовка поверхности",
  "Покраска в несколько слоев",
  "Сдача объекта",
]

const prices = [
  ["Покраска фасада", "от 350 ₽/м²"],
  ["Шлифовка + покраска", "от 650 ₽/м²"],
  ["Террасы", "от 400 ₽/м²"],
  ["Заборы", "от 300 ₽/м²"],
]

export function ServicesSection() {
  return (
    <>
      <section id="uslugi" className="py-20 bg-[#f8fafc]">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-4 border border-gray-100">
              <span className="w-2 h-2 bg-[#22c55e] rounded-full" />
              <span className="text-[#0f1629]/70 text-sm font-medium uppercase tracking-wide">Услуги</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f1629] mb-3">Что мы красим</h2>
            <p className="text-[#0f1629]/60 text-lg">Деревянные фасады, элементы участка и малые постройки под ключ.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div key={service.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="font-semibold text-[#0f1629] text-lg">{service.title}</h3>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="process" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-[#f0f4f8] rounded-full px-4 py-2 mb-4">
              <span className="w-2 h-2 bg-[#22c55e] rounded-full" />
              <span className="text-[#0f1629]/70 text-sm font-medium uppercase tracking-wide">Процесс</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f1629]">Простой и понятный процесс</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {process.map((step, index) => (
              <div key={step} className="rounded-2xl border border-gray-100 bg-[#f8fafc] p-6">
                <div className="text-[#22c55e] font-bold mb-3">Шаг {index + 1}</div>
                <h3 className="text-xl font-semibold text-[#0f1629]">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0f1629]">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-4">
              <span className="w-2 h-2 bg-[#22c55e] rounded-full" />
              <span className="text-white/70 text-sm font-medium uppercase tracking-wide">Цены</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Ориентировочная стоимость</h2>
            <p className="text-white/55 text-lg">Точная стоимость зависит от состояния поверхности и рассчитывается после осмотра.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {prices.map(([title, price]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-white/75 text-base mb-4">{title}</h3>
                <p className="text-3xl font-bold text-white">{price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
