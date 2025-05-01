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

export type ResetPasswordDto = {
  email: string;
};

export type ResetPasswordResponse = {
  status: string;
  message: string; 
};

export type SetNewPasswordDto = {
  email: string;
  token: string;
  newPassword: string;
};

export type SetNewPasswordResponse = {
  status: string;
  message: string; 
};
