"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LeadForm } from "@/components/lead-form"
import { messengerLinks } from "@/lib/site-config"

const navItems = [
  { href: "/#uslugi", label: "Услуги" },
  { href: "/#raboty", label: "Работы" },
  { href: "/#process", label: "Процесс" },
  { href: "/#raschet", label: "Расчет" },
]

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const messengerItems = [
  { label: "MAX", href: messengerLinks.max, icon: <X className="h-5 w-5" />, color: "bg-[#4c16ff]" },
  { label: "Telegram", href: messengerLinks.telegram, icon: <Send className="h-5 w-5" />, color: "bg-[#2aabee]" },
  { label: "WhatsApp", href: messengerLinks.whatsapp, icon: <WhatsAppIcon />, color: "bg-[#25d366]" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLeadOpen, setIsLeadOpen] = useState(false)
  const [isMessengersOpen, setIsMessengersOpen] = useState(false)
  const pathname = usePathname()
  const isHomepage = pathname === "/"
  const showSolid = isHomepage ? isScrolled : !isScrolled
  const showLight = isHomepage && !isScrolled

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const openLead = () => {
    setIsOpen(false)
    setIsLeadOpen(true)
  }

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <div
          className={`rounded-full flex items-center justify-between shadow-xl transition-all duration-300 ease-out ${
            showSolid
              ? "bg-[#1a2234]/95 backdrop-blur-md px-6 py-2.5"
              : "bg-white/35 backdrop-blur-xl border border-white/55 px-6 py-3"
          }`}
        >
          <Link href="/" className="flex items-center shrink-0">
            <span className={`${showLight ? "text-[#202020]" : "text-white"} font-extrabold text-lg sm:text-xl tracking-normal`}>WOOD TREABO</span>
          </Link>

          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-medium transition-colors ${
                  showLight ? "text-[#303030]/80 hover:text-[#202020]" : "text-white/75 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div
              className="group relative"
              onMouseEnter={() => setIsMessengersOpen(true)}
              onMouseLeave={() => setIsMessengersOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsMessengersOpen((value) => !value)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25d366] text-white transition-transform hover:scale-105"
                aria-label="Открыть мессенджеры"
                aria-expanded={isMessengersOpen}
              >
                <WhatsAppIcon />
              </button>

              <div
                className={`absolute right-0 top-full pt-3 transition-all duration-200 ${
                  isMessengersOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
                }`}
              >
                <div className="flex min-w-44 flex-col gap-2 rounded-2xl border border-white/10 bg-[#111827]/95 p-2 shadow-2xl backdrop-blur-md">
                  {messengerItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 rounded-xl px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      <span>{item.label}</span>
                      <span className={`flex h-9 w-9 items-center justify-center rounded-full text-white ${item.color}`}>{item.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <Button
              type="button"
              onClick={openLead}
              className="hidden sm:flex rounded-full bg-[#ef4444] px-6 py-2 text-sm font-bold text-white hover:bg-[#dc2626]"
            >
              Оставить заявку
            </Button>

            <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden p-2 ${showLight ? "text-[#202020]" : "text-white"}`} aria-label="Меню">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden mt-2 rounded-2xl p-4 shadow-xl overflow-hidden transition-all duration-300 ease-out ${
            showSolid ? "bg-[#1a2234]/95" : "bg-[#111827]/95 border border-white/20"
          } backdrop-blur-md ${isOpen ? "opacity-100 max-h-96 translate-y-0" : "opacity-0 max-h-0 -translate-y-2 pointer-events-none"}`}
        >
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="text-white/85 hover:text-white text-base font-medium py-2 transition-colors">
                {item.label}
              </Link>
            ))}
            <Button type="button" onClick={openLead} className="w-full rounded-full mt-2 bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold">
              Оставить заявку
            </Button>
          </div>
        </div>
      </nav>

      <Dialog open={isLeadOpen} onOpenChange={setIsLeadOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto border-white/10 bg-[#0f1629] p-6 text-white sm:max-w-3xl sm:p-8">
          <DialogHeader>
            <DialogTitle className="pr-8 text-2xl sm:text-3xl">Сделайте расчет покраски дома уже сейчас</DialogTitle>
            <DialogDescription className="text-base text-white/60">
              Заполните форму, выберите удобный мессенджер и прикрепите фотографии дома после отправки.
            </DialogDescription>
          </DialogHeader>
          <LeadForm
            buttonLabel="Отправить заявку"
            buttonClassName="bg-[#ef4444] hover:bg-[#dc2626] text-white"
            source="Форма в шапке сайта"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
