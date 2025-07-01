"use client"
import { setCookie as setClientCookie } from '@/lib/cookies/cookies-client'
import type { AuthParentsResponse, SignInParentsDto, User } from '@/types/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthService } from '../services/AuthService'

type SignInParentsVariables = {
  data: SignInParentsDto
  rememberMe: boolean
}

export function useSignInParents() {
  const qc = useQueryClient()

  return useMutation<AuthParentsResponse, Error, SignInParentsVariables>({


    mutationFn: ({ data }) => AuthService.signInParents(data),
    onSuccess: (res, { rememberMe }) => {


      const { user, token } = res.data

      qc.setQueryData<User>(['currentParents'], user)

      setClientCookie('token', token, { expires: rememberMe ? 7 : undefined })

      const storage = rememberMe ? localStorage : sessionStorage
      storage.setItem('currentUser', JSON.stringify(user))
    },
  })
}


