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
  upsellImageUrl?: string
  upsellImageAlt?: string
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
  upsellImageUrl,
  upsellImageAlt,
  onClose,
  onAddUpsell,
  onIncrement,
  onDecrement,
  onRemove,
}: CartDrawerProps) => (
  <Drawer isOpen={isOpen} onClose={onClose} title="Cart drawer">
    <header className="flex items-center justify-between border-b border-[color:var(--stroke)] px-5 py-4">
      <div>
        <p className="section-eyebrow">Cart Drawer</p>
        <h2 className="text-xl font-semibold text-[var(--ink)]">Upsell cart drawer</h2>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="action-button action-button--ghost !px-3 !py-2"
      >
        Close
      </button>
    </header>

    <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
      {showUpsell ? (
        <UpsellBanner
          title={upsellName}
          priceCents={upsellPriceCents}
          imageUrl={upsellImageUrl}
          imageAlt={upsellImageAlt}
          onAdd={onAddUpsell}
        />
      ) : (
        <div className="soft-panel soft-panel--mint p-4 text-sm font-medium text-[var(--mint-500)]">
          Upsell accepted. Good. We can stop nagging now.
        </div>
      )}

      {lines.length > 0 ? (
        <div className="space-y-3">
          {lines.map((line) => (
            <article key={line.id} className="soft-panel p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  {line.imageUrl ? (
                    <img
                      src={line.imageUrl}
                      alt={line.imageAlt ?? line.name}
                      className="h-16 w-16 flex-shrink-0 rounded-[1rem] border border-[color:var(--stroke)] bg-white object-cover"
                    />
                  ) : null}
                  <div className="min-w-0">
                  <h3 className="font-semibold text-[var(--ink)]">{line.name}</h3>
                  <p className="mt-1 text-sm">
                    {line.source === 'build-a-box'
                      ? 'Custom mixed gift box'
                      : line.source === 'upsell'
                        ? 'Gift add-on'
                        : 'Mock catalogue item'}
                  </p>
                  </div>
                </div>
                <p className="font-semibold text-[var(--ink)]">
                  {formatCurrency(line.unitPriceCents * line.quantity)}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="quantity-control !mt-0 !w-auto gap-2 p-1">
                  <button
                    type="button"
                    onClick={() => onDecrement(line.id)}
                    className="action-button action-button--ghost icon-button"
                    aria-label={`Decrease quantity for ${line.name}`}
                  >
                    -
                  </button>
                  <span className="min-w-8 text-center text-sm font-semibold text-[var(--ink)]">
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onIncrement(line.id)}
                    className="action-button action-button--ghost icon-button"
                    aria-label={`Increase quantity for ${line.name}`}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(line.id)}
                  className="text-sm font-medium text-[var(--ink-soft)] transition hover:text-[var(--blush-500)]"
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="soft-panel soft-panel--dashed p-6 text-sm leading-6">
          Your cart is empty. Which is not a disaster, but it is bad for conversion.
        </div>
      )}
    </div>

    <footer className="border-t border-[color:var(--stroke)] px-5 py-4">
      <div className="mb-4 flex items-center justify-between text-sm">
        <span>Subtotal</span>
        <strong className="text-lg text-[var(--ink)]">{formatCurrency(subtotalCents)}</strong>
      </div>
      <button type="button" className="action-button action-button--primary w-full !py-3">
        Continue to checkout
      </button>
    </footer>
  </Drawer>
)
