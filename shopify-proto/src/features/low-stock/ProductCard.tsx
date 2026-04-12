import { ProductImage } from '../../components/ui/ProductImage'
import { formatCurrency } from '../../utils/currency'
import { getStockBadge } from './stock.helpers'
import type { Product } from '../../types/product'

type ProductCardProps = {
  product: Product
  imageUrl?: string
  imageAlt?: string
  isImageLoading?: boolean
}

export const ProductCard = ({
  product,
  imageUrl,
  imageAlt,
  isImageLoading = false,
}: ProductCardProps) => {
  const badge = getStockBadge(product.stockLevel)
  const resolvedImageUrl = product.localImagePath ?? imageUrl
  const resolvedImageAlt = imageAlt ?? product.name

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
      </div>
    </article>
  )
}
