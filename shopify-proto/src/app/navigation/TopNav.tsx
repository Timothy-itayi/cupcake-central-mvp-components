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
  <header className="sticky top-0 z-40 border-b border-[#bcebe8] bg-[linear-gradient(90deg,#2db7b1_0%,#31bcb6_45%,#58c9c3_100%)] shadow-[0_10px_30px_rgba(0,130,125,0.18)] backdrop-blur">
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/70">
          Cupcake Central MVP
        </p>
        <h1 className="mt-1 text-[1.9rem] font-semibold tracking-tight text-white">
          Three bakery commerce flows built to improve Shopify skills.
        </h1>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <nav
          className="flex flex-wrap gap-2 rounded-full bg-white/12 p-1.5 backdrop-blur"
          aria-label="Component views"
        >
          {viewOptions.map((view) => (
            <NavLink
              key={view.path}
              to={view.path}
              className={({ isActive }) =>
                [
                  'rounded-full px-4 py-2 text-sm font-semibold transition duration-200',
                  isActive
                    ? 'bg-white text-[#11756f] shadow-sm'
                    : 'bg-transparent text-white hover:bg-white/20',
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
          className="ml-auto inline-flex items-center justify-center gap-3 rounded-full border border-white/55 bg-white px-4 py-2 text-sm font-semibold text-[#11756f] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#fff7f4]"
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
