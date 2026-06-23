"use client"

import Link from "next/link"
import { messengerLinks, siteConfig } from "@/lib/site-config"
import type { FooterContent } from "@/lib/sanity"

interface FooterProps {
  content?: FooterContent
}

export function Footer({ content }: FooterProps) {
  const brandName = content?.brandName ?? "WOOD TREABO"
  const description =
    content?.description ??
    "Покраска деревянных и каркасных домов под ключ в Московской области. Шлифовка, обработка, покраска, фотоотчет и гарантия."
  const sectionsTitle = content?.sectionsTitle ?? "Разделы"
  const sectionLinks = content?.sectionLinks ?? [
    { label: "Услуги", href: "/#uslugi" },
    { label: "Работы", href: "/#raboty" },
    { label: "Процесс", href: "/#process" },
    { label: "Все проекты", href: "/portfolio" },
  ]
  const contactsTitle = content?.contactsTitle ?? "Контакты"
  const locationText = content?.locationText ?? "Московская область"
  const copyright = content?.copyright ?? "© 2026 WOOD TREABO. Все права защищены."

  return (
    <footer className="bg-[#0b1120] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex text-xl font-extrabold mb-4">
              {brandName}
            </Link>
            <p className="max-w-md text-white/55 leading-relaxed">{description}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{sectionsTitle}</h3>
            <div className="space-y-2 text-white/55">
              {sectionLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{contactsTitle}</h3>
            <div className="space-y-2 text-white/55">
              <a href={`tel:${siteConfig.phone}`} className="block hover:text-white">
                {siteConfig.phoneDisplay}
              </a>
              <a href={messengerLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="block hover:text-white">
                WhatsApp
              </a>
              <a href={messengerLinks.telegram} target="_blank" rel="noopener noreferrer" className="block hover:text-white">
                Telegram
              </a>
              <a href={messengerLinks.max} target="_blank" rel="noopener noreferrer" className="block hover:text-white">
                MAX
              </a>
              <p>{locationText}</p>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/40">{copyright}</div>
      </div>
    </footer>
  )
}
