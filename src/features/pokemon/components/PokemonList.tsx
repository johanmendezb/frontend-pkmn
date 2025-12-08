import { PokemonCard } from './PokemonCard'
import type { PokemonListItem } from '../types/pokemon.types'

interface PokemonListProps {
  pokemons: PokemonListItem[]
  onPokemonClick: (id: number) => void
  isLoading?: boolean
  selectedId?: number
}

export function PokemonList({
  pokemons,
  onPokemonClick,
  isLoading = false,
  selectedId,
}: PokemonListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-2 p-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="w-[104px] h-[108px] bg-gray-background rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    )
  }

  if (pokemons.length === 0) {
    return (
      <div className="p-4">
        <p className="text-body-1 text-gray-medium">No Pokemon found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-2 p-4 bg-white">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onClick={onPokemonClick}
          isSelected={selectedId === pokemon.id}
        />
      ))}
    </div>
  )
}
