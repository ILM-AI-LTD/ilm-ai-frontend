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
  Cookies.set(name, value, {
    expires: options?.expires ?? 7,
    sameSite: options?.sameSite ?? 'Lax',
    path: options?.path ?? '/',
    secure: process.env.NODE_ENV === 'production',
  })
}


export function getCookie(name: string): string | undefined {
  return Cookies.get(name)
}


export function deleteCookie(name: string) {
  Cookies.remove(name, { path: '/' })
}
