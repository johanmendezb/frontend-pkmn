'use client'

import { useUIStore } from '@/shared/stores/uiStore'

export function SortControls() {
  const sortBy = useUIStore((state) => state.sortBy)
  const sortOrder = useUIStore((state) => state.sortOrder)
  const setSorting = useUIStore((state) => state.setSorting)

  const handleSortByChange = (by: 'name' | 'number') => {
    const newOrder = sortBy === by && sortOrder === 'asc' ? 'desc' : 'asc'
    setSorting(by, newOrder)
  }

  return (
    <div className="bg-gray-dark px-4 py-3 rounded-lg">
      <h2 className="text-subtitle-1 text-white mb-2">Sort by:</h2>
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            checked={sortBy === 'number'}
            onChange={() => handleSortByChange('number')}
            className="w-4 h-4 text-primary focus:ring-primary"
          />
          <span className="text-body-1 text-white">Number</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            checked={sortBy === 'name'}
            onChange={() => handleSortByChange('name')}
            className="w-4 h-4 text-primary focus:ring-primary"
          />
          <span className="text-body-1 text-white">Name</span>
        </label>
      </div>
    </div>
  )
}
