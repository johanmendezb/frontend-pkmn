import { describe, it, expect, beforeEach } from 'vitest'
import { useUIStore } from '@/shared/stores/uiStore'

describe('uiStore', () => {
  beforeEach(() => {
    useUIStore.setState({
      searchTerm: '',
      sortBy: 'number',
      sortOrder: 'asc',
    })
  })

  it('setSearchTerm updates state', () => {
    const { setSearchTerm } = useUIStore.getState()
    setSearchTerm('pikachu')

    expect(useUIStore.getState().searchTerm).toBe('pikachu')
  })

  it('setSorting updates state', () => {
    const { setSorting } = useUIStore.getState()
    setSorting('name', 'desc')

    expect(useUIStore.getState().sortBy).toBe('name')
    expect(useUIStore.getState().sortOrder).toBe('desc')
  })

  it('reset clears state', () => {
    const { setSearchTerm, setSorting, reset } = useUIStore.getState()

    // Set some values
    setSearchTerm('charizard')
    setSorting('name', 'desc')

    // Verify they're set
    expect(useUIStore.getState().searchTerm).toBe('charizard')
    expect(useUIStore.getState().sortBy).toBe('name')

    // Reset
    reset()

    // Verify they're cleared
    expect(useUIStore.getState().searchTerm).toBe('')
    expect(useUIStore.getState().sortBy).toBe('number')
    expect(useUIStore.getState().sortOrder).toBe('asc')
  })
})
