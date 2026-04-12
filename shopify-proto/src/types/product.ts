export type ProductId = string

export type ProductCategory = 'cupcake' | 'gift-box' | 'cake' | 'add-on'

export type Product = {
  id: ProductId
  name: string
  priceCents: number
  category: ProductCategory
  description: string
  stockLevel: number
  imageQuery: string
  imageQueries?: string[]
  imageEmoji: string
  imageGradient: string
}
