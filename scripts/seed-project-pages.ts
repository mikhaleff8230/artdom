import { getCliClient } from 'sanity/cli'
import { projects } from '../data/projects'

type ProjectType = 'apartment' | 'house' | 'commercial'
type ProjectStatus = 'completed' | 'in-progress'

async function seedProjectPages() {
  const client = getCliClient({ apiVersion: '2025-01-01' })
  const assetRefCache = new Map<string, string>()

  const urlToFilename = (url: string, fallback: string): string => {
    const clean = url.split('?')[0]
    const parts = clean.split('/')
    const last = parts[parts.length - 1] || fallback
    return last.includes('.') ? last : `${last || fallback}.jpg`
  }

  const uploadImageAndGetRef = async (url: string, fallbackName: string): Promise<string> => {
    if (assetRefCache.has(url)) {
      return assetRefCache.get(url)!
    }

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to download image: ${url} (${response.status})`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const filename = urlToFilename(url, fallbackName)

    const asset = await client.assets.upload('image', buffer, { filename })
    assetRefCache.set(url, asset._id)
    return asset._id
  }

  const docs = []
  for (const project of projects) {
    const imageUrls = [project.image, ...project.gallery].filter(Boolean)
    const gallery = []

    for (let index = 0; index < imageUrls.length; index += 1) {
      const imageUrl = imageUrls[index]
      const assetRef = await uploadImageAndGetRef(imageUrl, `project-${project.id}-${index + 1}.jpg`)
      gallery.push({
        _key: `${project.id}-${index + 1}`,
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: assetRef,
        },
      })
    }

    docs.push({
      _id: `projectPage-${project.id}`,
      _type: 'projectPage',
      projectId: project.id,
      titleRo: project.titleRo,
      titleRu: project.titleRu,
      locationRo: project.locationFullRo,
      locationRu: project.locationFullRu,
      projectType: project.category as ProjectType,
      year: project.year,
      overviewRo: project.fullDescriptionRo,
      overviewRu: project.fullDescriptionRu,
      area: `${95 + (Number(project.id) % 7) * 20} м²`,
      scopeRo: 'Шлифовка, обработка и покраска фасада',
      scopeRu: 'Шлифовка, обработка и покраска фасада',
      status: (project.status === 'completed' ? 'completed' : 'in-progress') as ProjectStatus,
      gallery,
    })
  }

  for (const doc of docs) {
    await client.createOrReplace(doc)
  }

  console.log(`Seed completed. Upserted ${docs.length} WOOD TREABO project pages with image assets.`)
}

seedProjectPages().catch((error) => {
  console.error(error)
  process.exit(1)
})
