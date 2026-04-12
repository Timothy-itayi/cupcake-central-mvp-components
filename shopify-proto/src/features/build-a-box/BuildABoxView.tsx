import { PageSection } from '../../components/layout/PageSection'
import { getBuildABoxSubtotal } from './buildABox.helpers'
import { BoxSlots } from './BoxSlots'
import { BoxSummary } from './BoxSummary'
import { BuildABoxGrid } from './BuildABoxGrid'
import type { Product } from '../../types/product'

type BuildABoxViewProps = {
  cupcakes: Product[]
  selectedProductIds: string[]
  boxSize: number
  isBoxFull: boolean
  imageMap: Record<string, { alt: string; src: string }>
  isImageLoading: boolean
  onAddCupcake: (productId: string) => void
  onRemoveCupcake: (index: number) => void
  onClearBox: () => void
  onAddToCart: () => void
}

export const BuildABoxView = ({
  cupcakes,
  selectedProductIds,
  boxSize,
  isBoxFull,
  imageMap,
  isImageLoading,
  onAddCupcake,
  onRemoveCupcake,
  onClearBox,
  onAddToCart,
}: BuildABoxViewProps) => {
  const subtotalCents = getBuildABoxSubtotal(cupcakes, selectedProductIds)

  return (
    <PageSection
      eyebrow="Component One"
      title="Build-a-Box selector"
      description="Simple state flow: click a flavour, fill the box, remove any slot if needed, and keep a running subtotal visible the whole time."
    >
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-stone-900">
              Pseudo-code: if slots &lt; 12, add cupcake id to the array. If the array is full,
              disable the add buttons.
            </p>
            <BoxSlots
              boxSize={boxSize}
              cupcakes={cupcakes}
              selectedProductIds={selectedProductIds}
              onRemove={onRemoveCupcake}
            />
          </div>

          <BuildABoxGrid
            cupcakes={cupcakes}
            imageMap={imageMap}
            isBoxFull={isBoxFull}
            isImageLoading={isImageLoading}
            onAdd={onAddCupcake}
          />
        </div>

        <BoxSummary
          boxSize={boxSize}
          isBoxFull={isBoxFull}
          onAddToCart={onAddToCart}
          onClear={onClearBox}
          selectedCount={selectedProductIds.length}
          subtotalCents={subtotalCents}
        />
      </div>
    </PageSection>
  )
}
