'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { login } from '../services/authApi'
import type { LoginCredentials } from '../types/auth.types'
import { Button } from '@/shared/components/Button'
import { Input } from '@/shared/components/Input'

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
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      {error && (
        <div role="alert">
          {error}
        </div>
      )}

      <Input
        id="username"
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        autoComplete="username"
        aria-label="Username"
      />

      <Input
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
        aria-label="Password"
      />

      <Button
        type="submit"
        variant="primary"
        isLoading={loginMutation.isPending}
      >
        Login
      </Button>
    </form>
  )
}
