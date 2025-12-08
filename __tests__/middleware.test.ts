import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest, NextResponse } from 'next/server'
import { middleware } from '../middleware'

// Mock NextResponse
vi.mock('next/server', async () => {
  const actual = await vi.importActual('next/server')
  return {
    ...actual,
    NextResponse: {
      ...actual.NextResponse,
      redirect: vi.fn((url: URL) => ({
        url: url.toString(),
        status: 307,
        headers: new Headers(),
      })),
      next: vi.fn(() => ({
        status: 200,
        headers: new Headers(),
      })),
    },
  }
})

describe('middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const createMockRequest = (pathname: string, cookieValue?: string) => {
    const url = new URL(`http://localhost${pathname}`)
    const request = new NextRequest(url, {
      headers: {
        cookie: cookieValue ? `auth-token=${cookieValue}` : '',
      },
    })
    return request
  }

  it('redirects to login when accessing /pokemon without token', () => {
    const request = createMockRequest('/pokemon')
    const response = middleware(request)

    expect(NextResponse.redirect).toHaveBeenCalled()
  })

  it('allows access to /pokemon with valid token', () => {
    const request = createMockRequest('/pokemon', 'valid-token')
    const response = middleware(request)

    expect(NextResponse.next).toHaveBeenCalled()
  })

  it('redirects to /pokemon when accessing /login with token', () => {
    const request = createMockRequest('/login', 'valid-token')
    const response = middleware(request)

    expect(NextResponse.redirect).toHaveBeenCalled()
  })

  it('allows access to /login without token', () => {
    const request = createMockRequest('/login')
    const response = middleware(request)

    expect(NextResponse.next).toHaveBeenCalled()
  })
})
