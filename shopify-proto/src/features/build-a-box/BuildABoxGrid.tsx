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
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cupcakes.map((cupcake) => {
        const quantity = quantityByProductId[cupcake.id] ?? 0
        const canIncrement = remainingCount > 0

        return (
          <article
            key={cupcake.id}
            className="flex h-full flex-col rounded-[1.5rem] border border-stone-200 bg-white p-4 shadow-sm"
          >
            <ProductImage
              title={cupcake.name}
              imageAlt={cupcake.name}
              imageEmoji={cupcake.imageEmoji}
              imageGradient={cupcake.imageGradient}
              imageUrl={cupcake.localImagePath}
              heightClassName="min-h-44"
            />

            <div className="mt-4 flex flex-1 flex-col gap-3">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-stone-900">{cupcake.name}</h3>
                  <span className="text-sm font-semibold text-stone-500">
                    {formatCurrency(cupcake.priceCents)}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-stone-600">{cupcake.description}</p>
                {cupcake.dietaryTag ? (
                  <span className="mt-3 inline-flex rounded-full bg-[#00b3ad]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#008f8a]">
                    {cupcake.dietaryTag === 'GF' ? 'Gluten Free' : 'Vegan'}
                  </span>
                ) : null}
              </div>

              <div className="mt-auto flex items-center justify-between rounded-full bg-[#f7f0ea] p-1">
                <Button
                  aria-label={`Remove one ${cupcake.name}`}
                  disabled={quantity === 0}
                  onClick={() => onDecrement(cupcake.id)}
                  variant="ghost"
                >
                  -
                </Button>
                <div className="text-center">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                    Selected
                  </p>
                  <p className="text-lg font-semibold text-stone-950">{quantity}</p>
                </div>
                <Button
                  aria-label={`Add one ${cupcake.name}`}
                  disabled={!canIncrement}
                  onClick={() => onIncrement(cupcake.id)}
                  variant={canIncrement ? 'primary' : 'ghost'}
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
