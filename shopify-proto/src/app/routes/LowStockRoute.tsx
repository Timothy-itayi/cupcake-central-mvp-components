import { products } from '../../data/products'
import { LowStockView } from '../../features/low-stock/LowStockView'
import { usePexelsImages } from '../../hooks/usePexelsImages'

export const LowStockRoute = () => {
  const { imageMap, isLoading } = usePexelsImages(products)

  return (
    <LowStockView
      imageMap={imageMap}
      isImageLoading={isLoading}
      products={products}
    />
  )
}
