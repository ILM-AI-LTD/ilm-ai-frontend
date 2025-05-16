"use client"
import { setCookie as setClientCookie } from '@/lib/cookies/cookies-client'
import type { AuthParentsResponse, AuthStudentsResponse, SignInStudentsDto, User } from '@/types/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthService } from '../services/AuthService'

type SignInStudentsVariables = {
  data: SignInStudentsDto
  rememberMe: boolean
}

export function useSignInStudents() {
  const qc = useQueryClient()

  return useMutation<AuthStudentsResponse, Error, SignInStudentsVariables>({

    mutationFn: ({ data }) => AuthService.signInStudents(data),
    onSuccess: (res, { rememberMe }) => {

      const { user, token } = res.data

      qc.setQueryData<User>(['currentParents'], user)

      setClientCookie('token', token, { expires: rememberMe ? 7 : undefined })

      const storage = rememberMe ? localStorage : sessionStorage
      storage.setItem('currentParents', JSON.stringify(user))
    },
  })
}