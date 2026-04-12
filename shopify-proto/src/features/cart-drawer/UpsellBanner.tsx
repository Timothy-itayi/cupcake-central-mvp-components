import { Button } from '../../components/ui/Button'
import { formatCurrency } from '../../utils/currency'

type UpsellBannerProps = {
  title: string
  priceCents: number
  onAdd: () => void
}

export const UpsellBanner = ({ title, priceCents, onAdd }: UpsellBannerProps) => (
  <div className="rounded-[1.5rem] border border-amber-300 bg-amber-50 p-4">
    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
      Quick upsell
    </p>
    <h3 className="mt-2 text-lg font-semibold text-stone-900">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-stone-700">
      Pseudo-code: if the cart does not already include this add-on, show one obvious
      prompt and let the customer add it in a single click.
    </p>
    <Button className="mt-4" onClick={onAdd}>
      Add for {formatCurrency(priceCents)}
    </Button>
  </div>
)
