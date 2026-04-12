import { Button } from '../../components/ui/Button'
import { formatCurrency } from '../../utils/currency'
import type { CupcakeBoxType } from '../../types/product'

type BoxSummaryProps = {
  boxType: CupcakeBoxType
  activeBoxSize: number | null
  selectedCount: number
  remainingCount: number
  subtotalCents: number
  isBoxComplete: boolean
  onClear: () => void
  onAddToCart: () => void
}

export const BoxSummary = ({
  boxType,
  activeBoxSize,
  selectedCount,
  remainingCount,
  subtotalCents,
  isBoxComplete,
  onClear,
  onAddToCart,
}: BoxSummaryProps) => {
  const boxLabel = activeBoxSize
    ? `${boxType === 'mini' ? 'Mini' : 'Regular'} ${activeBoxSize}-pack`
    : 'Choose a box'
  const helperCopy = !activeBoxSize
    ? 'Pick a valid box size and the tray preview will switch on immediately.'
    : isBoxComplete
      ? `${boxLabel} complete. Good. Add it to cart and move on.`
      : `${remainingCount} slot${remainingCount === 1 ? '' : 's'} left in this ${boxLabel.toLowerCase()}.`

  return (
    <aside className="summary-card soft-panel soft-panel--blush">
      <div>
        <p className="section-eyebrow">Box Progress</p>
        <h3 className="mt-2 text-[1.7rem] font-semibold leading-tight text-[var(--ink)]">
          {activeBoxSize ? boxLabel : 'Choose your box'}
        </h3>
        <p className="mt-2 text-sm leading-6">{helperCopy}</p>
      </div>

      <div className="soft-panel p-4">
        <div className="flex items-center justify-between text-sm font-medium text-[var(--ink-soft)]">
          <span>Progress</span>
          <span>
            {selectedCount} / {activeBoxSize ?? 0}
          </span>
        </div>
        <div className="progress-track mt-3">
          <div
            className="progress-fill"
            style={{
              width: activeBoxSize ? `${Math.min((selectedCount / activeBoxSize) * 100, 100)}%` : '0%',
            }}
          />
        </div>
      </div>

      <dl className="soft-panel summary-stats p-4">
        <div className="summary-stat">
          <dt>Selected</dt>
          <dd className="font-semibold text-[var(--ink)]">
            {selectedCount} / {activeBoxSize ?? 0}
          </dd>
        </div>
        <div className="summary-stat">
          <dt>Still to choose</dt>
          <dd className="font-semibold text-[var(--ink)]">{activeBoxSize ? remainingCount : '-'}</dd>
        </div>
        <div className="summary-stat">
          <dt>Running subtotal</dt>
          <dd className="font-semibold text-[var(--ink)]">{formatCurrency(subtotalCents)}</dd>
        </div>
      </dl>

      <details className="soft-panel soft-panel--mint p-4 text-sm leading-6">
        <summary className="cursor-pointer list-none font-semibold text-[var(--mint-500)] marker:hidden">
          How this works
        </summary>
        <div className="mt-3">
          <p>
            Regular cupcakes ship in 6 or 12. Mini cupcakes ship in 15 or 30. One box type at
            a time, because mixing rules just creates operational nonsense.
          </p>
          <p className="mt-2">
            {isBoxComplete
              ? 'Your tray is full and ready for the cart drawer.'
              : 'Keep selecting flavours until the preview is full, then send the completed box to cart in one step.'}
          </p>
        </div>
      </details>

      <div className="space-y-2.5">
        <Button fullWidth variant="primary" disabled={!isBoxComplete} onClick={onAddToCart}>
          {isBoxComplete ? 'Add box to cart' : 'Fill every slot to continue'}
        </Button>
        <Button fullWidth variant="ghost" onClick={onClear}>
          Clear selection
        </Button>
      </div>
    </aside>
  )
}
