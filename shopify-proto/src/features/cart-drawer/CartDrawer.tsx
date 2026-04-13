import { Drawer } from '../../components/ui/Drawer'
import { formatCurrency } from '../../utils/currency'
import type { CartLine } from '../../types/cart'
import { Trash2, X } from 'lucide-react'

type CartDrawerProps = {
  isOpen: boolean
  lines: CartLine[]
  subtotalCents: number
  onClose: () => void
  onIncrement: (lineId: string) => void
  onDecrement: (lineId: string) => void
  onRemove: (lineId: string) => void
  onViewCart: () => void
}

export const CartDrawer = ({
  isOpen,
  lines,
  subtotalCents,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
  onViewCart,
}: CartDrawerProps) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="My Cart">
      <div className="flex flex-col h-full bg-white font-sans text-gray-900">
        <header className="flex items-center justify-between px-6 py-5 border-b border-gray-900">
          <h2 className="text-xl font-extrabold uppercase tracking-wide">
            My Cart
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-900 hover:text-gray-600 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" strokeWidth={3} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-2">
          {lines.length > 0 ? (
            <div className="flex flex-col">
              {lines.map((line) => {
                const canIncrement = line.stockLevel === undefined || line.quantity < line.stockLevel

                return (
                  <article key={line.id} className="py-6 border-b border-gray-200 last:border-b-0 flex gap-4 items-start">
                    {/* Image */}
                    <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-[4px] overflow-hidden">
                      {line.imageUrl ? (
                        <img
                          src={line.imageUrl}
                          alt={line.imageAlt ?? line.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-pink-50">
                          <span className="text-2xl" aria-hidden="true">🎂</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between min-h-[6rem]">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm leading-tight text-gray-900 pr-2">
                            {line.name} {line.source === 'build-a-box' && '- (V)'}
                          </h3>
                        </div>
                        <div className="flex items-start gap-4">
                          <span className="font-extrabold text-sm text-gray-900 whitespace-nowrap">
                            {formatCurrency(line.unitPriceCents * line.quantity)}
                          </span>
                          <button
                            type="button"
                            onClick={() => onRemove(line.id)}
                            className="text-gray-500 hover:text-gray-900 transition-colors"
                            aria-label={`Remove ${line.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="inline-flex items-center justify-between border border-gray-400 rounded-[2px] bg-white w-20">
                          <button
                            type="button"
                            onClick={() => onDecrement(line.id)}
                            className="px-2 py-1 text-gray-900 font-medium hover:bg-gray-50 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-gray-900">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onIncrement(line.id)}
                            disabled={!canIncrement}
                            className="px-2 py-1 text-gray-900 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="py-10 text-center text-sm font-medium text-gray-500">
              Your cart is empty.
            </div>
          )}
        </div>

        <footer className="px-6 py-6 mt-auto flex flex-col gap-4 bg-white">
          <div className="flex items-center justify-between border-b border-gray-900 pb-4 text-xs font-extrabold uppercase tracking-widest text-gray-900">
            <span>Shipping</span>
            <span className="normal-case font-medium tracking-normal text-sm">Calculated at checkout</span>
          </div>
          
          <div className="flex items-center justify-between border-b border-gray-900 pb-4">
            <span className="text-base font-extrabold uppercase tracking-widest text-gray-900">Total</span>
            <span className="text-xl font-extrabold text-gray-900">
              {formatCurrency(subtotalCents)}
            </span>
          </div>
          
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={onViewCart}
              className="bg-[#299f8c] text-white px-8 py-3 rounded-[2px] font-extrabold text-xs tracking-widest uppercase hover:bg-[#208474] transition-colors"
            >
              View Cart
            </button>
          </div>
        </footer>
      </div>
    </Drawer>
  )
}

