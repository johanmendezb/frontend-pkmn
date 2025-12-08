import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PokemonList } from '@/features/pokemon/components/PokemonList'
import type { PokemonListItem } from '@/features/pokemon/types/pokemon.types'

describe('PokemonList', () => {
  const mockPokemons: PokemonListItem[] = [
    { id: 1, name: 'bulbasaur', image: 'https://example.com/1.png' },
    { id: 2, name: 'ivysaur', image: 'https://example.com/2.png' },
    { id: 3, name: 'venusaur', image: 'https://example.com/3.png' },
  ]

  it('renders grid of cards with initialData', () => {
    render(
      <PokemonList
        pokemons={mockPokemons}
        onPokemonClick={vi.fn()}
        isLoading={false}
      />
    )

    expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    expect(screen.getByText('ivysaur')).toBeInTheDocument()
    expect(screen.getByText('venusaur')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    const { container } = render(
      <PokemonList
        pokemons={[]}
        onPokemonClick={vi.fn()}
        isLoading={true}
      />
    )

    // Check for loading skeleton cards with animate-pulse class
    const loadingCards = container.querySelectorAll('.animate-pulse')
    expect(loadingCards.length).toBeGreaterThan(0)

    // The loading state should not show pokemon names
    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument()
  })

  it('shows empty state', () => {
    render(
      <PokemonList
        pokemons={[]}
        onPokemonClick={vi.fn()}
        isLoading={false}
      />
    )

    expect(screen.getByText(/no pokemon found/i)).toBeInTheDocument()
  })

  it('calls onPokemonClick when a card is clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <PokemonList
        pokemons={mockPokemons}
        onPokemonClick={handleClick}
        isLoading={false}
      />
    )

    // Find card by number instead
    const bulbasaurCard = screen.getByText('#001').closest('div')
    if (bulbasaurCard) {
      await user.click(bulbasaurCard)
      expect(handleClick).toHaveBeenCalledWith(1)
    }
  })
})
