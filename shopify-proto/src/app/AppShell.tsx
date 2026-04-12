import { Outlet, useNavigate } from 'react-router-dom'

import { FREE_DELIVERY_THRESHOLD_CENTS } from '../features/cart-drawer/cart.helpers'
import { useAppStore } from '../hooks/useAppStore'
import { CartDrawer } from '../features/cart-drawer/CartDrawer'
import { TopNav } from './navigation/TopNav'

export const AppShell = () => {
  const navigate = useNavigate()
  const {
    state,
    selectors,
    addBuildABoxToCart,
    addProductToCart,
    clearBox,
    closeCart,
    decrementBuildABoxItem,
    decrementCartLine,
    incrementBuildABoxItem,
    incrementCartLine,
    openCart,
    removeCartLine,
    setBuildABoxType,
    setBuildABoxSize,
  } = useAppStore()
  const recommendedUpsell = selectors.recommendedUpsell

  return (
    <div className="site-shell">
      <TopNav cartItemCount={selectors.cartItemCount} onOpenCart={openCart} />

      <main className="site-main">
        <Outlet
          context={{
            state,
            selectors,
            addBuildABoxToCart,
            addProductToCart,
            setBuildABoxType,
            setBuildABoxSize,
            incrementBuildABoxItem,
            decrementBuildABoxItem,
            clearBox,
            openCart,
          }}
        />
      </main>

      <CartDrawer
        amountUntilFreeDelivery={selectors.amountUntilFreeDelivery}
        deliveryThresholdCents={FREE_DELIVERY_THRESHOLD_CENTS}
        hasFreeDelivery={selectors.hasFreeDelivery}
        isOpen={state.isCartOpen}
        lines={state.cartLines}
        onAddUpsell={() => {
          if (recommendedUpsell) {
            addProductToCart(recommendedUpsell.product, 'upsell')
          }
        }}
        onBuildABox={() => {
          closeCart()
          navigate('/build-a-box')
        }}
        onClose={closeCart}
        onContinueShopping={() => {
          closeCart()
          navigate('/cart-lab')
        }}
        onDecrement={decrementCartLine}
        onIncrement={incrementCartLine}
        onRemove={removeCartLine}
        showUpsell={Boolean(recommendedUpsell)}
        subtotalCents={selectors.cartSubtotal}
        upsellDescription={recommendedUpsell?.description ?? ''}
        upsellImageAlt={recommendedUpsell?.product.name}
        upsellImageUrl={recommendedUpsell?.product.localImagePath}
        upsellName={recommendedUpsell?.product.name ?? ''}
        upsellPriceCents={recommendedUpsell?.product.priceCents ?? 0}
      />
    </div>
  )
}
