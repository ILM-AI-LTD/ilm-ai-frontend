"use client"
import { setCookie as setClientCookie } from '@/lib/cookies/cookies-client'
import type { AuthResponse, SignInDto, User } from '@/types/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthService } from '../services/AuthService'

type SignInVariables = {
  data: SignInDto
  rememberMe: boolean
}

export function useSignIn() {
  const qc = useQueryClient()

  return useMutation<AuthResponse, Error, SignInVariables>({


    mutationFn: ({ data }) => AuthService.signIn(data),
    onSuccess: (res, { rememberMe }) => {

      const { user, token } = res.data

      qc.setQueryData<User>(['currentUser'], user)

      setClientCookie('token', token, { expires: rememberMe ? 7 : undefined })

      const storage = rememberMe ? localStorage : sessionStorage
      storage.setItem('currentUser', JSON.stringify(user))
    },
  })
}


