import type { ProductId } from './product'

export type BuildABoxState = {
  selectedProductIds: ProductId[]
  boxSize: number
}
