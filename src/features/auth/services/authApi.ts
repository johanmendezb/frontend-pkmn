import Cookies from 'js-cookie'
import { clientFetch } from '@/shared/lib/apiClient'
import type { LoginCredentials, LoginResponse } from '../types/auth.types'

export async function login(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const response = await clientFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })

  // Store token in cookie
  Cookies.set('auth-token', response.token, {
    expires: 1, // 1 day
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  })

  return response
}

export function logout(): void {
  Cookies.remove('auth-token')
}

export function isAuthenticated(): boolean {
  return !!Cookies.get('auth-token')
}
