'use client'

import { useRouter } from 'next/navigation'
import { logout } from '@/features/auth/services/authApi'
import { Button } from './Button'
import { SearchBar } from '@/features/pokemon/components/SearchBar'
import { SortControls } from '@/features/pokemon/components/SortControls'

interface LayoutProps {
  children: React.ReactNode
  showLogout?: boolean
  showHeaderControls?: boolean
}

export function Layout({
  children,
  showLogout = true,
  showHeaderControls = false,
}: LayoutProps) {
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {showLogout && (
        <header className="bg-primary px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-primary rounded-full"></div>
              </div>
              <h1 className="text-headline text-white font-bold">Pokédex</h1>
            </div>
            {showHeaderControls && (
              <div className="flex-1 max-w-md">
                <SearchBar />
              </div>
            )}
            {showLogout && (
              <Button variant="secondary" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>
        </header>
      )}
      <div className="flex flex-1">
        <main className="flex-1">{children}</main>
        {showHeaderControls && (
          <aside className="w-48 bg-gray-dark p-4">
            <SortControls />
          </aside>
        )}
      </div>
    </div>
  )
}
