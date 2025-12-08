import { vi } from 'vitest'

/**
 * Mock cookies() from next/headers for Server Component tests
 */
export const mockServerCookies = (token?: string) => {
  const cookieValue = token ? { value: token } : undefined

  return {
    get: vi.fn((name: string) => {
      if (name === 'auth-token') {
        return cookieValue
      }
      return undefined
    }),
    set: vi.fn(),
    delete: vi.fn(),
  }
}

/**
 * Mock js-cookie for Client Component tests
 */
export const mockClientCookies = {
  get: vi.fn((name: string) => {
    if (name === 'auth-token') {
      return 'mock-token'
    }
    return undefined
  }),
  set: vi.fn(),
  remove: vi.fn(),
}
