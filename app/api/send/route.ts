import nodemailer from "nodemailer"

export const runtime = "nodejs"

type LeadPayload = {
  service?: string
  area?: string
  workType?: string
  name?: string
  phone?: string
  address?: string
  contactMethod?: string
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as LeadPayload
    const emailUser = process.env.EMAIL_USER
    const emailPass = process.env.EMAIL_PASS

    if (!emailUser || !emailPass) {
      return Response.json({ success: false, error: "Missing EMAIL_USER/EMAIL_PASS" }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: emailUser, pass: emailPass },
    })

    const text = [
      "Новая заявка с сайта WOOD TREABO",
      "",
      `Источник: ${data.service ?? "-"}`,
      `Площадь фасада: ${data.area ?? "-"}`,
      `Что нужно покрасить: ${data.workType ?? "-"}`,
      "",
      `Имя: ${data.name ?? "-"}`,
      `Телефон: ${data.phone ?? "-"}`,
      `Район или поселок: ${data.address ?? "-"}`,
      `Удобный мессенджер: ${data.contactMethod ?? "-"}`,
    ].join("\n")

    await transporter.sendMail({
      from: emailUser,
      to: "art.mikhaleff@gmail.com",
      subject: "Новая заявка WOOD TREABO",
      text,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error("Failed to send lead email:", error)
    return Response.json({ success: false, error: "Failed to send email" }, { status: 500 })
  }
}
