"use client"

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/types/auth"
import { deleteCookie as deleteClientCookie } from "@/lib/cookies/cookies-client"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  signOut: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("currentUser")
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
    localStorage.removeItem("token")

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
