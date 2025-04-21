'use server'

import { cookies } from 'next/headers'

export type CookieOptions = {
    httpOnly?: boolean
    secure?: boolean
    sameSite?: 'strict' | 'lax' | 'none'
    path?: string
    maxAge?: number
}

export async function setCookie(
    name: string,
    value: string,
    options?: CookieOptions
) {
    const cookieStore = await cookies()
    cookieStore.set(name, value, {
        httpOnly: options?.httpOnly ?? false,
        secure: options?.secure ?? (process.env.NODE_ENV === 'production'),
        sameSite: options?.sameSite ?? 'lax',
        path: options?.path ?? '/',
        maxAge: options?.maxAge,
    })
}


export async function getCookie(name: string): Promise<string | null> {
    const cookieStore = await cookies()
    return cookieStore.get(name)?.value ?? null
}


export async function deleteCookie(name: string) {
    const cookieStore = await cookies()
    cookieStore.delete(name)
}
