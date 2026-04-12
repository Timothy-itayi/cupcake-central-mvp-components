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
      eyebrow="Build Your Own Box"
      title="Choose your flavours and fill the box properly."
      description="Borrow the warm bakery tone, keep the rules honest, and make the selection feel immediate: choose regular or mini cupcakes, lock the right box size, then build the flavour mix with live progress."
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_272px]">
        <div className="space-y-8">
          <section className="soft-panel soft-panel--blush p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-2">
                <p className="section-eyebrow">Start Here</p>
                <h3 className="text-2xl font-semibold text-[var(--ink)] sm:text-[2rem]">
                  Build around the real box rules, not wishful thinking.
                </h3>
                <p className="max-w-2xl text-sm leading-7 sm:text-base">
                  Regular cupcakes belong in 6 or 12 packs. Mini cupcakes belong in 15 or 30
                  packs. Pick the format first so every flavour choice updates against the right
                  tray.
                </p>
              </div>
              <Button variant="ghost" onClick={onClearBox}>
                Reset box
              </Button>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
              <div className="soft-panel p-4">
                <p className="mini-meta">Product Type</p>
                <div className="mt-4 space-y-3">
                  {(['regular', 'mini'] as const).map((typeOption) => {
                    const isActive = boxType === typeOption

                    return (
                      <button
                        key={typeOption}
                        type="button"
                        onClick={() => onSelectBoxType(typeOption)}
                        className={[
                          'option-card',
                          isActive ? 'option-card--active-mint' : '',
                        ].join(' ')}
                      >
                        <p className="text-base font-semibold text-[var(--ink)]">
                          {typeOption === 'regular' ? 'Regular cupcakes' : 'Mini cupcakes'}
                        </p>
                        <p className="mt-1 text-sm">
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
                        'option-card min-h-full p-5',
                        isActive ? 'option-card--active-blush' : '',
                      ].join(' ')}
                    >
                      <p className="mini-meta">Gift Box</p>
                      <h4 className="mt-2 text-2xl font-semibold text-[var(--ink)]">
                        {sizeOption} cupcakes
                      </h4>
                      <p className="mt-2 text-sm leading-6">
                        {boxType === 'regular'
                          ? sizeOption === 6
                            ? 'Compact gifting box for a smaller order.'
                            : 'Full-size gift box for bigger occasions.'
                          : sizeOption === 15
                            ? 'Small mini tray with room for variety.'
                            : 'Larger mini tray built for sharing.'}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="soft-panel soft-panel--mint mt-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mini-meta">Selection Rules</p>
                <p className="mt-2 text-sm sm:text-base">
                  No mixing mini and regular in the same box. The preview on the right tracks
                  the exact tray you are filling.
                </p>
              </div>
              <span className="pill-label">{boxType === 'mini' ? 'Mini range' : 'Regular range'}</span>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-eyebrow">Choose Your Flavours</p>
                <h3 className="mt-2 text-2xl font-semibold text-[var(--ink)] sm:text-[2rem]">
                  Fill the tray one flavour at a time.
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-7 sm:text-base">
                  Keep the interaction simple: hover the image for movement, use the quantity
                  controls for the mix, and let the summary tell the customer exactly how close
                  the box is to complete.
                </p>
              </div>
              <span className="pill-label">
                {boxSize
                  ? `${selectedCount} of ${boxSize} selected`
                  : 'Pick a box size first'}
              </span>
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
    </PageSection>
  )
}
