import { cupcakes } from '../../data/cupcakes'
import { BuildABoxView } from '../../features/build-a-box/BuildABoxView'
import { usePexelsImages } from '../../hooks/usePexelsImages'
import { useAppShellContext } from '../useAppShellContext'

export const BuildABoxRoute = () => {
  const { state, selectors, addBuildABoxToCart, addCupcakeToBox, clearBox, removeCupcakeFromBox } =
    useAppShellContext()
  const { imageMap, isLoading } = usePexelsImages(cupcakes)

  return (
    <BuildABoxView
      boxSize={state.buildABox.boxSize}
      cupcakes={cupcakes}
      imageMap={imageMap}
      isBoxFull={selectors.isBoxFull}
      isImageLoading={isLoading}
      onAddCupcake={addCupcakeToBox}
      onAddToCart={() => addBuildABoxToCart(cupcakes)}
      onClearBox={clearBox}
      onRemoveCupcake={removeCupcakeFromBox}
      selectedProductIds={state.buildABox.selectedProductIds}
    />
  )
}
