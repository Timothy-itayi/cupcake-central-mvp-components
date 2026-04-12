import { Drawer } from '../../components/ui/Drawer'
import { formatCurrency } from '../../utils/currency'
import { getCartLineStockMessage } from './cart.helpers'
import { UpsellBanner } from './UpsellBanner'
import type { CartLine } from '../../types/cart'

type CartDrawerProps = {
  deliveryThresholdCents: number
  amountUntilFreeDelivery: number
  hasFreeDelivery: boolean
  isOpen: boolean
  lines: CartLine[]
  subtotalCents: number
  showUpsell: boolean
  upsellName: string
  upsellDescription: string
  upsellPriceCents: number
  upsellImageUrl?: string
  upsellImageAlt?: string
  onClose: () => void
  onAddUpsell: () => void
  onContinueShopping: () => void
  onBuildABox: () => void
  onIncrement: (lineId: string) => void
  onDecrement: (lineId: string) => void
  onRemove: (lineId: string) => void
}

export const CartDrawer = ({
  deliveryThresholdCents,
  amountUntilFreeDelivery,
  hasFreeDelivery,
  isOpen,
  lines,
  subtotalCents,
  showUpsell,
  upsellName,
  upsellDescription,
  upsellPriceCents,
  upsellImageUrl,
  upsellImageAlt,
  onClose,
  onAddUpsell,
  onContinueShopping,
  onBuildABox,
  onIncrement,
  onDecrement,
  onRemove,
}: CartDrawerProps) => {
  const deliveryProgress = Math.min((subtotalCents / deliveryThresholdCents) * 100, 100)

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Cart drawer">
      <header className="flex items-center justify-between border-b border-[color:var(--stroke)] px-5 py-4">
        <div>
          <p className="section-eyebrow">Your Basket</p>
          <h2 className="text-xl font-semibold text-[var(--ink)]">Ready to check out</h2>
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
        <div className="soft-panel soft-panel--dashed p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="mini-meta">Delivery</p>
              <h3 className="mt-2 text-lg font-semibold text-[var(--ink)]">
                Free delivery at {formatCurrency(deliveryThresholdCents)}
              </h3>
              <p className="mt-2 text-sm leading-6">
                {hasFreeDelivery
                  ? 'Free delivery unlocked for this order.'
                  : `${formatCurrency(amountUntilFreeDelivery)} to go before delivery is free.`}
              </p>
            </div>
            <span className="pill-label">{formatCurrency(subtotalCents)}</span>
          </div>
          <div className="progress-track mt-4">
            <div className="progress-fill" style={{ width: `${deliveryProgress}%` }} />
          </div>
        </div>

        {showUpsell ? (
          <UpsellBanner
            description={upsellDescription}
            title={upsellName}
            priceCents={upsellPriceCents}
            imageUrl={upsellImageUrl}
            imageAlt={upsellImageAlt}
            onAdd={onAddUpsell}
          />
        ) : (
          <div className="soft-panel soft-panel--mint p-4 text-sm leading-6 text-[var(--mint-500)]">
            This order already has the key finishing touches, so there is no extra add-on prompt.
          </div>
        )}

        {lines.length > 0 ? (
          <div className="space-y-3">
            {lines.map((line) => {
              const stockMessage = getCartLineStockMessage(line)
              const canIncrement = line.stockLevel === undefined || line.quantity < line.stockLevel

              return (
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
                              : 'Bakery item'}
                        </p>
                        {stockMessage ? (
                          <p
                            className={[
                              'mt-2 text-sm font-semibold',
                              stockMessage.tone === 'urgent'
                                ? 'text-[var(--blush-500)]'
                                : 'text-[var(--ink-soft)]',
                            ].join(' ')}
                          >
                            {stockMessage.message}
                          </p>
                        ) : null}
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
                        disabled={!canIncrement}
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
              )
            })}
          </div>
        ) : (
          <div className="soft-panel soft-panel--dashed p-6 text-sm leading-6">
            Your basket is empty. Add a cake or gift box to see delivery progress and any relevant
            finishing touches.
          </div>
        )}
      </div>

      <footer className="border-t border-[color:var(--stroke)] px-5 py-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span>Subtotal</span>
          <strong className="text-lg text-[var(--ink)]">{formatCurrency(subtotalCents)}</strong>
        </div>
        <p className="mb-4 text-sm">
          {hasFreeDelivery
            ? 'Delivery is free on this order.'
            : `Add ${formatCurrency(amountUntilFreeDelivery)} more to unlock free delivery.`}
        </p>
        <div className="mb-3 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={onContinueShopping}
            className="action-button action-button--ghost w-full"
          >
            Keep browsing
          </button>
          <button
            type="button"
            onClick={onBuildABox}
            className="action-button action-button--secondary w-full"
          >
            Build a box
          </button>
        </div>
        <button type="button" className="action-button action-button--primary w-full !py-3">
          Continue to checkout
        </button>
      </footer>
    </Drawer>
  )
}
