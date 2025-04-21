import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { Protected_Endpoints } from './constants/Endpoints'
import { getCookie } from './lib/cookies/cookies-server'

export async function middleware(request: NextRequest) {
    const token = await getCookie('token')

    const isProtected = Protected_Endpoints.some(path =>
        request.nextUrl.pathname.startsWith(path)
    )

    if (isProtected && !token) {
        return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
    ],
}
