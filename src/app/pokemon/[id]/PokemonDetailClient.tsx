'use client'

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

        {pokemon.image && (
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={400}
            height={400}
          />
        )}

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

        <section>
          <h2>Moves</h2>
          <ul>
            {pokemon.moves.map((move, index) => (
              <li key={index}>{move.name}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Forms</h2>
          <ul>
            {pokemon.forms.map((form, index) => (
              <li key={index}>{form.name}</li>
            ))}
          </ul>
        </section>

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
      </div>
    </Layout>
  )
}
