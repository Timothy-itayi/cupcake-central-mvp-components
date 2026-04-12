import { Button } from '../../components/ui/Button'
import { formatCurrency } from '../../utils/currency'

type BoxSummaryProps = {
  activeBoxSize: number | null
  selectedCount: number
  remainingCount: number
  subtotalCents: number
  isBoxComplete: boolean
  onClear: () => void
  onAddToCart: () => void
}

export const BoxSummary = ({
  activeBoxSize,
  selectedCount,
  remainingCount,
  subtotalCents,
  isBoxComplete,
  onClear,
  onAddToCart,
}: BoxSummaryProps) => (
  <aside className="sticky top-20 self-start max-h-[calc(100vh-6rem)] space-y-3 overflow-y-auto rounded-[1.75rem] border border-[#f0c8d8] bg-[linear-gradient(180deg,#fff2f8_0%,#fff7fb_100%)] p-4 text-[#42211b] shadow-[0_18px_45px_rgba(151,92,121,0.1)]">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ec4f9f]">
        Box progress
      </p>
      <h3 className="mt-2 text-[1.65rem] font-semibold leading-tight">
        {activeBoxSize ? `Your ${activeBoxSize}-cupcake box` : 'Choose your box'}
      </h3>
      <p className="mt-2 text-sm leading-5 text-[#7c5a50]">
        Pick a valid box size, then keep adding flavours until the counter reaches the limit.
      </p>
    </div>

    <div className="rounded-[1.25rem] border border-[#f0c8d8] bg-white/95 p-3.5 shadow-sm">
      <div className="flex items-center justify-between text-sm font-medium text-[#7c5a50]">
        <span>Progress</span>
        <span>
          {selectedCount} / {activeBoxSize ?? 0}
        </span>
      </div>
      <div className="mt-3 h-3 w-full rounded-full bg-[#f7dbe8]">
        <div
          className="h-3 rounded-full bg-[#ec4f9f] transition-all"
          style={{
            width: activeBoxSize ? `${Math.min((selectedCount / activeBoxSize) * 100, 100)}%` : '0%',
          }}
        />
      </div>
    </div>

    <dl className="space-y-2.5 rounded-[1.25rem] border border-[#f0c8d8] bg-white/95 p-3.5 shadow-sm">
      <div className="flex items-center justify-between text-sm">
        <dt className="text-[#7c5a50]">Selected</dt>
        <dd className="font-semibold text-[#42211b]">
          {selectedCount} / {activeBoxSize ?? 0}
        </dd>
      </div>
      <div className="flex items-center justify-between text-sm">
        <dt className="text-[#7c5a50]">Still to choose</dt>
        <dd className="font-semibold text-[#42211b]">
          {activeBoxSize ? remainingCount : '-'}
        </dd>
      </div>
      <div className="flex items-center justify-between text-sm">
        <dt className="text-[#7c5a50]">Running subtotal</dt>
        <dd className="font-semibold text-[#42211b]">{formatCurrency(subtotalCents)}</dd>
      </div>
    </dl>

    <details className="rounded-[1.25rem] border border-[#bfe9e7] bg-[#e7faf8] p-3.5 text-sm leading-6 text-[#265754] shadow-sm">
      <summary className="cursor-pointer list-none font-semibold text-[#0a6d69] marker:hidden">
        How this works
      </summary>
      <div className="mt-2">
        <p>
          Regular cupcakes ship in 6 or 12. Mini cupcakes ship in 15 or 30. The customer
          fills the chosen box only.
        </p>
        <p className="mt-2">
          {isBoxComplete
            ? 'Your box is complete and ready to send to the cart drawer.'
            : 'Keep selecting flavours until all slots are filled, then confirm the box in one step.'}
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
