import { useResetPassword } from './useResetPassword'
import { useSetNewPassword } from './useSetNewPassword'
import { useSignIn } from './useSignIn'
import { useSignUp } from './useSignUp'

export function useAuth() {
  return {
    signUp: useSignUp(),
    signIn: useSignIn(),
    resetPassword: useResetPassword(),
    setNewPassword: useSetNewPassword(),
  }
}
