import type { BuildABoxState } from './buildABox'
import type { CartLine } from './cart'

export type AppView = 'build-a-box' | 'cart-drawer' | 'low-stock'

export type AppState = {
  activeView: AppView
  isCartOpen: boolean
  cartLines: CartLine[]
  buildABox: BuildABoxState
}
