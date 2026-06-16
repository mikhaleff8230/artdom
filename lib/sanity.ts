import { createClient } from "@sanity/client"

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

export interface HeroContent {
  titleRo: string
  titleRu: string
  subtitleRo: string
  subtitleRu: string
  buttonTextRo: string
  buttonTextRu: string
  buttonLink: string
  imageUrl: string
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
  titleRo: string
  titleRu: string
  descriptionRo: string
  descriptionRu: string
  imageUrl: string
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
  "titleRo": coalesce(titleRo, title),
  "titleRu": coalesce(titleRu, titleRo, title),
  "subtitleRo": coalesce(subtitleRo, subtitle),
  "subtitleRu": coalesce(subtitleRu, subtitleRo, subtitle),
  "buttonTextRo": coalesce(buttonTextRo, buttonText),
  "buttonTextRu": coalesce(buttonTextRu, buttonTextRo, buttonText),
  buttonLink,
  "imageUrl": image
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
  "titleRo": coalesce(titleRo, title),
  "titleRu": coalesce(titleRu, titleRo, title),
  "descriptionRo": coalesce(descriptionRo, description),
  "descriptionRu": coalesce(descriptionRu, descriptionRo, description),
  "imageUrl": image
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
  titleRo: "Покраска деревянных и каркасных домов",
  titleRu: "Покраска деревянных и каркасных домов",
  subtitleRo: "Шлифовка, обработка и покраска фасадов в Московской области.",
  subtitleRu: "Шлифовка, обработка и покраска фасадов в Московской области.",
  buttonTextRo: "Отправить фото дома",
  buttonTextRu: "Отправить фото дома",
  buttonLink: "#raschet",
  imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop",
}

const fallbackFeatures: FeaturesContent = {
  titleRo: "Почему выбирают ArtDom",
  titleRu: "Почему выбирают ArtDom",
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
  titleRo: "О мастере",
  titleRu: "О мастере",
  descriptionRo: "Александр занимается покраской деревянных домов более 10 лет и лично отвечает за результат на каждом объекте.",
  descriptionRu: "Александр занимается покраской деревянных домов более 10 лет и лично отвечает за результат на каждом объекте.",
  imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop",
}

export async function getHero(): Promise<HeroContent> {
  if (!sanityClient) return fallbackHero
  try {
    return (await sanityClient.fetch(heroQuery, {}, { cache: "no-store" })) || fallbackHero
  } catch {
    return fallbackHero
  }
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
  if (!sanityClient) return fallbackAbout
  try {
    return (await sanityClient.fetch(aboutQuery, {}, { cache: "no-store" })) || fallbackAbout
  } catch {
    return fallbackAbout
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
