'use client'

import { Button } from '@/shared/components/Button'

interface PaginationProps {
  hasNext: boolean
  hasPrevious: boolean
  onNext: () => void
  onPrevious: () => void
  onFirst: () => void
  onLast: () => void
  currentPage: number
  totalPages: number
}

export function Pagination({
  hasNext,
  hasPrevious,
  onNext,
  onPrevious,
  onFirst,
  onLast,
  currentPage,
  totalPages,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 py-4 bg-primary px-2 md:px-4">
      <Button
        onClick={onFirst}
        disabled={currentPage === 1}
        className="text-body-3 md:text-body-1 lg:text-body-1 px-2 md:px-4 py-1.5 md:py-2"
      >
        <span className="hidden sm:inline">First</span>
        <span className="sm:hidden">1st</span>
      </Button>
      <Button
        onClick={onPrevious}
        disabled={!hasPrevious}
        className="text-body-3 md:text-body-1 lg:text-body-1 px-2 md:px-4 py-1.5 md:py-2"
      >
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Prev</span>
      </Button>
      <span className="text-body-3 md:text-body-1 lg:text-body-1 text-white px-2 md:px-4 whitespace-nowrap">
        {currentPage} / {totalPages}
      </span>
      <Button
        onClick={onNext}
        disabled={!hasNext}
        className="text-body-3 md:text-body-1 lg:text-body-1 px-2 md:px-4 py-1.5 md:py-2"
      >
        Next
      </Button>
      <Button
        onClick={onLast}
        disabled={currentPage === totalPages}
        className="text-body-3 md:text-body-1 lg:text-body-1 px-2 md:px-4 py-1.5 md:py-2"
      >
        Last
      </Button>
    </div>
  )
}
