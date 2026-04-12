import { useOutletContext } from 'react-router-dom'

import type { AppState } from '../types/app'
import type { BuildABoxSize } from '../types/buildABox'
import type { CartLine } from '../types/cart'
import type { CupcakeBoxType, Product } from '../types/product'

type AppShellContext = {
  state: AppState
  selectors: {
    cartItemCount: number
    cartSubtotal: number
    hasBirthdayCandle: boolean
    selectedCount: number
    remainingCount: number
    isBoxComplete: boolean
  }
  addBuildABoxToCart: (cupcakes: Product[]) => void
  addProductToCart: (product: Product, source?: CartLine['source']) => void
  setBuildABoxType: (boxType: CupcakeBoxType) => void
  setBuildABoxSize: (boxSize: BuildABoxSize) => void
  incrementBuildABoxItem: (productId: string) => void
  decrementBuildABoxItem: (productId: string) => void
  clearBox: () => void
  openCart: () => void
}

export const useAppShellContext = () => useOutletContext<AppShellContext>()
