import { clientFetch } from '@/shared/lib/apiClient'
import type {
  PokemonListResponse,
  PokemonDetail,
} from '../types/pokemon.types'

interface GetListParams {
  offset?: number
  limit?: number
  search?: string
}

export async function getList(
  params: GetListParams = {},
  token?: string
): Promise<PokemonListResponse> {
  const { offset = 0, limit = 20, search } = params
  const queryParams = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
  })

  if (search) {
    queryParams.append('search', search)
  }

  return clientFetch<PokemonListResponse>(`/pokemons?${queryParams.toString()}`)
}

export async function getById(
  id: number,
  token?: string
): Promise<PokemonDetail> {
  return clientFetch<PokemonDetail>(`/pokemons/${id}`)
}
