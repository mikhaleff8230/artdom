const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env

const projectIdValue =
  viteEnv?.SANITY_STUDIO_PROJECT_ID ??
  viteEnv?.NEXT_PUBLIC_SANITY_PROJECT_ID ??
  process.env.SANITY_STUDIO_PROJECT_ID ??
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

const datasetValue =
  viteEnv?.SANITY_STUDIO_DATASET ??
  viteEnv?.NEXT_PUBLIC_SANITY_DATASET ??
  process.env.SANITY_STUDIO_DATASET ??
  process.env.NEXT_PUBLIC_SANITY_DATASET

const apiVersionValue =
  viteEnv?.SANITY_STUDIO_API_VERSION ??
  viteEnv?.NEXT_PUBLIC_SANITY_API_VERSION ??
  process.env.SANITY_STUDIO_API_VERSION ??
  process.env.NEXT_PUBLIC_SANITY_API_VERSION

export const apiVersion = apiVersionValue || "2025-01-01"

export const dataset = datasetValue || "production"

export const projectId = projectIdValue || "placeholder"
