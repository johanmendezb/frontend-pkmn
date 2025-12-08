import '@testing-library/jest-dom'
import { beforeEach, vi } from 'vitest'
import React from 'react'
import { act } from 'react'

// React 19 compatibility: Make React.act available for React Testing Library
globalThis.React = React
if (!React.act) {
  ;(React as any).act = act
}

// Mock react-dom/test-utils to use React.act for React 19 compatibility
vi.mock('react-dom/test-utils', () => ({
  act,
}))

// Mock next/navigation
const mockPush = vi.fn()
const mockReplace = vi.fn()
const mockSearchParams = new URLSearchParams()

// Create a proper mock for useSearchParams that returns a ReadonlyURLSearchParams-like object
const createMockSearchParams = () => {
  const params = new URLSearchParams()
  return {
    get: (key: string) => params.get(key),
    getAll: (key: string) => params.getAll(key),
    has: (key: string) => params.has(key),
    keys: () => params.keys(),
    values: () => params.values(),
    entries: () => params.entries(),
    forEach: (callback: (value: string, key: string) => void) => params.forEach(callback),
    sort: () => params.sort(),
    toString: () => params.toString(),
    size: params.size,
  }
}

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/pokemon',
  useSearchParams: () => createMockSearchParams(),
  redirect: vi.fn(),
}))

// Export mocks for use in tests
export { mockPush, mockReplace }

// Mock next/headers
vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn(() => ({ value: 'mock-token' })),
    set: vi.fn(),
    delete: vi.fn(),
  })),
}))

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: {
    src: string
    alt: string
    width?: number
    height?: number
    className?: string
    onError?: () => void
  }) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock js-cookie
vi.mock('js-cookie', () => ({
  default: {
    get: vi.fn(() => 'mock-token'),
    set: vi.fn(),
    remove: vi.fn(),
  },
}))

// Reset all mocks before each test
beforeEach(() => {
  vi.clearAllMocks()
})
