'use client'

import { useRouter } from 'next/navigation'
import { logout } from '@/features/auth/services/authApi'
import { Button } from './Button'
import { SearchBar } from '@/features/pokemon/components/SearchBar'
import { SortControls } from '@/features/pokemon/components/SortControls'
import { PokeBall } from './icons'

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
    <div className="flex flex-col">
      {showLogout && (
        <header className="bg-primary">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  <PokeBall size={20} />
                </div>
                <h1 className="text-headline text-white font-bold">Pokédex</h1>
              </div>
              {showLogout && (
                <Button
                  onClick={handleLogout}
                  className="shrink-0"
                >
                  Logout
                </Button>
              )}
            </div>
            {showHeaderControls && (
              <div className="flex items-center gap-2">
                <div className="flex-1">
                <SearchBar />
                </div>
                <SortControls />
              </div>
            )}
          </div>
        </header>
      )}
        <main className="flex-1">{children}</main>
    </div>
  )
}
