import * as z from "zod";

export const SignUpSchema = z
  .object({
    email: z.string().trim().min(1, "Email is required. ").email("Invalid email address. "),
    name: z.string().min(1, "Full name is required. "),
    institution: z.string().min(1, "Institute/School name is required. "),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be 8 characters long including one letter and one digit."
      ),
    confirmPassword: z.string().min(1, "Confirm password required. "),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match. ",
    path: ["confirmPassword"],
  })

export const SignInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required. ")
    .email("Invalid email address. "),
  password: z.string().trim().min(1, "Password required. "),
});

export const ResetPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required. ")
    .email("Invalid email address. "),
});

export const SetNewPasswordSchema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be 8 characters long including one letter and one digit."
      ),
    confirmPassword: z.string().min(1, "Confirm password required. "),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match. ",
    path: ["confirmPassword"],
  })