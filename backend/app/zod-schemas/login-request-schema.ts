import { z } from "zod";

export const loginRequestSchema = z.object({
  email: z.string().email({ message: "This is not a valid email address" }),
  password: z.string(),
});

export type ILoginRequestSchema = z.infer<typeof loginRequestSchema>;
