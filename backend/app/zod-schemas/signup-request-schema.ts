import { z } from "zod";

export const signupRequestSchema = z.object({
  username: z.string(),
  email: z.string().email({ message: "This is not a valid email address" }),
  password: z.string(),
  passwordConfirm: z.string(),
});

export type ISignupRequestSchema = z.infer<typeof signupRequestSchema>;
