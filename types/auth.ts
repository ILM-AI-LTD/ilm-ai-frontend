export type User = {
    id: string
    email: string
    name: string
    institution: string
}

export type SignUpDto = {
    email: string
    full_name: string
    institute: string
    password: string
    confirmPassword: string
}

export interface AuthResponse {
    success: boolean
    data: {
      user: User
      token: string
    }
    message: string
  }
