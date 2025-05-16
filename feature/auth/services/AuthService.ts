import { AuthEndpoints } from '@/constants/Endpoints'
import type { AuthParentsResponse, AuthStudentsResponse, ResetPasswordDto, ResetPasswordResponse, SetNewPasswordDto, SetNewPasswordResponse, SignInParentsDto, SignInStudentsDto, SignUpDto } from '@/types/auth'
import { apiRequest } from '@/utils/axios'

export const AuthService = {
    signUp: (data: SignUpDto): Promise<AuthParentsResponse> =>
        apiRequest(AuthEndpoints.signUp, {
            method: 'POST',
            data,
        }),

    signInParents: (data: SignInParentsDto): Promise<AuthParentsResponse> =>
        apiRequest(AuthEndpoints.signInParents, {
            method: 'POST',
            data,
        }),

    signInStudents: (data: SignInStudentsDto): Promise<AuthStudentsResponse> =>
        apiRequest(AuthEndpoints.signInStudents, {
            method: 'POST',
            data,
        }),

    resetPassword: (data: ResetPasswordDto): Promise<ResetPasswordResponse> =>
        apiRequest(AuthEndpoints.resetPassword, {
            method: 'POST',
            data,
        }),

    setNewPassword: (data: SetNewPasswordDto): Promise<SetNewPasswordResponse> =>
        apiRequest(AuthEndpoints.setNewPassword, {
            method: 'PATCH',
            data,
        }),

}