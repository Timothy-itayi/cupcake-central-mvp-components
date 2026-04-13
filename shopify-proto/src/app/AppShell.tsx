import { Outlet, useNavigate } from 'react-router-dom'

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

  return (
    <div className="flex flex-col min-h-screen bg-[#fffaf5]">
      <TopNav cartItemCount={selectors.cartItemCount} onOpenCart={openCart} />

      <main className="flex-1 w-full pb-16">
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
            incrementCartLine,
            decrementCartLine,
            removeCartLine,
          }}
        />
      </main>

      <CartDrawer
        isOpen={state.isCartOpen}
        lines={state.cartLines}
        subtotalCents={selectors.cartSubtotal}
        onClose={closeCart}
        onDecrement={decrementCartLine}
        onIncrement={incrementCartLine}
        onRemove={removeCartLine}
        onViewCart={() => {
          closeCart()
          navigate('/cart-lab')
        }}
      />
    </div>
  )
}
