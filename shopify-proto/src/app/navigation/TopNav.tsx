import type { AppView } from '../../types/app'

const viewOptions: Array<{ id: AppView; label: string }> = [
  { id: 'build-a-box', label: 'Build-a-Box' },
  { id: 'cart-drawer', label: 'Cart Drawer' },
  { id: 'low-stock', label: 'Low Stock' },
]

type TopNavProps = {
  activeView: AppView
  cartItemCount: number
  onViewChange: (view: AppView) => void
  onOpenCart: () => void
}

export const TopNav = ({
  activeView,
  cartItemCount,
  onViewChange,
  onOpenCart,
}: TopNavProps) => (
  <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur">
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-500">
          Cupcake Central MVP
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-stone-950">
          React commerce components with sane state
        </h1>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <nav className="flex flex-wrap gap-2" aria-label="Component views">
          {viewOptions.map((view) => {
            const isActive = view.id === activeView

            return (
              <button
                key={view.id}
                type="button"
                onClick={() => onViewChange(view.id)}
                className={[
                  'rounded-full px-4 py-2 text-sm font-semibold transition',
                  isActive
                    ? 'bg-stone-950 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200',
                ].join(' ')}
              >
                {view.label}
              </button>
            )
          })}
        </nav>

        <button
          type="button"
          onClick={onOpenCart}
          className="inline-flex items-center justify-center gap-3 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-900 transition hover:border-stone-300 hover:bg-stone-50"
        >
          <span>Cart</span>
          <span className="inline-flex min-w-7 items-center justify-center rounded-full bg-rose-500 px-2 py-1 text-xs font-bold text-white">
            {cartItemCount}
          </span>
        </button>
      </div>
    </div>
  </header>
)
