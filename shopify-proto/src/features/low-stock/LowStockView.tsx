import { PageSection } from '../../components/layout/PageSection'
import { ProductGrid } from './ProductGrid'
import type { Product } from '../../types/product'

type LowStockViewProps = {
  products: Product[]
}

export const LowStockView = ({ products }: LowStockViewProps) => (
  <PageSection
    eyebrow="Component Three"
    title="Low-stock urgency indicator"
    description="The badge only appears when stock is low enough to matter. If inventory is zero, the messaging switches to sold out instead of pretending scarcity and availability are the same thing."
  >
    <div className="rounded-[1.5rem] border border-dashed border-stone-300 bg-stone-50 p-5 text-sm leading-6 text-stone-600">
      Pseudo-code: if stock is between 1 and 3, show an urgency badge. If stock is 0,
      show sold out. Otherwise show nothing and avoid visual spam.
    </div>

    <ProductGrid products={products} />
  </PageSection>
)
