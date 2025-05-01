import { useResetPassword } from './useResetPassword'
import { useSignIn } from './useSignIn'
import { useSignUp } from './useSignUp'

export function useAuth() {
  return {
    signUp: useSignUp(),
    signIn: useSignIn(),
    resetPassword: useResetPassword(),
  }
}
