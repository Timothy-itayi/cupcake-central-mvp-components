import type { CartLine } from '../../types/cart'
import type { BuildABoxSelection, BuildABoxSize } from '../../types/buildABox'
import type { CupcakeBoxType, Product } from '../../types/product'

export const BOX_SIZE_OPTIONS_BY_TYPE: Record<CupcakeBoxType, BuildABoxSize[]> = {
  regular: [6, 12],
  mini: [15, 30],
}

export const getSelectedCount = (selections: BuildABoxSelection[]) =>
  selections.reduce((total, selection) => total + selection.quantity, 0)

export const getRemainingCount = (
  boxSize: BuildABoxSize | null,
  selections: BuildABoxSelection[],
) => {
  if (!boxSize) {
    return 0
  }

  return Math.max(boxSize - getSelectedCount(selections), 0)
}

export const isBuildABoxComplete = (
  boxSize: BuildABoxSize | null,
  selections: BuildABoxSelection[],
) => Boolean(boxSize) && getSelectedCount(selections) === boxSize

export const getBuildABoxSubtotal = (
  cupcakes: Product[],
  selections: BuildABoxSelection[],
) =>
  selections.reduce((total, selection) => {
    const match = cupcakes.find((cupcake) => cupcake.id === selection.productId)

    return total + (match?.priceCents ?? 0) * selection.quantity
  }, 0)

export const createBuildABoxLine = (
  cupcakes: Product[],
  boxType: CupcakeBoxType,
  boxSize: BuildABoxSize,
  selections: BuildABoxSelection[],
): CartLine => ({
  id: `build-a-box-${boxType}-${boxSize}`,
  productId: `build-a-box-${boxType}-${boxSize}`,
  name: `${boxType === 'mini' ? 'Mini' : 'Regular'} Build-a-Box ${boxSize} Pack`,
  unitPriceCents: getBuildABoxSubtotal(cupcakes, selections),
  quantity: 1,
  source: 'build-a-box',
})
