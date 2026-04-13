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
  imageMap: Record<string, { alt: string; src: string }>
  isImageLoading: boolean
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
  return (
    <div className="bg-white max-h-screen overflow-y-auto font-sans text-gray-900 pb-20">
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
          <div className="flex items-center gap-2 mb-8">
            <input type="checkbox" id="gift-ribbon" className="w-4 h-4 rounded-[2px] border-gray-300 accent-[#d96a97]" />
            <label htmlFor="gift-ribbon" className="text-sm font-extrabold text-[#d96a97]">
              Add Gift Message with Ribbon ($2.00)
            </label>
          </div>

          <div className="w-full h-px bg-gray-200 mb-8" />

          {/* Gift Card Message textarea */}
          <div className="mb-8">
            <label htmlFor="gift-message" className="block text-[15px] font-extrabold text-gray-900 mb-2">
              Gift Card Message
            </label>
            <textarea
              id="gift-message"
              rows={4}
              placeholder="lolol"
              className="w-full border border-gray-400 rounded-[2px] p-4 text-sm focus:outline-none focus:border-[#d96a97] resize-none"
            />
            <div className="text-[11px] font-bold text-gray-500 mt-2">5/120</div>
            <div className="text-[11px] font-bold text-[#d96a97] mt-1">Note: Emojis and special characters are unavailable</div>
          </div>

          {/* Delivery Instructions textarea */}
          <div>
            <label htmlFor="delivery-instructions" className="block text-[15px] font-extrabold text-gray-900 mb-2">
              Delivery Instructions
            </label>
            <textarea
              id="delivery-instructions"
              rows={4}
              placeholder="Leave driver a message, no specific delivery time requests. For gift messages, see section above."
              className="w-full border border-gray-400 rounded-[2px] p-4 text-sm focus:outline-none focus:border-[#d96a97] resize-none placeholder-gray-500"
            />
            <div className="text-[11px] font-bold text-gray-900 mt-2">0/120 Characters.</div>
          </div>
        </div>

        {/* Right Column: Checkout Summary */}
        <div className="w-full lg:w-[400px] ">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-extrabold uppercase tracking-widest text-gray-900">Total</span>
            <span className="text-2xl font-extrabold text-gray-900">
              {formatCurrency(subtotalCents)}
            </span>
          </div>

          <div className="flex flex-col gap-6 items-center w-full">
            <div className="text-sm font-extrabold text-gray-900 text-center w-full">
              Choose delivery/pickup option:
            </div>
            
            <div className="flex flex-col gap-2 w-full pl-6">
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input type="radio" name="delivery-method" value="metro" defaultChecked className="w-3.5 h-3.5 accent-[#3b82f6]" />
                Melbourne Metro
              </label>
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input type="radio" name="delivery-method" value="pickup" className="w-3.5 h-3.5 accent-[#3b82f6]" />
                Store Pickup
              </label>
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input type="radio" name="delivery-method" value="rest" className="w-3.5 h-3.5 accent-[#3b82f6]" />
                Rest Of Australia
              </label>
            </div>

            <div className="text-xs font-medium text-gray-900 text-center w-full mt-2">
              Enter your postal code to check if you are<br/>eligible for local delivery:
            </div>

            <div className="flex w-full">
              <input 
                type="text" 
                placeholder="Enter your postal code ..." 
                className="flex-1 border border-gray-200 rounded-l-[2px] px-4 py-3 text-sm focus:outline-none placeholder-gray-400"
              />
              <button className="bg-gray-100 border border-l-0 border-gray-200 rounded-r-[2px] px-4 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-between w-full border border-gray-200 p-4 rounded-[2px] mt-2">
              <span className="text-sm font-medium text-gray-900">Authority to leave in a safe<br/>place <span className="text-red-500">*</span></span>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center gap-1 cursor-pointer">
                  <input type="radio" name="authority" value="yes" className="w-3.5 h-3.5 accent-black" />
                  <span className="text-[10px] font-bold">Yes</span>
                </label>
                <label className="flex flex-col items-center gap-1 cursor-pointer">
                  <input type="radio" name="authority" value="no" className="w-3.5 h-3.5 accent-black" />
                  <span className="text-[10px] font-bold">No</span>
                </label>
              </div>
            </div>

            <button className="w-full bg-[#f468a3] hover:bg-[#e35691] text-white font-extrabold text-[13px] tracking-widest uppercase py-4 rounded-[2px] transition-colors mt-2">
              Checkout
            </button>

            <div className="text-[10px] font-medium text-center text-gray-900 leading-tight">
              By checking out, I accept the Terms & Conditions<br/>
              Read our Delivery Guide Here
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
