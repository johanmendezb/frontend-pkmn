import { useQuery } from '@tanstack/react-query'
import { getList } from '../services/pokemonApi'

export function usePokemonCount() {
  return useQuery({
    queryKey: ['pokemons', 'count'],
    queryFn: async () => {
      // Fetch with minimal limit to get just the count
      const response = await getList({ offset: 0, limit: 1 })
      return response.count
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - count doesn't change often
  })
}
