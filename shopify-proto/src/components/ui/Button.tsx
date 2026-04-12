import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: ButtonVariant
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#ec4f9f] text-white shadow-sm hover:bg-[#d93f8e] focus-visible:outline-[#ec4f9f]',
  secondary:
    'bg-[#00b3ad] text-white shadow-sm hover:bg-[#009892] focus-visible:outline-[#00b3ad]',
  ghost:
    'bg-white text-[#6b3d2e] ring-1 ring-[#edd6cb] hover:bg-[#fff7f4] focus-visible:outline-[#00b3ad]',
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
