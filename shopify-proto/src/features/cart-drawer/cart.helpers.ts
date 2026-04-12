import type { CartLine } from '../../types/cart'
import type { Product } from '../../types/product'

export const getCartItemCount = (lines: CartLine[]) =>
  lines.reduce((count, line) => count + line.quantity, 0)

export const getCartSubtotal = (lines: CartLine[]) =>
  lines.reduce((total, line) => total + line.unitPriceCents * line.quantity, 0)

export const hasProductInCart = (lines: CartLine[], productId: string) =>
  lines.some((line) => line.productId === productId)

export const createCartLine = (
  product: Product,
  source: CartLine['source'] = 'catalog',
): CartLine => ({
  id: product.id,
  productId: product.id,
  name: product.name,
  unitPriceCents: product.priceCents,
  quantity: 1,
  source,
})
