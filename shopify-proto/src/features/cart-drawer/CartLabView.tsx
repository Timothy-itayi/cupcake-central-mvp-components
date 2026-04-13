import { useState } from 'react'
import { formatCurrency } from '../../utils/currency'
import type { CartUpsellRecommendation } from './cart.helpers'
import type { Product } from '../../types/product'
import { Trash2 } from 'lucide-react'
import type { CartLine } from '../../types/cart'

type CartLabViewProps = {
  subtotalCents: number
  deliveryThresholdCents: number
  amountUntilFreeDelivery: number
  hasFreeDelivery: boolean
  recommendedUpsell: CartUpsellRecommendation | null
  cartQuantityByProductId: Record<string, number>
  products: Product[]
  cartLines: CartLine[]
  onAddProduct: (product: Product) => void
  onOpenCart: () => void
  onIncrementCartLine: (lineId: string) => void
  onDecrementCartLine: (lineId: string) => void
  onRemoveCartLine: (lineId: string) => void
}

export const CartLabView = ({
  subtotalCents,
  cartLines,
  onIncrementCartLine,
  onDecrementCartLine,
  onRemoveCartLine,
}: CartLabViewProps) => {
  const [isRibbonAdded, setIsRibbonAdded] = useState(false)
  const finalTotalCents = subtotalCents + (isRibbonAdded ? 200 : 0)

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-12 flex flex-col lg:flex-row gap-16 items-start">
        
        {/* Left Column: Cart Items & Gift Options */}
        <div className="flex-1 w-full lg:max-w-2xl">
          {/* Cart Items List */}
          <div className="flex flex-col mb-8">
            {cartLines.length > 0 ? (
              cartLines.map((line) => {
                const canIncrement = line.stockLevel === undefined || line.quantity < line.stockLevel

                return (
                  <article key={line.id} className="py-6 border-b border-gray-200 flex gap-6 items-start">
                    {/* Image */}
                    <div className="w-[120px] h-[120px] flex-shrink-0 bg-gray-50 rounded-[4px] overflow-hidden">
                      {line.imageUrl ? (
                        <img
                          src={line.imageUrl}
                          alt={line.imageAlt ?? line.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-pink-50">
                          <span className="text-3xl" aria-hidden="true">🎂</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between min-h-[120px]">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-[15px] leading-tight text-gray-900 pr-2">
                            {line.name} {line.source === 'build-a-box' && '- (V)'}
                          </h3>
                          <div className="text-[13px] text-gray-600 mt-1">
                            {formatCurrency(line.unitPriceCents)}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveCartLine(line.id)}
                          className="text-gray-500 hover:text-gray-900 transition-colors pt-1"
                          aria-label={`Remove ${line.name}`}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="mt-4">
                        <div className="inline-flex items-center justify-between border border-gray-400 rounded-[2px] bg-white w-24">
                          <button
                            type="button"
                            onClick={() => onDecrementCartLine(line.id)}
                            className="px-3 py-1 text-gray-900 font-medium hover:bg-gray-50 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="text-sm font-bold text-gray-900">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onIncrementCartLine(line.id)}
                            disabled={!canIncrement}
                            className="px-3 py-1 text-gray-900 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })
            ) : (
              <div className="py-10 text-gray-500 text-sm">Your cart is empty.</div>
            )}
          </div>

          {/* Gift Message with Ribbon Checkbox */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-[80px] h-[80px] flex-shrink-0 bg-gray-50 rounded-[4px] overflow-hidden border border-gray-200">
              <img 
                src="/gifts/Gift-Box-Ribbon_1.webp" 
                alt="Gift Ribbon" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="gift-ribbon" 
                checked={isRibbonAdded}
                onChange={(e) => setIsRibbonAdded(e.target.checked)}
                className="w-4 h-4 rounded-[2px] border-gray-300 accent-[#d96a97]" 
              />
              <label htmlFor="gift-ribbon" className="text-[15px] font-extrabold text-[#d96a97] cursor-pointer">
                Add Gift Message with Ribbon ($2.00)
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Summary */}
        <div className="w-full lg:w-[400px] lg:shrink-0">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-extrabold uppercase tracking-widest text-gray-900">Total</span>
            <span className="text-2xl font-extrabold text-gray-900">
              {formatCurrency(finalTotalCents)}
            </span>
          </div>

          <div className="flex flex-col gap-6 items-center w-full">
            <button className="w-full bg-[#f468a3] hover:bg-[#e35691] text-white font-extrabold text-[13px] tracking-widest uppercase py-4 rounded-[2px] transition-colors mt-2">
              Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
