import { Button, FormControl, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationDefaultValues, SignUpFormSchema, signupFormSchema } from '../constants/signup-form-details';
import { NavLink, useNavigate } from 'react-router-dom';
import { navigationAuthItems } from '../../shared/constants/navigation-items';
import { useDispatch, useSelector } from 'react-redux';
import { credentialsValidationActions, selectCredentialsValidationState } from '../store/credentialsValidationSlice';
import { FormControlTypeEnum } from '../enums/form-control-type.enum';
import { useEffect, useState } from 'react';
import { registrationActions, selectRegistrationRequestState, selectRegistrationState } from '../store/registrationSlice';
import { errorMessageInputClasses } from '../../shared/constants/form-element-styles';
import { RequestState } from '../../core/enums/request-state.enum';
import GeneralCircularProgress from '../../shared/components/GeneralCircualProgress';
import { useDebounce } from '../../shared/hooks/useDebounce';
import GeneralAlert from '../../shared/components/GeneralAlert';
import { UserCredential } from '../types/user-credential';
import { RequestStateIconComponent } from '../../shared/components/RequestStateIconComponent';

type SignUpProps = {
  handleOpenSnackbar: () => void;
};

const SignUp: React.FC<SignUpProps> = ({ handleOpenSnackbar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registrationState = useSelector(selectRegistrationState);
  const registrationRequestState = useSelector(selectRegistrationRequestState);
  const validationRequestState = useSelector(selectCredentialsValidationState);

  const [userCredential, setUserCredential] = useState<UserCredential | null>(null);
  const debouncedSearchTerm = useDebounce(userCredential, 2000);

  const {
    control,
    getValues,
    handleSubmit,
    trigger,
    setError,
    clearErrors,
    formState: { errors, dirtyFields },
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: registrationDefaultValues,
    mode: 'onBlur',
  });

  useEffect(() => {
    if (debouncedSearchTerm && userCredential?.formControlType === FormControlTypeEnum.USERNAME) {
      dispatch(credentialsValidationActions.validateUserName({ userCredential: debouncedSearchTerm.formControlValue }));
    }

    if (debouncedSearchTerm && userCredential?.formControlType === FormControlTypeEnum.EMAIL) {
      dispatch(credentialsValidationActions.validateUserEmail({ userCredential: debouncedSearchTerm.formControlValue }));
    }
  }, [debouncedSearchTerm, dispatch, userCredential?.formControlType]);

  useEffect(() => {
    if (validationRequestState.username.requestState === RequestState.REJECTED) {
      setError('username', {
        type: 'manual',
        message: validationRequestState.username.error,
      });
    } else {
      clearErrors('username');
    }

    if (validationRequestState.emailAddress.requestState === RequestState.REJECTED) {
      setError('email', {
        type: 'manual',
        message: validationRequestState.emailAddress.error,
      });
    } else {
      clearErrors('email');
    }
  }, [validationRequestState, setError, clearErrors]);

  useEffect(() => {
    if (registrationRequestState === RequestState.RESOLVED) {
      navigate(`${navigationAuthItems[0].path}?action=login`);
      handleOpenSnackbar();
      dispatch(registrationActions.resetRegistrationRequestState());
    }
  }, [registrationState, navigate, dispatch, handleOpenSnackbar, registrationRequestState]);

  const onSubmitRegistrationData = (registrationData: SignUpFormSchema) => {
    dispatch(registrationActions.registrationRequest(registrationData));
  };

  const handleOnChangeEvent = async (controlName: keyof SignUpFormSchema) => {
    if (dirtyFields[controlName]) {
      const valid = await trigger(controlName);
      if (valid && (controlName === 'email' || controlName === 'username')) {
        if (controlName === 'email') {
          setUserCredential({
            formControlValue: getValues(controlName),
            formControlType: FormControlTypeEnum.EMAIL,
          });
        } else if (controlName === 'username') {
          setUserCredential({
            formControlValue: getValues(controlName),
            formControlType: FormControlTypeEnum.USERNAME,
          });
        }
      }
    }
  };

  return (
    <>
      {registrationRequestState === RequestState.REJECTED && <GeneralAlert message={registrationState.error ?? ''} />}

      <Box className="p-8 bg-gray-900 text-white">
        <Typography variant="h4" className="text-center mb-6 font-semibold">
          Create your account
        </Typography>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmitRegistrationData)}>
          <FormControl>
            <Typography variant="body1" className="text-white">
              Username
            </Typography>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  placeholder="Username"
                  fullWidth
                  className="mt-1"
                  error={!!errors.username}
                  InputLabelProps={{
                    className: 'text-white',
                  }}
                  InputProps={{
                    className: 'bg-white text-black',
                    endAdornment: <RequestStateIconComponent requestState={validationRequestState.username.requestState} />,
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                    void handleOnChangeEvent('username');
                  }}
                ></TextField>
              )}
            />
            {errors.username && (
              <Typography variant="body1" className={errorMessageInputClasses}>
                {errors.username.message}
              </Typography>
            )}
          </FormControl>
          <FormControl>
            <Typography variant="body1" className="text-white">
              Email Address
            </Typography>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  placeholder="Email"
                  fullWidth
                  className="mt-1"
                  InputLabelProps={{
                    className: 'text-white',
                  }}
                  InputProps={{
                    className: 'bg-white text-black',
                    endAdornment: <RequestStateIconComponent requestState={validationRequestState.emailAddress.requestState} />,
                  }}
                  error={!!errors.email}
                  onChange={(e) => {
                    field.onChange(e);
                    void handleOnChangeEvent('email');
                  }}
                />
              )}
            />
            {errors.email && (
              <Typography variant="body1" className={errorMessageInputClasses}>
                {errors.email.message}
              </Typography>
            )}
          </FormControl>
          <FormControl>
            <Typography variant="body1" className="text-white">
              Password
            </Typography>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  variant="outlined"
                  placeholder="Password"
                  fullWidth
                  className="mt-1"
                  error={!!errors.password}
                  InputLabelProps={{
                    className: 'text-white',
                  }}
                  InputProps={{
                    className: 'bg-white text-black',
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                    void handleOnChangeEvent('password');
                  }}
                />
              )}
            />
            {errors.password && (
              <Typography variant="body1" className={errorMessageInputClasses}>
                {errors.password.message}
              </Typography>
            )}
          </FormControl>
          <FormControl>
            <Typography variant="body1" className="text-white">
              Confirm password
            </Typography>
            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  variant="outlined"
                  placeholder="Confirm Password"
                  fullWidth
                  className="mt-1"
                  error={!!errors.passwordConfirm}
                  InputLabelProps={{
                    className: 'text-white',
                  }}
                  InputProps={{
                    className: 'bg-white text-black',
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                    void handleOnChangeEvent('passwordConfirm');
                  }}
                />
              )}
            />
            {errors.passwordConfirm && (
              <Typography variant="body1" className={errorMessageInputClasses}>
                {errors.passwordConfirm.message}
              </Typography>
            )}
          </FormControl>
          <Button
            variant="contained"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 mt-4 rounded-radius-20 w-[25%] mx-auto"
            type="submit"
          >
            {registrationRequestState === RequestState.PENDING ? <GeneralCircularProgress /> : 'Sign up'}
          </Button>
        </form>
        <Box className="flex justify-center items-center mt-4">
          <Typography variant="body2" className="text-white">
            You already have an account?
          </Typography>
          <NavLink
            className="text-yellow-bitcoin font-bold text-sm ml-1 hover:text-white"
            to={`${navigationAuthItems[0].path}?action=login`}
          >
            Login
          </NavLink>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
