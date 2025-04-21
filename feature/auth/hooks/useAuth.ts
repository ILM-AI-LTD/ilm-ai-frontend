import { useSignIn } from './useSignIn'
import { useSignUp } from './useSignUp'

export function useAuth() {
  return {
    signUp: useSignUp(),
    signIn: useSignIn(),
  }
}
