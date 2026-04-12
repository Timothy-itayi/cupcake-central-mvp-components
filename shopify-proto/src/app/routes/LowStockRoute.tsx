import { products } from '../../data/products'
import { LowStockView } from '../../features/low-stock/LowStockView'
import { usePexelsImages } from '../../hooks/usePexelsImages'
import { useAppShellContext } from '../useAppShellContext'

export const LowStockRoute = () => {
  const { addProductToCart } = useAppShellContext()
  const { imageMap, isLoading } = usePexelsImages(products)

  return (
    <LowStockView
      imageMap={imageMap}
      isImageLoading={isLoading}
      onAddAlternative={addProductToCart}
      products={products}
    />
  )
}
