import { cookies } from 'next/headers'

const SERVER_API_URL = process.env.API_URL || ''

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
