import { projects } from '../data/projects'
import { getSeedClient } from './sanity-seed-client'
import { uploadImageSource } from './sanity-assets'

type ProjectType = 'apartment' | 'house' | 'commercial'
type ProjectStatus = 'completed' | 'in-progress'

async function seedProjectPages() {
  const client = getSeedClient()

  const docs = await Promise.all(projects.map(async (project) => {
    const gallerySources = [project.image, ...project.gallery].filter(Boolean)
    const gallery = await Promise.all(gallerySources.map((source) => uploadImageSource(client, source)))

    return {
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
      area: project.id === '4' ? '240 м²' : project.id === '2' ? '180 м²' : project.id === '5' ? '120 м²' : '160 м²',
      scopeRo: project.id === '3' ? 'Фасад, наличники, терраса' : 'Шлифовка, обработка и покраска фасада',
      scopeRu: project.id === '3' ? 'Фасад, наличники, терраса' : 'Шлифовка, обработка и покраска фасада',
      status: (project.status === 'completed' ? 'completed' : 'in-progress') as ProjectStatus,
      gallery,
    }
  }))

  for (const doc of docs) {
    await client.createOrReplace(doc)
  }

  console.log(`Seed completed. Upserted ${docs.length} WOOD TREABO project pages.`)
}

seedProjectPages().catch((error) => {
  console.error(error)
  process.exit(1)
})
