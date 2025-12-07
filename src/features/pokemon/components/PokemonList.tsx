import { PokemonCard } from './PokemonCard'
import type { PokemonListItem } from '../types/pokemon.types'

interface PokemonListProps {
  pokemons: PokemonListItem[]
  onPokemonClick: (id: number) => void
  isLoading?: boolean
}

export function PokemonList({
  pokemons,
  onPokemonClick,
  isLoading = false,
}: PokemonListProps) {
  if (isLoading) {
    return (
      <div>
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index}>
            <div>Loading...</div>
          </div>
        ))}
      </div>
    )
  }

  if (pokemons.length === 0) {
    return (
      <div>
        <p>No Pokemon found</p>
      </div>
    )
  }

  return (
    <div>
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onClick={onPokemonClick}
        />
      ))}
    </div>
  )
}
