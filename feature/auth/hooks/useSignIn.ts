"use client"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthService } from '../services/AuthService'
import type { AuthResponse, User, SignInDto } from '@/types/auth'
import { setCookie as setClientCookie} from '@/lib/cookies/cookies-client'

export function useSignIn() {
  const qc = useQueryClient()

  return useMutation<AuthResponse, Error, SignInDto>({
    
    mutationFn: AuthService.signIn,
    onSuccess: (res) => {
      const { user, token } = res.data

      qc.setQueryData<User>(['currentUser'], user)

      setClientCookie("token", token)

      localStorage.setItem('currentUser', JSON.stringify(user))
    },
  })
}


