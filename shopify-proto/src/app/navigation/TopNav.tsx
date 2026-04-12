import reactLogo from '../../assets/react.svg'
import { NavLink } from 'react-router-dom'

const viewOptions = [
  { path: '/build-a-box', label: 'Build-a-Box' },
  { path: '/cart-lab', label: 'Cart Lab' },
  { path: '/low-stock', label: 'Low Stock' },
]

type TopNavProps = {
  cartItemCount: number
  onOpenCart: () => void
}

export const TopNav = ({ cartItemCount, onOpenCart }: TopNavProps) => (
  <header className="sticky top-0 z-40 border-b border-[#9ce2df] bg-[#00b3ad]/95 backdrop-blur">
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/75">
          Cupcake Central MVP
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
          Three bakery commerce flows built to improve Shopify skills.
        </h1>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <nav className="flex flex-wrap gap-2" aria-label="Component views">
          {viewOptions.map((view) => (
            <NavLink
              key={view.path}
              to={view.path}
              className={({ isActive }) =>
                [
                  'rounded-full px-4 py-2 text-sm font-semibold transition',
                  isActive
                    ? 'bg-white text-[#006f6a]'
                    : 'bg-white/20 text-white hover:bg-white/30',
                ].join(' ')
              }
            >
              {view.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={onOpenCart}
          className="ml-auto inline-flex items-center justify-center gap-3 rounded-full border border-white/50 bg-white px-4 py-2 text-sm font-semibold text-[#006f6a] transition hover:bg-[#fff7f4]"
        >
          <img src={reactLogo} alt="" className="h-5 w-5" />
          <span className="inline-flex min-w-7 items-center justify-center rounded-full bg-[#ec4f9f] px-2 py-1 text-xs font-bold text-white">
            {cartItemCount}
          </span>
        </button>
      </div>
    </div>
  </header>
)
