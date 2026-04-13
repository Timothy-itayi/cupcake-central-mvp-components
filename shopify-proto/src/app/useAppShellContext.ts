import { useOutletContext } from 'react-router-dom'

import type { CartUpsellRecommendation } from '../features/cart-drawer/cart.helpers'
import type { AppState } from '../types/app'
import type { BuildABoxSize } from '../types/buildABox'
import type { CartLine } from '../types/cart'
import type { CupcakeBoxType, Product } from '../types/product'

type AppShellContext = {
  state: AppState
  selectors: {
    cartItemCount: number
    cartSubtotal: number
    amountUntilFreeDelivery: number
    hasFreeDelivery: boolean
    recommendedUpsell: CartUpsellRecommendation | null
    selectedCount: number
    remainingCount: number
    isBoxComplete: boolean
  }
  addBuildABoxToCart: (cupcakes: Product[]) => void
  addProductToCart: (product: Product, source?: CartLine['source']) => void
  setBuildABoxType: (boxType: CupcakeBoxType) => void
  setBuildABoxSize: (boxSize: BuildABoxSize) => void
  incrementBuildABoxItem: (productId: string, maxQuantity: number) => void
  decrementBuildABoxItem: (productId: string) => void
  clearBox: () => void
  openCart: () => void
  incrementCartLine: (lineId: string) => void
  decrementCartLine: (lineId: string) => void
  removeCartLine: (lineId: string) => void
}

export const useAppShellContext = () => useOutletContext<AppShellContext>()
