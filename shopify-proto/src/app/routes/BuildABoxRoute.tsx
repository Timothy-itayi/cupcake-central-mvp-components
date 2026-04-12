import { miniCupcakes, regularCupcakes } from '../../data/cupcakes'
import { BuildABoxView } from '../../features/build-a-box/BuildABoxView'
import { useAppShellContext } from '../useAppShellContext'

export const BuildABoxRoute = () => {
  const {
    state,
    selectors,
    addBuildABoxToCart,
    clearBox,
    decrementBuildABoxItem,
    incrementBuildABoxItem,
    setBuildABoxType,
    setBuildABoxSize,
  } = useAppShellContext()
  const cupcakes =
    state.buildABox.boxType === 'mini' ? miniCupcakes : regularCupcakes

  return (
    <BuildABoxView
      boxType={state.buildABox.boxType}
      boxSize={state.buildABox.boxSize}
      cupcakes={cupcakes}
      isBoxComplete={selectors.isBoxComplete}
      onDecrementCupcake={decrementBuildABoxItem}
      onIncrementCupcake={incrementBuildABoxItem}
      onAddToCart={() => addBuildABoxToCart(cupcakes)}
      onClearBox={clearBox}
      onSelectBoxType={setBuildABoxType}
      onSelectBoxSize={setBuildABoxSize}
      remainingCount={selectors.remainingCount}
      selectedCount={selectors.selectedCount}
      selections={state.buildABox.selections}
    />
  )
}
