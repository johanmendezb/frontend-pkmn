import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', isLoading = false, children, className = '', disabled, type = 'button', ...props }, ref) => {
    const baseClasses = 'rounded-full bg-white text-primary border-2 border-primary px-4 py-2 text-body-1 font-bold transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed'
    
    return (
      <button
        ref={ref}
        type={type}
        className={`${baseClasses} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? 'Loading...' : children}
      </button>
    )
  }
)

Button.displayName = 'Button'
