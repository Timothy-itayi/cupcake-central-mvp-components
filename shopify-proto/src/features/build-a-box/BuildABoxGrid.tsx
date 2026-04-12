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
          <article
            key={cupcake.id}
            className="group flex h-full flex-col rounded-[1.75rem] border border-[#f2ddd6] bg-white p-4 shadow-[0_12px_35px_rgba(109,67,53,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(109,67,53,0.12)]"
          >
            <ProductImage
              title={cupcake.name}
              imageAlt={cupcake.name}
              imageEmoji={cupcake.imageEmoji}
              imageGradient={cupcake.imageGradient}
              imageUrl={cupcake.localImagePath}
              heightClassName="min-h-48"
            />

            <div className="mt-4 flex flex-1 flex-col gap-3.5">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold text-[#382320]">{cupcake.name}</h3>
                  <span className="text-sm font-semibold text-[#7e635b]">
                    {formatCurrency(cupcake.priceCents)}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#6f5c56]">{cupcake.description}</p>
                {cupcake.dietaryTag ? (
                  <span className="mt-3 inline-flex rounded-full bg-[#00b3ad]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#008f8a]">
                    {cupcake.dietaryTag === 'GF' ? 'Gluten Free' : 'Vegan'}
                  </span>
                ) : null}
              </div>

              <div className="mt-auto flex items-center justify-between rounded-full border border-[#f1ddd4] bg-[#fff9f5] p-1.5">
                <Button
                  aria-label={`Remove one ${cupcake.name}`}
                  disabled={quantity === 0}
                  onClick={() => onDecrement(cupcake.id)}
                  variant="ghost"
                  className="h-9 min-w-9 px-0"
                >
                  -
                </Button>
                <div className="text-center">
                  <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#8d756d]">
                    Selected
                  </p>
                  <p className="text-lg font-semibold text-[#382320]">{quantity}</p>
                </div>
                <Button
                  aria-label={`Add one ${cupcake.name}`}
                  disabled={!canIncrement}
                  onClick={() => onIncrement(cupcake.id)}
                  variant={canIncrement ? 'primary' : 'ghost'}
                  className="h-9 min-w-9 px-0"
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
