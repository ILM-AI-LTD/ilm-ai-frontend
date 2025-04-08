import * as z from "zod";

export const SignUpSchema = z
  .object({
    Email: z.string().email("Invalid email address. "),
    full_name: z.string().min(1, "Full name is required. "),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be at least 8 characters long and include at least one letter and one digit."
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