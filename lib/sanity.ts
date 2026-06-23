import { createClient } from "@sanity/client"
import { projects } from "@/data/projects"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01"
const hasValidSanityEnv = Boolean(projectId && projectId !== "yourProjectId" && projectId !== "placeholder" && dataset)

const sanityClient = hasValidSanityEnv
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    })
  : null

export interface HeroBenefit {
  label: string
  icon?: string
}

export interface HeroContent {
  title: string
  subtitle: string
  locationText: string
  benefits: HeroBenefit[]
  buttonText: string
  buttonLink: string
  imageUrl: string
  logoUrl?: string
  // legacy
  titleRo?: string
  titleRu?: string
  subtitleRo?: string
  subtitleRu?: string
  buttonTextRo?: string
  buttonTextRu?: string
}

export interface FeatureItem {
  titleRo: string
  titleRu: string
  descriptionRo: string
  descriptionRu: string
  icon?: string
  iconImageUrl?: string
}

export interface FeaturesContent {
  titleRo: string
  titleRu: string
  descriptionRo: string
  descriptionRu: string
  items: FeatureItem[]
}

export interface AboutContent {
  label: string
  heading: string
  paragraphs: string[]
  images: string[]
  legalText: string
  // legacy
  titleRo?: string
  titleRu?: string
  descriptionRo?: string
  descriptionRu?: string
  imageUrl?: string
}

export interface ProblemCard {
  title: string
  backgroundImage: string
}

export interface ProblemsContent {
  badge: string
  title: string
  description: string
  items: ProblemCard[]
}

export interface ServiceCard {
  title: string
  backgroundImage: string
}

export interface ServicesSectionContent {
  badge: string
  title: string
  description: string
  items: ServiceCard[]
  processBadge: string
  processTitle: string
  processSteps: string[]
  pricesBadge: string
  pricesTitle: string
  pricesDescription: string
  prices: { title: string; price: string }[]
}

export interface PortfolioSectionContent {
  badge: string
  title: string
  description: string
  buttonText: string
  areaLabel: string
  durationLabel: string
  paintLabel: string
  viewDetailsText: string
}

export interface HomepagePortfolioProject {
  id: string
  title: string
  location: string
  imageBefore: string
  imageAfter: string
  area: string
  duration: string
  paintSystem: string
}

export interface StatsSectionContent {
  badge: string
  title: string
  items: string[]
}

export interface CalculatorSectionContent {
  badge: string
  title: string
  description: string
  tipText: string
  buttonLabel: string
  logoUrl?: string
}

export interface TestimonialItem {
  name: string
  text: string
  image: string
}

