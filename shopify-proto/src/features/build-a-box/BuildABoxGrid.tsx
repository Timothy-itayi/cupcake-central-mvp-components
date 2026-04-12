import { Button } from '../../components/ui/Button'
import { ProductImage } from '../../components/ui/ProductImage'
import { formatCurrency } from '../../utils/currency'
import type { BuildABoxSelection } from '../../types/buildABox'
import type { Product } from '../../types/product'

type BuildABoxGridProps = {
  cupcakes: Product[]
  selections: BuildABoxSelection[]
  remainingCount: number
  onIncrement: (productId: string) => void
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
        const canIncrement = remainingCount > 0

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
                  onClick={() => onIncrement(cupcake.id)}
                  variant={canIncrement ? 'primary' : 'ghost'}
                  className="icon-button"
                >
                  +
                </Button>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
