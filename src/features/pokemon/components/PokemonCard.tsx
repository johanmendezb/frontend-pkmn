'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { PokemonListItem } from '../types/pokemon.types'

interface PokemonCardProps {
  pokemon: PokemonListItem
  onClick: (id: number) => void
  isSelected?: boolean
}

const FALLBACK_IMAGE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png'

export function PokemonCard({
  pokemon,
  onClick,
  isSelected = false,
}: PokemonCardProps) {
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
    <div
      onClick={() => onClick(pokemon.id)}
      className={`w-[104px] h-[108px] bg-white rounded-lg border-2 border-dotted border-gray-light cursor-pointer relative overflow-hidden ${
        isSelected ? 'border-purple-500' : ''
      }`}
    >
      {/* Half height gray background */}
      <div className="absolute top-0 left-0 right-0 h-[54px] bg-gray-background"></div>

      {/* Number in top right */}
      <span className="absolute top-1 right-1 text-caption text-gray-medium font-bold z-10">
        {formatNumber(pokemon.id)}
      </span>

      {/* Pokemon image - 72x72 centered */}
      <div className="absolute top-0 left-0 right-0 h-[54px] flex items-center justify-center z-0">
        <Image
          src={imageSrc}
          alt={pokemon.name}
          width={72}
          height={72}
          onError={handleImageError}
          className="object-contain"
        />
      </div>

      {/* Name centered at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[54px] flex items-center justify-center">
        <h3 className="text-body-2 text-center capitalize">{pokemon.name}</h3>
      </div>
    </div>
  )
}
