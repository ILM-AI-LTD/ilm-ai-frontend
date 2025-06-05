// middleware.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getCookie } from './lib/cookies/cookies-server'

export async function middleware(request: NextRequest) {
  const token = await getCookie('token')

  // if (!token) {
  //   return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/parents/:path*',
    '/student/:path*',
  ],
}
