import { useResetPassword } from './useResetPassword'
import { useSetNewPassword } from './useSetNewPassword'
import { useSignInParents } from './useSignInParents'
import { useSignInStudents } from './useSignInStudents'
import { useSignOut } from './useSignOut'
import { useSignUp } from './useSignUp'

export function useAuth() {
  return {
    signUp: useSignUp(),
    signInParents: useSignInParents(),
    signInStudents: useSignInStudents(),
    resetPassword: useResetPassword(),
    setNewPassword: useSetNewPassword(),
    signOut: useSignOut(),
  }
}
