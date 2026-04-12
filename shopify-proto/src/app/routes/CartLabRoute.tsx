import { starterCartProducts } from '../../data/products'
import { CartLabView } from '../../features/cart-drawer/CartLabView'
import { usePexelsImages } from '../../hooks/usePexelsImages'
import { useAppShellContext } from '../useAppShellContext'

export const CartLabRoute = () => {
  const { addProductToCart, openCart } = useAppShellContext()
  const { imageMap, isLoading } = usePexelsImages(starterCartProducts)

  return (
    <CartLabView
      imageMap={imageMap}
      isImageLoading={isLoading}
      onAddProduct={addProductToCart}
      onOpenCart={openCart}
      products={starterCartProducts}
    />
  )
}
