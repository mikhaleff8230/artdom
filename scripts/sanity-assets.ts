import { readFile } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'
import type { SanityClient } from '@sanity/client'

export interface SanityImageValue {
  _type: 'image'
  asset: {
    _type: 'reference'
    _ref: string
  }
}

const uploadCache = new Map<string, Promise<SanityImageValue>>()

async function fetchImage(source: string): Promise<Response> {
  let lastError: unknown

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(source, { signal: AbortSignal.timeout(45_000) })
      if (response.ok) return response
      lastError = new Error(`Image request failed with status ${response.status}`)
    } catch (error) {
      lastError = error
    }

    if (attempt < 4) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 1_500))
    }
  }

  throw new Error(`Cannot download image: ${source}`, { cause: lastError })
}

function extensionFor(contentType: string | null): string {
  if (contentType?.includes('png')) return '.png'
  if (contentType?.includes('webp')) return '.webp'
  if (contentType?.includes('gif')) return '.gif'
  return '.jpg'
}

function contentTypeFor(filename: string): string | undefined {
  const extension = extname(filename).toLowerCase()
  if (extension === '.png') return 'image/png'
  if (extension === '.webp') return 'image/webp'
  if (extension === '.gif') return 'image/gif'
  if (extension === '.jpg' || extension === '.jpeg') return 'image/jpeg'
  return undefined
}

function imageReference(assetId: string): SanityImageValue {
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: assetId,
    },
  }
}

export function isSanityImage(value: unknown): value is SanityImageValue {
  if (!value || typeof value !== 'object') return false
  const candidate = value as { asset?: { _ref?: unknown } }
  return typeof candidate.asset?._ref === 'string'
}

export function uploadImageSource(client: SanityClient, source: string): Promise<SanityImageValue> {
  const cached = uploadCache.get(source)
  if (cached) return cached

  const upload = (async () => {
    let bytes: Buffer
    let filename: string
    let contentType: string | undefined

    if (source.startsWith('/')) {
      const path = join(process.cwd(), 'public', source.slice(1))
      bytes = await readFile(path)
      filename = basename(path)
      contentType = contentTypeFor(filename)
    } else {
      const response = await fetchImage(source)

      const responseType = response.headers.get('content-type')?.split(';')[0] || null
      const url = new URL(source)
      const urlName = basename(url.pathname) || 'image'
      filename = extname(urlName) ? urlName : `${urlName}${extensionFor(responseType)}`
      contentType = responseType || contentTypeFor(filename)
      bytes = Buffer.from(await response.arrayBuffer())
    }

    const asset = await client.assets.upload('image', bytes, {
      filename,
      contentType,
    })

    return imageReference(asset._id)
  })()

  uploadCache.set(source, upload)
  return upload
}

export async function ensureSanityImage(
  client: SanityClient,
  value: unknown,
): Promise<SanityImageValue | unknown> {
  if (isSanityImage(value) || typeof value !== 'string' || value.length === 0) return value
  return uploadImageSource(client, value)
}
