import { useMemo, useReducer } from 'react'

import { birthdayCandle } from '../data/addOns'
import { starterCartProducts } from '../data/products'
import { BOX_SIZE, createBuildABoxLine } from '../features/build-a-box/buildABox.helpers'
import { createCartLine, getCartItemCount, getCartSubtotal } from '../features/cart-drawer/cart.helpers'
import type { AppState, AppView } from '../types/app'
import type { CartLine } from '../types/cart'
import type { Product } from '../types/product'

type Action =
  | { type: 'SET_VIEW'; payload: AppView }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'ADD_PRODUCT_TO_CART'; payload: { product: Product; source?: CartLine['source'] } }
  | { type: 'ADD_BUILD_A_BOX_LINE'; payload: CartLine }
  | { type: 'REMOVE_CART_LINE'; payload: { lineId: string } }
  | { type: 'INCREMENT_CART_LINE'; payload: { lineId: string } }
  | { type: 'DECREMENT_CART_LINE'; payload: { lineId: string } }
  | { type: 'ADD_CUPCAKE_TO_BOX'; payload: { productId: string } }
  | { type: 'REMOVE_CUPCAKE_FROM_BOX'; payload: { index: number } }
  | { type: 'CLEAR_BOX' }

const initialState: AppState = {
  activeView: 'build-a-box',
  isCartOpen: false,
  cartLines: starterCartProducts.slice(0, 2).map((product) => createCartLine(product)),
  buildABox: {
    selectedProductIds: [],
    boxSize: BOX_SIZE,
  },
}

const upsertCartProduct = (lines: CartLine[], nextLine: CartLine) => {
  const match = lines.find((line) => line.productId === nextLine.productId)

  if (!match) {
    return [...lines, nextLine]
  }

  return lines.map((line) =>
    line.productId === nextLine.productId
      ? {
          ...line,
          quantity: line.quantity + nextLine.quantity,
        }
      : line,
  )
}

const reducer = (state: AppState, action: Action): AppState => {
  // Pseudo-code:
  // 1. Read the user's action.
  // 2. Change only the part of state that action cares about.
  // 3. Derive totals elsewhere so we do not store stale math.
  switch (action.type) {
    case 'SET_VIEW':
      return {
        ...state,
        activeView: action.payload,
      }
    case 'OPEN_CART':
      return {
        ...state,
        isCartOpen: true,
      }
    case 'CLOSE_CART':
      return {
        ...state,
        isCartOpen: false,
      }
    case 'ADD_PRODUCT_TO_CART':
      return {
        ...state,
        isCartOpen: true,
        cartLines: upsertCartProduct(
          state.cartLines,
          createCartLine(action.payload.product, action.payload.source),
        ),
      }
    case 'ADD_BUILD_A_BOX_LINE':
      return {
        ...state,
        isCartOpen: true,
        cartLines: [...state.cartLines, action.payload],
        buildABox: {
          ...state.buildABox,
          selectedProductIds: [],
        },
      }
    case 'REMOVE_CART_LINE':
      return {
        ...state,
        cartLines: state.cartLines.filter((line) => line.id !== action.payload.lineId),
      }
    case 'INCREMENT_CART_LINE':
      return {
        ...state,
        cartLines: state.cartLines.map((line) =>
          line.id === action.payload.lineId
            ? {
                ...line,
                quantity: line.quantity + 1,
              }
            : line,
        ),
      }
    case 'DECREMENT_CART_LINE':
      return {
        ...state,
        cartLines: state.cartLines
          .map((line) =>
            line.id === action.payload.lineId
              ? {
                  ...line,
                  quantity: line.quantity - 1,
                }
              : line,
          )
          .filter((line) => line.quantity > 0),
      }
    case 'ADD_CUPCAKE_TO_BOX':
      if (state.buildABox.selectedProductIds.length >= state.buildABox.boxSize) {
        return state
      }

      return {
        ...state,
        buildABox: {
          ...state.buildABox,
          selectedProductIds: [
            ...state.buildABox.selectedProductIds,
            action.payload.productId,
          ],
        },
      }
    case 'REMOVE_CUPCAKE_FROM_BOX':
      return {
        ...state,
        buildABox: {
          ...state.buildABox,
          selectedProductIds: state.buildABox.selectedProductIds.filter(
            (_, index) => index !== action.payload.index,
          ),
        },
      }
    case 'CLEAR_BOX':
      return {
        ...state,
        buildABox: {
          ...state.buildABox,
          selectedProductIds: [],
        },
      }
    default:
      return state
  }
}

export const useAppStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const selectors = useMemo(
    () => ({
      cartItemCount: getCartItemCount(state.cartLines),
      cartSubtotal: getCartSubtotal(state.cartLines),
      hasBirthdayCandle: state.cartLines.some(
        (line) => line.productId === birthdayCandle.id,
      ),
      isBoxFull: state.buildABox.selectedProductIds.length >= state.buildABox.boxSize,
    }),
    [state],
  )

  return {
    state,
    selectors,
    setView: (view: AppView) => dispatch({ type: 'SET_VIEW', payload: view }),
    openCart: () => dispatch({ type: 'OPEN_CART' }),
    closeCart: () => dispatch({ type: 'CLOSE_CART' }),
    addProductToCart: (product: Product, source?: CartLine['source']) =>
      dispatch({ type: 'ADD_PRODUCT_TO_CART', payload: { product, source } }),
    addBirthdayCandle: () =>
      dispatch({
        type: 'ADD_PRODUCT_TO_CART',
        payload: { product: birthdayCandle, source: 'upsell' },
      }),
    removeCartLine: (lineId: string) =>
      dispatch({ type: 'REMOVE_CART_LINE', payload: { lineId } }),
    incrementCartLine: (lineId: string) =>
      dispatch({ type: 'INCREMENT_CART_LINE', payload: { lineId } }),
    decrementCartLine: (lineId: string) =>
      dispatch({ type: 'DECREMENT_CART_LINE', payload: { lineId } }),
    addCupcakeToBox: (productId: string) =>
      dispatch({ type: 'ADD_CUPCAKE_TO_BOX', payload: { productId } }),
    removeCupcakeFromBox: (index: number) =>
      dispatch({ type: 'REMOVE_CUPCAKE_FROM_BOX', payload: { index } }),
    clearBox: () => dispatch({ type: 'CLEAR_BOX' }),
    addBuildABoxToCart: (cupcakes: Product[]) =>
      dispatch({
        type: 'ADD_BUILD_A_BOX_LINE',
        payload: {
          ...createBuildABoxLine(cupcakes, state.buildABox.selectedProductIds),
          id: crypto.randomUUID(),
        },
      }),
  }
}
