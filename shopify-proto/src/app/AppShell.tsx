import { Outlet } from 'react-router-dom'

import { birthdayCandle } from '../data/addOns'
import { useAppStore } from '../hooks/useAppStore'
import { CartDrawer } from '../features/cart-drawer/CartDrawer'
import { TopNav } from './navigation/TopNav'

export const AppShell = () => {
  const {
    state,
    selectors,
    addBirthdayCandle,
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
        isOpen={state.isCartOpen}
        lines={state.cartLines}
        onAddUpsell={addBirthdayCandle}
        onClose={closeCart}
        onDecrement={decrementCartLine}
        onIncrement={incrementCartLine}
        onRemove={removeCartLine}
        showUpsell={!selectors.hasBirthdayCandle}
        subtotalCents={selectors.cartSubtotal}
        upsellName={birthdayCandle.name}
        upsellPriceCents={birthdayCandle.priceCents}
        upsellImageUrl={birthdayCandle.localImagePath}
        upsellImageAlt={birthdayCandle.name}
      />
    </div>
  )
}
