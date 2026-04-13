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
    <div className="grid gap-x-4 gap-y-12 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {cupcakes.map((cupcake) => {
        const quantity = quantityByProductId[cupcake.id] ?? 0
        const isSoldOut = cupcake.stockLevel === 0
        const isLowStock = isLowStockLevel(cupcake.stockLevel)
        const hasReachedStockLimit = quantity >= cupcake.stockLevel
        const canIncrement = remainingCount > 0 && !isSoldOut && !hasReachedStockLimit
        
        return (
          <article 
            key={cupcake.id} 
            className="flex flex-col bg-white rounded-[2px] border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow relative"
          >
            {/* Top area: Image + Badges */}
            <div className="relative aspect-square overflow-hidden bg-gray-50">
              
              {/* Badges container */}
              <div className="absolute top-2 left-2 flex flex-col gap-1 z-20">
                {cupcake.dietaryTag === 'GF' && (
                  <span className="w-6 h-6 rounded-full bg-orange-900/40 border border-orange-200/50 flex items-center justify-center text-white text-[10px] font-bold" title="Gluten Free">
                    GF
                  </span>
                )}
                {cupcake.dietaryTag === 'V' && (
                  <span className="w-6 h-6 rounded-full bg-green-500/80 border border-green-200/50 flex items-center justify-center text-white text-[10px] font-bold" title="Vegan">
                    V
                  </span>
                )}
                {/* Sold out overlay icon if needed */}
                {isSoldOut && (
                  <span className="w-6 h-6 rounded-full bg-gray-900/60 border border-gray-200/50 flex items-center justify-center text-white text-[10px] font-bold">
                    ✕
                  </span>
                )}
              </div>

              {/* The Image */}
              {cupcake.localImagePath ? (
                <img
                  src={cupcake.localImagePath}
                  alt={cupcake.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl" aria-hidden="true">{cupcake.imageEmoji}</span>
                </div>
              )}
            </div>

            {/* Bottom area: Title + Price + Controls */}
            <div className="flex flex-col items-center justify-between p-4 flex-1">
              <p className="text-[13px] font-extrabold text-center text-gray-900 mb-3 tracking-wide leading-snug">
                {cupcake.name}
              </p>
              
              <div className="mt-auto w-full px-2 pb-2 max-w-[140px]">
                {quantity === 0 ? (
                  <button 
                    className="w-full border-[1.5px] border-[#d96a97] text-[#d96a97] font-extrabold text-[11px] tracking-widest py-[0.4rem] rounded-[2px] bg-white hover:bg-pink-50 transition-colors"
                    onClick={(e) => {
                      if (canIncrement) onIncrement(cupcake.id, cupcake.stockLevel)
                    }}
                  >
                    {isSoldOut ? 'SOLD OUT' : formatCurrency(cupcake.priceCents)}
                  </button>
                ) : (
                  <div 
                    className="flex items-center justify-between w-full border-[1.5px] border-[#d96a97] rounded-[2px] bg-white"
                  >
                    <button 
                      className="px-3 py-[0.4rem] text-[#d96a97] font-extrabold hover:bg-pink-50 text-sm"
                      onClick={() => onDecrement(cupcake.id)}
                    >
                      -
                    </button>
                    <span className="font-extrabold text-[#d96a97] text-sm">{quantity}</span>
                    <button 
                      className="px-3 py-[0.4rem] text-[#d96a97] font-extrabold hover:bg-pink-50 text-sm"
                      disabled={!canIncrement}
                      onClick={() => onIncrement(cupcake.id, cupcake.stockLevel)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
