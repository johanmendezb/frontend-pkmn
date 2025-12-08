'use client'

import { useState, useRef, useEffect } from 'react'
import { useUIStore } from '@/shared/stores/uiStore'
import { Filter, Hash, TextFormat } from '@/shared/components/icons'

export function SortControls() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasChangedSort, setHasChangedSort] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const sortBy = useUIStore((state) => state.sortBy)
  const setSorting = useUIStore((state) => state.setSorting)

  const handleSortByChange = (by: 'name' | 'number') => {
    setSorting(by, 'asc')
    setHasChangedSort(true)
    setIsOpen(false)
  }

  const getSortIcon = () => {
    if (!hasChangedSort) {
      return <Filter size={20} color="#DC0A2D" />
    }

    if (sortBy === 'number') {
      return <Hash size={20} color="#DC0A2D" />
    }

    return <TextFormat size={20} color="#DC0A2D" />
  }

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        buttonRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Prevent body scroll when overlay is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity shrink-0 inner-shadow-2 shadow-elevation-2"
          aria-label="Sort options"
        >
          {getSortIcon()}
        </button>

        {isOpen && (
          <div
            ref={popoverRef}
            className="absolute right-0 top-12 w-32 rounded-lg shadow-elevation-6 z-50 overflow-hidden bg-primary"
          >
            <div className="bg-primary px-6 py-3">
              <h2 className="text-subtitle-1 text-white font-bold">Sort by:</h2>
            </div>
            <div className="m-0 p-1 bg-primary rounded-lg">
              <div className="px-6 py-3 space-y-3 bg-white rounded-md inner-shadow-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === 'number'}
                    onChange={() => handleSortByChange('number')}
                  />
                  <span className="text-body-1 text-gray-dark">Number</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === 'name'}
                    onChange={() => handleSortByChange('name')}
                  />
                  <span className="text-body-1 text-gray-dark">Name</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
