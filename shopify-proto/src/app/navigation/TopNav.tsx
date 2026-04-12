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
  <header className="topbar">
    <div className="topbar__inner">
      <div className="min-w-0">
        <p className="topbar__eyebrow">Bakery Commerce Exercise</p>
        <h1 className="topbar__title">
          Cupcake Central-inspired flows for build-a-box, cart upsells, and better stock
          cues.
        </h1>
      </div>

      <nav className="topbar__nav lg:justify-self-center" aria-label="Component views">
        {viewOptions.map((view) => (
          <NavLink
            key={view.path}
            to={view.path}
            className={({ isActive }) =>
              [
                'topbar__link whitespace-nowrap',
                isActive ? 'topbar__link--active' : '',
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
        className="topbar__cart lg:justify-self-end"
      >
        <span>Cart</span>
        <span className="cart-count">{cartItemCount}</span>
      </button>
    </div>
  </header>
)
