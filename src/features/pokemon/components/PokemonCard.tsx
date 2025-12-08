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
      className={`w-[104px] h-[108px] md:w-[140px] md:h-[144px] lg:w-[160px] lg:h-[164px] bg-white rounded-lg shadow-elevation-2 cursor-pointer relative overflow-hidden hover:shadow-elevation-6 transition-shadow ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
    >
      {/* Number in top left */}
      <span className="absolute top-1 left-1 md:top-2 md:left-2 text-body-3 md:text-body-1 lg:text-subtitle-1 text-gray-dark font-bold z-10">
        {formatNumber(pokemon.id)}
      </span>

      {/* Half height gray background at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[54px] md:h-[72px] lg:h-[82px] bg-gray-background rounded-t-lg"></div>

      {/* Pokemon image - centered */}
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center p-2 md:p-3">
        <Image
          src={imageSrc}
          alt={pokemon.name}
          width={112}
          height={112}
          className="w-[72px] h-[72px] md:w-[96px] md:h-[96px] lg:w-[112px] lg:h-[112px] object-contain"
          onError={handleImageError}
        />
      </div>

      {/* Name at bottom */}
      <div className="absolute bottom-1 md:bottom-2 left-0 right-0 flex items-center justify-center px-1">
        <h3 className="text-body-1 md:text-subtitle-1 lg:text-subtitle-1 text-gray-dark text-center capitalize truncate w-full">
          {pokemon.name}
        </h3>
      </div>
    </div>
  )
}
