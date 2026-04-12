import { PageSection } from '../../components/layout/PageSection'
import { Button } from '../../components/ui/Button'
import { formatCurrency } from '../../utils/currency'
import type { Product } from '../../types/product'

type CartLabViewProps = {
  products: Product[]
  onAddProduct: (product: Product) => void
  onOpenCart: () => void
}

export const CartLabView = ({
  products,
  onAddProduct,
  onOpenCart,
}: CartLabViewProps) => (
  <PageSection
    eyebrow="Component Two"
    title="Cart drawer and upsell logic"
    description="This view exists to seed the cart quickly during the demo. The drawer itself stays global, which is how a real storefront would behave."
  >
    <div className="flex flex-col gap-4 rounded-[1.5rem] border border-dashed border-stone-300 bg-stone-50 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-stone-950">Open the global cart drawer</h3>
        <p className="max-w-2xl text-sm leading-6 text-stone-600">
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
        <article
          key={product.id}
          className="flex flex-col rounded-[1.5rem] border border-stone-200 bg-white p-4 shadow-sm"
        >
          <div
            className="flex min-h-28 items-center justify-center rounded-[1.25rem] text-5xl"
            style={{ background: product.imageGradient }}
          >
            {product.imageEmoji}
          </div>
          <div className="mt-4 flex flex-1 flex-col gap-3">
            <div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-stone-900">{product.name}</h3>
                <span className="text-sm font-semibold text-stone-500">
                  {formatCurrency(product.priceCents)}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-stone-600">{product.description}</p>
            </div>

            <Button fullWidth onClick={() => onAddProduct(product)}>
              Add to cart
            </Button>
          </div>
        </article>
      ))}
    </div>
  </PageSection>
)
