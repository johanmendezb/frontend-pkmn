'use client'

import { useRouter } from 'next/navigation'
import { logout } from '@/features/auth/services/authApi'
import { Button } from './Button'

interface LayoutProps {
  children: React.ReactNode
  showLogout?: boolean
}

export function Layout({ children, showLogout = true }: LayoutProps) {
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div>
      {showLogout && (
        <header>
          <h1>Pokemon Browser</h1>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </header>
      )}
      <main>{children}</main>
    </div>
  )
}
