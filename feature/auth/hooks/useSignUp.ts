// src/features/auth/hooks/useSignUp.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthService } from '../services/AuthService'
import type { SignUpDto, AuthResponse, User } from '@/types/auth'

export function useSignUp() {
  const qc = useQueryClient()

  return useMutation<AuthResponse, Error, SignUpDto>({
    
    mutationFn: AuthService.signUp,
    onSuccess: (res) => {
      const { user, token } = res.data
      qc.setQueryData<User>(['currentUser'], user)
      localStorage.setItem('token', token)
      localStorage.setItem('currentUser', JSON.stringify(user))
    },
  })
}


