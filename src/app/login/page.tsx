'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '@/features/auth/services/authApi'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { Layout } from '@/shared/components/Layout'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/pokemon')
    }
  }, [router])

  return (
    <Layout showLogout={false}>
      <div>
        <LoginForm />
      </div>
    </Layout>
  )
}
