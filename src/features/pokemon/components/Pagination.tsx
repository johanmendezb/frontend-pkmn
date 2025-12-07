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
    <div>
      <Button onClick={onFirst} disabled={currentPage === 1}>
        First
      </Button>
      <Button onClick={onPrevious} disabled={!hasPrevious}>
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button onClick={onNext} disabled={!hasNext}>
        Next
      </Button>
      <Button onClick={onLast} disabled={currentPage === totalPages}>
        Last
      </Button>
    </div>
  )
}
