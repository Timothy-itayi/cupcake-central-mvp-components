import type { BuildABoxState } from './buildABox'
import type { CartLine } from './cart'

export type AppState = {
  isCartOpen: boolean
  cartLines: CartLine[]
  buildABox: BuildABoxState
}
