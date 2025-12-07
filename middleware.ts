import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  const { pathname } = request.nextUrl

  // Protect /pokemon routes
  if (pathname.startsWith('/pokemon') && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect authenticated users away from login
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/pokemon', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/pokemon/:path*'],
}
