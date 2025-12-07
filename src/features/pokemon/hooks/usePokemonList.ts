import { useQuery } from '@tanstack/react-query'
import { getList } from '../services/pokemonApi'
import type { PokemonListResponse } from '../types/pokemon.types'

interface UsePokemonListParams {
  offset: number
  limit: number
  search?: string
  initialData?: PokemonListResponse | null
}

export function usePokemonList({
  offset,
  limit,
  search,
  initialData,
}: UsePokemonListParams) {
  return useQuery({
    queryKey: ['pokemons', { offset, limit, search }],
    queryFn: () => getList({ offset, limit, search }),
    initialData: offset === 0 && !search && initialData ? initialData : undefined,
    staleTime: 60 * 1000, // 1 minute
  })
}
