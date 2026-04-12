import { PageSection } from '../../components/layout/PageSection'
import { ProductGrid } from './ProductGrid'
import type { Product } from '../../types/product'

type LowStockViewProps = {
  products: Product[]
  imageMap: Record<string, { alt: string; src: string }>
  isImageLoading: boolean
}

export const LowStockView = ({
  products,
  imageMap,
  isImageLoading,
}: LowStockViewProps) => (
  <PageSection
    eyebrow="Low Stock"
    title="Use urgency sparingly or it just becomes wallpaper."
    description="The badge only appears when stock is low enough to matter. If inventory is zero, the message switches to sold out instead of pretending scarcity and availability are interchangeable."
  >
    <div className="soft-panel soft-panel--dashed p-5 text-sm leading-6">
      Pseudo-code: if stock is between 1 and 3, show an urgency badge. If stock is 0,
      show sold out. Otherwise show nothing and avoid visual spam.
    </div>

    <ProductGrid
      imageMap={imageMap}
      isImageLoading={isImageLoading}
      products={products}
    />
  </PageSection>
)
