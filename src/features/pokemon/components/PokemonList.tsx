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
      <div className="bg-primary">
        <div className="p-1 rounded-lg">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-2 gap-y-2.5 px-2 py-6 bg-white rounded-md inner-shadow-2 justify-items-center">
            {Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className="w-[104px] h-[108px] md:w-[140px] md:h-[144px] lg:w-[160px] lg:h-[164px] bg-white rounded-lg shadow-elevation-2 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (pokemons.length === 0) {
    return (
      <div className="bg-primary">
        <div className="p-1 rounded-lg">
          <div className="px-2 py-6 bg-white rounded-md inner-shadow-2">
            <p className="text-body-1 text-gray-medium">No Pokemon found</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-primary">
      <div className="p-1 rounded-lg">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 px-2 py-6 bg-white rounded-md inner-shadow-2 justify-items-center">
          {pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onClick={onPokemonClick}
              isSelected={selectedId === pokemon.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
