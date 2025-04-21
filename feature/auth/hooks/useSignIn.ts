import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthService } from '../services/AuthService'
import type { SignUpDto, AuthResponse, User, SignInDto } from '@/types/auth'

export function useSignIn() {
  const qc = useQueryClient()

  return useMutation<AuthResponse, Error, SignInDto>({
    
    mutationFn: AuthService.signIn,
    onSuccess: (res) => {
      const { user, token } = res.data
      qc.setQueryData<User>(['currentUser'], user)
      localStorage.setItem('token', token)
      localStorage.setItem('currentUser', JSON.stringify(user))
    },
  })
}


