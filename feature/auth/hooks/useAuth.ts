import { useSignUp } from './useSignUp'

export function useAuth() {
  return {
    signUp: useSignUp(),
    // signIn: useSignIn(),
    // logout: useLogout(),
    // currentUser: useCurrentUser(),
  }
}
