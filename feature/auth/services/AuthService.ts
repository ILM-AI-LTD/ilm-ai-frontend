import authEndpoints from '@/constants/AuthEndpoints'
import type { AuthResponse, SignInDto, SignUpDto } from '@/types/auth'
import { apiRequest } from '@/utils/axios'

export const AuthService = {
    signUp: (data: SignUpDto): Promise<AuthResponse> =>
        apiRequest(authEndpoints.signUp, {
            method: 'POST',
            data,
        }),

    signIn: (data: SignInDto): Promise<AuthResponse> =>
        apiRequest(authEndpoints.signIn, {
            method: 'POST',
            data,
        })

}