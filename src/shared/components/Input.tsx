import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div>
        {label && (
          <label htmlFor={props.id}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={className}
          {...props}
        />
        {error && (
          <p role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
