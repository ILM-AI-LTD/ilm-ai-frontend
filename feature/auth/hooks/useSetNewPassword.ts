import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../services/AuthService';
import type { SetNewPasswordDto, SetNewPasswordResponse } from '@/types/auth';

export function useSetNewPassword() {
  return useMutation<SetNewPasswordResponse, Error, SetNewPasswordDto>({
    mutationFn: AuthService.setNewPassword,
  });
}