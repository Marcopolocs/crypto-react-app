import { useCallback, useState } from 'react';

const useGeneralNotificationSnackbar = () => {
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const handleOpenSnackbarEvent = useCallback(() => {
    setIsSnackBarOpen(true);
  }, [setIsSnackBarOpen]);

  const handleCloseSnackbarEvent = useCallback(() => {
    setIsSnackBarOpen(false);
  }, [setIsSnackBarOpen]);

  return { isSnackBarOpen, handleOpenSnackbarEvent, handleCloseSnackbarEvent };
};

export default useGeneralNotificationSnackbar;
