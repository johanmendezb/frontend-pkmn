'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Layout } from '@/shared/components/Layout'
import { usePokemonDetail } from '@/features/pokemon/hooks/usePokemonDetail'
import { Button } from '@/shared/components/Button'
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

  const hasData = pokemon?.abilities?.length || pokemon?.moves?.length ||
    pokemon?.forms?.length || pokemon?.types?.length || pokemon?.stats?.length

  if (isLoading) {
    return (
      <Layout>
        <div>
          <p>Loading...</p>
        </div>
      </Layout>
    )
  }

  if (error || !pokemon) {
    return (
      <Layout>
        <div>
          <p>Error loading Pokemon details</p>
          <Button onClick={handleBack}>Back to List</Button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div>
        <div>
          <Button onClick={handleBack}>Back to List</Button>
          <Button onClick={handlePrevious} disabled={!hasPrevious}>
            Previous Pokemon
          </Button>
          <Button onClick={handleNext} disabled={!hasNext}>
            Next Pokemon
          </Button>
        </div>

        <h1>{pokemon.name}</h1>
        <p>#{String(pokemon.id).padStart(3, '0')}</p>

        <Image
          src={imageSrc}
          alt={pokemon.name}
          width={400}
          height={400}
          onError={handleImageError}
        />

        {!hasData ? (
          <p>There is not enough information at this moment.</p>
        ) : (
          <>
            {pokemon.abilities?.length > 0 && (
              <section>
                <h2>Abilities</h2>
                <ul>
                  {pokemon.abilities.map((ability, index) => (
                    <li key={index}>
                      {ability.name} {ability.isHidden && '(Hidden)'}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {pokemon.moves?.length > 0 && (
              <section>
                <h2>Moves</h2>
                <ul>
                  {pokemon.moves.map((move, index) => (
                    <li key={index}>{move.name}</li>
                  ))}
                </ul>
              </section>
            )}

            {pokemon.forms?.length > 0 && (
              <section>
                <h2>Forms</h2>
                <ul>
                  {pokemon.forms.map((form, index) => (
                    <li key={index}>{form.name}</li>
                  ))}
                </ul>
              </section>
            )}

            {pokemon.types && pokemon.types.length > 0 && (
              <section>
                <h2>Types</h2>
                <ul>
                  {pokemon.types.map((type, index) => (
                    <li key={index}>{type.name}</li>
                  ))}
                </ul>
              </section>
            )}

            {pokemon.stats && pokemon.stats.length > 0 && (
              <section>
                <h2>Stats</h2>
                <ul>
                  {pokemon.stats.map((stat, index) => (
                    <li key={index}>
                      {stat.name}: {stat.value}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </div>
    </Layout>
  )
}
