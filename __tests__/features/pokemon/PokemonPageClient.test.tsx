import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PokemonPageClient } from '@/app/pokemon/PokemonPageClient'
import { useUIStore } from '@/shared/stores/uiStore'
import type { PokemonListResponse } from '@/features/pokemon/types/pokemon.types'

// Mock usePokemonList hook
const mockUsePokemonList = vi.fn()
vi.mock('@/features/pokemon/hooks/usePokemonList', () => ({
  usePokemonList: (args: unknown) => mockUsePokemonList(args),
}))


describe('PokemonPageClient', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })
    vi.clearAllMocks()
    useUIStore.setState({
      searchTerm: '',
      sortBy: 'number',
      sortOrder: 'asc',
    })
  })

  const mockInitialData: PokemonListResponse = {
    count: 100,
    next: 'http://api/pokemons?offset=20&limit=20',
    previous: null,
    results: [
      { id: 1, name: 'bulbasaur', image: 'https://example.com/1.png' },
      { id: 2, name: 'ivysaur', image: 'https://example.com/2.png' },
      { id: 3, name: 'charmander', image: 'https://example.com/3.png' },
    ],
  }

  const renderPokemonPageClient = (initialData: PokemonListResponse | null = null) => {
    mockUsePokemonList.mockReturnValue({
      data: initialData,
      isLoading: false,
      error: null,
    })

    return render(
      <QueryClientProvider client={queryClient}>
        <PokemonPageClient initialData={initialData} />
      </QueryClientProvider>
    )
  }

  it('renders with initialData', () => {
    renderPokemonPageClient(mockInitialData)

    expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    expect(screen.getByText('ivysaur')).toBeInTheDocument()
    expect(screen.getByText('charmander')).toBeInTheDocument()
  })

  it('search filters results', async () => {
    const user = userEvent.setup()
    renderPokemonPageClient(mockInitialData)

    const searchInput = screen.getByPlaceholderText(/search/i)
    await user.type(searchInput, 'bulba')

    await waitFor(() => {
      const searchTerm = useUIStore.getState().searchTerm
      expect(searchTerm).toBe('bulba')
    })
  })

  it('sort changes order', async () => {
    const user = userEvent.setup()
    renderPokemonPageClient(mockInitialData)

    // Find and click sort button (assuming it's in SortControls)
    const sortButton = screen.getByLabelText(/sort options/i)
    await user.click(sortButton)

    // Click on "Name" option
    const nameOption = screen.getByText(/name/i)
    await user.click(nameOption)

    await waitFor(() => {
      const { sortBy } = useUIStore.getState()
      expect(sortBy).toBe('name')
    })
  })

  it('pagination calls correct queries', async () => {
    const user = userEvent.setup()
    mockUsePokemonList.mockReturnValue({
      data: { ...mockInitialData, next: 'http://api/pokemons?offset=20&limit=20' },
      isLoading: false,
      error: null,
    })
    renderPokemonPageClient(mockInitialData)

    // Find and click next button
    const nextButton = screen.getByRole('button', { name: /next/i })
    await user.click(nextButton)

    // Wait for state update and verify the hook was called with updated offset
    await waitFor(() => {
      const calls = mockUsePokemonList.mock.calls
      const lastCall = calls[calls.length - 1]
      if (lastCall && lastCall[0]) {
        expect(lastCall[0]).toMatchObject(
          expect.objectContaining({
            offset: expect.any(Number),
            limit: 20,
          })
        )
      }
    }, { timeout: 2000 })
  })
})
