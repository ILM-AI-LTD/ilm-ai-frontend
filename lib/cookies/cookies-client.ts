'use client'

import Cookies from 'js-cookie'

export type ClientCookieOptions = {
  expires?: number
  sameSite?: 'strict' | 'lax' | 'none'
  path?: string
}

export function setCookie(
  name: string,
  value: string,
  options?: ClientCookieOptions
) {
  const cookieOpts: Record<string, any> = {
    sameSite: options?.sameSite ?? 'Lax',
    path: options?.path ?? '/',
    secure: process.env.NODE_ENV === 'production',
  }
  if (options?.expires !== undefined) {
    cookieOpts.expires = options.expires
  }
  Cookies.set(name, value, cookieOpts)
}


export function getCookie(name: string): string | undefined {
  return Cookies.get(name)
}


export function deleteCookie(name: string) {
  Cookies.remove(name, { path: '/' })
}
