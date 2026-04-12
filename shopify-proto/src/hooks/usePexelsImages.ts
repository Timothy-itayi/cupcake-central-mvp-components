import { useEffect, useState } from 'react'

import { canUsePexels, searchPexelsImages, type PexelsImageCandidate } from '../services/pexels'
import type { Product } from '../types/product'

type ProductImageMap = Record<string, { alt: string; src: string }>

export const usePexelsImages = (products: Product[]) => {
  const [imageMap, setImageMap] = useState<ProductImageMap>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let isCancelled = false

    const loadImages = async () => {
      if (!canUsePexels || products.length === 0) {
        return
      }

      setIsLoading(true)

      try {
        // Guided logic:
        // 1. Ask Pexels for several candidates per product.
        // 2. Try the most specific product phrases first.
        // 3. Reuse no photo ID on the same screen unless there is no alternative.
        const candidateLists = await Promise.all(
          products.map(async (product) => {
            const searchTerms = product.imageQueries ?? [product.imageQuery]
            const candidateGroups = await Promise.all(
              searchTerms.map((query) => searchPexelsImages(query, 4)),
            )

            return [
              product.id,
              candidateGroups.flat(),
            ] as const
          }),
        )

        if (isCancelled) {
          return
        }

        const usedPhotoIds = new Set<number>()
        const nextImageMap: ProductImageMap = {}

        for (const [productId, candidates] of candidateLists) {
          const uniqueCandidate =
            candidates.find((candidate) => !usedPhotoIds.has(candidate.photoId)) ??
            candidates[0]

          if (uniqueCandidate) {
            usedPhotoIds.add(uniqueCandidate.photoId)
            nextImageMap[productId] = toImageMapEntry(uniqueCandidate)
          }
        }

        setImageMap(nextImageMap)
      } catch (error) {
        if (!isCancelled) {
          setImageMap({})
          console.error('Pexels image loading failed', error)
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadImages()

    return () => {
      isCancelled = true
    }
  }, [products])

  return {
    imageMap,
    isLoading,
    isEnabled: canUsePexels,
  }
}

const toImageMapEntry = (candidate: PexelsImageCandidate) => ({
  alt: candidate.alt,
  src: candidate.src,
})
