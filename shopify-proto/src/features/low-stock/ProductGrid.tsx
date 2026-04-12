import { ProductCard } from './ProductCard'
import type { Product } from '../../types/product'

type ProductGridProps = {
  products: Product[]
}

export const ProductGrid = ({ products }: ProductGridProps) => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
)
