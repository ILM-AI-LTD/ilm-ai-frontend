export type User = {
  id: string;
  email: string;
  name: string;
  institution: string;
};

export type Child = {
  id: string;
  fullName: string;
  username: string;
  parentName: string;
  ageGroup: string;
  routine: string[];
  hasCountryBoard: boolean;
  country: string | null;
  board: string | null;
};

export type SignUpDto = {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
};

export type AuthParentsResponse = {
  status: string;
  message: string;
  data: {
    hasChild: boolean;
    user: User;
    token: string;
  };
};
//TODO: fix these response types

export type AuthStudentsResponse = {
  status: string;
  message: string;
  data: {
    user: Child;
    token: string;
  };
};

export type SignInParentsDto = {
  email: string;
  password: string;
};

export type SignInStudentsDto = {
  username: string;
  password: string;
};

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
