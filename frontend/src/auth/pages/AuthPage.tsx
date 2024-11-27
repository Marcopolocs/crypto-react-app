import Container from '@mui/material/Container';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import GeneralNotificationSnackbar from '../../shared/components/GeneralNotificationSnackbar';
import useGeneralNotificationSnackbar from '../../shared/hooks/useGeneralNotificationSnackbar';

//TODO rethink this param approach later..
const AuthPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { handleOpenSnackbarEvent, isSnackBarOpen, handleCloseSnackbarEvent } = useGeneralNotificationSnackbar();

  const action = searchParams.get('action');

  useEffect(() => {
    if (action !== 'login' && action !== 'signup') {
      navigate('/auth?action=login');
    }
  }, [action, navigate]);

  return (
    <>
      {isSnackBarOpen && (
        <GeneralNotificationSnackbar
          message={`You've successfully created your account. Please login now.`}
          open={isSnackBarOpen}
          onClose={handleCloseSnackbarEvent}
          position={{ vertical: 'bottom', horizontal: 'center' }}
        />
      )}

      <Container className="flex justify-center mt-20 w-auto">
        {action === 'login' ? (
          <div className="w-full max-w-md mx-auto">
            <Login />
          </div>
        ) : (
          <div className="w-full max-w-md mx-auto">
            <SignUp handleOpenSnackbar={handleOpenSnackbarEvent} />
          </div>
        )}
      </Container>
    </>
  );
};

export default AuthPage;
