import { z } from 'zod';
import { customFormErrorMessages } from '../../shared/constants/custom-form-error-messages';

export const loginFormDefaultValues: ILoginFormSchema = {
  email: '',
  password: '',
};

export const loginFormSchema = z.object({
  email: z.string().min(1, customFormErrorMessages.EMAIL_REQUIRED).email({ message: customFormErrorMessages.INVALID_EMAIL }),
  password: z.string().min(1, customFormErrorMessages.PASSWORD_REQUIRED),
});

export type ILoginFormSchema = z.infer<typeof loginFormSchema>;
