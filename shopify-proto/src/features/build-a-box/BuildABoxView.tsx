import { PageSection } from '../../components/layout/PageSection'
import { BOX_SIZE_OPTIONS_BY_TYPE, getBuildABoxSubtotal } from './buildABox.helpers'
import { BoxSummary } from './BoxSummary'
import { BuildABoxGrid } from './BuildABoxGrid'
import { Button } from '../../components/ui/Button'
import type { BuildABoxSelection, BuildABoxSize } from '../../types/buildABox'
import type { CupcakeBoxType, Product } from '../../types/product'

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
  onIncrementCupcake: (productId: string) => void
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
    <PageSection
      eyebrow="Component One"
      title="Build-a-Box selector"
      description="Keep the build simple and production-friendly: choose regular or mini cupcakes, pick a valid box size, then build the flavour mix with quantity controls."
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_272px]">
        <div className="space-y-8">
          <section className="rounded-[1.75rem] border border-[#f6d9d0] bg-[#fff7f4] p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ec4f9f]">
                  Start here
                </p>
                <h3 className="text-2xl font-semibold text-[#42211b]">Choose your box</h3>
                <p className="max-w-2xl text-sm leading-6 text-stone-600">
                  Pick regular or mini cupcakes first, then choose one of the valid gift-box
                  sizes for that range.
                </p>
              </div>
              <Button variant="ghost" onClick={onClearBox}>
                Reset box
              </Button>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
              <div className="rounded-[1.5rem] border border-[#f6d9d0] bg-white p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
                  Product type
                </p>
                <div className="mt-4 space-y-3">
                  {(['regular', 'mini'] as const).map((typeOption) => {
                    const isActive = boxType === typeOption

                    return (
                      <button
                        key={typeOption}
                        type="button"
                        onClick={() => onSelectBoxType(typeOption)}
                        className={[
                          'w-full rounded-[1.25rem] border px-4 py-3 text-left transition',
                          isActive
                            ? 'border-[#00b3ad] bg-[#e7faf8]'
                            : 'border-stone-200 bg-stone-50 hover:border-stone-300 hover:bg-white',
                        ].join(' ')}
                      >
                        <p className="text-base font-semibold text-[#42211b]">
                          {typeOption === 'regular' ? 'Regular cupcakes' : 'Mini cupcakes'}
                        </p>
                        <p className="mt-1 text-sm text-stone-600">
                          {typeOption === 'regular'
                            ? 'Available in 6 or 12'
                            : 'Available in 15 or 30'}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {boxSizeOptions.map((sizeOption) => {
                  const isActive = boxSize === sizeOption

                  return (
                    <button
                      key={sizeOption}
                      type="button"
                      onClick={() => onSelectBoxSize(sizeOption)}
                      className={[
                        'rounded-[1.5rem] border p-5 text-left transition',
                        isActive
                          ? 'border-[#ec4f9f] bg-[#fff0f7] shadow-sm'
                          : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-[#fffaf7]',
                      ].join(' ')}
                    >
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
                        Gift box
                      </p>
                      <h4 className="mt-2 text-2xl font-semibold text-[#42211b]">
                        {sizeOption} cupcakes
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-stone-600">
                        {boxType === 'regular'
                          ? sizeOption === 6
                            ? 'Compact gifting size for smaller orders.'
                            : 'Full-size gifting box for larger moments.'
                          : sizeOption === 15
                            ? 'Smaller mini assortment with more variety.'
                            : 'Large mini box for events and sharing.'}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ec4f9f]">
                  Step 2
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-[#42211b]">
                  Choose your cupcakes
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Add flavours directly from the product cards. Each card shows price,
                  dietary tags when available, and quantity controls.
                </p>
              </div>
            </div>

            <BuildABoxGrid
              cupcakes={cupcakes}
              selections={selections}
              remainingCount={remainingCount}
              onDecrement={onDecrementCupcake}
              onIncrement={onIncrementCupcake}
            />
          </section>
        </div>

        <BoxSummary
          activeBoxSize={boxSize}
          isBoxComplete={isBoxComplete}
          onAddToCart={onAddToCart}
          onClear={onClearBox}
          remainingCount={remainingCount}
          selectedCount={selectedCount}
          subtotalCents={subtotalCents}
        />
      </div>
    </PageSection>
  )
}