export interface TestimonialsSectionContent {
  reviewsBadge: string
  reviewsTitle: string
  reviews: TestimonialItem[]
  geoBadge: string
  geoTitle: string
  geoDescription: string
  locations: string[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqSectionContent {
  badge: string
  title: string
  items: FaqItem[]
}

export interface CtaSectionContent {
  title: string
  description: string
  buttonText: string
}

export interface NavLink {
  label: string
  href: string
}

export interface NavigationContent {
  brandName: string
  items: NavLink[]
  ctaButtonText: string
  leadDialogTitle: string
  leadDialogDescription: string
}

export interface FooterContent {
  brandName: string
  description: string
  sectionsTitle: string
  sectionLinks: NavLink[]
  contactsTitle: string
  locationText: string
  copyright: string
}

export interface HomepageContent {
  hero: HeroContent
  navigation: NavigationContent
  problems: ProblemsContent
  portfolioSection: PortfolioSectionContent
  portfolioProjects: HomepagePortfolioProject[]
  servicesSection: ServicesSectionContent
  statsSection: StatsSectionContent
  about: AboutContent
  calculatorSection: CalculatorSectionContent
  testimonialsSection: TestimonialsSectionContent
  faqSection: FaqSectionContent
  ctaSection: CtaSectionContent
  footer: FooterContent
}

export interface CmsProjectPage {
  projectId: string
  titleRo: string
  titleRu: string
  locationRo: string
  locationRu: string
  projectType: "apartment" | "house" | "commercial"
  year: string
  overviewRo: string
  overviewRu: string
  area: string
  scopeRo: string
  scopeRu: string
  status: "completed" | "in-progress"
  gallery: string[]
}

const heroQuery = `*[_type == "hero"][0]{
  "title": coalesce(titleRu, titleRo, title),
  "subtitle": coalesce(subtitleRu, subtitleRo, subtitle),
  "locationText": coalesce(locationText, "Московская область · бесплатный выезд"),
  benefits[]{ label, icon },
  "buttonText": coalesce(buttonTextRu, buttonTextRo, buttonText, "Оставить заявку"),
  "buttonLink": coalesce(buttonLink, "#raschet"),
  "imageUrl": image,
  logoUrl
}`

const featuresQuery = `*[_type == "features"][0]{
  "titleRo": coalesce(titleRo, title),
  "titleRu": coalesce(titleRu, titleRo, title),
  "descriptionRo": coalesce(descriptionRo, description),
  "descriptionRu": coalesce(descriptionRu, descriptionRo, description),
  items[]{
    "titleRo": coalesce(titleRo, title),
    "titleRu": coalesce(titleRu, titleRo, title),
    "descriptionRo": coalesce(descriptionRo, description),
    "descriptionRu": coalesce(descriptionRu, descriptionRo, description),
    icon,
    "iconImageUrl": iconImage.asset->url
  }
}`

const aboutQuery = `*[_type == "about"][0]{
  "label": coalesce(label, "Наша компания в лицах"),
  "heading": coalesce(heading, titleRu, titleRo, title),
  "paragraphs": coalesce(
    paragraphs,
    [coalesce(descriptionRu, descriptionRo, description)]
  ),
  "images": coalesce(
    images,
    select(defined(image) => [image], [])
  ),
  "legalText": coalesce(legalText, ""),
  "titleRo": coalesce(titleRo, title),
  "titleRu": coalesce(titleRu, titleRo, title),
  "descriptionRo": coalesce(descriptionRo, description),
  "descriptionRu": coalesce(descriptionRu, descriptionRo, description),
  "imageUrl": coalesce(images[0], image)
}`

const problemsQuery = `*[_type == "problems"][0]{
  "badge": coalesce(badge, "Проблема"),
  title,
  description,
  items[]{
    title,
    backgroundImage
  }
}`

const servicesSectionQuery = `*[_type == "servicesSection"][0]{
  "badge": coalesce(badge, "Услуги"),
  title,
  description,
  items[]{ title, backgroundImage },
  "processBadge": coalesce(processBadge, "Процесс"),
  "processTitle": coalesce(processTitle, "Простой и понятный процесс"),
  "processSteps": coalesce(processSteps, []),
  "pricesBadge": coalesce(pricesBadge, "Цены"),
  "pricesTitle": coalesce(pricesTitle, "Ориентировочная стоимость"),
  "pricesDescription": coalesce(pricesDescription, ""),
  prices[]{ title, price }
}`

const portfolioSectionQuery = `*[_type == "portfolioSection"][0]{
  "badge": coalesce(badge, "Результаты наших работ"),
  title,
  description,
  "buttonText": coalesce(buttonText, "Смотреть все проекты"),
  "areaLabel": coalesce(areaLabel, "Площадь"),
  "durationLabel": coalesce(durationLabel, "Срок"),
  "paintLabel": coalesce(paintLabel, "Краска"),
  "viewDetailsText": coalesce(viewDetailsText, "Подробнее")
}`

const statsSectionQuery = `*[_type == "statsSection"][0]{
  "badge": coalesce(badge, "Почему выбирают нас"),
  title,
  items
}`

const calculatorSectionQuery = `*[_type == "calculatorSection"][0]{
  "badge": coalesce(badge, "Расчет стоимости"),
  title,
  description,
  tipText,
  "buttonLabel": coalesce(buttonLabel, "Отправить фото дома"),
  logoUrl
}`

const testimonialsSectionQuery = `*[_type == "testimonialsSection"][0]{
  "reviewsBadge": coalesce(reviewsBadge, "Отзывы"),
  reviewsTitle,
  reviews[]{ name, text, image },
  "geoBadge": coalesce(geoBadge, "География"),
  geoTitle,
  geoDescription,
  locations
}`

const faqSectionQuery = `*[_type == "faqSection"][0]{
  "badge": coalesce(badge, "Вопросы"),
  title,
  items[]{ question, answer }
}`

const ctaSectionQuery = `*[_type == "ctaSection"][0]{
  title,
  description,
  "buttonText": coalesce(buttonText, "Отправить фото дома")
}`

const navigationQuery = `*[_type == "navigation"][0]{
  "brandName": coalesce(brandName, "WOOD TREABO"),
  items[]{ label, href },
  "ctaButtonText": coalesce(ctaButtonText, "Оставить заявку"),
  leadDialogTitle,
  leadDialogDescription
}`

const footerQuery = `*[_type == "footer"][0]{
  "brandName": coalesce(brandName, "WOOD TREABO"),
  description,
  "sectionsTitle": coalesce(sectionsTitle, "Разделы"),
  sectionLinks[]{ label, href },
  "contactsTitle": coalesce(contactsTitle, "Контакты"),
  "locationText": coalesce(locationText, "Московская область"),
  copyright
}`

const projectPageFields = `{
  projectId,
  "titleRo": coalesce(titleRo, title),
  "titleRu": coalesce(titleRu, titleRo, title),
  "locationRo": coalesce(locationRo, location),
  "locationRu": coalesce(locationRu, locationRo, location),
  "projectType": coalesce(projectType, "apartment"),
  "year": coalesce(year, ""),
  "overviewRo": coalesce(overviewRo, overview),
  "overviewRu": coalesce(overviewRu, overviewRo, overview),
  "area": coalesce(area, ""),
  "scopeRo": coalesce(scopeRo, scope),
  "scopeRu": coalesce(scopeRu, scopeRo, scope),
  "status": coalesce(status, "completed"),
  "gallery": coalesce(gallery[].asset->url, gallery)
}`

const projectPageByIdQuery = `*[_type == "projectPage" && (_id == "projectPage-" + $id || projectId == $id)][0]${projectPageFields}`
const relatedProjectPagesQuery = `*[_type == "projectPage" && (_id match "projectPage-*" || defined(projectId)) && defined(projectId) && projectType == $projectType && projectId != $currentId] | order(_updatedAt desc)[0...3]${projectPageFields}`
const portfolioProjectPagesQuery = `*[_type == "projectPage" && (_id match "projectPage-*" || defined(projectId)) && defined(projectId) && defined(coalesce(titleRo, title))] | order(_updatedAt desc)${projectPageFields}`

const fallbackHero: HeroContent = {
  title: "Покраска деревянных и каркасных домов под ключ в Московской области",
  subtitle: "Шлифовка, обработка и покраска фасадов. Работаем без посредников. Бесплатный выезд и расчет стоимости.",
  locationText: "Московская область · бесплатный выезд",
  benefits: [
    { label: "Более 10 лет опыта", icon: "shield" },
    { label: "Работа по договору", icon: "file" },
    { label: "Фотоотчет каждого этапа", icon: "camera" },
    { label: "Гарантия на выполненные работы", icon: "badge" },
  ],
  buttonText: "Оставить заявку",
  buttonLink: "#raschet",
  imageUrl: "/hero-house-design.jpg",
  logoUrl: "/wood-treabo-logo.png",
}

const fallbackFeatures: FeaturesContent = {
  titleRo: "Почему выбирают WOOD TREABO",
  titleRu: "Почему выбирают WOOD TREABO",
  descriptionRo: "Подготовка, материалы и покраска под ключ.",
  descriptionRu: "Подготовка, материалы и покраска под ключ.",
  items: [
    {
      titleRo: "Работа по договору",
      titleRu: "Работа по договору",
      descriptionRo: "Фиксируем объем работ, сроки и ответственность.",
      descriptionRu: "Фиксируем объем работ, сроки и ответственность.",
      icon: "leaf",
    },
    {
      titleRo: "Материалы под дом",
      titleRu: "Материалы под дом",
      descriptionRo: "Подбираем систему окраски под состояние древесины.",
      descriptionRu: "Подбираем систему окраски под состояние древесины.",
      icon: "wrench",
    },
    {
      titleRo: "Фотоотчет этапов",
      titleRu: "Фотоотчет этапов",
      descriptionRo: "Показываем подготовку, нанесение слоев и итог.",
      descriptionRu: "Показываем подготовку, нанесение слоев и итог.",
      icon: "handshake",
    },
  ],
}

const fallbackAbout: AboutContent = {
  label: "Наша компания в лицах",
  heading: "Здравствуйте. Меня зовут Александр.",
  paragraphs: [
    "Я занимаюсь покраской деревянных домов более 10 лет.",
    "Лично участвую в каждом объекте и отвечаю за результат.",
    "Для меня важно не просто покрасить дом, а сделать работу так, чтобы она служила долгие годы.",
  ],
  images: [
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  ],
  legalText: 'работаем по договору, Наши реквизиты: ООО "САНКЭН" ОГРН 1220100001263',
}

const fallbackProblems: ProblemsContent = {
  badge: "Проблема",
  title: "Ваш дом потерял внешний вид?",
  description: "Своевременная покраска защищает дом на долгие годы и сохраняет его стоимость.",
  items: [
    {
      title: "Старая краска выгорает",
      backgroundImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "Дерево темнеет и сереет",
      backgroundImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "Появляются трещины",
      backgroundImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "Фасад теряет привлекательность",
      backgroundImage: "https://images.unsplash.com/photo-1600573472592-401b289b3584?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "Повышается риск разрушения древесины",
      backgroundImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    },
  ],
}

const fallbackServicesSection: ServicesSectionContent = {
  badge: "Услуги",
  title: "Что мы красим",
  description: "Деревянные фасады, элементы участка и малые постройки под ключ.",
  items: [
    { title: "Каркасные дома", backgroundImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop" },
    { title: "Дома из бруса", backgroundImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop" },
    { title: "Имитацию бруса", backgroundImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop" },
    { title: "Планкен", backgroundImage: "https://images.unsplash.com/photo-1600573472592-401b289b3584?q=80&w=800&auto=format&fit=crop" },
    { title: "Бани", backgroundImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop" },
    { title: "Террасы", backgroundImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop" },
    { title: "Беседки", backgroundImage: "https://images.unsplash.com/photo-1600047509807-ba8f8d404420?q=80&w=800&auto=format&fit=crop" },
    { title: "Заборы", backgroundImage: "https://images.unsplash.com/photo-1600210492496-724fe5c67fb0?q=80&w=800&auto=format&fit=crop" },
    { title: "Хозяйственные постройки", backgroundImage: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?q=80&w=800&auto=format&fit=crop" },
  ],
  processBadge: "Процесс",
  processTitle: "Простой и понятный процесс",
  processSteps: [
    "Вы отправляете фото дома",
    "Получаете предварительную оценку",
    "Выезд на объект",
    "Подготовка поверхности",
    "Покраска в несколько слоев",
    "Сдача объекта",
  ],
  pricesBadge: "Цены",
  pricesTitle: "Ориентировочная стоимость",
  pricesDescription: "Точная стоимость зависит от состояния поверхности и рассчитывается после осмотра.",
  prices: [
    { title: "Покраска фасада", price: "от 350 ₽/м²" },
    { title: "Шлифовка + покраска", price: "от 650 ₽/м²" },
    { title: "Террасы", price: "от 400 ₽/м²" },
    { title: "Заборы", price: "от 300 ₽/м²" },
  ],
}

const fallbackPortfolioSection: PortfolioSectionContent = {
  badge: "Результаты наших работ",
  title: "До и после покраски",
  description: "В карточках проекта указаны площадь, срок выполнения и использованная система окраски.",
  buttonText: "Смотреть все проекты",
  areaLabel: "Площадь",
  durationLabel: "Срок",
  paintLabel: "Краска",
  viewDetailsText: "Подробнее",
}

const fallbackStatsSection: StatsSectionContent = {
  badge: "Почему выбирают нас",
  title: "Отвечаем за объект от первого осмотра до сдачи",
  items: [
    "Работаем без посредников",
    "Не привлекаем случайных рабочих",
    "Соблюдаем сроки",
    "Используем профессиональные материалы",
    "Подбираем систему окраски под конкретный дом",
    "Всегда остаемся на связи",
  ],
}

const fallbackCalculatorSection: CalculatorSectionContent = {
  badge: "Расчет стоимости",
  title: "Сделайте расчет покраски дома уже сейчас",
  description: "Предварительно считаем по фото в течение 15 минут. Точную смету фиксируем после бесплатного осмотра объекта.",
  tipText: "Укажите удобный мессенджер для связи. После заявки мы уточним детали и попросим 2-4 фотографии фасада с разных сторон.",
  buttonLabel: "Отправить фото дома",
  logoUrl: "/wood-treabo-logo.png",
}

const fallbackTestimonialsSection: TestimonialsSectionContent = {
  reviewsBadge: "Отзывы",
  reviewsTitle: "Что говорят клиенты",
  reviews: [
    {
      name: "Ирина, Истра",
      text: "Дом заметно посветлел уже после шлифовки, а после покраски выглядит как новый. Все этапы присылали фото.",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Сергей, Новая Рига",
      text: "Понравилось, что Александр сам приехал, объяснил по материалам и дал понятную смету без скрытых доплат.",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Ольга, Волоколамск",
      text: "Красили фасад и террасу. Сроки выдержали, участок после работ оставили чистым.",
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800&auto=format&fit=crop",
    },
  ],
  geoBadge: "География",
  geoTitle: "Работаем по западным направлениям Московской области",
  geoDescription: "Выезжаем на осмотр, оцениваем состояние фасада и подбираем систему окраски под ваш дом.",
  locations: ["Шаховская", "Волоколамск", "Новопетровское", "Руза", "Можайск", "Истра", "Новая Рига"],
}

const fallbackFaqSection: FaqSectionContent = {
  badge: "Вопросы",
  title: "Часто спрашивают",
  items: [
    {
      question: "Можно ли посчитать стоимость по фото?",
      answer: "Да. По фото мы даем предварительный диапазон, а точную стоимость фиксируем после осмотра поверхности.",
    },
    {
      question: "Вы работаете со своей краской или можно купить самому?",
      answer: "Можем работать с вашим материалом, но обычно подбираем систему сами, чтобы отвечать за результат.",
    },
    {
      question: "Сколько занимает покраска дома?",
      answer: "Обычный фасад занимает от 4 до 10 рабочих дней. Срок зависит от площади, высоты, состояния дерева и погоды.",
    },
    {
      question: "В каких районах работаете?",
      answer: "Шаховская, Волоколамск, Новопетровское, Руза, Можайск, Истра, Новая Рига и соседние направления.",
    },
  ],
}

const fallbackCtaSection: CtaSectionContent = {
  title: "Получите расчет стоимости уже сегодня",
  description: "Отправьте фотографию дома в WhatsApp и получите предварительный расчет в течение 15 минут.",
  buttonText: "Отправить фото дома",
}

const fallbackNavigation: NavigationContent = {
  brandName: "WOOD TREABO",
  items: [
    { label: "Услуги", href: "/#uslugi" },
    { label: "Работы", href: "/#raboty" },
    { label: "Процесс", href: "/#process" },
    { label: "Расчет", href: "/#raschet" },
  ],
  ctaButtonText: "Оставить заявку",
  leadDialogTitle: "Сделайте расчет покраски дома уже сейчас",
  leadDialogDescription: "Заполните форму, выберите удобный мессенджер и прикрепите фотографии дома после отправки.",
}

const fallbackFooter: FooterContent = {
  brandName: "WOOD TREABO",
  description: "Покраска деревянных и каркасных домов под ключ в Московской области. Шлифовка, обработка, покраска, фотоотчет и гарантия.",
  sectionsTitle: "Разделы",
  sectionLinks: [
    { label: "Услуги", href: "/#uslugi" },
    { label: "Работы", href: "/#raboty" },
    { label: "Процесс", href: "/#process" },
    { label: "Все проекты", href: "/portfolio" },
  ],
  contactsTitle: "Контакты",
  locationText: "Московская область",
  copyright: "© 2026 WOOD TREABO. Все права защищены.",
}

async function fetchSanity<T>(query: string, fallback: T): Promise<T> {
  if (!sanityClient) return fallback
  try {
    return (await sanityClient.fetch(query, {}, { cache: "no-store" })) || fallback
  } catch {
    return fallback
  }
}

function mapLocalProjectsToHomepage(): HomepagePortfolioProject[] {
  return projects.map((project) => ({
    id: project.id,
    title: project.titleRu,
    location: project.locationRu,
    imageBefore: project.gallery[0] || project.image,
    imageAfter: project.image,
    area: project.id === "4" ? "240 м²" : "160 м²",
    duration: "6-9 дней",
    paintSystem: "профессиональная фасадная система",
  }))
}

function mapCmsProjectsToHomepage(cmsProjects: CmsProjectPage[]): HomepagePortfolioProject[] {
  return cmsProjects.map((project) => ({
    id: project.projectId,
    title: project.titleRu,
    location: project.locationRu,
    imageBefore: project.gallery[0] || "",
    imageAfter: project.gallery[1] || project.gallery[0] || "",
    area: project.area || "160 м²",
    duration: "6-9 дней",
    paintSystem: "профессиональная фасадная система",
  }))
}

export async function getHero(): Promise<HeroContent> {
  return fetchSanity(heroQuery, fallbackHero)
}

export async function getFeatures(): Promise<FeaturesContent> {
  if (!sanityClient) return fallbackFeatures
  try {
    return (await sanityClient.fetch(featuresQuery, {}, { cache: "no-store" })) || fallbackFeatures
  } catch {
    return fallbackFeatures
  }
}

export async function getAbout(): Promise<AboutContent> {
  return fetchSanity(aboutQuery, fallbackAbout)
}

export async function getProblems(): Promise<ProblemsContent> {
  return fetchSanity(problemsQuery, fallbackProblems)
}

export async function getServicesSection(): Promise<ServicesSectionContent> {
  const data = await fetchSanity(servicesSectionQuery, fallbackServicesSection)
  return {
    ...fallbackServicesSection,
    ...data,
    items: data.items?.length ? data.items : fallbackServicesSection.items,
    processSteps: data.processSteps?.length ? data.processSteps : fallbackServicesSection.processSteps,
    prices: data.prices?.length ? data.prices : fallbackServicesSection.prices,
  }
}

export async function getPortfolioSection(): Promise<PortfolioSectionContent> {
  return fetchSanity(portfolioSectionQuery, fallbackPortfolioSection)
}

export async function getHomepagePortfolioProjects(): Promise<HomepagePortfolioProject[]> {
  const cmsProjects = await getPortfolioProjectPages()
  if (cmsProjects.length > 0) return mapCmsProjectsToHomepage(cmsProjects)
  return mapLocalProjectsToHomepage()
}

export async function getStatsSection(): Promise<StatsSectionContent> {
  const data = await fetchSanity(statsSectionQuery, fallbackStatsSection)
  return {
    ...fallbackStatsSection,
    ...data,
    items: data.items?.length ? data.items : fallbackStatsSection.items,
  }
}

export async function getCalculatorSection(): Promise<CalculatorSectionContent> {
  return fetchSanity(calculatorSectionQuery, fallbackCalculatorSection)
}

export async function getTestimonialsSection(): Promise<TestimonialsSectionContent> {
  const data = await fetchSanity(testimonialsSectionQuery, fallbackTestimonialsSection)
  return {
    ...fallbackTestimonialsSection,
    ...data,
    reviews: data.reviews?.length ? data.reviews : fallbackTestimonialsSection.reviews,
    locations: data.locations?.length ? data.locations : fallbackTestimonialsSection.locations,
  }
}

export async function getFaqSection(): Promise<FaqSectionContent> {
  const data = await fetchSanity(faqSectionQuery, fallbackFaqSection)
  return {
    ...fallbackFaqSection,
    ...data,
    items: data.items?.length ? data.items : fallbackFaqSection.items,
  }
}

export async function getCtaSection(): Promise<CtaSectionContent> {
  return fetchSanity(ctaSectionQuery, fallbackCtaSection)
}

export async function getNavigation(): Promise<NavigationContent> {
  const data = await fetchSanity(navigationQuery, fallbackNavigation)
  return {
    ...fallbackNavigation,
    ...data,
    items: data.items?.length ? data.items : fallbackNavigation.items,
  }
}

export async function getFooter(): Promise<FooterContent> {
  const data = await fetchSanity(footerQuery, fallbackFooter)
  return {
    ...fallbackFooter,
    ...data,
    sectionLinks: data.sectionLinks?.length ? data.sectionLinks : fallbackFooter.sectionLinks,
  }
}

export async function getHomepageContent(): Promise<HomepageContent> {
  const [
    hero,
    navigation,
    problems,
    portfolioSection,
    portfolioProjects,
    servicesSection,
    statsSection,
    about,
    calculatorSection,
    testimonialsSection,
    faqSection,
    ctaSection,
    footer,
  ] = await Promise.all([
    getHero(),
    getNavigation(),
    getProblems(),
    getPortfolioSection(),
    getHomepagePortfolioProjects(),
    getServicesSection(),
    getStatsSection(),
    getAbout(),
    getCalculatorSection(),
    getTestimonialsSection(),
    getFaqSection(),
    getCtaSection(),
    getFooter(),
  ])

  return {
    hero,
    navigation,
    problems,
    portfolioSection,
    portfolioProjects,
    servicesSection,
    statsSection,
    about,
    calculatorSection,
    testimonialsSection,
    faqSection,
    ctaSection,
    footer,
  }
}

export async function getProjectPageById(id: string): Promise<CmsProjectPage | null> {
  if (!sanityClient) return null
  try {
    return await sanityClient.fetch(projectPageByIdQuery, { id }, { cache: "no-store" })
  } catch {
    return null
  }
}

export async function getRelatedProjectPages(
  currentId: string,
  projectType: "apartment" | "house" | "commercial"
): Promise<CmsProjectPage[]> {
  if (!sanityClient) return []
  try {
    return (
      (await sanityClient.fetch(relatedProjectPagesQuery, { currentId, projectType }, { cache: "no-store" })) || []
    )
  } catch {
    return []
  }
}

export async function getPortfolioProjectPages(): Promise<CmsProjectPage[]> {
  if (!sanityClient) return []
  try {
    return (await sanityClient.fetch(portfolioProjectPagesQuery, {}, { cache: "no-store" })) || []
  } catch {
    return []
  }
}
