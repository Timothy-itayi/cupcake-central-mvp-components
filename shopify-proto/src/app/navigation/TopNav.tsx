import { NavLink } from 'react-router-dom'
import { Search, Phone, User, ShoppingBag } from 'lucide-react'

const logoSrc = '/logo/ccc_logo_24.avif'

const navLinks = [
  { path: '/build-a-box', label: 'BUILD A BOX' },
  { path: '/cart-lab', label: 'CART UP SELL' },
  { path: '/low-stock', label: 'LOW STOCK' },
]

type TopNavProps = {
  cartItemCount: number
  onOpenCart: () => void
}

export const TopNav = ({ cartItemCount, onOpenCart }: TopNavProps) => (
  <header className="bg-white sticky top-0 z-40 shadow-sm">
    {/* Top promotion bar */}
    <div className="bg-[#4a9a84] text-white text-center py-2 text-[0.7rem] font-extrabold tracking-widest uppercase">
      $5 DELIVERY ON ORDERS OVER $45
    </div>
    
    {/* Main header area */}
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
      <div className="flex-shrink-0">
        <NavLink to="/">
          <img src={logoSrc} alt="Cupcake Central" className="h-12 w-auto object-contain" />
        </NavLink>
      </div>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative hidden lg:block">
          <input 
            type="text" 
            placeholder="Search our range" 
            className="border border-gray-300 pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:border-[#4a9a84] placeholder-gray-500 font-medium"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        </div>

        {/* Phone */}
        <a href="tel:0390774542" className="hidden md:flex items-center gap-2 bg-[#4a9a84] text-white px-5 py-2 text-sm font-bold hover:bg-[#3d806d] transition-colors">
          <Phone className="w-4 h-4" />
          (03) 9077 4542
        </a>

        {/* User */}
        <button className="text-gray-700 hover:text-[#4a9a84] transition-colors">
          <User className="w-6 h-6" />
        </button>

        {/* Cart */}
        <button 
          onClick={onOpenCart} 
          className="relative text-gray-700 hover:text-[#4a9a84] transition-colors flex items-center"
        >
          <ShoppingBag className="w-6 h-6" />
          {cartItemCount > 0 && (
            <span className="absolute -bottom-1 -right-2 bg-[#4a9a84] text-white text-[0.65rem] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </div>

    {/* Navigation Links */}
    <nav className="border-t border-gray-100 hidden md:block">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <ul className="flex items-center justify-between py-4">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink 
                to={link.path} 
                className={({ isActive }) => 
                  `text-[0.75rem] font-extrabold tracking-widest hover:text-[#d96a97] transition-colors ${
                    isActive ? 'text-[#d96a97]' : 'text-gray-900'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  </header>
)
