import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../services/AuthService';
import type { ResetPasswordDto, ResetPasswordResponse } from '@/types/auth';

export function useResetPassword() {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordDto>({
    mutationFn: AuthService.resetPassword,
  });
}