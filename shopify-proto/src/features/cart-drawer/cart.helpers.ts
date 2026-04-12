import { giftBoxRibbon, giftNote } from '../../data/addOns'
import type { CartLine } from '../../types/cart'
import type { Product } from '../../types/product'
import { isLowStockLevel } from '../../utils/inventory'

export type CartUpsellRecommendation = {
  product: Product
  description: string
}

export const FREE_DELIVERY_THRESHOLD_CENTS = 5000

export const getCartItemCount = (lines: CartLine[]) =>
  lines.reduce((count, line) => count + line.quantity, 0)

export const getCartSubtotal = (lines: CartLine[]) =>
  lines.reduce((total, line) => total + line.unitPriceCents * line.quantity, 0)

export const hasProductInCart = (lines: CartLine[], productId: string) =>
  lines.some((line) => line.productId === productId)

export const getAmountUntilFreeDelivery = (subtotalCents: number) =>
  Math.max(FREE_DELIVERY_THRESHOLD_CENTS - subtotalCents, 0)

export const getRecommendedUpsell = (
  lines: CartLine[],
): CartUpsellRecommendation | null => {
  const hasMerchandise = lines.some((line) => line.category !== 'add-on')

  if (!hasMerchandise) {
    return null
  }

  const hasGiftBox = lines.some((line) => line.category === 'gift-box')
  const hasCake = lines.some((line) => line.category === 'cake')

  if (hasGiftBox && !hasProductInCart(lines, giftBoxRibbon.id)) {
    return {
      product: giftBoxRibbon,
      description: 'Finish the box with a ribbon so it arrives ready to hand over.',
    }
  }

  if (hasCake && !hasProductInCart(lines, giftNote.id)) {
    return {
      product: giftNote,
      description: 'Add a handwritten note so the cake lands as a gift, not just a delivery.',
    }
  }

  return null
}

export const getCartLineStockMessage = (line: CartLine) => {
  if (line.stockLevel === undefined) {
    return null
  }

  if (line.stockLevel === 0) {
    return {
      tone: 'sold-out' as const,
      message: 'This item has sold out since it was added. Please remove it to continue.',
    }
  }

  if (!isLowStockLevel(line.stockLevel)) {
    return null
  }

  return {
    tone: 'urgent' as const,
    message:
      line.quantity >= line.stockLevel
        ? `You have added the last ${line.stockLevel} available for today.`
        : `Low stock - only ${line.stockLevel} left in today's bake.`,
  }
}

export const createCartLine = (
  product: Product,
  source: CartLine['source'] = 'catalog',
): CartLine => ({
  id: product.id,
  productId: product.id,
  name: product.name,
  category: product.category,
  stockLevel: product.stockLevel,
  unitPriceCents: product.priceCents,
  quantity: 1,
  source,
  imageUrl: product.localImagePath,
  imageAlt: product.name,
})
