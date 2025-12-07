import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { serverFetch } from '@/shared/lib/apiClient'
import { PokemonDetailClient } from './PokemonDetailClient'

async function getPokemon(id: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    redirect('/login')
  }

  try {
    const data = await serverFetch(`/pokemons/${id}`)
    return data
  } catch (error) {
    console.error('Failed to fetch pokemon:', error)
    throw error
  }
}

interface PokemonDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function PokemonDetailPage({
  params,
}: PokemonDetailPageProps) {
  const { id } = await params
  const initialData = await getPokemon(id)

  return <PokemonDetailClient initialData={initialData} />
}
