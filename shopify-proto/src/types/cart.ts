import type { ProductId } from './product'

export type CartLineSource = 'catalog' | 'upsell' | 'build-a-box'

export type CartLine = {
  id: string
  productId: ProductId
  name: string
  unitPriceCents: number
  quantity: number
  source: CartLineSource
  imageUrl?: string
  imageAlt?: string
}
