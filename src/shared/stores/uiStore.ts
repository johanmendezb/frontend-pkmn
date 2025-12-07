import { create } from 'zustand'

interface UIState {
  searchTerm: string
  sortBy: 'name' | 'number'
  sortOrder: 'asc' | 'desc'
  setSearchTerm: (term: string) => void
  setSorting: (by: 'name' | 'number', order: 'asc' | 'desc') => void
  reset: () => void
}

export const useUIStore = create<UIState>((set) => ({
  searchTerm: '',
  sortBy: 'number',
  sortOrder: 'asc',
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSorting: (sortBy, sortOrder) => set({ sortBy, sortOrder }),
  reset: () => set({ searchTerm: '', sortBy: 'number', sortOrder: 'asc' }),
}))
