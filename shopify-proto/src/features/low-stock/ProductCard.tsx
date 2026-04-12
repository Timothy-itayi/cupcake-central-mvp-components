import { Button } from '../../components/ui/Button'
import { ProductImage } from '../../components/ui/ProductImage'
import { formatCurrency } from '../../utils/currency'
import { getStockBadge } from './stock.helpers'
import type { Product } from '../../types/product'

type ProductCardProps = {
  product: Product
  alternativeProduct: Product | null
  imageUrl?: string
  imageAlt?: string
  isImageLoading?: boolean
  onAddAlternative: (product: Product) => void
}

export const ProductCard = ({
  product,
  alternativeProduct,
  imageUrl,
  imageAlt,
  isImageLoading = false,
  onAddAlternative,
}: ProductCardProps) => {
  const badge = getStockBadge(product)
  const resolvedImageUrl = product.localImagePath ?? imageUrl
  const resolvedImageAlt = imageAlt ?? product.name
  const isSoldOut = product.stockLevel === 0

  return (
    <article className="product-card p-4">
      <div className="relative">
        <ProductImage
          title={product.name}
          imageAlt={resolvedImageAlt}
          imageEmoji={product.imageEmoji}
          imageGradient={product.imageGradient}
          imageUrl={resolvedImageUrl}
          heightClassName="min-h-48"
          emojiClassName="text-6xl"
          isLoading={isImageLoading && !resolvedImageUrl}
        />

        {badge ? (
          <span
            className={[
              'status-badge absolute left-3 top-3 shadow-sm',
              badge.tone === 'urgent' ? 'status-badge--urgent' : 'status-badge--default',
            ].join(' ')}
          >
            {badge.label}
          </span>
        ) : null}
      </div>

      <div className="product-card__body px-0 pb-0">
        <div className="flex items-start justify-between gap-3">
          <h3 className="product-card__name">{product.name}</h3>
          <span className="product-card__price">{formatCurrency(product.priceCents)}</span>
        </div>
        <p className="product-card__description">{product.description}</p>

        {isSoldOut && alternativeProduct ? (
          <div className="mt-4 rounded-[1.25rem] border border-[color:var(--stroke)] bg-[rgba(255,250,245,0.9)] p-4">
            <p className="text-sm font-semibold text-[var(--ink)]">Sold out for today</p>
            <p className="mt-1 text-sm leading-6">
              Try {alternativeProduct.name} instead while the current bake is still available.
            </p>
            <Button
              className="mt-3"
              fullWidth
              variant="secondary"
              onClick={() => onAddAlternative(alternativeProduct)}
            >
              Add {alternativeProduct.name}
            </Button>
          </div>
        ) : null}
      </div>
    </article>
  )
}
