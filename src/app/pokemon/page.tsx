import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { serverFetch } from '@/shared/lib/apiClient'
import { PokemonPageClient } from './PokemonPageClient'

async function getPokemons() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    redirect('/login')
  }

  try {
    const data = await serverFetch('/pokemons?limit=20')
    return data
  } catch (error) {
    console.error('Failed to fetch pokemons:', error)
    throw error
  }
}

export default async function PokemonPage() {
  const initialData = await getPokemons()

  return <PokemonPageClient initialData={initialData} />
}
