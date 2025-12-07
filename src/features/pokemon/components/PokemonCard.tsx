'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { PokemonListItem } from '../types/pokemon.types'

interface PokemonCardProps {
  pokemon: PokemonListItem
  onClick: (id: number) => void
}

const FALLBACK_IMAGE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png'

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const [imageSrc, setImageSrc] = useState(pokemon.image || FALLBACK_IMAGE_URL)
  const [hasError, setHasError] = useState(false)

  const formatNumber = (id: number): string => {
    return `#${String(id).padStart(3, '0')}`
  }

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true)
      setImageSrc(FALLBACK_IMAGE_URL)
    }
  }

  return (
    <div onClick={() => onClick(pokemon.id)}>
      <Image
        src={imageSrc}
        alt={pokemon.name}
        width={200}
        height={200}
        onError={handleImageError}
      />
      <div>
        <span>{formatNumber(pokemon.id)}</span>
        <h3>{pokemon.name}</h3>
      </div>
    </div>
  )
}
