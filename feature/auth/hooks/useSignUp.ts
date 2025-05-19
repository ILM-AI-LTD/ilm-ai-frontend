"use client"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthService } from '../services/AuthService'
import type { SignUpDto, User, AuthParentsResponse } from '@/types/auth'
import { setCookie as setClientCookie } from '@/lib/cookies/cookies-client'

export function useSignUp() {
  const qc = useQueryClient()

  return useMutation<AuthParentsResponse, Error, SignUpDto>({
    
    mutationFn: AuthService.signUp,
    onSuccess: (res) => {
      const { user,token } = res.data

      qc.setQueryData<User>(['currentUser'], user)

      setClientCookie("token", token)

      localStorage.setItem('currentUser', JSON.stringify(user))
    },
  })
}


