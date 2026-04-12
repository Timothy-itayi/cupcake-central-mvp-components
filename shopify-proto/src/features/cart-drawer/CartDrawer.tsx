import { Drawer } from '../../components/ui/Drawer'
import { formatCurrency } from '../../utils/currency'
import { UpsellBanner } from './UpsellBanner'
import type { CartLine } from '../../types/cart'

type CartDrawerProps = {
  isOpen: boolean
  lines: CartLine[]
  subtotalCents: number
  showUpsell: boolean
  upsellName: string
  upsellPriceCents: number
  onClose: () => void
  onAddUpsell: () => void
  onIncrement: (lineId: string) => void
  onDecrement: (lineId: string) => void
  onRemove: (lineId: string) => void
}

export const CartDrawer = ({
  isOpen,
  lines,
  subtotalCents,
  showUpsell,
  upsellName,
  upsellPriceCents,
  onClose,
  onAddUpsell,
  onIncrement,
  onDecrement,
  onRemove,
}: CartDrawerProps) => (
  <Drawer isOpen={isOpen} onClose={onClose} title="Cart drawer">
    <header className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-500">
          Component Two
        </p>
        <h2 className="text-xl font-semibold text-stone-950">Upsell cart drawer</h2>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="rounded-full px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100"
      >
        Close
      </button>
    </header>

    <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
      {showUpsell ? (
        <UpsellBanner
          title={upsellName}
          priceCents={upsellPriceCents}
          onAdd={onAddUpsell}
        />
      ) : (
        <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
          Upsell accepted. Good. We can stop nagging now.
        </div>
      )}

      {lines.length > 0 ? (
        <div className="space-y-3">
          {lines.map((line) => (
            <article
              key={line.id}
              className="rounded-[1.5rem] border border-stone-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-stone-900">{line.name}</h3>
                  <p className="mt-1 text-sm text-stone-500">
                    {line.source === 'build-a-box'
                      ? 'Custom mixed dozen'
                      : 'Mock catalogue item'}
                  </p>
                </div>
                <p className="font-semibold text-stone-900">
                  {formatCurrency(line.unitPriceCents * line.quantity)}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full bg-stone-100 p-1">
                  <button
                    type="button"
                    onClick={() => onDecrement(line.id)}
                    className="rounded-full px-3 py-1 text-sm font-semibold text-stone-700 transition hover:bg-white"
                    aria-label={`Decrease quantity for ${line.name}`}
                  >
                    -
                  </button>
                  <span className="min-w-8 text-center text-sm font-semibold text-stone-900">
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onIncrement(line.id)}
                    className="rounded-full px-3 py-1 text-sm font-semibold text-stone-700 transition hover:bg-white"
                    aria-label={`Increase quantity for ${line.name}`}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(line.id)}
                  className="text-sm font-medium text-stone-500 transition hover:text-rose-500"
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-[1.5rem] border border-dashed border-stone-300 bg-stone-50 p-6 text-sm leading-6 text-stone-600">
          Your cart is empty. Which is not a disaster, but it is bad for conversion.
        </div>
      )}
    </div>

    <footer className="border-t border-stone-200 px-5 py-4">
      <div className="mb-4 flex items-center justify-between text-sm text-stone-600">
        <span>Subtotal</span>
        <strong className="text-lg text-stone-950">{formatCurrency(subtotalCents)}</strong>
      </div>
      <button
        type="button"
        className="w-full rounded-full bg-stone-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
      >
        Continue to checkout
      </button>
    </footer>
  </Drawer>
)
