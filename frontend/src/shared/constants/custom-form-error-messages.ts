const minimumPasswordLength = 8;
const minimumUsernameLength = 2;

export const customFormErrorMessages = {
  EMAIL_REQUIRED: 'Email address is required!',
  INVALID_EMAIL: 'Invalid email format. Please use a valid email!',
  PASSWORD_REQUIRED: 'Password is required!',
  USERNAME_REQUIRED: 'Username is required!',
  USERNAME_MIN_LENGTH: `Username must be at least ${minimumUsernameLength} characters!`,
  PASSWORD_MIN_LENGTH: `Password must be at least ${minimumPasswordLength} characters!`,
  PASSWORD_MATCH: 'The passwords must match!',
};
