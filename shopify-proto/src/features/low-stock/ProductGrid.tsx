import { ProductCard } from './ProductCard'
import { getAlternativeProduct } from './stock.helpers'
import type { Product } from '../../types/product'

type ProductGridProps = {
  products: Product[]
  catalogProducts: Product[]
  imageMap: Record<string, { alt: string; src: string }>
  isImageLoading: boolean
  onAddAlternative: (product: Product) => void
}

export const ProductGrid = ({
  products,
  catalogProducts,
  imageMap,
  isImageLoading,
  onAddAlternative,
}: ProductGridProps) => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {products.map((product) => (
      <ProductCard
        alternativeProduct={getAlternativeProduct(catalogProducts, product)}
        key={product.id}
        imageAlt={imageMap[product.id]?.alt}
        imageUrl={imageMap[product.id]?.src}
        isImageLoading={isImageLoading}
        onAddAlternative={onAddAlternative}
        product={product}
      />
    ))}
  </div>
)
