'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Layout } from '@/shared/components/Layout'
import { usePokemonDetail } from '@/features/pokemon/hooks/usePokemonDetail'
import { ArrowLeft, ChevronLeft, ChevronRight, PokeBall } from '@/shared/components/icons'
import { getTypeColor } from '@/features/pokemon/utils/getTypeColor'
import type { PokemonDetail } from '@/features/pokemon/types/pokemon.types'

interface PokemonDetailClientProps {
  initialData: PokemonDetail | null
  pokemonId: number
}

const MIN_POKEMON_ID = 1
const MAX_POKEMON_ID = 1302 // Approximate max from PokeAPI
const FALLBACK_IMAGE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png'

export function PokemonDetailClient({
  initialData,
  pokemonId,
}: PokemonDetailClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: pokemon, isLoading, error } = usePokemonDetail({
    id: pokemonId,
    initialData,
  })
  const [imageSrc, setImageSrc] = useState(
    pokemon?.image || FALLBACK_IMAGE_URL
  )
  const [hasError, setHasError] = useState(false)

  // Reset image source when pokemon changes
  useEffect(() => {
    if (pokemon?.image) {
      setImageSrc(pokemon.image)
      setHasError(false)
    } else {
      setImageSrc(FALLBACK_IMAGE_URL)
      setHasError(false)
    }
  }, [pokemon?.image])

  const handleBack = () => {
    const page = searchParams.get('page')
    if (page) {
      router.push(`/pokemon?page=${page}`)
    } else {
      router.push('/pokemon')
    }
  }

  const handlePrevious = () => {
    if (pokemonId > MIN_POKEMON_ID) {
      const prevId = pokemonId - 1
      const page = searchParams.get('page')
      if (page) {
        router.push(`/pokemon/${prevId}?page=${page}`)
      } else {
        router.push(`/pokemon/${prevId}`)
      }
    }
  }

  const handleNext = () => {
    if (pokemonId < MAX_POKEMON_ID) {
      const nextId = pokemonId + 1
      const page = searchParams.get('page')
      if (page) {
        router.push(`/pokemon/${nextId}?page=${page}`)
      } else {
        router.push(`/pokemon/${nextId}`)
      }
    }
  }

  const hasPrevious = pokemonId > MIN_POKEMON_ID
  const hasNext = pokemonId < MAX_POKEMON_ID

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true)
      setImageSrc(FALLBACK_IMAGE_URL)
    }
  }

  // Get primary type color for background
  const primaryType = pokemon?.types?.[0]?.name || 'normal'
  const typeColor = useMemo(() => getTypeColor(primaryType), [primaryType])

  if (isLoading) {
    return (
      <Layout showLogout={false} showHeaderControls={false}>
        <div className="min-h-screen bg-gray-background">
          <p className="p-4">Loading...</p>
        </div>
      </Layout>
    )
  }

  if (error || !pokemon) {
    return (
      <Layout showLogout={false} showHeaderControls={false}>
        <div className="min-h-screen bg-gray-background p-4">
          <p>Error loading Pokemon details</p>
          <button onClick={handleBack} className="mt-4">
            Back to List
          </button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout showLogout={false} showHeaderControls={false}>
      <div
        className="min-h-screen relative"
        style={{ backgroundColor: typeColor }}
      >
        {/* Fixed Header Overlay */}
        <header
          className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
        >
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="w-10 h-10 flex items-center justify-center"
              aria-label="Back to list"
            >
              <ArrowLeft size={24} color="#FFFFFF" />
            </button>
            <div className="flex items-center justify-between flex-1 mx-4">
              <h1 className="text-headline text-white font-bold capitalize">
                {pokemon.name}
              </h1>
              <span className="text-body-2 text-white">
                #{String(pokemon.id).padStart(3, '0')}
              </span>
            </div>
          </div>
        </header>

        {/* Background with type color and Pokeball */}
        <div className="relative pt-16 pb-40">
          {/* Pokeball background with opacity - top right */}
          <div className="absolute top-8 right-4 opacity-20 z-0">
            <PokeBall size={200} />
          </div>
        </div>

        {/* Pokemon Image, Navigation, and Type - All absolutely positioned together */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-30 z-50 flex flex-col items-center">
          {/* Navigation and Image Container */}
          <div className="relative flex items-center justify-center gap-16 mb-4">
            {hasPrevious && (
              <button
                onClick={handlePrevious}
                className="flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Previous Pokemon"
              >
                <ChevronLeft size={24} color="#FFFFFF" />
              </button>
            )}
            {!hasPrevious && <div className="w-6"></div>}

            {/* Pokemon Image */}
            <div className="w-[200px] h-[200px] flex items-center justify-center relative z-50">
              <Image
                src={imageSrc}
                alt={pokemon.name}
                width={200}
                height={200}
                onError={handleImageError}
                className="object-contain"
              />
            </div>

            {hasNext && (
              <button
                onClick={handleNext}
                className="flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Next Pokemon"
              >
                <ChevronRight size={24} color="#FFFFFF" />
              </button>
            )}
            {!hasNext && <div className="w-6"></div>}
          </div>

          {/* Type Badges - Below the image */}
          {pokemon.types && pokemon.types.length > 0 && (
            <div className="flex justify-center gap-2 flex-wrap">
              {pokemon.types.map((type, index) => {
                const typeBgColor = getTypeColor(type.name)
                return (
                  <div
                    key={index}
                    className="px-4 py-1 rounded-full"
                    style={{ backgroundColor: typeBgColor }}
                  >
                    <span className="text-subtitle-1 text-white capitalize">
                      {type.name}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Content Box */}
        <div className="relative mx-2 mb-0 mt-10 z-40 pb-4">
          <div className="rounded-3xl inner-shadow-2 p-6 pt-32 bg-white">
            {(pokemon.abilities?.length > 0 ||
              pokemon.moves?.length > 0 ||
              pokemon.forms?.length > 0) ? (
              <div className="space-y-6">
                {pokemon.abilities?.length > 0 && (
                  <section>
                    <h2 className="text-subtitle-1 text-gray-dark mb-3">
                      Abilities
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {pokemon.abilities.map((ability, index) => (
                        <div
                          key={index}
                          className="px-3 py-1 bg-gray-background rounded-full"
                        >
                          <span className="text-body-1 text-gray-dark capitalize">
                            {ability.name}
                            {ability.isHidden && (
                              <span className="text-caption text-gray-medium ml-1">
                                (Hidden)
                              </span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {pokemon.moves?.length > 0 && (
                  <section>
                    <h2 className="text-subtitle-1 text-gray-dark mb-3">
                      Moves
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {pokemon.moves.map((move, index) => (
                        <div
                          key={index}
                          className="px-3 py-1 bg-gray-background rounded-full"
                        >
                          <span className="text-body-1 text-gray-dark capitalize">
                            {move.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {pokemon.forms?.length > 0 && (
                  <section>
                    <h2 className="text-subtitle-1 text-gray-dark mb-3">
                      Forms
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {pokemon.forms.map((form, index) => (
                        <div
                          key={index}
                          className="px-3 py-1 bg-gray-background rounded-full"
                        >
                          <span className="text-body-1 text-gray-dark capitalize">
                            {form.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            ) : (
              <p className="text-body-1 text-gray-medium">
                There is not enough information at this moment.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
