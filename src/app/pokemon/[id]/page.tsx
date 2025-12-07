import { cookies } from 'next/headers'
import { PokemonDetailClient } from './PokemonDetailClient'

async function getPokemon(id: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) return null

  const res = await fetch(`${process.env.API_URL}/pokemons/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (!res.ok) return null

  return res.json()
}

interface PokemonDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function PokemonDetailPage({
  params,
}: PokemonDetailPageProps) {
  const { id } = await params
  const initialData = await getPokemon(id)

  return <PokemonDetailClient initialData={initialData} pokemonId={parseInt(id, 10)} />
}
