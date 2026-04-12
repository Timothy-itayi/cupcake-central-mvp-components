import { Button } from '../../components/ui/Button'
import { formatCurrency } from '../../utils/currency'

type UpsellBannerProps = {
  title: string
  priceCents: number
  imageUrl?: string
  imageAlt?: string
  onAdd: () => void
}

export const UpsellBanner = ({
  title,
  priceCents,
  imageUrl,
  imageAlt,
  onAdd,
}: UpsellBannerProps) => (
  <div className="soft-panel soft-panel--mint p-4">
    <div className="flex items-start gap-4">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={imageAlt ?? title}
          className="h-[4.5rem] w-[4.5rem] rounded-[1.1rem] border border-[color:var(--stroke)] bg-white object-cover"
        />
      ) : null}
      <div className="min-w-0">
        <p className="section-eyebrow !text-[var(--gold-500)]">Quick Upsell</p>
        <h3 className="mt-2 text-lg font-semibold text-[var(--ink)]">{title}</h3>
        <p className="mt-2 text-sm leading-6">
          Show one sensible add-on when it actually improves the gift, not a random trinket
          that looks algorithmically desperate.
        </p>
      </div>
    </div>
    <Button className="mt-4" onClick={onAdd}>
      Add for {formatCurrency(priceCents)}
    </Button>
  </div>
)
