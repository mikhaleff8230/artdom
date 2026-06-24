import { getSeedClient } from './sanity-seed-client'
import { ensureSanityImage } from './sanity-assets'

type SanityDocument = Record<string, unknown> & {
  _id: string
  _type: string
}

async function convertArray(client: ReturnType<typeof getSeedClient>, values: unknown[] | undefined) {
  if (!Array.isArray(values)) return values
  return Promise.all(values.map((value) => ensureSanityImage(client, value)))
}

async function migrateDocument(client: ReturnType<typeof getSeedClient>, document: SanityDocument) {
  const updates: Record<string, unknown> = {}

  if (document._type === 'hero') {
    updates.image = await ensureSanityImage(client, document.image)
    updates.logoUrl = await ensureSanityImage(client, document.logoUrl)
  }

  if (document._type === 'problems' && Array.isArray(document.items)) {
    updates.items = await Promise.all(
      document.items.map(async (item) => {
        const value = item as Record<string, unknown>
        return { ...value, backgroundImage: await ensureSanityImage(client, value.backgroundImage) }
      }),
    )
  }

  if (document._type === 'servicesSection' && Array.isArray(document.items)) {
    updates.items = await Promise.all(
      document.items.map(async (item) => {
        const value = item as Record<string, unknown>
        return { ...value, backgroundImage: await ensureSanityImage(client, value.backgroundImage) }
      }),
    )
  }

  if (document._type === 'about') {
    updates.images = await convertArray(client, document.images as unknown[] | undefined)
    updates.image = await ensureSanityImage(client, document.image)
  }

  if (document._type === 'calculatorSection') {
    updates.logoUrl = await ensureSanityImage(client, document.logoUrl)
  }

  if (document._type === 'testimonialsSection' && Array.isArray(document.reviews)) {
    updates.reviews = await Promise.all(
      document.reviews.map(async (review) => {
        const value = review as Record<string, unknown>
        return { ...value, image: await ensureSanityImage(client, value.image) }
      }),
    )
  }

  if (document._type === 'projectPage') {
    updates.gallery = await convertArray(client, document.gallery as unknown[] | undefined)
  }

  const changedEntries = Object.entries(updates).filter(
    ([key, value]) => JSON.stringify(value) !== JSON.stringify(document[key]),
  )
  if (changedEntries.length === 0) return false

  await client.patch(document._id).set(Object.fromEntries(changedEntries)).commit()
  return true
}

async function migrateImages() {
  const client = getSeedClient()
  const documentTypes = [
    'hero',
    'problems',
    'servicesSection',
    'about',
    'calculatorSection',
    'testimonialsSection',
    'projectPage',
  ]
  const documents = await client.fetch<SanityDocument[]>(
    '*[_type in $documentTypes]',
    { documentTypes },
    { perspective: 'raw' },
  )

  let migrated = 0
  for (const document of documents) {
    if (await migrateDocument(client, document)) {
      migrated += 1
      console.log(`Migrated ${document._id}`)
    }
  }

  console.log(`Image migration completed. Updated ${migrated} documents.`)
}

migrateImages().catch((error) => {
  console.error(error)
  process.exit(1)
})
