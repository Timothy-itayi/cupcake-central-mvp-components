import { PageSection } from '../../components/layout/PageSection'
import { Button } from '../../components/ui/Button'
import { ProductImage } from '../../components/ui/ProductImage'
import { formatCurrency } from '../../utils/currency'
import { isLowStockLevel } from '../../utils/inventory'
import type { CartUpsellRecommendation } from './cart.helpers'
import type { Product } from '../../types/product'

type CartLabViewProps = {
  subtotalCents: number
  deliveryThresholdCents: number
  amountUntilFreeDelivery: number
  hasFreeDelivery: boolean
  recommendedUpsell: CartUpsellRecommendation | null
  cartQuantityByProductId: Record<string, number>
  products: Product[]
  imageMap: Record<string, { alt: string; src: string }>
  isImageLoading: boolean
  onAddProduct: (product: Product) => void
  onOpenCart: () => void
}

export const CartLabView = ({
  subtotalCents,
  deliveryThresholdCents,
  amountUntilFreeDelivery,
  hasFreeDelivery,
  recommendedUpsell,
  cartQuantityByProductId,
  products,
  imageMap,
  isImageLoading,
  onAddProduct,
  onOpenCart,
}: CartLabViewProps) => (
  <PageSection
    eyebrow="Cart And Upsell"
    title="Add bakery favourites to one basket."
    description="Choose cakes and gift boxes, keep everything together in your basket, and see how close you are to free delivery before you check out."
  >
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
      <div className="soft-panel soft-panel--dashed flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-[var(--ink)]">Open your basket at any point</h3>
          <p className="max-w-2xl text-sm leading-6">
            Your items stay in the same basket while you browse, so you can update quantities,
            review delivery, and head to checkout whenever you are ready.
          </p>
        </div>
        <Button onClick={onOpenCart} variant="secondary">
          View basket
        </Button>
      </div>

      <div className="soft-panel p-5">
        <p className="mini-meta">Delivery</p>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-[var(--ink)]">
              Free delivery at {formatCurrency(deliveryThresholdCents)}
            </h3>
            <p className="mt-2 text-sm leading-6">
              {hasFreeDelivery
                ? 'This basket has already crossed the free-delivery threshold.'
                : `${formatCurrency(amountUntilFreeDelivery)} away from free delivery.`}
            </p>
          </div>
          <span className="pill-label">{formatCurrency(subtotalCents)}</span>
        </div>
        <div className="progress-track mt-4">
          <div
            className="progress-fill"
            style={{
              width: `${Math.min((subtotalCents / deliveryThresholdCents) * 100, 100)}%`,
            }}
          />
        </div>
        <p className="mt-4 text-sm leading-6">
          {recommendedUpsell
            ? `${recommendedUpsell.product.name} is available for this order. ${recommendedUpsell.description}`
            : 'Your basket already has the finishing touches it needs.'}
        </p>
      </div>
    </div>

    <div className="grid gap-4 lg:grid-cols-3">
      {products.map((product) => {
        const resolvedImageUrl = product.localImagePath ?? imageMap[product.id]?.src
        const resolvedImageAlt = imageMap[product.id]?.alt ?? product.name
        const quantityInCart = cartQuantityByProductId[product.id] ?? 0
        const remainingStock = Math.max(product.stockLevel - quantityInCart, 0)
        const isSoldOut = remainingStock === 0
        const isLowStock = isLowStockLevel(remainingStock)
        const buttonLabel = isSoldOut
          ? 'Sold out'
          : isLowStock
            ? 'Add to basket - Almost gone'
            : 'Add to basket'

        return (
          <article key={product.id} className="product-card p-4">
            <ProductImage
              title={product.name}
              imageAlt={resolvedImageAlt}
              imageEmoji={product.imageEmoji}
              imageGradient={product.imageGradient}
              imageUrl={resolvedImageUrl}
              isLoading={isImageLoading && !resolvedImageUrl}
            />
            <div className="product-card__body px-0 pb-0">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="product-card__name">{product.name}</h3>
                  <span className="product-card__price">{formatCurrency(product.priceCents)}</span>
                </div>
                <p className="product-card__description">{product.description}</p>
                {isSoldOut ? (
                  <p className="mt-3 text-sm font-semibold text-[var(--ink-soft)]">
                    All available stock is already in your basket.
                  </p>
                ) : isLowStock ? (
                  <p className="mt-3 text-sm font-semibold text-[var(--blush-500)]">
                    Only {remainingStock} left for today.
                  </p>
                ) : null}
              </div>

              <Button
                fullWidth
                className="mt-auto"
                disabled={isSoldOut}
                onClick={() => onAddProduct(product)}
              >
                {buttonLabel}
              </Button>
            </div>
          </article>
        )
      })}
    </div>
  </PageSection>
)
