"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#0b1120] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex text-xl font-bold mb-4">
              <span>Art</span>
              <span className="text-white/65">Dom</span>
            </Link>
            <p className="max-w-md text-white/55 leading-relaxed">
              Покраска деревянных и каркасных домов под ключ в Московской области. Шлифовка, обработка, покраска, фотоотчет и гарантия.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Разделы</h3>
            <div className="space-y-2 text-white/55">
              <Link href="/#uslugi" className="block hover:text-white">Услуги</Link>
              <Link href="/#raboty" className="block hover:text-white">Работы</Link>
              <Link href="/#process" className="block hover:text-white">Процесс</Link>
              <Link href="/portfolio" className="block hover:text-white">Все проекты</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Контакты</h3>
            <div className="space-y-2 text-white/55">
              <a href="tel:+79990000000" className="block hover:text-white">+7 999 000-00-00</a>
              <a href="https://wa.me/79990000000" className="block hover:text-white">WhatsApp</a>
              <p>Московская область</p>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/40">
          © 2026 ArtDom. Все права защищены.
        </div>
      </div>
    </footer>
  )
}
