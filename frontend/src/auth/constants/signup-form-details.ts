import { z } from 'zod';
import { customFormErrorMessages } from '../../shared/constants/custom-form-error-messages';

export const registrationDefaultValues: SignUpFormSchema = {
  email: '',
  password: '',
  passwordConfirm: '',
  username: '',
};

export const signupFormSchema = z
  .object({
    username: z.string().min(1, customFormErrorMessages.USERNAME_REQUIRED).min(2, customFormErrorMessages.USERNAME_MIN_LENGTH),
    email: z.string().min(1, customFormErrorMessages.EMAIL_REQUIRED).email({ message: customFormErrorMessages.INVALID_EMAIL }),
    password: z.string().min(8, customFormErrorMessages.PASSWORD_MIN_LENGTH),
    passwordConfirm: z.string().min(8, customFormErrorMessages.PASSWORD_MIN_LENGTH),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: customFormErrorMessages.PASSWORD_MATCH,
    path: ['confirmPassword'],
  });

export type SignUpFormSchema = z.infer<typeof signupFormSchema>;
