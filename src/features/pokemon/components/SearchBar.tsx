'use client'

import { useState, useEffect } from 'react'
import { useUIStore } from '@/shared/stores/uiStore'
import { useDebounce } from '@/shared/hooks/useDebounce'

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
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.3333 11.3333L14 14M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z"
            stroke="#666666"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <input
        id="search"
        type="text"
        placeholder="Search"
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        aria-label="Search Pokemon"
        className="w-full bg-white rounded-lg px-10 py-2 text-body-1 text-gray-dark placeholder-gray-medium focus:outline-none focus:ring-2 focus:ring-white"
      />
    </div>
  )
}
