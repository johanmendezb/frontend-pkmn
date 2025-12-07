import type { Metadata } from 'next'
import { QueryProvider } from '@/shared/providers/QueryProvider'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Pokemon Browser',
  description: 'Browse and search Pokemon',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
