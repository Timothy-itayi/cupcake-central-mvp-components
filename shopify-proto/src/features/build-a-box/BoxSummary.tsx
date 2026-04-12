import { Button } from '../../components/ui/Button'
import { formatCurrency } from '../../utils/currency'

type BoxSummaryProps = {
  selectedCount: number
  boxSize: number
  subtotalCents: number
  isBoxFull: boolean
  onClear: () => void
  onAddToCart: () => void
}

export const BoxSummary = ({
  selectedCount,
  boxSize,
  subtotalCents,
  isBoxFull,
  onClear,
  onAddToCart,
}: BoxSummaryProps) => (
  <aside className="space-y-5 rounded-[1.75rem] border border-stone-200 bg-stone-950 p-6 text-white shadow-sm">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-300">
        Build logic
      </p>
      <h3 className="mt-2 text-2xl font-semibold">Your dozen box</h3>
      <p className="mt-2 text-sm leading-6 text-stone-300">
        Fill all 12 slots, then send the full box to cart. No half-finished chaos.
      </p>
    </div>

    <dl className="space-y-3 rounded-[1.25rem] bg-white/5 p-4">
      <div className="flex items-center justify-between text-sm">
        <dt className="text-stone-300">Slots filled</dt>
        <dd className="font-semibold text-white">
          {selectedCount} / {boxSize}
        </dd>
      </div>
      <div className="flex items-center justify-between text-sm">
        <dt className="text-stone-300">Running subtotal</dt>
        <dd className="font-semibold text-white">{formatCurrency(subtotalCents)}</dd>
      </div>
    </dl>

    <div className="space-y-3">
      <Button fullWidth variant="primary" disabled={!isBoxFull} onClick={onAddToCart}>
        {isBoxFull ? 'Add dozen to cart' : 'Fill 12 slots to continue'}
      </Button>
      <Button fullWidth variant="ghost" onClick={onClear}>
        Clear selection
      </Button>
    </div>
  </aside>
)
