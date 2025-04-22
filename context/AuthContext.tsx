"use client"

import { deleteCookie as deleteClientCookie } from "@/lib/cookies/cookies-client"
import type { User } from "@/types/auth"
import { useRouter } from "next/navigation"
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  signOut: () => { },
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    let stored = localStorage.getItem("currentUser")

    if (!stored) {
      stored = sessionStorage.getItem('currentUser') || null
    }

    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        setUser(null)
      }
    }
  }, [])

  const signOut = useCallback(() => {
    deleteClientCookie("token")

    localStorage.removeItem("currentUser")
    sessionStorage.removeItem('currentUser')

    setUser(null)

    router.push("/auth/sign-in")
  }, [router])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
