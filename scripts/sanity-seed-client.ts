import { createClient, type SanityClient } from '@sanity/client'

export function getSeedClient(): SanityClient {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production'
  const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN

  if (!projectId) {
    throw new Error('Set NEXT_PUBLIC_SANITY_PROJECT_ID (e.g. y5jey6av)')
  }

  if (!token) {
    throw new Error(
      'Set SANITY_API_WRITE_TOKEN with Editor permissions. Create one at https://www.sanity.io/manage/project/' +
        projectId +
        '/api#tokens',
    )
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01',
    token,
    useCdn: false,
  })
}
