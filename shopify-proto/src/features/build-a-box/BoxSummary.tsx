import { formatCurrency } from '../../utils/currency'
import type { CupcakeBoxType } from '../../types/product'

type BoxSummaryProps = {
  boxType: CupcakeBoxType
  activeBoxSize: number | null
  selectedCount: number
  remainingCount: number
  subtotalCents: number
  isBoxComplete: boolean
  onClear: () => void
  onAddToCart: () => void
  isMobile?: boolean
}

export const BoxSummary = ({
  boxType,
  activeBoxSize,
  selectedCount,
  remainingCount,
  subtotalCents,
  isBoxComplete,
  onClear,
  onAddToCart,
  isMobile = false,
}: BoxSummaryProps) => {
  const boxLabel = activeBoxSize
    ? `${boxType === 'mini' ? 'Mini' : 'Regular'} ${activeBoxSize}-pack`
    : 'Choose a box'

  const progressPercent = activeBoxSize ? Math.min((selectedCount / activeBoxSize) * 100, 100) : 0

  if (isMobile) {
    return (
      <div className="bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-extrabold text-gray-900 tracking-wider uppercase text-[10px]">
            {selectedCount} / {activeBoxSize ?? 0} Selected
          </span>
          <span className="font-extrabold text-[#d96a97]">
            {formatCurrency(subtotalCents)}
          </span>
        </div>
        <div className="h-1.5 w-full bg-pink-50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#d96a97] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <button 
          disabled={!isBoxComplete} 
          onClick={onAddToCart}
          className={`w-full py-3 rounded-[2px] font-extrabold text-[11px] tracking-widest uppercase transition-colors ${
            isBoxComplete 
              ? 'bg-[#d96a97] text-white hover:bg-[#c85f8d]' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isBoxComplete ? 'ADD TO CART' : `SELECT ${remainingCount} MORE`}
        </button>
      </div>
    )
  }

  return (
    <aside className="bg-white rounded-[2px] shadow-sm border border-gray-100 border-t-[3px] border-t-[#d96a97] overflow-hidden flex flex-col">
      <div className="p-6 border-b border-gray-100 bg-[#fafafa]">
        <h2 className="text-lg font-extrabold text-gray-900 tracking-wider uppercase mb-2">Box Progress</h2>
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
          {activeBoxSize ? boxLabel : 'Choose box'}
        </p>
      </div>

      <div className="p-6 flex flex-col gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-extrabold text-gray-900 uppercase tracking-widest">
              Selected
            </span>
            <span className="font-extrabold text-gray-900 text-sm">
              {selectedCount} / {activeBoxSize ?? 0}
            </span>
          </div>
          <div className="h-2 w-full bg-pink-50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#d96a97] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 py-4 border-y border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest">Still to choose</span>
            <span className="font-extrabold text-gray-900 text-sm">{activeBoxSize ? remainingCount : '-'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest">Subtotal</span>
            <span className="font-extrabold text-[#d96a97] text-base">{formatCurrency(subtotalCents)}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            disabled={!isBoxComplete} 
            onClick={onAddToCart}
            className={`w-full py-4 rounded-[2px] font-extrabold text-[12px] tracking-widest uppercase transition-colors ${
              isBoxComplete 
                ? 'bg-[#d96a97] text-white hover:bg-[#c85f8d]' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isBoxComplete ? 'ADD TO CART' : 'COMPLETE BOX FIRST'}
          </button>
          
          <button 
            onClick={onClear}
            className="w-full py-3 text-[10px] font-extrabold text-gray-500 hover:text-gray-900 uppercase tracking-widest transition-colors"
          >
            Clear Selection
          </button>
        </div>
      </div>
    </aside>
  )
}
