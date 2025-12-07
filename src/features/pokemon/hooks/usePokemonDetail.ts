import { useQuery } from '@tanstack/react-query'
import { getById } from '../services/pokemonApi'
import type { PokemonDetail } from '../types/pokemon.types'

interface UsePokemonDetailParams {
  id: number
  initialData?: PokemonDetail | null
}

export function usePokemonDetail({
  id,
  initialData,
}: UsePokemonDetailParams) {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getById(id),
    initialData: initialData || undefined,
    staleTime: 60 * 1000, // 1 minute
  })
}
