import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/lib/language-context"
import { YandexMetrika } from "@/components/yandex-metrika"
import { siteConfig } from "@/lib/site-config"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "WOOD TREABO | Покраска деревянных домов в Московской области",
  description:
    "Покраска деревянных и каркасных домов под ключ: шлифовка, обработка, покраска фасадов, бесплатный выезд и расчет стоимости.",
  keywords:
    "покраска деревянных домов, покраска фасада, каркасный дом, дом из бруса, Московская область, Новая Рига, Истра, Руза",
  authors: [{ name: siteConfig.name }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "WOOD TREABO | Покраска деревянных домов",
    description: "Шлифовка, обработка и покраска фасадов под ключ в Московской области.",
    type: "website",
    locale: "ru_RU",
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f1629",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="bg-[#0f1629]">
      <body className={`${inter.variable} font-sans antialiased`}>
        <YandexMetrika />
        <LanguageProvider>{children}</LanguageProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
