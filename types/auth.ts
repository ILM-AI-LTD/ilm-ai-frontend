export type User = {
  id: string
  email: string
  name: string
  institution: string
}

export type SignUpDto = {
  email: string
  name: string
  password: string
  confirmPassword: string
}

export type AuthResponse = {
  success: boolean
  data: {
    user: User
    token: string
  }
  message: string
}

export type SignInDto = {
  email: string
  password: string
}
