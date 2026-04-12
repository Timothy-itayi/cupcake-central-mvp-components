import { createClient, type PhotosWithTotalResults } from 'pexels'

const apiKey = import.meta.env.VITE_PEXELS_API_KEY

const client = apiKey ? createClient(apiKey) : null

export const canUsePexels = Boolean(apiKey && client)

const hasPhotos = (value: unknown): value is PhotosWithTotalResults =>
  typeof value === 'object' && value !== null && 'photos' in value

export const searchPexelsImage = async (query: string) => {
  if (!client) {
    return null
  }

  const result = await client.photos.search({
    query,
    per_page: 1,
    orientation: 'landscape',
    size: 'medium',
  })

  if (!hasPhotos(result) || result.photos.length === 0) {
    return null
  }

  const photo = result.photos[0]

  return {
    alt: photo.alt || query,
    src: photo.src.large,
  }
}
