import { Outlet } from 'react-router-dom'

import { addOns, birthdayCandle } from '../data/addOns'
import { cupcakes } from '../data/cupcakes'
import { products, starterCartProducts } from '../data/products'
import { useAppStore } from '../hooks/useAppStore'
import { CartDrawer } from '../features/cart-drawer/CartDrawer'
import { TopNav } from './navigation/TopNav'

export const AppShell = () => {
  const {
    state,
    selectors,
    addBirthdayCandle,
    addBuildABoxToCart,
    addCupcakeToBox,
    addProductToCart,
    clearBox,
    closeCart,
    decrementCartLine,
    incrementCartLine,
    openCart,
    removeCartLine,
    removeCupcakeFromBox,
  } = useAppStore()

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,207,232,0.45),_transparent_34%),linear-gradient(180deg,_#fff7ed_0%,_#ffffff_60%)] text-stone-900">
      <TopNav cartItemCount={selectors.cartItemCount} onOpenCart={openCart} />

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-rose-100 bg-white/70 p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
                Local demo build
              </p>
              <h2 className="text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
                Three bakery commerce flows, built to prove transferable Shopify skills.
              </h2>
              <p className="max-w-3xl text-base leading-7 text-stone-600">
                The point is not fake platform wizardry. The point is clean state,
                predictable interactions, and customer flow that does not trip over itself.
              </p>
            </div>

            <div className="rounded-[1.75rem] bg-stone-950 p-5 text-white">
              <p className="text-sm leading-7 text-stone-300">
                Included mock domains:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-stone-100">
                <li>{cupcakes.length} cupcake flavours for custom selection</li>
                <li>{starterCartProducts.length} starter products for cart behaviour</li>
                <li>{products.length} products with live low-stock messaging</li>
                <li>{addOns.length} add-ons including the candle upsell</li>
                <li>Each component now lives on its own route</li>
              </ul>
            </div>
          </div>
        </section>

        <Outlet
          context={{
            state,
            selectors,
            addBuildABoxToCart,
            addProductToCart,
            addCupcakeToBox,
            clearBox,
            openCart,
            removeCupcakeFromBox,
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
