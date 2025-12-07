import Cookies from 'js-cookie'
import { cookies } from 'next/headers'

const API_URL = process.env.NEXT_PUBLIC_API_URL || ''
const SERVER_API_URL = process.env.API_URL || ''

/**
 * Client-side API client that reads token from cookies
 */
export async function clientFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = Cookies.get('auth-token')

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  })

  if (res.status === 401) {
    Cookies.remove('auth-token')
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
    throw new Error('Unauthorized')
  }

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`)
  }

  return res.json()
}

/**
 * Server-side API client that reads token from Next.js cookies
 */
export async function serverFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  const res = await fetch(`${SERVER_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    cache: 'no-store',
  })

  if (res.status === 401) {
    throw new Error('Unauthorized')
  }

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`)
  }

  return res.json()
}
