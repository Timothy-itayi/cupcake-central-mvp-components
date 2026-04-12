import { createClient, type PhotosWithTotalResults } from 'pexels'

const apiKey = import.meta.env.VITE_PEXELS_API_KEY

const client = apiKey ? createClient(apiKey) : null

export const canUsePexels = Boolean(apiKey && client)

const hasPhotos = (value: unknown): value is PhotosWithTotalResults =>
  typeof value === 'object' && value !== null && 'photos' in value

export type PexelsImageCandidate = {
  photoId: number
  alt: string
  src: string
}

export const searchPexelsImages = async (query: string, perPage = 4) => {
  if (!client) {
    return []
  }

  const result = await client.photos.search({
    query,
    per_page: perPage,
    orientation: 'landscape',
    size: 'medium',
  })

  if (!hasPhotos(result) || result.photos.length === 0) {
    return []
  }

  return result.photos.map((photo) => ({
    photoId: photo.id,
    alt: photo.alt || query,
    src: photo.src.large,
  }))
}
