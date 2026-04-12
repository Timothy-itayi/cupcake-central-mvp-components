import type { ProductId } from './product'
import type { CupcakeBoxType } from './product'

export type BuildABoxSize = 6 | 12 | 15 | 30

export type BuildABoxSelection = {
  productId: ProductId
  quantity: number
}

export type BuildABoxState = {
  boxType: CupcakeBoxType
  boxSize: BuildABoxSize | null
  selections: BuildABoxSelection[]
}
