export const siteConfig = {
  name: "WOOD TREABO",
  url: "https://wood.treabo.ru",
  phone: "+79031416581",
  phoneDigits: "79031416581",
  phoneDisplay: "+7 903 141-65-81",
  telegramUsername: "Alexander9031416581",
  maxUsername: "Alexander9031416581",
} as const

export const messengerLinks = {
  whatsapp: `https://wa.me/${siteConfig.phoneDigits}`,
  telegram: `https://t.me/${siteConfig.telegramUsername}`,
  max: `https://max.ru/${siteConfig.maxUsername}`,
} as const
