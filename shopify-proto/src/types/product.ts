export type ProductId = string

export type ProductCategory = 'cupcake' | 'gift-box' | 'cake' | 'add-on'
export type CupcakeBoxType = 'regular' | 'mini'
export type DietaryTag = 'GF' | 'V'

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
  localImagePath?: string
  cupcakeBoxType?: CupcakeBoxType
  dietaryTag?: DietaryTag
}
