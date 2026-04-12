import { useMemo, useReducer } from 'react'

import {
  BOX_SIZE_OPTIONS_BY_TYPE,
  createBuildABoxLine,
  getRemainingCount,
  getSelectedCount,
  isBuildABoxComplete,
} from '../features/build-a-box/buildABox.helpers'
import {
  createCartLine,
  getAmountUntilFreeDelivery,
  getCartItemCount,
  getCartSubtotal,
  getRecommendedUpsell,
} from '../features/cart-drawer/cart.helpers'
import type { AppState } from '../types/app'
import type { BuildABoxSelection, BuildABoxSize } from '../types/buildABox'
import type { CartLine } from '../types/cart'
import type { CupcakeBoxType, Product } from '../types/product'

type Action =
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'ADD_PRODUCT_TO_CART'; payload: { product: Product; source?: CartLine['source'] } }
  | { type: 'ADD_BUILD_A_BOX_LINE'; payload: CartLine }
  | { type: 'REMOVE_CART_LINE'; payload: { lineId: string } }
  | { type: 'INCREMENT_CART_LINE'; payload: { lineId: string } }
  | { type: 'DECREMENT_CART_LINE'; payload: { lineId: string } }
  | { type: 'SET_BUILD_A_BOX_TYPE'; payload: { boxType: CupcakeBoxType } }
  | { type: 'SET_BUILD_A_BOX_SIZE'; payload: { boxSize: BuildABoxSize } }
  | { type: 'INCREMENT_BUILD_A_BOX_ITEM'; payload: { productId: string; maxQuantity: number } }
  | { type: 'DECREMENT_BUILD_A_BOX_ITEM'; payload: { productId: string } }
  | { type: 'CLEAR_BOX' }

const initialState: AppState = {
  isCartOpen: false,
  cartLines: [],
  buildABox: {
    boxType: 'regular',
    boxSize: 12,
    selections: [],
  },
}

const upsertCartProduct = (lines: CartLine[], nextLine: CartLine) => {
  if (nextLine.stockLevel === 0) {
    return lines
  }

  const match = lines.find((line) => line.productId === nextLine.productId)

  if (!match) {
    return [
      ...lines,
      {
        ...nextLine,
        quantity:
          nextLine.stockLevel !== undefined
            ? Math.min(nextLine.quantity, nextLine.stockLevel)
            : nextLine.quantity,
      },
    ]
  }

  return lines.map((line) =>
    line.productId === nextLine.productId
      ? {
          ...line,
          quantity:
            nextLine.stockLevel !== undefined
              ? Math.min(line.quantity + nextLine.quantity, nextLine.stockLevel)
              : line.quantity + nextLine.quantity,
        }
      : line,
  )
}

const upsertBuildABoxSelection = (
  selections: BuildABoxSelection[],
  productId: string,
) => {
  const match = selections.find((selection) => selection.productId === productId)

  if (!match) {
    return [...selections, { productId, quantity: 1 }]
  }

  return selections.map((selection) =>
    selection.productId === productId
      ? {
          ...selection,
          quantity: selection.quantity + 1,
        }
      : selection,
  )
}

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
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
          selections: [],
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
                quantity:
                  line.stockLevel !== undefined
                    ? Math.min(line.quantity + 1, line.stockLevel)
                    : line.quantity + 1,
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
    case 'SET_BUILD_A_BOX_TYPE':
      return {
        ...state,
        buildABox: {
          boxType: action.payload.boxType,
          boxSize: BOX_SIZE_OPTIONS_BY_TYPE[action.payload.boxType][0],
          selections: [],
        },
      }
    case 'SET_BUILD_A_BOX_SIZE':
      return {
        ...state,
        buildABox: {
          ...state.buildABox,
          boxSize: action.payload.boxSize,
          selections: [],
        },
      }
    case 'INCREMENT_BUILD_A_BOX_ITEM':
      if (!state.buildABox.boxSize) {
        return state
      }

      if (getSelectedCount(state.buildABox.selections) >= state.buildABox.boxSize) {
        return state
      }

      if (
        (state.buildABox.selections.find(
          (selection) => selection.productId === action.payload.productId,
        )?.quantity ?? 0) >= action.payload.maxQuantity
      ) {
        return state
      }

      return {
        ...state,
        buildABox: {
          ...state.buildABox,
          selections: upsertBuildABoxSelection(
            state.buildABox.selections,
            action.payload.productId,
          ),
        },
      }
    case 'DECREMENT_BUILD_A_BOX_ITEM':
      return {
        ...state,
        buildABox: {
          ...state.buildABox,
          selections: state.buildABox.selections
            .map((selection) =>
              selection.productId === action.payload.productId
                ? {
                    ...selection,
                    quantity: selection.quantity - 1,
                  }
                : selection,
            )
            .filter((selection) => selection.quantity > 0),
        },
      }
    case 'CLEAR_BOX':
      return {
        ...state,
        buildABox: {
          ...state.buildABox,
          selections: [],
        },
      }
    default:
      return state
  }
}

