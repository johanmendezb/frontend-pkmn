'use client'

import { useState, useEffect } from 'react'
import { useUIStore } from '@/shared/stores/uiStore'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { Input } from '@/shared/components/Input'

export function SearchBar() {
  const searchTerm = useUIStore((state) => state.searchTerm)
  const setSearchTerm = useUIStore((state) => state.setSearchTerm)
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm)

  const debouncedSearchTerm = useDebounce(localSearchTerm, 300)

  useEffect(() => {
    setSearchTerm(debouncedSearchTerm)
  }, [debouncedSearchTerm, setSearchTerm])

  return (
    <Input
      id="search"
      type="text"
      placeholder="Search Pokemon..."
      value={localSearchTerm}
      onChange={(e) => setLocalSearchTerm(e.target.value)}
      aria-label="Search Pokemon"
    />
  )
}
