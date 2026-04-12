import { useMemo } from 'react'

import { starterCartProducts } from '../../data/products'
import { FREE_DELIVERY_THRESHOLD_CENTS } from '../../features/cart-drawer/cart.helpers'
import { CartLabView } from '../../features/cart-drawer/CartLabView'
import { usePexelsImages } from '../../hooks/usePexelsImages'
import { useAppShellContext } from '../useAppShellContext'

export const CartLabRoute = () => {
  const { addProductToCart, openCart, selectors, state } = useAppShellContext()
  const { imageMap, isLoading } = usePexelsImages(starterCartProducts)
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
      imageMap={imageMap}
      isImageLoading={isLoading}
      onAddProduct={addProductToCart}
      onOpenCart={openCart}
      products={starterCartProducts}
      subtotalCents={selectors.cartSubtotal}
    />
  )
}
