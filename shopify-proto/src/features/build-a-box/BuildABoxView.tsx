import { BuildABoxGrid } from './BuildABoxGrid'
import { BoxSummary } from './BoxSummary'
import { BOX_SIZE_OPTIONS_BY_TYPE, getBuildABoxSubtotal } from './buildABox.helpers'
import type { BuildABoxSelection, BuildABoxSize } from '../../types/buildABox'
import type { CupcakeBoxType, Product } from '../../types/product'
import { Filter } from 'lucide-react'

const heroBannerSrc = '/hero-banner/Collection_Banner_Build_Your_Own_Box_-_Desktop_1.webp'

type BuildABoxViewProps = {
  cupcakes: Product[]
  selections: BuildABoxSelection[]
  boxType: CupcakeBoxType
  boxSize: BuildABoxSize | null
  selectedCount: number
  remainingCount: number
  isBoxComplete: boolean
  onSelectBoxType: (boxType: CupcakeBoxType) => void
  onSelectBoxSize: (boxSize: BuildABoxSize) => void
  onIncrementCupcake: (productId: string, maxQuantity: number) => void
  onDecrementCupcake: (productId: string) => void
  onClearBox: () => void
  onAddToCart: () => void
}

export const BuildABoxView = ({
  cupcakes,
  selections,
  boxType,
  boxSize,
  selectedCount,
  remainingCount,
  isBoxComplete,
  onSelectBoxType,
  onSelectBoxSize,
  onIncrementCupcake,
  onDecrementCupcake,
  onClearBox,
  onAddToCart,
}: BuildABoxViewProps) => {
  const subtotalCents = getBuildABoxSubtotal(cupcakes, selections)
  const boxSizeOptions = BOX_SIZE_OPTIONS_BY_TYPE[boxType]

  return (
    <div className="bg-[#fffaf5] min-h-screen">
      {/* Hero Banner */}
      <div className="w-full relative flex items-center justify-end overflow-hidden" style={{ minHeight: '350px' }}>
        <img 
          src={heroBannerSrc} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
        />
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-8 lg:px-16 text-right pb-10 pt-10">
          <h1 className="text-4xl md:text-6xl lg:text-[6rem] font-extrabold uppercase tracking-tight mb-4 leading-[0.9] drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)] text-white">
            BUILD YOUR<br />OWN BOX
          </h1>
          <p className="text-lg md:text-2xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)] leading-snug text-white">
            Classic, Vegan and Gluten-Free<br />Cupcakes. Pick your favourites,<br />fill a box and share the joy
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 flex flex-col xl:flex-row gap-8 items-start">
        
        <div className="flex-1 w-full">
          
          {/* Box Configuration UI */}
          <div className="bg-white p-10 rounded-[2px] shadow-sm mb-6 border-t-[3px] border-[#d96a97]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-extrabold text-gray-900 tracking-wider uppercase">
                1. Choose your box size
              </h2>
              <button 
                onClick={onClearBox}
                className="text-[11px] font-extrabold text-[#d96a97] uppercase tracking-widest hover:text-[#c85f8d] transition-colors"
              >
                Reset Box
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Box Type */}
              <div className="flex-1">
                <p className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-3">Product Type</p>
                <div className="flex flex-col gap-2">
                  {(['regular', 'mini'] as const).map((typeOption) => {
                    const isActive = boxType === typeOption
                    return (
                      <button
                        key={typeOption}
                        onClick={() => onSelectBoxType(typeOption)}
                        className={`text-left p-3 border-[1.5px] rounded-[2px] transition-colors ${
                          isActive 
                            ? 'border-[#4a9a84] bg-white' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <p className={`font-bold text-[13px] ${isActive ? 'text-[#4a9a84]' : 'text-gray-900'}`}>
                          {typeOption === 'regular' ? 'Regular cupcakes' : 'Mini cupcakes'}
                        </p>
                        <p className="text-[11px] text-gray-500 mt-1 tracking-wide">
                          {typeOption === 'regular' ? 'Available in 6 or 12' : 'Available in 15 or 30'}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Box Size */}
              <div className="flex-1">
                <p className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-3">Box Capacity</p>
                <div className="grid grid-cols-2 gap-2 h-full">
                  {boxSizeOptions.map((sizeOption) => {
                    const isActive = boxSize === sizeOption
                    return (
                      <button
                        key={sizeOption}
                        onClick={() => onSelectBoxSize(sizeOption)}
                        className={`text-center px-2 py-1 border-[1.5px] rounded-[2px] transition-colors h-full flex flex-col items-center justify-center text-sm ${
                   
                          isActive 
                            ? 'border-[#d96a97] bg-white' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <h4 className={`text-xl font-extrabold ${isActive ? 'text-[#d96a97]' : 'text-gray-900'}`}>
                          {sizeOption}
                        </h4>
                        <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mt-1">
                          Cupcakes
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between py-6 mb-2 border-b-0">
            <div className="flex-1 flex justify-start">
              <button className="flex items-center gap-2 text-[11px] font-extrabold text-gray-800 tracking-widest uppercase">
                <Filter className="w-3.5 h-3.5" /> Filter
              </button>
            </div>

            <div className="flex-1 flex justify-center mt-4 sm:mt-0 text-[11px] font-extrabold text-gray-800 tracking-widest uppercase">
              <div className="flex items-center gap-2 cursor-pointer hover:text-gray-600 transition-colors">
                Sort by: <span className="font-medium lowercase tracking-normal text-[13px] ml-1">featured</span> <span className="ml-1 opacity-50">›</span>
              </div>
            </div>
            
            <div className="flex-1 flex justify-end text-[11px] font-extrabold text-gray-800 tracking-widest uppercase mt-4 sm:mt-0 opacity-70">
              {cupcakes.length} products
            </div>
          </div>

          {/* Products Grid */}
          <BuildABoxGrid
            cupcakes={cupcakes}
            selections={selections}
            remainingCount={remainingCount}
            onDecrement={onDecrementCupcake}
            onIncrement={onIncrementCupcake}
          />
        </div>
        
        {/* Right Sidebar / Summary */}
        <div className="w-full xl:w-[320px] shrink-0 sticky top-45 z-10 hidden xl:block">
          <BoxSummary
            boxType={boxType}
            activeBoxSize={boxSize}
            isBoxComplete={isBoxComplete}
            onAddToCart={onAddToCart}
            onClear={onClearBox}
            remainingCount={remainingCount}
            selectedCount={selectedCount}
            subtotalCents={subtotalCents}
          />
        </div>
        
        {/* Mobile Summary Dock */}
        <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40">
          <BoxSummary
            boxType={boxType}
            activeBoxSize={boxSize}
            isBoxComplete={isBoxComplete}
            onAddToCart={onAddToCart}
            onClear={onClearBox}
            remainingCount={remainingCount}
            selectedCount={selectedCount}
            subtotalCents={subtotalCents}
            isMobile
          />
        </div>

      </div>
    </div>
  )
}
