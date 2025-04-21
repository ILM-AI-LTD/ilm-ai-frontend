import { AuthEndpoints } from '@/constants/Endpoints'
import type { AuthResponse, SignInDto, SignUpDto } from '@/types/auth'
import { apiRequest } from '@/utils/axios'

export const AuthService = {
    signUp: (data: SignUpDto): Promise<AuthResponse> =>
        apiRequest(AuthEndpoints.signUp, {
            method: 'POST',
            data,
        }),

    signIn: (data: SignInDto): Promise<AuthResponse> =>
        apiRequest(AuthEndpoints.signIn, {
            method: 'POST',
            data,
        })

}