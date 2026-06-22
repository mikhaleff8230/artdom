import { createServer } from "node:http"
import { timingSafeEqual } from "node:crypto"

const port = Number(process.env.PORT || 3100)
const botToken = process.env.TELEGRAM_BOT_TOKEN || ""
const chatId = process.env.TELEGRAM_CHAT_ID || ""
const relaySecret = process.env.RELAY_SECRET || ""

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

const readJson = async (request) => {
  const chunks = []
  let size = 0

  for await (const chunk of request) {
    size += chunk.length
    if (size > 16_384) throw new Error("Payload too large")
    chunks.push(chunk)
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8"))
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
    const body = await readJson(request)
    const text = typeof body.text === "string" ? body.text.trim().slice(0, 4_000) : ""

    if (!text) {
      return json(response, 422, { success: false })
    }

    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(10_000),
    })

    if (!telegramResponse.ok) {
      console.error("Telegram API error", telegramResponse.status, await telegramResponse.text())
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
