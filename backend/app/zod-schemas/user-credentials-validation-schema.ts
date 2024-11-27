import { z } from "zod";

export const userCredentialsValidationSchema = z.object({
  userCredential: z.string(),
});

export type IUserCredentialsValidationSchema = z.infer<
  typeof userCredentialsValidationSchema
>;
