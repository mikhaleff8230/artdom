"use client"

import { FormEvent, useRef, useState } from "react"
import { ImagePlus, Send, X } from "lucide-react"
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
const maxPhotos = 4
const maxPhotoSize = 8 * 1024 * 1024
const allowedPhotoTypes = new Set(["image/jpeg", "image/png", "image/webp"])

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
  const [messenger, setMessenger] = useState<Messenger | "">("")
  const [photos, setPhotos] = useState<File[]>([])
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [isSending, setIsSending] = useState(false)
  const photoInputRef = useRef<HTMLInputElement>(null)

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

  const updatePhotos = (files: FileList | null) => {
    const selected = Array.from(files ?? [])

    if (selected.length > maxPhotos) {
      setStatus({ type: "error", message: `Можно прикрепить не более ${maxPhotos} фотографий` })
      return
    }

    if (selected.some((file) => !allowedPhotoTypes.has(file.type))) {
      setStatus({ type: "error", message: "Поддерживаются фотографии JPEG, PNG и WebP" })
      return
    }

    if (selected.some((file) => file.size > maxPhotoSize)) {
      setStatus({ type: "error", message: "Размер каждой фотографии не должен превышать 8 МБ" })
      return
    }

    setPhotos(selected)
    setStatus(null)
  }

  const clearPhotos = () => {
    setPhotos([])
    if (photoInputRef.current) photoInputRef.current.value = ""
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

    if (!messenger) {
      setStatus({ type: "error", message: "Выберите удобный мессенджер" })
      return
    }

    setStatus(null)
    setIsSending(true)

    try {
      const formData = new FormData()
      formData.append("name", name.trim())
      formData.append("phone", `+7${phoneDigits}`)
      formData.append("service", source)
      formData.append("area", area.trim())
      formData.append("location", location.trim())
      formData.append("comment", comment.trim())
      formData.append("messenger", messengerLabels[messenger])
      formData.append("website", website)
      formData.append("page_url", window.location.href)
      photos.forEach((photo) => formData.append("photos", photo, photo.name))

      const response = await fetch("/api/lead", {
        method: "POST",
        body: formData,
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
      setMessenger("")
      clearPhotos()
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
      <div className="flex w-full items-center rounded-2xl border border-white/20 bg-white/10 px-5 transition-colors focus-within:border-[#ef4444]">
        <input
          name="area"
          value={area}
          onChange={(event) => setArea(event.target.value.replace(/[^\d.,]/g, "").slice(0, 10))}
          placeholder="Площадь фасада"
          inputMode="decimal"
          className="min-w-0 flex-1 bg-transparent py-4 text-white placeholder:text-white/45 outline-none"
        />
        <span className="ml-2 shrink-0 text-white/70">м²</span>
      </div>
      <input name="location" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Район или поселок" autoComplete="address-level2" className={fieldClass} />
      <select name="messenger" value={messenger} onChange={(event) => setMessenger(event.target.value as Messenger)} className={`${fieldClass} sm:col-span-2 appearance-none`}>
        <option value="" disabled className="text-[#0f1629]">Выберите удобный мессенджер</option>
        <option value="whatsapp" className="text-[#0f1629]">WhatsApp</option>
        <option value="telegram" className="text-[#0f1629]">Telegram</option>
        <option value="max" className="text-[#0f1629]">MAX</option>
      </select>
      <textarea name="comment" value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Что нужно покрасить" className={`${fieldClass} sm:col-span-2 min-h-32 resize-y`} />

      <div className="sm:col-span-2 flex min-h-14 items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-white transition-colors focus-within:border-[#ef4444]">
        <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
          <ImagePlus className="h-5 w-5 shrink-0 text-white/70" />
          <span className="min-w-0 truncate">
            {photos.length ? `Прикреплено фото: ${photos.length}` : "Прикрепить фото"}
          </span>
          <span className="ml-auto hidden shrink-0 text-xs text-white/45 sm:inline">до 4 файлов, по 8 МБ</span>
          <input
            ref={photoInputRef}
            type="file"
            name="photos"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={(event) => updatePhotos(event.target.files)}
            className="sr-only"
          />
        </label>
        {photos.length > 0 && (
          <button type="button" onClick={clearPhotos} className="shrink-0 rounded-md p-1 text-white/60 transition-colors hover:text-white" aria-label="Удалить фотографии">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

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
