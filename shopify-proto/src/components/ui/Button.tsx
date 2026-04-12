import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: ButtonVariant
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-rose-500 text-white shadow-sm hover:bg-rose-600 focus-visible:outline-rose-500',
  secondary:
    'bg-stone-900 text-white shadow-sm hover:bg-stone-800 focus-visible:outline-stone-900',
  ghost:
    'bg-white text-stone-700 ring-1 ring-stone-200 hover:bg-stone-50 focus-visible:outline-stone-400',
}

export const Button = ({
  children,
  className = '',
  variant = 'primary',
  fullWidth = false,
  ...props
}: ButtonProps) => (
  <button
    className={[
      'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition',
      'focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-45',
      variantClasses[variant],
      fullWidth ? 'w-full' : '',
      className,
    ].join(' ')}
    {...props}
  >
    {children}
  </button>
)
