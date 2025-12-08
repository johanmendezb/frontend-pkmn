import { SVGProps, ReactNode } from 'react'

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height' | 'viewBox'> {
  size?: number | string
  color?: string
  viewBox?: string
}

interface IconComponentProps extends IconProps {
  children: ReactNode
}

export const Icon = ({
  size = 16,
  color = 'currentColor',
  viewBox = '0 0 16 16',
  children,
  ...props
}: IconComponentProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  )
}
