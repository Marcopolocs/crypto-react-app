import { Slide, Snackbar } from '@mui/material';

type GeneralNotificationSnackbarProps = {
  message: string;
  open: boolean;
  onClose: (b: boolean) => void;
  hideDuration?: number;
  position?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' };
};

const GeneralNotificationSnackbar = ({ onClose, open, message, hideDuration, position }: GeneralNotificationSnackbarProps) => {
  const handleClose = () => {
    onClose(true);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={position ?? { vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={hideDuration ?? 5000}
      onClose={handleClose}
      message={message}
      TransitionComponent={Slide}
      disableWindowBlurListener={true}
      ContentProps={{
        className: 'bg-yellow-bitcoin font-bold text-sm text-grey-darkGrey',
      }}
    />
  );
};

export default GeneralNotificationSnackbar;
