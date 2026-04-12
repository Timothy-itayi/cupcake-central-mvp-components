import type { ReactNode } from 'react'

type DrawerProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export const Drawer = ({ isOpen, onClose, title, children }: DrawerProps) => (
  <div
    className={[
      'fixed inset-0 z-50 transition',
      isOpen ? 'pointer-events-auto' : 'pointer-events-none',
    ].join(' ')}
    aria-hidden={!isOpen}
  >
    <button
      type="button"
      aria-label="Close cart drawer overlay"
      className={[
        'drawer-overlay absolute inset-0 transition-opacity',
        isOpen ? 'opacity-100' : 'opacity-0',
      ].join(' ')}
      onClick={onClose}
    />

    <aside
      className={[
        'drawer-shell absolute right-0 top-0 flex h-full w-full max-w-md flex-col transition-transform duration-300',
        isOpen ? 'translate-x-0' : 'translate-x-full',
      ].join(' ')}
      aria-label={title}
    >
      {children}
    </aside>
  </div>
)
