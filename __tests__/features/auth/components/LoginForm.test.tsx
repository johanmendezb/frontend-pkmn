import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoginForm } from '@/features/auth/components/LoginForm'
import * as authApi from '@/features/auth/services/authApi'
import { mockPush } from '../../../setup'

// Mock authApi
vi.mock('@/features/auth/services/authApi', () => ({
  login: vi.fn(),
}))

describe('LoginForm', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })
    vi.clearAllMocks()
  })

  const renderLoginForm = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <LoginForm />
      </QueryClientProvider>
    )
  }

  it('renders username and password inputs', () => {
    renderLoginForm()

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('shows validation error on empty submit', async () => {
    const user = userEvent.setup()
    renderLoginForm()

    const submitButton = screen.getByRole('button', { name: /login/i })
    await user.click(submitButton)

    // HTML5 validation should prevent submission
    const usernameInput = screen.getByLabelText(/username/i) as HTMLInputElement
    expect(usernameInput.validity.valid).toBe(false)
  })

  it('calls login mutation on valid submit', async () => {
    const user = userEvent.setup()
    const mockLogin = vi.mocked(authApi.login)
    mockLogin.mockResolvedValue({
      token: 'test-token',
      user: { id: '1', username: 'testuser' },
    })

    renderLoginForm()

    await user.type(screen.getByLabelText(/username/i), 'testuser')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
      })
    })
  })


  it('shows error message on failure', async () => {
    const user = userEvent.setup()
    const mockLogin = vi.mocked(authApi.login)
    mockLogin.mockRejectedValue(new Error('Unauthorized'))

    renderLoginForm()

    await user.type(screen.getByLabelText(/username/i), 'testuser')
    await user.type(screen.getByLabelText(/password/i), 'wrongpassword')
    await user.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(
        screen.getByText(/username or password you entered is incorrect/i)
      ).toBeInTheDocument()
    })
  })

  it('redirects on success', async () => {
    const user = userEvent.setup()
    const mockLogin = vi.mocked(authApi.login)
    mockLogin.mockResolvedValue({
      token: 'test-token',
      user: { id: '1', username: 'testuser' },
    })

    renderLoginForm()

    await user.type(screen.getByLabelText(/username/i), 'testuser')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/pokemon')
    })
  })
})
