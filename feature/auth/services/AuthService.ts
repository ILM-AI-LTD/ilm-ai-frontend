import { AuthEndpoints } from '@/constants/Endpoints'
import type { AuthResponse, ResetPasswordDto, ResetPasswordResponse, SetNewPasswordDto, SetNewPasswordResponse, SignInDto, SignUpDto } from '@/types/auth'
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
        }),
    resetPassword: (data: ResetPasswordDto): Promise<ResetPasswordResponse> =>
        apiRequest('/auth/forgot-password', {
            method: 'POST',
            data,
        }),

    setNewPassword: (data: SetNewPasswordDto): Promise<SetNewPasswordResponse> =>
        apiRequest('/auth/reset-password', {
            method: 'PATCH',
            data,
        }),

}