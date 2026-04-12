import { useOutletContext } from 'react-router-dom'

import type { AppState } from '../types/app'
import type { CartLine } from '../types/cart'
import type { Product } from '../types/product'

type AppShellContext = {
  state: AppState
  selectors: {
    cartItemCount: number
    cartSubtotal: number
    hasBirthdayCandle: boolean
    isBoxFull: boolean
  }
  addBuildABoxToCart: (cupcakes: Product[]) => void
  addProductToCart: (product: Product, source?: CartLine['source']) => void
  addCupcakeToBox: (productId: string) => void
  clearBox: () => void
  openCart: () => void
  removeCupcakeFromBox: (index: number) => void
}

export const useAppShellContext = () => useOutletContext<AppShellContext>()
