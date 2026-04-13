import { useMemo } from 'react'

import { starterCartProducts } from '../../data/products'
import { FREE_DELIVERY_THRESHOLD_CENTS } from '../../features/cart-drawer/cart.helpers'
import { CartLabView } from '../../features/cart-drawer/CartLabView'
import { useAppShellContext } from '../useAppShellContext'

export const CartLabRoute = () => {
  const { openCart, selectors, state, incrementCartLine, decrementCartLine, removeCartLine } = useAppShellContext()
  const cartQuantityByProductId = useMemo(
    () =>
      Object.fromEntries(
        state.cartLines.map((line) => [line.productId, line.quantity]),
      ),
    [state.cartLines],
  )

  return (
    <CartLabView
      amountUntilFreeDelivery={selectors.amountUntilFreeDelivery}
      cartQuantityByProductId={cartQuantityByProductId}
      deliveryThresholdCents={FREE_DELIVERY_THRESHOLD_CENTS}
      hasFreeDelivery={selectors.hasFreeDelivery}
      recommendedUpsell={selectors.recommendedUpsell}
      onAddProduct={() => {}}
      onOpenCart={openCart}
      products={starterCartProducts}
      subtotalCents={selectors.cartSubtotal}
      cartLines={state.cartLines}
      onIncrementCartLine={incrementCartLine}
      onDecrementCartLine={decrementCartLine}
      onRemoveCartLine={removeCartLine}
    />
  )
}
