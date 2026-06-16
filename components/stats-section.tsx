"use client"

const reasons = [
  "Работаем без посредников",
  "Не привлекаем случайных рабочих",
  "Соблюдаем сроки",
  "Используем профессиональные материалы",
  "Подбираем систему окраски под конкретный дом",
  "Всегда остаемся на связи",
]

export function StatsSection() {
  return (
    <section className="py-20 bg-[#0f1629]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-[#22c55e] rounded-full" />
            <span className="text-white/70 text-sm font-medium uppercase tracking-wide">Почему выбирают нас</span>
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Отвечаем за объект от первого осмотра до сдачи
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => (
            <div key={reason} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#22c55e]/15 text-[#86efac]">✓</div>
              <p className="text-white text-lg font-medium">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
