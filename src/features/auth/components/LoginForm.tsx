'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { login } from '../services/authApi'
import type { LoginCredentials } from '../types/auth.types'
import { Button } from '@/shared/components/Button'

export function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: () => {
      router.push('/pokemon')
    },
    onError: (err: Error) => {
      const errorMessage = err.message

      if (errorMessage.toLowerCase().includes('unauthorized')) {
        setError('The username or password you entered is incorrect. Please try again.')
      } else {
        setError(errorMessage)
      }
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setError(null)
    loginMutation.mutate({ username, password })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-headline text-gray-dark mb-2">Login</h2>
        <p className="text-body-2 text-gray-medium">
          Enter your credentials to access the Pokédex
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-full text-body-2"
        >
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-subtitle-2 text-gray-dark mb-2"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            aria-label="Username"
            className="w-full px-4 py-3 bg-gray-background rounded-full text-body-1 text-gray-dark placeholder-gray-medium focus:outline-none focus:ring-2 focus:ring-primary border-2 border-transparent focus:border-primary transition-all inner-shadow-2"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-subtitle-2 text-gray-dark mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            aria-label="Password"
            className="w-full px-4 py-3 bg-gray-background rounded-full text-body-1 text-gray-dark placeholder-gray-medium focus:outline-none focus:ring-2 focus:ring-primary border-2 border-transparent focus:border-primary transition-all inner-shadow-2"
            placeholder="Enter your password"
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        isLoading={loginMutation.isPending}
        className="w-full py-3 text-subtitle-1 shadow-elevation-2"
      >
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  )
}