export const useAppStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const selectors = useMemo(() => {
    const cartSubtotal = getCartSubtotal(state.cartLines)
    const amountUntilFreeDelivery = getAmountUntilFreeDelivery(cartSubtotal)

    return {
      cartItemCount: getCartItemCount(state.cartLines),
      cartSubtotal,
      amountUntilFreeDelivery,
      hasFreeDelivery: amountUntilFreeDelivery === 0,
      recommendedUpsell: getRecommendedUpsell(state.cartLines),
      selectedCount: getSelectedCount(state.buildABox.selections),
      remainingCount: getRemainingCount(
        state.buildABox.boxSize,
        state.buildABox.selections,
      ),
      isBoxComplete: isBuildABoxComplete(
        state.buildABox.boxSize,
        state.buildABox.selections,
      ),
    }
  }, [state])

  return {
    state,
    selectors,
    openCart: () => dispatch({ type: 'OPEN_CART' }),
    closeCart: () => dispatch({ type: 'CLOSE_CART' }),
    addProductToCart: (product: Product, source?: CartLine['source']) =>
      dispatch({ type: 'ADD_PRODUCT_TO_CART', payload: { product, source } }),
    removeCartLine: (lineId: string) =>
      dispatch({ type: 'REMOVE_CART_LINE', payload: { lineId } }),
    incrementCartLine: (lineId: string) =>
      dispatch({ type: 'INCREMENT_CART_LINE', payload: { lineId } }),
    decrementCartLine: (lineId: string) =>
      dispatch({ type: 'DECREMENT_CART_LINE', payload: { lineId } }),
    setBuildABoxType: (boxType: CupcakeBoxType) =>
      dispatch({ type: 'SET_BUILD_A_BOX_TYPE', payload: { boxType } }),
    setBuildABoxSize: (boxSize: BuildABoxSize) =>
      dispatch({ type: 'SET_BUILD_A_BOX_SIZE', payload: { boxSize } }),
    incrementBuildABoxItem: (productId: string, maxQuantity: number) =>
      dispatch({ type: 'INCREMENT_BUILD_A_BOX_ITEM', payload: { productId, maxQuantity } }),
    decrementBuildABoxItem: (productId: string) =>
      dispatch({ type: 'DECREMENT_BUILD_A_BOX_ITEM', payload: { productId } }),
    clearBox: () => dispatch({ type: 'CLEAR_BOX' }),
    addBuildABoxToCart: (cupcakes: Product[]) => {
      if (!state.buildABox.boxSize) {
        return
      }

      dispatch({
        type: 'ADD_BUILD_A_BOX_LINE',
        payload: {
          ...createBuildABoxLine(
            cupcakes,
            state.buildABox.boxType,
            state.buildABox.boxSize,
            state.buildABox.selections,
          ),
          id: crypto.randomUUID(),
        },
      })
    },
  }
}
