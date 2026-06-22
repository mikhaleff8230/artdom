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

  try {
    payload = (await request.json()) as LeadPayload
  } catch {
    return NextResponse.json({ success: false, message: "Некорректные данные заявки" }, { status: 400 })
  }

  const website = normalize(payload.website, 200)

  // Honeypot: bots receive a normal response, but no Telegram message is sent.
  if (website) {
    return NextResponse.json({ success: true, message: "Заявка отправлена" })
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
    "",
    `<b>Страница:</b> ${display(pageUrl)}`,
    `<b>Время:</b> ${escapeHtml(currentDateTime)}`,
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

    const telegramResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(relayUrl ? { Authorization: `Bearer ${relaySecret}` } : {}),
      },
      body: JSON.stringify(
        relayUrl
          ? { text: message }
          : {
              chat_id: chatId,
              text: message,
              parse_mode: "HTML",
              disable_web_page_preview: true,
            },
      ),
      signal: AbortSignal.timeout(10_000),
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
