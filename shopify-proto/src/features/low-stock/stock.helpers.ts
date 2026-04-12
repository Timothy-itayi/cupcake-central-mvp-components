import type { Product } from '../../types/product'
import { LOW_STOCK_THRESHOLD, isLowStockLevel } from '../../utils/inventory'

const getInventoryLabel = (product: Product, count: number) => {
  if (product.category === 'cake') {
    return count === 1 ? 'cake' : 'cakes'
  }

  return count === 1 ? 'box' : 'boxes'
}

export const isLowStockProduct = (product: Product) =>
  product.stockLevel === 0 || isLowStockLevel(product.stockLevel)

export const getStockBadge = (product: Product) => {
  if (product.stockLevel === 0) {
    return {
      label: 'Baked out today',
      tone: 'sold-out' as const,
    }
  }

  if (isLowStockLevel(product.stockLevel)) {
    const inventoryLabel = getInventoryLabel(product, product.stockLevel)

    return {
      label:
        product.stockLevel === 1
          ? `Last ${inventoryLabel} for today`
          : `Only ${product.stockLevel} ${inventoryLabel} left today`,
      tone: 'urgent' as const,
    }
  }

  return null
}

export const getAlternativeProduct = (
  products: Product[],
  currentProduct: Product,
) =>
  products.find(
    (product) =>
      product.id !== currentProduct.id &&
      product.category === currentProduct.category &&
      product.stockLevel > LOW_STOCK_THRESHOLD,
  ) ??
  products.find(
    (product) =>
      product.id !== currentProduct.id &&
      product.category === currentProduct.category &&
      product.stockLevel > 0,
  ) ??
  null
