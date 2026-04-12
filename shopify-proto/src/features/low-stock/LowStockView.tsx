import { useMemo, useState } from 'react'

import { PageSection } from '../../components/layout/PageSection'
import { ProductGrid } from './ProductGrid'
import { isLowStockProduct } from './stock.helpers'
import type { Product } from '../../types/product'

type LowStockViewProps = {
  products: Product[]
  imageMap: Record<string, { alt: string; src: string }>
  isImageLoading: boolean
  onAddAlternative: (product: Product) => void
}

export const LowStockView = ({
  products,
  imageMap,
  isImageLoading,
  onAddAlternative,
}: LowStockViewProps) => {
  const [showLowStockOnly, setShowLowStockOnly] = useState(false)

  const lowStockCount = useMemo(
    () => products.filter((product) => isLowStockProduct(product)).length,
    [products],
  )

  const visibleProducts = useMemo(
    () =>
      showLowStockOnly
        ? products.filter((product) => isLowStockProduct(product))
        : products,
    [products, showLowStockOnly],
  )

  return (
    <PageSection
      eyebrow="Low Stock"
      title="Fresh picks from today&apos;s bake."
      description="A few favourites are nearly gone today. Shop the last available boxes now, and if something sells out we&apos;ll point you to the closest in-stock alternative."
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div className="soft-panel soft-panel--dashed p-5">
          <h3 className="text-lg font-semibold text-[var(--ink)]">Freshly baked, nearly gone</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6">
            Some favourites from today&apos;s range are down to the last few boxes. If your first
            pick has already sold out, we&apos;ll suggest the nearest available option so you can keep
            your order moving.
          </p>
        </div>

        <button
          type="button"
          aria-pressed={showLowStockOnly}
          onClick={() => setShowLowStockOnly((current) => !current)}
          className={[
            'option-card min-w-[220px] p-4',
            showLowStockOnly ? 'option-card--active-mint' : '',
          ].join(' ')}
        >
          <p className="mini-meta">Filter</p>
          <p className="mt-2 text-base font-semibold text-[var(--ink)]">Show low stock only</p>
          <p className="mt-1 text-sm leading-6">
            {lowStockCount} item{lowStockCount === 1 ? '' : 's'} currently need urgency or a
            fallback.
          </p>
        </button>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm">
          Showing {visibleProducts.length} of {products.length} products.
        </p>
      </div>

      <ProductGrid
        catalogProducts={products}
        imageMap={imageMap}
        isImageLoading={isImageLoading}
        onAddAlternative={onAddAlternative}
        products={visibleProducts}
      />
    </PageSection>
  )
}
