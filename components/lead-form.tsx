"use client"

import { FormEvent, useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"

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

const successMessage = "Заявка отправлена. Мы свяжемся с вами в течение часа."
const failureMessage = "Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам."

const getPhoneDigits = (value: string) => {
  let digits = value.replace(/\D/g, "")

  if (digits.length > 10 && (digits.startsWith("7") || digits.startsWith("8"))) {
    digits = digits.slice(1)
  }

  return digits.slice(0, 10)
}

const formatPhone = (digits: string) => {
  if (!digits) return ""

  const parts = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 8), digits.slice(8, 10)]
  let formatted = `(${parts[0]}`

  if (parts[0].length === 3) formatted += ")"
  if (parts[1]) formatted += ` ${parts[1]}`
  if (parts[2]) formatted += `-${parts[2]}`
  if (parts[3]) formatted += `-${parts[3]}`

  return formatted
}

export function LeadForm({ buttonLabel, buttonClassName, source = "Форма расчета" }: LeadFormProps) {
  const [name, setName] = useState("")
  const [phoneDigits, setPhoneDigits] = useState("")
  const [area, setArea] = useState("")
  const [location, setLocation] = useState("")
  const [comment, setComment] = useState("")
  const [website, setWebsite] = useState("")
  const [messenger, setMessenger] = useState<Messenger>("whatsapp")
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [isSending, setIsSending] = useState(false)

  const updatePhone = (value: string, caretPosition: number | null) => {
    const nextDigits = getPhoneDigits(value)
    const currentFormatted = formatPhone(phoneDigits)

    // Mobile keyboards may delete a formatting character without firing keydown.
    if (phoneDigits && nextDigits === phoneDigits && value.length < currentFormatted.length) {
      const digitsBeforeCaret = value
        .slice(0, caretPosition ?? value.length)
        .replace(/\D/g, "").length
      const removeIndex = Math.max(0, digitsBeforeCaret - 1)

      setPhoneDigits(`${phoneDigits.slice(0, removeIndex)}${phoneDigits.slice(removeIndex + 1)}`)
      return
    }

    setPhoneDigits(nextDigits)
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name.trim() && !phoneDigits) {
      setStatus({ type: "error", message: "Заполните имя и телефон" })
      return
    }

    if (!name.trim()) {
      setStatus({ type: "error", message: "Заполните имя" })
      return
    }

    if (phoneDigits.length !== 10) {
      setStatus({ type: "error", message: "Введите номер телефона полностью" })
      return
    }

    setStatus(null)
    setIsSending(true)

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: `+7${phoneDigits}`,
          service: source,
          area: area.trim(),
          location: location.trim(),
          comment: comment.trim(),
          messenger: messengerLabels[messenger],
          website,
          page_url: window.location.href,
        }),
      })

      const result = (await response.json()) as { success?: boolean; message?: string }

      if (!response.ok || !result.success) {
        setStatus({
          type: "error",
          message: response.status === 422 && result.message ? result.message : failureMessage,
        })
        return
      }

      setName("")
      setPhoneDigits("")
      setArea("")
      setLocation("")
      setComment("")
      setWebsite("")
      setMessenger("whatsapp")
      setStatus({ type: "success", message: successMessage })
    } catch (error) {
      console.error("Failed to send lead:", error)
      setStatus({ type: "error", message: failureMessage })
    } finally {
      setIsSending(false)
    }
  }

  const fieldClass =
    "w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-white/45 outline-none transition-colors focus:border-[#ef4444]"

  return (
    <form onSubmit={submit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input name="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Имя" autoComplete="name" aria-required="true" className={fieldClass} />
      <div className="flex w-full items-center rounded-2xl border border-white/20 bg-white/10 px-5 transition-colors focus-within:border-[#ef4444]">
        <span className="mr-2 shrink-0 text-base" aria-hidden="true">🇷🇺</span>
        <span className="mr-2 shrink-0 text-white">+7</span>
        <input
          name="phone"
          value={formatPhone(phoneDigits)}
          onChange={(event) => updatePhone(event.target.value, event.target.selectionStart)}
          placeholder="(999) 123-45-67"
          inputMode="tel"
          autoComplete="tel"
          aria-label="Телефон"
          aria-required="true"
          className="min-w-0 flex-1 bg-transparent py-4 text-white placeholder:text-white/45 outline-none"
        />
      </div>
      <input name="area" value={area} onChange={(event) => setArea(event.target.value)} placeholder="Площадь фасада, м²" inputMode="decimal" className={fieldClass} />
      <input name="location" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Район или поселок" autoComplete="address-level2" className={fieldClass} />
      <select name="messenger" value={messenger} onChange={(event) => setMessenger(event.target.value as Messenger)} className={`${fieldClass} sm:col-span-2 appearance-none`}>
        <option value="whatsapp" className="text-[#0f1629]">WhatsApp</option>
        <option value="telegram" className="text-[#0f1629]">Telegram</option>
        <option value="max" className="text-[#0f1629]">MAX</option>
      </select>
      <textarea name="comment" value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Что нужно покрасить" className={`${fieldClass} sm:col-span-2 min-h-32 resize-y`} />

      <input
        type="text"
        name="website"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {status && (
        <p
          role="status"
          aria-live="polite"
          className={`sm:col-span-2 text-sm ${status.type === "success" ? "text-green-300" : "text-red-300"}`}
        >
          {status.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSending}
        size="lg"
        className={`sm:col-span-2 w-full rounded-2xl px-8 py-6 text-base font-semibold ${buttonClassName || "bg-[#22c55e] hover:bg-[#16a34a] text-white"}`}
      >
        <Send className="w-5 h-5 mr-2" />
        {isSending ? "Отправляем..." : buttonLabel}
      </Button>
    </form>
  )
}
