import { createServer } from "node:http"
import { timingSafeEqual } from "node:crypto"
import { Readable } from "node:stream"

const port = Number(process.env.PORT || 3100)
const botToken = process.env.TELEGRAM_BOT_TOKEN || ""
const chatId = process.env.TELEGRAM_CHAT_ID || ""
const relaySecret = process.env.RELAY_SECRET || ""
const maxRequestSize = 36 * 1024 * 1024
const maxPhotoSize = 8 * 1024 * 1024
const maxPhotos = 4
const allowedPhotoTypes = new Set(["image/jpeg", "image/png", "image/webp"])

if (!botToken || !chatId || !relaySecret) {
  throw new Error("TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID and RELAY_SECRET are required")
}

const json = (response, status, payload) => {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" })
  response.end(JSON.stringify(payload))
}

const isAuthorized = (authorization = "") => {
  const expected = Buffer.from(`Bearer ${relaySecret}`)
  const received = Buffer.from(authorization)
  return expected.length === received.length && timingSafeEqual(expected, received)
}

const readFormData = async (request) => {
  const contentLength = Number(request.headers["content-length"] || 0)
  if (contentLength > maxRequestSize) throw new Error("Payload too large")

  const headers = new Headers()
  for (const [name, value] of Object.entries(request.headers)) {
    if (value) headers.set(name, Array.isArray(value) ? value.join(", ") : value)
  }

  const webRequest = new Request("http://127.0.0.1/lead", {
    method: "POST",
    headers,
    body: Readable.toWeb(request),
    duplex: "half",
  })

  return webRequest.formData()
}

const readJson = async (request) => {
  const chunks = []
  let size = 0

  for await (const chunk of request) {
    size += chunk.length
    if (size > 16_384) throw new Error("Payload too large")
    chunks.push(chunk)
  }

  const body = JSON.parse(Buffer.concat(chunks).toString("utf8"))
  return {
    text: typeof body.text === "string" ? body.text : "",
    caption: "",
    photos: [],
  }
}

const readLead = async (request) => {
  if (request.headers["content-type"]?.includes("application/json")) {
    return readJson(request)
  }

  const body = await readFormData(request)
  return {
    text: String(body.get("text") || ""),
    caption: String(body.get("caption") || ""),
    photos: body
      .getAll("photos")
      .filter((entry) => typeof entry !== "string" && entry.size > 0),
  }
}

const sendTelegram = async (method, body) => {
  const response = await fetch(`https://api.telegram.org/bot${botToken}/${method}`, {
    method: "POST",
    body,
    signal: AbortSignal.timeout(30_000),
  })

  if (!response.ok) {
    console.error(`Telegram ${method} error`, response.status, await response.text())
  }

  return response
}

const sendPhotos = async (photos, caption) => {
  const body = new FormData()
  body.append("chat_id", chatId)

  if (photos.length === 1) {
    body.append("photo", photos[0], photos[0].name)
    body.append("caption", caption)
    return sendTelegram("sendPhoto", body)
  }

  const media = photos.map((photo, index) => ({
    type: "photo",
    media: `attach://photo${index}`,
    ...(index === 0 ? { caption } : {}),
  }))

  body.append("media", JSON.stringify(media))
  photos.forEach((photo, index) => body.append(`photo${index}`, photo, photo.name))
  return sendTelegram("sendMediaGroup", body)
}

const server = createServer(async (request, response) => {
  if (request.method === "GET" && request.url === "/health") {
    return json(response, 200, { success: true })
  }

  if (request.method !== "POST" || request.url !== "/lead") {
    return json(response, 404, { success: false })
  }

  if (!isAuthorized(request.headers.authorization)) {
    return json(response, 401, { success: false })
  }

  try {
    const lead = await readLead(request)
    const text = lead.text.trim().slice(0, 4_000)
    const caption = lead.caption.trim().slice(0, 900)
    const photos = lead.photos

    if (!text) {
      return json(response, 422, { success: false })
    }

    if (photos.length > maxPhotos) {
      return json(response, 422, { success: false })
    }

    if (photos.some((photo) => !allowedPhotoTypes.has(photo.type) || photo.size > maxPhotoSize)) {
      return json(response, 422, { success: false })
    }

    if (photos.length) {
      const photoResponse = await sendPhotos(photos, caption || "Фото к новой заявке")
      if (!photoResponse.ok) return json(response, 502, { success: false })
    }

    const messageBody = new FormData()
    messageBody.append("chat_id", chatId)
    messageBody.append("text", text)
    messageBody.append("parse_mode", "HTML")
    messageBody.append("disable_web_page_preview", "true")
    const telegramResponse = await sendTelegram("sendMessage", messageBody)

    if (!telegramResponse.ok) {
      return json(response, 502, { success: false })
    }

    return json(response, 200, { success: true })
  } catch (error) {
    console.error("Relay error", error)
    return json(response, 500, { success: false })
  }
})

server.listen(port, "0.0.0.0", () => {
  console.log(`Telegram relay listening on port ${port}`)
})
