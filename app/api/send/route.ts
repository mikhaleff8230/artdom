import nodemailer from "nodemailer"

export const runtime = "nodejs"

type LeadPayload = {
  service?: string
  area?: string
  workType?: string
  spaceState?: string
  design?: string
  complexity?: string
  estimate?: string
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
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })

    const text = [
      "Новая заявка с сайта",
      "",
      `Услуга: ${data.service ?? "-"}`,
      `Площадь: ${data.area ?? "-"}`,
      `Тип работ: ${data.workType ?? "-"}`,
      `Состояние объекта: ${data.spaceState ?? "-"}`,
      `Дизайн-проект: ${data.design ?? "-"}`,
      `Сложность: ${data.complexity ?? "-"}`,
      `Предварительный расчет: ${data.estimate ?? "-"}`,
      "",
      `Имя: ${data.name ?? "-"}`,
      `Телефон: ${data.phone ?? "-"}`,
      `Адрес: ${data.address ?? "-"}`,
      `Способ связи: ${data.contactMethod ?? "-"}`,
    ].join("\n")

    await transporter.sendMail({
      from: emailUser,
      to: "art.mikhaleff@gmail.com",
      subject: "Новая заявка с сайта",
      text,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error("Failed to send lead email:", error)
    return Response.json({ success: false, error: "Failed to send email" }, { status: 500 })
  }
}
