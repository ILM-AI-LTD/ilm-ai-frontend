import authEndpoints from '@/constants/AuthEndpoints'
import type { SignUpDto, AuthResponse } from '@/types/auth'
import { apiRequest } from '@/utils/axios'

export const AuthService = {
  signUp: (data: SignUpDto): Promise<AuthResponse> =>
    apiRequest(authEndpoints.signUp, {
      method: 'POST',
      data,
    }),

}