export interface PokemonListItem {
  id: number
  name: string
  image: string | null
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export interface PokemonAbility {
  name: string
  isHidden: boolean
}

export interface PokemonMove {
  name: string
}

export interface PokemonForm {
  name: string
}

export interface PokemonType {
  name: string
}

export interface PokemonStat {
  name: string
  value: number
}

export interface PokemonDetail {
  id: number
  name: string
  image: string | null
  abilities: PokemonAbility[]
  moves: PokemonMove[]
  forms: PokemonForm[]
  types?: PokemonType[]
  stats?: PokemonStat[]
}
