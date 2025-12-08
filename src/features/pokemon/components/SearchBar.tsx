'use client'

import { useState, useEffect } from 'react'
import { useUIStore } from '@/shared/stores/uiStore'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { Search } from '@/shared/components/icons'

export function SearchBar() {
  const searchTerm = useUIStore((state) => state.searchTerm)
  const setSearchTerm = useUIStore((state) => state.setSearchTerm)
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm)

  const debouncedSearchTerm = useDebounce(localSearchTerm, 300)

  useEffect(() => {
    setSearchTerm(debouncedSearchTerm)
  }, [debouncedSearchTerm, setSearchTerm])

  return (
    <div className="relative flex-1">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
        <Search size={16} color="#DC0A2D" />
      </div>
      <input
        id="search"
        type="text"
        placeholder="Search"
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        aria-label="Search Pokemon"
        className="w-full bg-white rounded-full pl-10 pr-4 py-3 text-body-1 text-gray-dark placeholder-gray-medium focus:outline-none focus:ring-2 focus:ring-white inner-shadow-2"
      />
    </div>
  )
}
