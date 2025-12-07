'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Layout } from '@/shared/components/Layout'
import { usePokemonList } from '@/features/pokemon/hooks/usePokemonList'
import { useUIStore } from '@/shared/stores/uiStore'
import { PokemonList } from '@/features/pokemon/components/PokemonList'
import { SearchBar } from '@/features/pokemon/components/SearchBar'
import { SortControls } from '@/features/pokemon/components/SortControls'
import { Pagination } from '@/features/pokemon/components/Pagination'
import type { PokemonListResponse } from '@/features/pokemon/types/pokemon.types'

interface PokemonPageClientProps {
  initialData: PokemonListResponse | null
}

const ITEMS_PER_PAGE = 20

export function PokemonPageClient({ initialData }: PokemonPageClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageParam = searchParams.get('page')
  const initialPage = pageParam ? parseInt(pageParam, 10) - 1 : 0
  const [currentPage, setCurrentPage] = useState(initialPage)
  const searchTerm = useUIStore((state) => state.searchTerm)
  const sortBy = useUIStore((state) => state.sortBy)
  const sortOrder = useUIStore((state) => state.sortOrder)
  const isUpdatingFromUrl = useRef(false)

  // Sync currentPage with URL query params on mount or when pageParam changes
  useEffect(() => {
    const page = pageParam ? parseInt(pageParam, 10) - 1 : 0
    if (page >= 0) {
      setCurrentPage((prev) => {
        if (prev !== page) {
          isUpdatingFromUrl.current = true
          return page
        }
        return prev
      })
    }
  }, [pageParam])

  // Update URL when page changes (but not when search changes or when updating from URL)
  useEffect(() => {
    if (searchTerm) {
      return
    }

    if (isUpdatingFromUrl.current) {
      isUpdatingFromUrl.current = false
      return
    }

    const params = new URLSearchParams()
    if (currentPage > 0) {
      params.set('page', String(currentPage + 1))
    }
    const newUrl = params.toString() ? `/pokemon?${params.toString()}` : '/pokemon'
    router.replace(newUrl, { scroll: false })
  }, [currentPage, searchTerm, router])

  // Reset to page 0 when search term changes
  useEffect(() => {
    if (searchTerm) {
      setCurrentPage(0)
      router.replace('/pokemon', { scroll: false })
    }
  }, [searchTerm, router])

  // When searching, don't use pagination - search returns all matching results
  const offset = searchTerm ? 0 : currentPage * ITEMS_PER_PAGE

  const { data, isLoading, error } = usePokemonList({
    offset,
    limit: ITEMS_PER_PAGE,
    search: searchTerm || undefined,
    initialData: currentPage === 0 && !searchTerm ? initialData : undefined,
  })

  // Apply sorting to the results (search filtering is now done server-side)
  const sortedPokemons = useMemo(() => {
    if (!data?.results) return []

    const sorted = [...data.results].sort((a, b) => {
      if (sortBy === 'name') {
        const comparison = a.name.localeCompare(b.name)
        return sortOrder === 'asc' ? comparison : -comparison
      } else {
        const comparison = a.id - b.id
        return sortOrder === 'asc' ? comparison : -comparison
      }
    })

    return sorted
  }, [data?.results, sortBy, sortOrder])

  const handlePokemonClick = (id: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (!searchTerm && currentPage > 0) {
      params.set('page', String(currentPage + 1))
    }
    router.push(`/pokemon/${id}?${params.toString()}`)
  }

  const handleNext = (e?: React.MouseEvent) => {
    e?.preventDefault()
    if (data?.next) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePrevious = (e?: React.MouseEvent) => {
    e?.preventDefault()
    if (data?.previous) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const handleFirst = (e?: React.MouseEvent) => {
    e?.preventDefault()
    setCurrentPage(0)
  }

  const handleLast = (e?: React.MouseEvent) => {
    e?.preventDefault()
    const totalPages = data?.count
      ? Math.ceil(data.count / ITEMS_PER_PAGE)
      : 0
    if (totalPages > 0) {
      setCurrentPage(totalPages - 1)
    }
  }

  const totalPages = data?.count
    ? Math.ceil(data.count / ITEMS_PER_PAGE)
    : 0

  return (
    <Layout>
      <div>
        <h1>Pokemon List</h1>

        <SearchBar />
        <SortControls />

        {error && (
          <div role="alert">
            Error loading Pokemon: {error instanceof Error ? error.message : 'Unknown error'}
          </div>
        )}

        <PokemonList
          pokemons={sortedPokemons}
          onPokemonClick={handlePokemonClick}
          isLoading={isLoading}
        />

        {!searchTerm && (
          <Pagination
            hasNext={!!data?.next}
            hasPrevious={!!data?.previous}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onFirst={handleFirst}
            onLast={handleLast}
            currentPage={currentPage + 1}
            totalPages={totalPages}
          />
        )}
      </div>
    </Layout>
  )
}
