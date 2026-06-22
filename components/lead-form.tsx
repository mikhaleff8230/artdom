"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { messengerLinks } from "@/lib/site-config"

type Messenger = "whatsapp" | "telegram" | "max"

interface LeadFormProps {
  buttonLabel: string
  buttonClassName?: string
  source?: string
}

const messengerLabels: Record<Messenger, string> = {
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  max: "MAX",
}

export function LeadForm({ buttonLabel, buttonClassName, source = "Форма расчета" }: LeadFormProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [area, setArea] = useState("")
  const [location, setLocation] = useState("")
  const [comment, setComment] = useState("")
  const [messenger, setMessenger] = useState<Messenger>("whatsapp")
  const [error, setError] = useState("")
  const [isSending, setIsSending] = useState(false)

  const getMessage = () =>
    [
      "Здравствуйте! Хочу получить расчет покраски дома.",
      "",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Площадь: ${area || "уточнить"}`,
      `Район/поселок: ${location || "уточнить"}`,
      `Что нужно покрасить: ${comment || "уточнить"}`,
      `Удобный мессенджер: ${messengerLabels[messenger]}`,
    ].join("\n")

  const submit = async () => {
    if (!name.trim() || !phone.trim()) {
      setError("Укажите имя и телефон, чтобы мы могли связаться с вами.")
      return
    }

    setError("")
    setIsSending(true)
    const message = getMessage()

    try {
      await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: source,
          area: area ? `${area} м²` : "Не указана",
          workType: comment || "Не указано",
          name,
          phone,
          address: location || "Не указан",
          contactMethod: messengerLabels[messenger],
        }),
      })
    } catch (submitError) {
      console.error("Failed to send lead:", submitError)
    } finally {
      setIsSending(false)
    }

    const url =
      messenger === "whatsapp"
        ? `${messengerLinks.whatsapp}?text=${encodeURIComponent(message)}`
        : messenger === "telegram"
          ? messengerLinks.telegram
          : messengerLinks.max

    window.open(url, "_blank", "noopener,noreferrer")
  }

  const fieldClass =
    "w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-white/45 outline-none transition-colors focus:border-[#ef4444]"

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Имя" className={fieldClass} />
      <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Телефон" inputMode="tel" className={fieldClass} />
      <input value={area} onChange={(event) => setArea(event.target.value)} placeholder="Площадь фасада, м²" inputMode="decimal" className={fieldClass} />
      <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Район или поселок" className={fieldClass} />
      <select value={messenger} onChange={(event) => setMessenger(event.target.value as Messenger)} className={`${fieldClass} sm:col-span-2 appearance-none`}>
        <option value="whatsapp" className="text-[#0f1629]">WhatsApp</option>
        <option value="telegram" className="text-[#0f1629]">Telegram</option>
        <option value="max" className="text-[#0f1629]">MAX</option>
      </select>
      <textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Что нужно покрасить" className={`${fieldClass} sm:col-span-2 min-h-32 resize-y`} />

      {error && <p className="sm:col-span-2 text-sm text-red-300">{error}</p>}

      <Button
        type="button"
        onClick={submit}
        disabled={isSending}
        size="lg"
        className={`sm:col-span-2 w-full rounded-2xl px-8 py-6 text-base font-semibold ${buttonClassName || "bg-[#22c55e] hover:bg-[#16a34a] text-white"}`}
      >
        <Send className="w-5 h-5 mr-2" />
        {isSending ? "Отправляем..." : buttonLabel}
      </Button>
    </div>
  )
}
