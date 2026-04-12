import { formatCurrency } from '../../utils/currency'
import { getStockBadge } from './stock.helpers'
import type { Product } from '../../types/product'

type ProductCardProps = {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const badge = getStockBadge(product.stockLevel)

  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-sm">
      <div className="relative">
        <div
          className="flex min-h-48 items-center justify-center text-6xl"
          style={{ background: product.imageGradient }}
        >
          {product.imageEmoji}
        </div>

        {badge ? (
          <span
            className={[
              'absolute left-3 top-3 rounded-full px-3 py-2 text-xs font-semibold tracking-[0.02em] shadow-sm',
              badge.tone === 'urgent'
                ? 'bg-rose-500 text-white'
                : 'bg-stone-900 text-white',
            ].join(' ')}
          >
            {badge.label}
          </span>
        ) : null}
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-stone-900">{product.name}</h3>
          <span className="text-sm font-semibold text-stone-500">
            {formatCurrency(product.priceCents)}
          </span>
        </div>
        <p className="text-sm leading-6 text-stone-600">{product.description}</p>
      </div>
    </article>
  )
}
