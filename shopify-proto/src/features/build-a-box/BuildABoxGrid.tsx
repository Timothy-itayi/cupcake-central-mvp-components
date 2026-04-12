import { Button } from '../../components/ui/Button'
import { formatCurrency } from '../../utils/currency'
import type { Product } from '../../types/product'

type BuildABoxGridProps = {
  cupcakes: Product[]
  isBoxFull: boolean
  onAdd: (productId: string) => void
}

export const BuildABoxGrid = ({
  cupcakes,
  isBoxFull,
  onAdd,
}: BuildABoxGridProps) => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {cupcakes.map((cupcake) => (
      <article
        key={cupcake.id}
        className="flex h-full flex-col rounded-[1.5rem] border border-stone-200 bg-white p-4 shadow-sm"
      >
        <div
          className="flex min-h-28 items-center justify-center rounded-[1.25rem] text-5xl"
          style={{ background: cupcake.imageGradient }}
        >
          {cupcake.imageEmoji}
        </div>

        <div className="mt-4 flex flex-1 flex-col gap-3">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-stone-900">{cupcake.name}</h3>
              <span className="text-sm font-semibold text-stone-500">
                {formatCurrency(cupcake.priceCents)}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-stone-600">{cupcake.description}</p>
          </div>

          <Button
            fullWidth
            disabled={isBoxFull}
            onClick={() => onAdd(cupcake.id)}
            variant={isBoxFull ? 'ghost' : 'primary'}
          >
            {isBoxFull ? 'Box full' : 'Add to box'}
          </Button>
        </div>
      </article>
    ))}
  </div>
)
