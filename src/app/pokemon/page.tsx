import { cookies } from 'next/headers'
import { PokemonPageClient } from './PokemonPageClient'

async function getInitialPokemons() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) return null

  const res = await fetch(`${process.env.API_URL}/pokemons?limit=20`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (!res.ok) return null

  return res.json()
}

export default async function PokemonPage() {
  const initialData = await getInitialPokemons()

  return <PokemonPageClient initialData={initialData} />
}
