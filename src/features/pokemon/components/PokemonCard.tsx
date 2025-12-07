import Image from 'next/image'
import type { PokemonListItem } from '../types/pokemon.types'

interface PokemonCardProps {
  pokemon: PokemonListItem
  onClick: (id: number) => void
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const formatNumber = (id: number): string => {
    return `#${String(id).padStart(3, '0')}`
  }

  return (
    <div onClick={() => onClick(pokemon.id)}>
      {pokemon.image && (
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={200}
          height={200}
        />
      )}
      <div>
        <span>{formatNumber(pokemon.id)}</span>
        <h3>{pokemon.name}</h3>
      </div>
    </div>
  )
}
