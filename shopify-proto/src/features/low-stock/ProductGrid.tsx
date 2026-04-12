import { ProductCard } from './ProductCard'
import type { Product } from '../../types/product'

type ProductGridProps = {
  products: Product[]
  imageMap: Record<string, { alt: string; src: string }>
  isImageLoading: boolean
}

export const ProductGrid = ({
  products,
  imageMap,
  isImageLoading,
}: ProductGridProps) => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {products.map((product) => (
      <ProductCard
        key={product.id}
        imageAlt={imageMap[product.id]?.alt}
        imageUrl={imageMap[product.id]?.src}
        isImageLoading={isImageLoading}
        product={product}
      />
    ))}
  </div>
)
