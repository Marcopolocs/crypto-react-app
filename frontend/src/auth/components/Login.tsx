import { Button, Link, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Controller, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { navigationAuthItems } from '../../shared/constants/navigation-items';
import { ILoginFormSchema, loginFormDefaultValues, loginFormSchema } from '../constants/login-form-details';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, selectAuthState, selectIsUserLoggedIn } from '../store/authSlice';
import { useEffect } from 'react';
import { APP_ROUTE_PATHS } from '../../routes/app-route-paths';
import { RequestState } from '../../core/enums/request-state.enum';
import GeneralCircularProgress from '../../shared/components/GeneralCircualProgress';
import GeneralAlert from '../../shared/components/GeneralAlert';

const errorMessageInputClasses = 'text-red-darkerRed text-xs pt-1';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const authState = useSelector(selectAuthState);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginFormDefaultValues,
    mode: 'onBlur',
  });

  const onSubmitLoginData = (data: ILoginFormSchema) => {
    dispatch(authActions.loginRequest(data));
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate(APP_ROUTE_PATHS.CRYPTOCURRENCIES);
    }
  });

  useEffect(() => {
    // Reset the state back to IDLE to prevent GeneralAlert component from showing up if user navigates away and back after a rejected request
    return () => {
      dispatch(authActions.resetLoginRequestState());
    };
  }, [dispatch]);

  return (
    <>
      {authState.requestState === RequestState.REJECTED && <GeneralAlert message={authState.error ?? ''} />}
      <Box className="p-8 bg-gray-900 text-white">
        <Typography variant="h4" className="text-center mb-6 font-semibold">
          Log in
        </Typography>
        <form onSubmit={handleSubmit(onSubmitLoginData)} className="flex flex-col gap-4">
          <Box>
            <Box className="flex justify-between items-center">
              <Typography variant="body1" className="text-white">
                Email
              </Typography>
            </Box>
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
                  }}
                  error={!!errors.email}
                />
              )}
            />
            {errors.email && (
              <Typography variant="body1" className={errorMessageInputClasses}>
                {errors.email.message}
              </Typography>
            )}
          </Box>
          <Box>
            <Box className="flex justify-between items-center">
              <Typography variant="body1" className="text-white">
                Password
              </Typography>
              <Link href="#" underline="hover" className="text-gray-400 text-sm">
                Forgot password?
              </Link>
            </Box>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  placeholder="Password"
                  type="password"
                  fullWidth
                  className="mt-1"
                  InputLabelProps={{
                    className: 'text-white',
                  }}
                  InputProps={{
                    className: 'bg-white text-black',
                  }}
                  error={!!errors.password}
                />
              )}
            />
            {errors.password && (
              <Typography variant="body1" className={errorMessageInputClasses}>
                {errors.password.message}
              </Typography>
            )}
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 mt-4 rounded-radius-20 w-[25%] mx-auto"
          >
            {authState.requestState === RequestState.PENDING ? <GeneralCircularProgress /> : 'Login'}
          </Button>
        </form>
        <Box className="flex justify-center items-center mt-4">
          <Typography variant="body2" className="text-white">
            Don't yet have an account?
          </Typography>
          <NavLink
            className="text-yellow-bitcoin font-bold text-sm ml-1 hover:text-white"
            to={`${navigationAuthItems[0].path}?action=signup`}
          >
            Sign up
          </NavLink>
        </Box>
      </Box>
    </>
  );
};

export default Login;
