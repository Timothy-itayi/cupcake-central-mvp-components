import { PageSection } from '../../components/layout/PageSection'
import { Button } from '../../components/ui/Button'
import { ProductImage } from '../../components/ui/ProductImage'
import { formatCurrency } from '../../utils/currency'
import type { Product } from '../../types/product'

type CartLabViewProps = {
  products: Product[]
  imageMap: Record<string, { alt: string; src: string }>
  isImageLoading: boolean
  onAddProduct: (product: Product) => void
  onOpenCart: () => void
}

export const CartLabView = ({
  products,
  imageMap,
  isImageLoading,
  onAddProduct,
  onOpenCart,
}: CartLabViewProps) => (
  <PageSection
    eyebrow="Cart And Upsell"
    title="Keep the basket global and the nudge tasteful."
    description="This view exists to seed the cart quickly for the exercise, but the drawer remains global so the interaction behaves more like an actual storefront and less like a disconnected demo page."
  >
    <div className="soft-panel soft-panel--dashed flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-[var(--ink)]">Open the global cart drawer</h3>
        <p className="max-w-2xl text-sm leading-6">
          Pseudo-code: customer taps cart, current lines slide in, upsell appears only when
          the add-on is missing.
        </p>
      </div>
      <Button onClick={onOpenCart} variant="secondary">
        Open cart
      </Button>
    </div>

    <div className="grid gap-4 lg:grid-cols-3">
      {products.map((product) => (
        <article key={product.id} className="product-card p-4">
          <ProductImage
            title={product.name}
            imageAlt={imageMap[product.id]?.alt}
            imageEmoji={product.imageEmoji}
            imageGradient={product.imageGradient}
            imageUrl={imageMap[product.id]?.src}
            isLoading={isImageLoading}
          />
          <div className="product-card__body px-0 pb-0">
            <div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="product-card__name">{product.name}</h3>
                <span className="product-card__price">{formatCurrency(product.priceCents)}</span>
              </div>
              <p className="product-card__description">{product.description}</p>
            </div>

            <Button fullWidth className="mt-auto" onClick={() => onAddProduct(product)}>
              Add to cart
            </Button>
          </div>
        </article>
      ))}
    </div>
  </PageSection>
)
