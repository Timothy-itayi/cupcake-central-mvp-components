import { useEffect, useState } from 'react'

import { canUsePexels, searchPexelsImage } from '../services/pexels'
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
        // Pseudo-code:
        // 1. Search one relevant image for each product query.
        // 2. Keep only successful results.
        // 3. Fall back to local gradients if any search fails.
        const results = await Promise.all(
          products.map(async (product) => {
            const image = await searchPexelsImage(product.imageQuery)

            return [product.id, image] as const
          }),
        )

        if (isCancelled) {
          return
        }

        setImageMap(
          Object.fromEntries(
            results.filter((entry): entry is [string, { alt: string; src: string }] =>
              Boolean(entry[1]),
            ),
          ),
        )
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
