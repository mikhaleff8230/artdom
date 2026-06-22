import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

type LeadPayload = {
  name?: unknown
  phone?: unknown
  service?: unknown
  area?: unknown
  location?: unknown
  comment?: unknown
  messenger?: unknown
  website?: unknown
  page_url?: unknown
}

const maxPhotos = 4
const maxPhotoSize = 8 * 1024 * 1024
const allowedPhotoTypes = new Set(["image/jpeg", "image/png", "image/webp"])

const normalize = (value: unknown, maxLength = 500) =>
  typeof value === "string"
    ? value.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, maxLength)
    : ""

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }
    return entities[character]
  })

const display = (value: string) => escapeHtml(value || "Не указано")

export async function POST(request: NextRequest) {
  let payload: LeadPayload
  let photos: File[] = []

  try {
    if (request.headers.get("content-type")?.includes("multipart/form-data")) {
      const formData = await request.formData()
      const field = (name: string) => formData.get(name)

      payload = {
        name: field("name"),
        phone: field("phone"),
        service: field("service"),
        area: field("area"),
        location: field("location"),
        comment: field("comment"),
        messenger: field("messenger"),
        website: field("website"),
        page_url: field("page_url"),
      }
      photos = formData
        .getAll("photos")
        .filter((entry): entry is File => entry instanceof File && entry.size > 0)
    } else {
      payload = (await request.json()) as LeadPayload
    }
  } catch {
    return NextResponse.json({ success: false, message: "Некорректные данные заявки" }, { status: 400 })
  }

  const website = normalize(payload.website, 200)

  // Honeypot: bots receive a normal response, but no Telegram message is sent.
  if (website) {
    return NextResponse.json({ success: true, message: "Заявка отправлена" })
  }

  if (photos.length > maxPhotos) {
    return NextResponse.json(
      { success: false, message: `Можно прикрепить не более ${maxPhotos} фотографий` },
      { status: 422 },
    )
  }

  if (photos.some((photo) => !allowedPhotoTypes.has(photo.type))) {
    return NextResponse.json(
      { success: false, message: "Поддерживаются фотографии JPEG, PNG и WebP" },
      { status: 422 },
    )
  }

  if (photos.some((photo) => photo.size > maxPhotoSize)) {
    return NextResponse.json(
      { success: false, message: "Размер каждой фотографии не должен превышать 8 МБ" },
      { status: 422 },
    )
  }

  const name = normalize(payload.name, 100)
  const phone = normalize(payload.phone, 50)
  const phoneDigits = phone.replace(/\D/g, "")

  if (!name || !phone) {
    return NextResponse.json(
      { success: false, message: "Заполните имя и телефон" },
      { status: 422 },
    )
  }

  if (phoneDigits.length !== 11 || !phoneDigits.startsWith("7")) {
    return NextResponse.json(
      { success: false, message: "Введите корректный номер телефона" },
      { status: 422 },
    )
  }

  const service = normalize(payload.service, 150)
  const area = normalize(payload.area, 50)
  const location = normalize(payload.location, 200)
  const comment = normalize(payload.comment, 1000)
  const messenger = normalize(payload.messenger, 50)
  const pageUrl = normalize(payload.page_url, 500)
  const currentDateTime = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "Europe/Moscow",
  }).format(new Date())

  const message = [
    "🔥 <b>Новая заявка с лендинга</b>",
    "",
    `<b>Имя:</b> ${display(name)}`,
    `<b>Телефон:</b> ${display(phone)}`,
    `<b>Услуга:</b> ${display(service)}`,
    `<b>Площадь:</b> ${display(area ? `${area} м²` : "")}`,
    `<b>Локация:</b> ${display(location)}`,
    `<b>Комментарий:</b> ${display(comment)}`,
    `<b>Мессенджер:</b> ${display(messenger)}`,
    `<b>Фотографии:</b> ${photos.length || "Не прикреплены"}`,
    "",
    `<b>Страница:</b> ${display(pageUrl)}`,
    `<b>Время:</b> ${escapeHtml(currentDateTime)}`,
  ].join("\n")

  const photoCaption = [
    "Новая заявка с лендинга",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Локация: ${location || "Не указана"}`,
  ].join("\n")

  try {
    const relayUrl = process.env.TELEGRAM_RELAY_URL
    const relaySecret = process.env.TELEGRAM_RELAY_SECRET
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    const endpoint = relayUrl || (botToken ? `https://api.telegram.org/bot${botToken}/sendMessage` : "")

    if (!endpoint || (relayUrl ? !relaySecret : !chatId)) {
      console.error("Telegram lead settings are missing")
      return NextResponse.json(
        { success: false, message: "Не удалось отправить заявку" },
        { status: 500 },
      )
    }

    if (!relayUrl && photos.length) {
      console.error("Photo uploads require TELEGRAM_RELAY_URL")
      return NextResponse.json(
        { success: false, message: "Не удалось отправить фотографии" },
        { status: 500 },
      )
    }

    const relayFormData = new FormData()
    relayFormData.append("text", message)
    relayFormData.append("caption", photoCaption)
    photos.forEach((photo) => relayFormData.append("photos", photo, photo.name))

    const telegramResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        ...(!relayUrl ? { "Content-Type": "application/json" } : {}),
        ...(relayUrl ? { Authorization: `Bearer ${relaySecret}` } : {}),
      },
      body: relayUrl
        ? relayFormData
        : JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "HTML",
            disable_web_page_preview: true,
          }),
      signal: AbortSignal.timeout(30_000),
    })

    if (!telegramResponse.ok) {
      const telegramError = await telegramResponse.text()
      console.error("Telegram API rejected lead:", telegramResponse.status, telegramError)
      return NextResponse.json(
        { success: false, message: "Не удалось отправить заявку" },
        { status: 502 },
      )
    }

    return NextResponse.json({ success: true, message: "Заявка отправлена" })
  } catch (error) {
    console.error("Failed to send Telegram lead:", error)
    return NextResponse.json(
      { success: false, message: "Не удалось отправить заявку" },
      { status: 502 },
    )
  }
}
