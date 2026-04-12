import type { CartLine } from '../../types/cart'
import type { Product } from '../../types/product'

export const BOX_SIZE = 12

export const isBoxFull = (selectedProductIds: string[]) =>
  selectedProductIds.length >= BOX_SIZE

export const getBuildABoxSubtotal = (
  cupcakes: Product[],
  selectedProductIds: string[],
) =>
  selectedProductIds.reduce((total, productId) => {
    const match = cupcakes.find((cupcake) => cupcake.id === productId)

    return total + (match?.priceCents ?? 0)
  }, 0)

export const createBuildABoxLine = (
  cupcakes: Product[],
  selectedProductIds: string[],
): CartLine => ({
  id: 'build-a-box-dozen',
  productId: 'build-a-box-dozen',
  name: 'Build-a-Box Dozen',
  unitPriceCents: getBuildABoxSubtotal(cupcakes, selectedProductIds),
  quantity: 1,
  source: 'build-a-box',
})
