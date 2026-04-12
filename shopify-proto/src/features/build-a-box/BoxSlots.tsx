import type { Product } from '../../types/product'

type BoxSlotsProps = {
  boxSize: number
  selectedProductIds: string[]
  cupcakes: Product[]
  onRemove: (index: number) => void
}

export const BoxSlots = ({
  boxSize,
  selectedProductIds,
  cupcakes,
  onRemove,
}: BoxSlotsProps) => (
  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
    {Array.from({ length: boxSize }, (_, index) => {
      const productId = selectedProductIds[index]
      const cupcake = cupcakes.find((item) => item.id === productId)

      return (
        <button
          key={index}
          type="button"
          disabled={!cupcake}
          onClick={() => onRemove(index)}
          className={[
            'flex aspect-square flex-col items-center justify-center rounded-[1.25rem] border text-center transition',
            cupcake
              ? 'border-rose-200 bg-rose-50 text-stone-900 hover:border-rose-300'
              : 'border-dashed border-stone-300 bg-stone-50 text-stone-400',
          ].join(' ')}
        >
          {cupcake ? (
            <>
              <span className="text-3xl">{cupcake.imageEmoji}</span>
              <span className="mt-2 px-2 text-xs font-medium">{cupcake.name}</span>
              <span className="mt-1 text-[11px] uppercase tracking-[0.2em] text-stone-500">
                Remove
              </span>
            </>
          ) : (
            <>
              <span className="text-2xl">+</span>
              <span className="mt-2 text-xs font-medium">Empty slot</span>
            </>
          )}
        </button>
      )
    })}
  </div>
)
