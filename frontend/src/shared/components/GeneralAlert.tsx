import { Alert } from '@mui/material';

type IGeneralAlertProps = {
  message: string;
};

const GeneralAlert: React.FC<IGeneralAlertProps> = ({ message }) => {
  return (
    <>
      <Alert severity="error" sx={{ backgroundColor: '#b51205', color: 'white' }} icon={false}>
        {message}
      </Alert>
    </>
  );
};

export default GeneralAlert;
