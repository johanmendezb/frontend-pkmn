import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

interface ErrorResponse {
  error: string
  statusCode: number
}

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
    // Don't redirect if we're already on the login page (login endpoint)
    const isLoginEndpoint = endpoint === '/auth/login'

    if (typeof window !== 'undefined' && !isLoginEndpoint) {
      window.location.href = '/login'
    }
    // Try to extract error message from response
    try {
      const errorData = (await res.json()) as ErrorResponse
      throw new Error(errorData.error || 'Unauthorized')
    } catch {
      throw new Error('Unauthorized')
    }
  }

  if (!res.ok) {
    // Try to extract error message from response body
    try {
      const errorData = (await res.json()) as ErrorResponse
      throw new Error(errorData.error || `API Error: ${res.status}`)
    } catch {
      // If response is not JSON, use status text or status code
      throw new Error(res.statusText || `API Error: ${res.status}`)
    }
  }

  return res.json()
}
