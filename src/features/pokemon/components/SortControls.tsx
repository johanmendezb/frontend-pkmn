'use client'

import { useUIStore } from '@/shared/stores/uiStore'
import { Button } from '@/shared/components/Button'

export function SortControls() {
  const sortBy = useUIStore((state) => state.sortBy)
  const sortOrder = useUIStore((state) => state.sortOrder)
  const setSorting = useUIStore((state) => state.setSorting)

  const handleSortByChange = (by: 'name' | 'number') => {
    const newOrder = sortBy === by && sortOrder === 'asc' ? 'desc' : 'asc'
    setSorting(by, newOrder)
  }

  return (
    <div>
      <Button
        onClick={() => handleSortByChange('number')}
        variant={sortBy === 'number' ? 'primary' : 'secondary'}
      >
        Sort by Number {sortBy === 'number' && (sortOrder === 'asc' ? '↑' : '↓')}
      </Button>
      <Button
        onClick={() => handleSortByChange('name')}
        variant={sortBy === 'name' ? 'primary' : 'secondary'}
      >
        Sort by Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
      </Button>
    </div>
  )
}
