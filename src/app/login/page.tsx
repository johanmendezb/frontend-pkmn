'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '@/features/auth/services/authApi'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { PokeBall } from '@/shared/components/icons'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/pokemon')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-type-fire to-type-electric flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pokeball decoration */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <PokeBall size={400} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-elevation-6">
              <PokeBall size={32} />
            </div>
            <h1 className="text-headline text-white font-bold">Pokédex</h1>
          </div>
          <p className="text-body-1 text-white/90">
            Welcome back, Trainer!
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-3xl shadow-elevation-6 p-8 inner-shadow-2">
          <LoginForm />
        </div>

        {/* Footer with name and LinkedIn */}
        <div className="mt-6 text-center">
          <p className="text-body-2 text-white/80 mb-2">
            Created by
          </p>
          <a
            href="https://www.linkedin.com/in/johanemendezg/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-body-1 text-white font-bold hover:opacity-90 transition-opacity"
          >
            <span>Johan Méndez</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
