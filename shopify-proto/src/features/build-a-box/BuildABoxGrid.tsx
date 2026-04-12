import { Button } from '../../components/ui/Button'
import { ProductImage } from '../../components/ui/ProductImage'
import { formatCurrency } from '../../utils/currency'
import { isLowStockLevel } from '../../utils/inventory'
import type { BuildABoxSelection } from '../../types/buildABox'
import type { Product } from '../../types/product'

type BuildABoxGridProps = {
  cupcakes: Product[]
  selections: BuildABoxSelection[]
  remainingCount: number
  onIncrement: (productId: string, maxQuantity: number) => void
  onDecrement: (productId: string) => void
}

export const BuildABoxGrid = ({
  cupcakes,
  selections,
  remainingCount,
  onIncrement,
  onDecrement,
}: BuildABoxGridProps) => {
  const quantityByProductId = Object.fromEntries(
    selections.map((selection) => [selection.productId, selection.quantity]),
  )

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cupcakes.map((cupcake) => {
        const quantity = quantityByProductId[cupcake.id] ?? 0
        const isSoldOut = cupcake.stockLevel === 0
        const isLowStock = isLowStockLevel(cupcake.stockLevel)
        const hasReachedStockLimit = quantity >= cupcake.stockLevel
        const canIncrement = remainingCount > 0 && !isSoldOut && !hasReachedStockLimit
        const stockMessage = isSoldOut
          ? 'Sold out today. Please choose another flavour.'
          : isLowStock
            ? `Only ${cupcake.stockLevel} left in today's bake.`
            : null

        return (
          <article key={cupcake.id} className="product-card p-4">
            <ProductImage
              title={cupcake.name}
              imageAlt={cupcake.name}
              imageEmoji={cupcake.imageEmoji}
              imageGradient={cupcake.imageGradient}
              imageUrl={cupcake.localImagePath}
              heightClassName="min-h-48"
            />

            <div className="product-card__body px-0 pb-0">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="product-card__name">{cupcake.name}</h3>
                  <span className="product-card__price">{formatCurrency(cupcake.priceCents)}</span>
                </div>
                <p className="product-card__description">{cupcake.description}</p>
                {cupcake.dietaryTag ? (
                  <span className="product-card__tag">
                    {cupcake.dietaryTag === 'GF' ? 'Gluten Free' : 'Vegan'}
                  </span>
                ) : null}
                {stockMessage ? (
                  <p
                    className={[
                      'mt-3 text-sm font-semibold',
                      isSoldOut ? 'text-[var(--ink-soft)]' : 'text-[var(--blush-500)]',
                    ].join(' ')}
                  >
                    {stockMessage}
                  </p>
                ) : null}
              </div>

              <div className="quantity-control">
                <Button
                  aria-label={`Remove one ${cupcake.name}`}
                  disabled={quantity === 0}
                  onClick={() => onDecrement(cupcake.id)}
                  variant="ghost"
                  className="icon-button"
                >
                  -
                </Button>
                <div className="quantity-readout">
                  <p className="mini-meta">Selected</p>
                  <p className="text-lg font-semibold text-[var(--ink)]">{quantity}</p>
                </div>
                <Button
                  aria-label={`Add one ${cupcake.name}`}
                  disabled={!canIncrement}
                  onClick={() => onIncrement(cupcake.id, cupcake.stockLevel)}
                  variant={canIncrement ? 'primary' : 'ghost'}
                  className="icon-button"
                >
                  +
                </Button>
              </div>
              {hasReachedStockLimit && !isSoldOut ? (
                <p className="mt-3 text-sm leading-6 text-[var(--blush-500)]">
                  You&apos;ve added the last available one for this flavour.
                </p>
              ) : null}
            </div>
          </article>
        )
      })}
    </div>
  )
}
