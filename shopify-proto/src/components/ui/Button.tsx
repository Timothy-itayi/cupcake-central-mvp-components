import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: ButtonVariant
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'action-button--primary',
  secondary: 'action-button--secondary',
  ghost: 'action-button--ghost',
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
      'action-button',
      variantClasses[variant],
      fullWidth ? 'w-full' : '',
      className,
    ].join(' ')}
    {...props}
  >
    {children}
  </button>
)
