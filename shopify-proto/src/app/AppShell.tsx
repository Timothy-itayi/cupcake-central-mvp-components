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
    <div className="min-h-screen bg-[linear-gradient(180deg,_#fff6ef_0%,_#fffdfa_40%,_#ffffff_100%)] text-stone-900">
      <TopNav cartItemCount={selectors.cartItemCount} onOpenCart={openCart} />

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
    
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
      />
    </div>
  )
}
